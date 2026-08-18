import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Sube archivos GRANDES directo desde el navegador a Vercel Blob (evita el
// límite de ~4.5MB que tienen las Server Actions/rutas normales de Vercel
// para el cuerpo de la petición). Este endpoint solo entrega un token
// firmado — los bytes del archivo nunca pasan por acá.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const secret = process.env.ADMIN_SESSION_SECRET;
        const session = cookies().get("admin_session")?.value;
        if (!secret || session !== secret) {
          throw new Error("No autorizado.");
        }
        return {
          allowedContentTypes: ["image/*", "video/*"],
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async () => {
        // No hace falta acción acá: el cliente llama a la Server Action
        // de "finalizar" (comprimir + guardar) apenas termina el upload.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 400 }
    );
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      // Fotos/videos subidos desde /admin viven en Vercel Blob.
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  experimental: {
    // Asegura que se incluyan en el bundle serverless de Vercel los
    // binarios que Next no detecta solo (requires dinámicos, no estáticos):
    // ffmpeg (compresión de video) y el WASM de libheif (conversión de
    // fotos HEIC/HEIF, formato por defecto de la cámara del iPhone).
    outputFileTracingIncludes: {
      "/api/**/*": ["./node_modules/ffmpeg-static/**", "./node_modules/libheif-js/**"],
      "/admin/**/*": ["./node_modules/ffmpeg-static/**", "./node_modules/libheif-js/**"],
    },
  },
};

export default nextConfig;

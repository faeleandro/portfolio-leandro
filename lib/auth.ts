"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_session";

export async function login(formData: FormData) {
  const password = formData.get("password");
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!expected || !secret) {
    redirect("/admin/login?error=config");
  }

  if (password !== expected) {
    redirect("/admin/login?error=wrong");
  }

  cookies().set(COOKIE_NAME, secret, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });

  redirect("/admin");
}

export async function logout() {
  cookies().delete(COOKIE_NAME);
  redirect("/admin/login");
}

/** Chequeo extra dentro de las Server Actions que modifican contenido. */
export async function requireAdmin() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const session = cookies().get(COOKIE_NAME)?.value;
  if (!secret || session !== secret) {
    throw new Error("No autorizado.");
  }
}

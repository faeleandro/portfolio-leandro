import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Cursor from "@/components/Cursor";
import AnimatedBackground from "@/components/AnimatedBackground";
import { getSite } from "@/lib/site";
import { pick } from "@/lib/i18n";
import { getLocale } from "@/lib/get-locale";

const displayFont = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const locale = getLocale();
  return {
    title: `${site.name} — Portafolio Creativo`,
    description: pick(locale, site.role, ""),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();

  return (
    <html lang={locale} className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-cream antialiased">
        <AnimatedBackground />
        <Cursor />
        <SiteHeader />
        <main className="pt-20">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

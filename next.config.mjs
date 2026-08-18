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
    // Asegura que el binario de ffmpeg (usado para comprimir videos
    // subidos desde /admin) se incluya en el bundle serverless de Vercel.
    outputFileTracingIncludes: {
      "/api/**/*": ["./node_modules/ffmpeg-static/**"],
      "/admin/**/*": ["./node_modules/ffmpeg-static/**"],
    },
  },
};

export default nextConfig;

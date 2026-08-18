/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholders and future project media are served from /public.
    // If you later host images on an external domain, add it here, e.g.:
    // remotePatterns: [{ protocol: 'https', hostname: 'images.tuservicio.com' }],
    unoptimized: false,
  },
};

export default nextConfig;

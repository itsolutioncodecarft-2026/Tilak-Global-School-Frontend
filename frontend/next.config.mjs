/** @type {import('next').NextConfig} */

// NOTE: API rewrites are handled by vercel.json in production.
// next.config.mjs rewrites would duplicate them and may conflict.
// Dev rewrites are NOT needed because api.js uses the full API_URL
// server-side and '/api' client-side (Vercel rewrite handles prod).

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },

  images: {
    remotePatterns: [
      // Render backend — uploaded images (production)
      {
        protocol: 'https',
        hostname: 'tilak-global-school-backend.onrender.com',
        pathname: '/uploads/**',
      },
      // localhost — uploaded images (development)
      {
        protocol: 'http',
        hostname: 'localhost',
        port:     '5000',
        pathname: '/uploads/**',
      },
      // Unsplash placeholder images used in static data files
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    dangerouslyAllowSVG:    true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy:  "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;

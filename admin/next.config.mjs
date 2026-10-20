/** @type {import('next').NextConfig} */

// NOTE: API rewrites are handled by vercel.json in production.
// Dev: adminApi.js uses getApiBase() which returns full API_URL server-side
// and '/api' client-side (no local rewrite needed).

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
    ],
  },
};

export default nextConfig;

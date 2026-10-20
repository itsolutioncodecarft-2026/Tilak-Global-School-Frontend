/** @type {import('next').NextConfig} */

// Rewrites are in vercel.json for production.
// In development, next.config.mjs rewrites handle /api/* → localhost:5000.
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },

  // Dev-only rewrites so `npm run dev` works without Vercel CLI
  ...(isDev && {
    async rewrites() {
      return [
        {
          source:      '/api/:path*',
          destination: 'http://localhost:5000/api/:path*',
        },
      ];
    },
  }),

  images: {
    remotePatterns: [
      // Production backend (Render + custom domain)
      {
        protocol: 'https',
        hostname: 'api.tilakglobalschool.com',
        pathname: '/uploads/**',
      },
      // Render auto-domain (before custom domain is set)
      {
        protocol: 'https',
        hostname: 'tilak-global-school-backend.onrender.com',
        pathname: '/uploads/**',
      },
      // Development
      {
        protocol: 'http',
        hostname: 'localhost',
        port:     '5000',
        pathname: '/uploads/**',
      },
      // Unsplash placeholder images
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

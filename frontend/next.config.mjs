/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

// Production API lives at api.tilakglobalschool.in
// Development API is on localhost:5000
const API_ORIGIN = isProd
  ? 'https://api.tilakglobalschool.in'
  : 'http://localhost:5000';

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },

  // ── API rewrites ────────────────────────────────────────────────────────────
  // All /api/* requests are proxied to the backend.
  // → Dev:  /api/health  →  http://localhost:5000/api/health
  // → Prod: /api/health  →  https://api.tilakglobalschool.in/api/health
  //
  // This keeps cookies same-origin (no CORS) and avoids exposing the API URL.
  async rewrites() {
    return [
      {
        source:      '/api/:path*',
        destination: `${API_ORIGIN}/api/:path*`,
      },
    ];
  },

  // ── Images ──────────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      // Unsplash placeholder images (dev + prod)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Uploaded files — dev (localhost)
      {
        protocol: 'http',
        hostname: 'localhost',
        port:     '5000',
        pathname: '/uploads/**',
      },
      // Uploaded files — production Railway backend domain
      {
        protocol: 'https',
        hostname: 'api.tilakglobalschool.in',
        pathname: '/uploads/**',
      },
      // Uploaded files — Railway auto-generated domain (fallback)
      {
        protocol: 'https',
        hostname: '*.railway.app',
        pathname: '/uploads/**',
      },
    ],
    dangerouslyAllowSVG:    true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy:  "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ── Webpack dev watcher (Windows HMR fix) ──────────────────────────────────
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll:             1000,
        aggregateTimeout: 300,
        ignored:          ['**/node_modules/**', '**/.next/**', '**/.git/**'],
      };
    }
    return config;
  },

  onDemandEntries: {
    maxInactiveAge:    60 * 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const API_ORIGIN = isProd
  ? 'https://api.tilakglobalschool.in'
  : 'http://localhost:5000';

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },

  // ── API rewrites ────────────────────────────────────────────────────────────
  // All /api/* requests proxied to backend.
  // → Dev:  /api/auth/login  →  http://localhost:5000/api/auth/login
  // → Prod: /api/auth/login  →  https://api.tilakglobalschool.in/api/auth/login
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
      // Dev uploads
      {
        protocol: 'http',
        hostname: 'localhost',
        port:     '5000',
        pathname: '/uploads/**',
      },
      // Prod uploads via custom domain
      {
        protocol: 'https',
        hostname: 'api.tilakglobalschool.in',
        pathname: '/uploads/**',
      },
      // Railway auto-generated domain (fallback before custom domain is set)
      {
        protocol: 'https',
        hostname: '*.railway.app',
        pathname: '/uploads/**',
      },
    ],
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
};

export default nextConfig;

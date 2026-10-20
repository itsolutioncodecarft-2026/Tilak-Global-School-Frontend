/**
 * Returns the correct API base URL depending on execution context.
 *
 * Server-side (Server Components, generateMetadata, Route Handlers):
 *   → process.env.API_URL — full production URL, never exposed to browser.
 *   → Set API_URL=https://api.tilakglobalschool.com/api in Vercel dashboard.
 *
 * Client-side ("use client" components, browser):
 *   → '/api' — relative URL, Vercel rewrite proxies to backend.
 *   → No environment variable needed in browser bundle.
 */
export function getApiBase() {
  if (typeof window !== 'undefined') {
    return '/api';
  }
  return process.env.API_URL || 'https://api.tilakglobalschool.com/api';
}

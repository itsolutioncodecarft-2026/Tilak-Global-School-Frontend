/**
 * Returns the correct API base URL depending on execution context.
 *
 * Server-side (Server Components, generateMetadata, Route Handlers):
 *   → Uses process.env.API_URL — full backend URL, never sent to browser.
 *   → Set API_URL in Vercel Project Settings (no NEXT_PUBLIC_ prefix).
 *
 * Client-side ("use client" components, browser):
 *   → Uses relative '/api' — Vercel rewrites proxy this to the backend.
 *   → No env variable needed in the browser at all.
 */
export function getApiBase() {
  if (typeof window !== 'undefined') {
    // Browser → relative URL → Vercel rewrite → Render backend
    return '/api';
  }
  // Server → direct full URL (stays private, never in JS bundle)
  return process.env.API_URL || 'http://localhost:5000/api';
}

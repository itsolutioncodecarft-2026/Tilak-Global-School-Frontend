/**
 * Public site API client — Tilak Global School
 *
 * URL strategy (no NEXT_PUBLIC_ needed):
 *   Server-side → process.env.API_URL (full Render URL, private)
 *   Client-side → '/api' (relative, Vercel rewrite proxies to Render)
 *
 * All functions return { data, error } — never throw.
 */

import { getApiBase } from './apiUrl';

async function apiFetch(path, options = {}) {
  // getApiBase() called at runtime — correct URL for server OR browser
  const url = `${getApiBase()}${path}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        data:  null,
        error: {
          message: json.message || `Request failed (${res.status})`,
          status:  res.status,
        },
      };
    }

    return { data: json.data ?? json, error: null };

  } catch (err) {
    return {
      data:  null,
      error: { message: err.message || 'Network error — could not reach server', status: 0 },
    };
  }
}

// ── Public read-only endpoints ────────────────────────────────────────────────

/** Site settings: school name, contact, director message, banner text */
export function getSettings() {
  return apiFetch('/settings');
}

/** CMS content blocks for a given page e.g. 'home', 'about' */
export function getContent(page) {
  return apiFetch(`/content/${page}`);
}

/** Published news/events list. Optional query string e.g. '?category=News' */
export function getNews(query = '') {
  return apiFetch(`/news${query}`);
}

/** Single news/event post by slug */
export function getNewsBySlug(slug) {
  return apiFetch(`/news/${slug}`);
}

/** Published gallery images. Optional query string e.g. '?category=Sports' */
export function getGallery(query = '') {
  return apiFetch(`/gallery${query}`);
}

/** Published documents/downloads */
export function getDocuments(query = '') {
  return apiFetch(`/documents${query}`);
}

/** Fee structure rows */
export function getFees() {
  return apiFetch('/fees');
}

/** Published FAQs */
export function getFaqs() {
  return apiFetch('/faqs');
}

/** Submit admission enquiry / application form (rate-limited on backend) */
export function submitApplication(data) {
  return apiFetch('/applications', {
    method:      'POST',
    credentials: 'include',
    body:        JSON.stringify(data),
  });
}

/** Submit contact form enquiry (rate-limited on backend) */
export function submitContact(data) {
  return apiFetch('/contact', {
    method:      'POST',
    credentials: 'include',
    body:        JSON.stringify(data),
  });
}

export default apiFetch;

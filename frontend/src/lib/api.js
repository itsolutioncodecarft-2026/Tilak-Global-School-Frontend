/**
 * Public site API client — Tilak Global School
 *
 * Base URL strategy:
 *   Development → NEXT_PUBLIC_API_URL = http://localhost:5000/api  (direct)
 *   Production  → NEXT_PUBLIC_API_URL = /api  (Vercel rewrite → Railway)
 *
 * All functions return { data, error } — never throw.
 * Form submissions include credentials: 'include' for cookie compatibility.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(`${BASE}${path}`, {
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
    // Network error / no connection
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

/** CMS content blocks for a given page (e.g. 'home', 'about') */
export function getContent(page) {
  return apiFetch(`/content/${page}`);
}

/** Published news/events list. Pass query string for filters e.g. '?category=News' */
export function getNews(query = '') {
  return apiFetch(`/news${query}`);
}

/** Single news/event post by slug */
export function getNewsBySlug(slug) {
  return apiFetch(`/news/${slug}`);
}

/** Published gallery images. Pass query string e.g. '?category=Sports' */
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

/**
 * Submit admission enquiry or application form.
 * Rate-limited on backend — credentials included for cookie compat.
 */
export function submitApplication(data) {
  return apiFetch('/applications', {
    method:      'POST',
    credentials: 'include',
    body:        JSON.stringify(data),
  });
}

/**
 * Submit contact form enquiry.
 * Rate-limited on backend.
 */
export function submitContact(data) {
  return apiFetch('/contact', {
    method:      'POST',
    credentials: 'include',
    body:        JSON.stringify(data),
  });
}

export default apiFetch;

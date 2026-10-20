/**
 * Admin API client.
 * Uses Next.js rewrites proxy (/api/* → http://localhost:5000/api/*)
 * so all requests are same-origin — no CORS issues, cookies work.
 */

const BASE = '/api'; // proxied by next.config.mjs rewrites

async function http(method, path, body, options = {}) {
  const isFormData = body instanceof FormData;
  const headers = isFormData ? {} : { 'Content-Type': 'application/json' };

  // For file uploads (FormData), go directly to backend to avoid proxy stripping the body
  const DIRECT = process.env.NEXT_PUBLIC_API_DIRECT || 'http://localhost:5000/api';
  const url = isFormData ? `${DIRECT}${path}` : `${BASE}${path}`;

  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    err.data   = data;
    throw err;
  }
  return data;
}

export const adminApi = {
  // Auth
  login:          (body)       => http('POST', '/auth/login', body),
  me:             ()           => http('GET',  '/auth/me'),
  logout:         ()           => http('POST', '/auth/logout'),
  changePassword: (body)       => http('POST', '/auth/change-password', body),

  // Dashboard
  stats:          ()           => http('GET', '/admin/dashboard/stats'),
  trend:          (days = 30)  => http('GET', `/admin/dashboard/stats/trend?days=${days}`),
  byClass:        ()           => http('GET', '/admin/dashboard/stats/by-class'),
  activity:       (limit = 20) => http('GET', `/admin/dashboard/activity?limit=${limit}`),

  // Applications
  applications:   (q = '')     => http('GET', `/admin/applications${q}`),
  application:    (id)         => http('GET', `/admin/applications/${id}`),
  updateAppStatus:(id, body)   => http('PATCH', `/admin/applications/${id}/status`, body),
  deleteApp:      (id)         => http('DELETE', `/admin/applications/${id}`),

  // Content
  allContent:     (q = '')     => http('GET', `/admin/content${q}`),
  pageContent:    (page)       => http('GET', `/admin/content/page/${page}`),
  contentBlock:   (key)        => http('GET', `/admin/content/block?key=${encodeURIComponent(key)}`),
  createContent:  (body)       => http('POST', '/admin/content', body),
  updateContent:  (key, body)  => http('PUT',  `/admin/content/block?key=${encodeURIComponent(key)}`, body),
  publishContent: (key)        => http('PATCH', `/admin/content/block/publish?key=${encodeURIComponent(key)}`, {}),
  unpublishContent:(key)       => http('PATCH', `/admin/content/block/unpublish?key=${encodeURIComponent(key)}`, {}),
  deleteContent:  (key)        => http('DELETE', `/admin/content/block?key=${encodeURIComponent(key)}`),

  // Gallery
  gallery:        (q = '')     => http('GET', `/admin/gallery${q}`),
  galleryItem:    (id)         => http('GET', `/admin/gallery/${id}`),
  uploadGallery:  (fd)         => http('POST', '/admin/gallery', fd),
  updateGallery:  (id, body)   => http('PUT',  `/admin/gallery/${id}`, body),
  deleteGallery:  (id)         => http('DELETE', `/admin/gallery/${id}`),

  // News
  news:           (q = '')     => http('GET', `/admin/news${q}`),
  newsItem:       (id)         => http('GET', `/admin/news/${id}`),
  createNews:     (fd)         => http('POST', '/admin/news', fd),
  updateNews:     (id, fd)     => http('PUT',  `/admin/news/${id}`, fd),
  publishNews:    (id)         => http('PATCH', `/admin/news/${id}/publish`, {}),
  unpublishNews:  (id)         => http('PATCH', `/admin/news/${id}/unpublish`, {}),
  setFeatured:    (id)         => http('PATCH', `/admin/news/${id}/featured`, {}),
  deleteNews:     (id)         => http('DELETE', `/admin/news/${id}`),

  // Documents
  documents:      (q = '')     => http('GET', `/admin/documents${q}`),
  documentItem:   (id)         => http('GET', `/admin/documents/${id}`),
  uploadDocument: (fd)         => http('POST', '/admin/documents', fd),
  updateDocument: (id, body)   => http('PUT',  `/admin/documents/${id}`, body),
  deleteDocument: (id)         => http('DELETE', `/admin/documents/${id}`),

  // Fees
  fees:           ()           => http('GET', '/admin/fees'),
  updateFee:      (id, body)   => http('PUT',  `/admin/fees/${id}`, body),
  createFee:      (body)       => http('POST', '/admin/fees', body),
  deleteFee:      (id)         => http('DELETE', `/admin/fees/${id}`),

  // FAQs
  faqs:           ()           => http('GET', '/admin/faqs'),
  createFaq:      (body)       => http('POST', '/admin/faqs', body),
  updateFaq:      (id, body)   => http('PUT',  `/admin/faqs/${id}`, body),
  deleteFaq:      (id)         => http('DELETE', `/admin/faqs/${id}`),
  reorderFaqs:    (items)      => http('PATCH', '/admin/faqs/reorder', { items }),

  // Settings
  settings:       ()           => http('GET', '/admin/settings'),
  updateSettings: (body)       => http('PUT',  '/admin/settings', body),
  uploadLogo:     (fd)         => http('POST', '/admin/settings/logo', fd),
  uploadFavicon:  (fd)         => http('POST', '/admin/settings/favicon', fd),
  uploadDirectorPhoto:(fd)     => http('POST', '/admin/settings/director-photo', fd),

  // Contact enquiries
  contacts:       (q = '')     => http('GET', `/admin/contact${q}`),
  contactItem:    (id)         => http('GET', `/admin/contact/${id}`),
  updateContactStatus:(id, s)  => http('PATCH', `/admin/contact/${id}/status`, { status: s }),
  deleteContact:  (id)         => http('DELETE', `/admin/contact/${id}`),

  // Users
  users:          ()           => http('GET', '/admin/users'),
  createUser:     (body)       => http('POST', '/admin/users', body),
  updateUser:     (id, body)   => http('PUT',  `/admin/users/${id}`, body),
  deleteUser:     (id)         => http('DELETE', `/admin/users/${id}`),
  resetUserPw:    (id, body)   => http('POST', `/admin/users/${id}/reset-password`, body),
  updatePerms:    (id, body)   => http('PATCH', `/admin/users/${id}/permissions`, body),
};

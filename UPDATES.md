# Tilak Global School — Session Updates Log

> **Date:** October 2026  
> **Developer:** Dishant Saini — Code Craft IT Solution  
> **Repos:**
> - Frontend + Admin: `Tilak-Global-School-Frontend` (GitHub)
> - Backend API: `Tilak-Global-School-Backend` (GitHub)

---

## Overview

Is session mein ye kaam hua:

1. Backend ka complete audit aur 8 bugs fix
2. Admin panel ke hardcoded localhost URLs fix
3. Public site ke saare forms real API se connect
4. 3 naye pages (Downloads, News & Events, Gallery) live data ke saath
5. Production CORS, cookie, aur deployment issues fix
6. `NEXT_PUBLIC_` prefix poori codebase se remove
7. Both repos GitHub par push

---

## PART 1 — Backend Audit & Fixes

**Repo:** `Tilak-Global-School-Backend`  
**Commit:** `9af2ab5`

### Bug 1 — `app.js`: ES Module `__dirname` missing
**Problem:** `path` import tha lekin `__dirname` defined nahi tha — ES modules mein `__dirname` automatically nahi milta. Isse `/uploads` static files serve nahi ho raha tha.  
**Fix:** `fileURLToPath` + `path.dirname` se `__dirname` banaya.

```js
// Before (broken)
app.use('/uploads', express.static(UPLOAD_DIR, ...));
// __dirname was undefined in ES module — ENOTEMPTY error

// After (fixed)
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
```

---

### Bug 2 — `app.js`: CORS incomplete
**Problem:** Sirf `CLIENT_URL` env se origins read ho rahi thi. Vercel preview deployments (`*.vercel.app`) block ho rahi thi. `Cookie` aur `Set-Cookie` headers allowed nahi the.  
**Fix:** Hardcoded explicit origins list + wildcard for Vercel previews + proper headers.

```js
const ALLOWED_ORIGINS = [
  'https://tilakglobalschool.com',
  'https://www.tilakglobalschool.com',
  'https://admin-portal.tilakglobalschool.com',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    if (origin.endsWith('.vercel.app')) return callback(null, true); // NEW
    return callback(new Error('CORS blocked'));
  },
  credentials:    true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Cookie added
  exposedHeaders: ['Set-Cookie'],                               // NEW
}));
```

---

### Bug 3 — `env.js`: Missing exports + no production validation
**Problem:** `RENDER_URL` export missing tha. Production mein weak `JWT_SECRET` se server start ho sakta tha.  
**Fix:** `RENDER_URL` add kiya + fail-fast validation for production.

```js
export const RENDER_URL = process.env.RENDER_URL || 'https://api.tilakglobalschool.com';

// Production validation — fail fast
if (isProd) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'dev_secret_change_in_production') {
    throw new Error('JWT_SECRET must be set to a strong secret in production.');
  }
}
```

---

### Bug 4 — `server.js`: Upload subdirectories not created
**Problem:** Multer `gallery/`, `news/`, `documents/`, `media/` subdirectories expect karta tha ki ye exist kare — Render pe fresh deploy mein ENOENT error aata tha pehle upload par.  
**Fix:** Server start pe sab directories auto-create.

```js
const UPLOAD_SUBDIRS = ['gallery', 'news', 'documents', 'media'];
for (const dir of UPLOAD_SUBDIRS) {
  const full = path.join(UPLOAD_DIR, dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
}
```

**Saath mein:** Graceful shutdown (SIGTERM/SIGINT) aur keep-alive ping (Render free tier ke liye).

---

### Bug 5 — `jwt.js`: Cookie cross-origin mein kaam nahi kar raha tha
**Problem:** `sameSite: 'strict'` set tha — lekin Vercel frontend aur Render backend alag domains pe hain. Cross-origin requests mein strict cookies browser silently drop kar deta hai. `clearTokenCookie` empty cookie set kar raha tha instead of `res.clearCookie()`.  
**Fix:** Production mein `sameSite: 'none'` + `secure: true` (dono saath chahiye). Dev mein `sameSite: 'lax'`. `name` field bhi payload mein add kiya (activityLogger ko chahiye tha).

```js
// Before (broken for cross-origin)
sameSite: 'strict'

// After (correct)
sameSite: isProd ? 'none' : 'lax',
secure:   isProd,   // 'none' requires secure:true — browser rejects otherwise

// Also fixed clearCookie
res.clearCookie(COOKIE_NAME, getCookieOptions()); // was: res.cookie(..., maxAge: 0)
```

---

### Bug 6 — `auth.controller.js`: `logActivity` mein `name` missing
**Problem:** JWT payload mein `name` field nahi tha. `logActivity({ admin: req.admin })` call karte waqt `adminName` blank aa raha tha activity log mein.  
**Fix:** `buildPayload()` mein `name` add kiya. Auth controller mein explicit `{ id, email, name }` pass kiya.

---

### Bug 7 — `settings.controller.js`: Wrong file path for old image deletion
**Problem:** Purani logo/favicon/director photo delete karte waqt path galat bana raha tha:
```js
// Before (wrong — path with double /uploads/)
path.join(UPLOAD_DIR, '..', oldUrl)  // UPLOAD_DIR = /app/uploads, oldUrl = /uploads/media/x.jpg
// Result: /app/uploads/../uploads/media/x.jpg = /app/uploads/media/x.jpg (accidentally works)
// But on Render: /app/uploads/../uploads = /app/uploads which is correct by luck only
```
**Fix:** Clean path calculation:
```js
const relativeFile = oldUrl.replace(/^\/uploads\//, '');
const absPath = path.join(UPLOAD_DIR, relativeFile);
```

---

### Bug 8 — `seed.js`: Wrong email domain + missing counter + deprecation warning
**Problems:**
- Default email `admin@tilakglobalschool.in` — production uses `.com`
- `applicationId` counter document never seeded — first application would fail
- Mongoose `new: true` deprecated (should be `returnDocument: 'after'`)

**Fix:** All three corrected.

---

## PART 2 — Admin Panel: Hardcoded localhost URLs Removed

**Repo:** `Tilak-Global-School-Frontend`  
**Commit:** `a9f7766`

### gallery/page.jsx

```js
// Before (broken in production)
const IMG_BASE = 'http://localhost:5000';
<img src={`${IMG_BASE}${img.imageUrl}`} />

// After (environment-aware)
function getFileBase() {
  if (typeof window !== 'undefined') return ''; // browser: Vercel proxy handles it
  return process.env.API_URL?.replace('/api', '') || 'https://api.tilakglobalschool.com';
}
<img src={`${getFileBase()}${img.imageUrl}`} />
```

### documents/page.jsx

Same fix — `DOC_BASE = 'http://localhost:5000'` replaced with `getFileBase()`.

### settings/page.jsx

```js
// Added helper
function fileUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = typeof window !== 'undefined' ? '' : '...';
  return `${base}${path}`;
}

// Fixed all 3 image tags
<img src={fileUrl(form.logoUrl)} />
<img src={fileUrl(form.faviconUrl)} />
<img src={fileUrl(form.directorPhotoUrl)} />
```

---

## PART 3 — Public Site: Forms Wired to Real API

**Repo:** `Tilak-Global-School-Frontend`  
**Commit:** `a9f7766`

### AdmissionEnquiryForm.jsx (Quick 3-field form)

**Before:** Frontend-only — showed static demo message, no data saved anywhere.  
**After:** Real `POST /api/applications` call.

- Phone validation: Indian format `/^(\+91)?[6-9]\d{9}$/`
- Success state: shows applicationId (e.g. `APP-0005`)
- Error handling: 429 → "Too many submissions", 500 → server message
- Loading spinner on submit button

### OnlineAdmissionForm.jsx (4-step full application)

**Before:** Frontend-only demo.  
**After:** Real `POST /api/applications` with all fields.

- All 4 steps validate before submit
- Submits: studentName, dateOfBirth, gender, classApplying, parentName, phone, email, address, previousSchool, message
- Success: shows applicationId + student name + parent mobile
- Error: 429 / server error with toast

### contact-us/page.jsx (Complete rewrite)

**Before:** Static heading + subtext only — no form.  
**After:** Full contact page with:

- Contact info cards (address, phone, email, office hours from `siteConfig`)
- WhatsApp enquiry button
- Full form: name, email, phone, subject, message
- Validation, loading state, success/error toasts
- Real `POST /api/contact` submission

---

## PART 4 — Public Site: New Pages with Live API Data

**Repo:** `Tilak-Global-School-Frontend`  
**Commit:** `cf8a780`

### downloads/page.jsx (New — was stub)

- Fetches `GET /api/documents?status=published&limit=100`
- Groups by category (Disclosure, Notice, Academic, Policy, etc.)
- Shows file type badge, file size, issue date
- Download icon + external link to file
- Graceful fallback if API unavailable

### news-events/page.jsx (New — was stub)

- Fetches `GET /api/news?limit=24&status=published`
- Card grid with featured image, category badge, date, featured star
- "Read more" link to individual post

### news-events/[slug]/page.jsx (New route)

- Dynamic route for individual news posts
- `generateMetadata()` for SEO title/description
- Fetches `GET /api/news/:slug`
- Returns 404 if post not found

### gallery/page.jsx (New — was stub)

- Fetches `GET /api/gallery` with server-side category filter
- Category filter tabs as links (no client state, URL-based)
- Masonry column layout with hover caption reveal
- Category badge on each image

### FeeStructureSection.jsx (Updated)

**Before:** Showed only static placeholder data from `data/admissions.js`.  
**After:** Async server component — fetches `GET /api/fees`.

- Live fee amounts formatted as `₹ XX,XXX`
- Falls back to static placeholders if no data seeded yet
- Notes field shown below charges

### AdmissionsFaqSection.jsx + AdmissionsFaqWrapper.jsx (Updated)

- New server wrapper `AdmissionsFaqWrapper.jsx` fetches `GET /api/faqs`
- Passes data to existing client accordion component via prop
- Falls back to static FAQ data if API empty
- Admissions page now uses wrapper instead of direct client component

### ToasterProvider.jsx + (user)/layout.jsx (New)

- `ToasterProvider` — client wrapper for `react-hot-toast` `<Toaster>`
- Added to user layout so all public pages get toast notifications
- Forms no longer need their own `<Toaster>` instance

---

## PART 5 — API URL Strategy (No NEXT_PUBLIC_)

**Commits:** `1c8e6f2`, `8b0c2c3`

### Secure URL Strategy

```
Server-side (Server Components, generateMetadata):
  → process.env.API_URL (private, full backend URL)
  → Set in Vercel dashboard: API_URL = https://api.tilakglobalschool.com/api
  → Never reaches browser bundle

Client-side ("use client" components, browser):
  → '/api' (relative URL)
  → Vercel rewrites /api/* → https://api.tilakglobalschool.com/api/*
  → No env variable needed in browser
```

**Files created in both apps:**
- `src/lib/apiUrl.js` — `getApiBase()` function
- Inline `fetchWithRetry` in `api.js` and `adminApi.js`

### vercel.json (Both apps)

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://api.tilakglobalschool.com/api/$1" }
  ]
}
```

---

## Current Production Setup

### Vercel Environment Variables to Set

| Project | Variable | Value |
|---|---|---|
| Public site | `API_URL` | `https://api.tilakglobalschool.com/api` |
| Admin panel | `API_URL` | `https://api.tilakglobalschool.com/api` |

### Render Environment Variables to Set

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGO_URI` | `mongodb+srv://...` (Atlas) |
| `JWT_SECRET` | (strong random string — min 32 chars) |
| `JWT_EXPIRES_IN` | `7d` |
| `CLIENT_URL` | `https://tilakglobalschool.com,https://admin-portal.tilakglobalschool.com` |
| `COOKIE_DOMAIN` | `.tilakglobalschool.com` |
| `RENDER_URL` | `https://api.tilakglobalschool.com` |
| `UPLOAD_DIR` | `uploads` |
| `MAX_FILE_SIZE_MB` | `10` |
| `ADMIN_EMAIL` | `admin@tilakglobalschool.com` |
| `ADMIN_PASSWORD` | (strong password — change after first login) |

---

## Admin Panel Login

| Field | Value |
|---|---|
| URL | `https://admin-portal.tilakglobalschool.com/login` |
| Email | `admin@tilakglobalschool.com` |
| Password | `ChangeMe123!` ← **change after first login** |

---

## What Is Working Now

### Backend ✅
- Server starts, MongoDB connects, uploads dirs auto-created
- `GET /api/health` returns `{ success, db, env, uptime, timestamp }`
- `POST /api/auth/login` sets JWT httpOnly cookie (cross-origin ready)
- All 13 admin routes protected by JWT auth
- All 10 public read routes working
- Rate limiting on all `/api` routes
- File uploads (gallery, documents, settings media) work

### Admin Panel ✅
- Login, logout, session persistence
- Dashboard: stats, trend chart, class chart, activity log
- Admissions: full table, search, filters, status update, detail view, delete
- Gallery: upload photos, edit, delete
- News: create/edit/delete, publish/unpublish, set featured
- Documents: upload files, manage, delete
- Fees: edit fee amounts per class group
- FAQs: create/edit/delete/reorder
- Content (CMS): edit/draft/publish content blocks
- Settings: all school info, logo/favicon/director photo upload
- Users: create/edit/permissions/reset password/deactivate
- Contact: view enquiries, mark read/replied, delete
- All image/file URLs environment-aware (no localhost hardcoding)

### Public Site ✅
- Home page (static data, all sections)
- About, Academics (static data)
- Admissions: fee table from API, FAQs from API, forms POST to API
- Gallery: live photos from API with category filter
- News & Events: live posts + individual post pages
- Downloads: live documents grouped by category
- Contact: full form POSTs to `/api/contact`
- `/admin` returns hard 404 (admin is on separate subdomain)

### What Is NOT Yet Done ❌

| Item | Notes |
|---|---|
| Home page live API data | Hero, director message, stats still from `data/home.js` static file |
| About page live data | Still uses `data/about.js` static file |
| Academics page live data | Still uses `data/academics.js` static file |
| Email notifications | Out of scope (Phase 2) |
| CSV export for applications | Not implemented |
| Sitemap / robots.txt | Not done |
| Production deployment | Pending domain + VPS setup |
| Admin change-password UI | API exists, no UI page yet |

---

## File Changes This Session (Summary)

### Backend (9 files)
```
src/app.js                    CORS + __dirname fix
src/config/env.js             RENDER_URL + prod validation
src/server.js                 Upload dirs + graceful shutdown + keep-alive
src/utils/jwt.js              sameSite:none + clearCookie fix + name in payload
src/middleware/auth.middleware.js  Bearer header fallback + JSON errors
src/controllers/auth.controller.js  Pass name to logActivity
src/controllers/settings.controller.js  Fix file deletion path
src/utils/activityLogger.js   Support _id + id both
src/seed/seed.js              .com email + seedCounter + returnDocument fix
```

### Frontend / Admin (17 files)
```
admin/src/app/gallery/page.jsx         getFileBase() replaces localhost
admin/src/app/documents/page.jsx       getFileBase() replaces localhost
admin/src/app/settings/page.jsx        fileUrl() helper for all 3 image tags

frontend/src/app/(user)/contact-us/page.jsx         Full form + API
frontend/src/app/(user)/downloads/page.jsx           Live API data
frontend/src/app/(user)/gallery/page.jsx             Live API data + category filter
frontend/src/app/(user)/news-events/page.jsx         Live API data
frontend/src/app/(user)/news-events/[slug]/page.jsx  NEW — individual post page
frontend/src/app/(user)/admissions/page.jsx          Uses AdmissionsFaqWrapper
frontend/src/app/(user)/layout.jsx                   Global ToasterProvider

frontend/src/components/admissions/AdmissionEnquiryForm.jsx   Real API
frontend/src/components/admissions/OnlineAdmissionForm.jsx    Real API
frontend/src/components/admissions/FeeStructureSection.jsx    Async + API
frontend/src/components/admissions/AdmissionsFaqSection.jsx   Accepts apiFaqs prop
frontend/src/components/admissions/AdmissionsFaqWrapper.jsx   NEW — server wrapper
frontend/src/components/ToasterProvider.jsx                   NEW — client wrapper
```

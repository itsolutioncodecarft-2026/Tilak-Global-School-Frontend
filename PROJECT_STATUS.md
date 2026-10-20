# Tilak Global School — Project Status Document

> **Last Updated:** October 2026  
> **Developer:** Dishant Saini — Code Craft IT Solution  
> **Teammate:** Kartik Maru (public site), Aman (admin panel)

---

## 1. Project Overview

CBSE English medium school website with a **public-facing site**, a **separate admin panel**, and a **REST API backend**.

| Layer | Tech | Port |
|---|---|---|
| Public Website | Next.js 15, React 19, Tailwind CSS v4 | `3000` |
| Admin Panel | Next.js 15, React 19, Tailwind CSS v4 | `3001` |
| Backend API | Express.js 5, Mongoose | `5000` |
| Database | MongoDB (local) | `27017` |

---

## 2. Folder Structure

```
tilak-global-school/                 ← Monorepo root
├── package.json                     ← Root scripts (concurrently)
├── .gitignore                       ← Root gitignore
├── PROJECT_BRIEF.md                 ← Client brief (source of truth)
├── PROJECT_STATUS.md                ← This file
├── README.md                        ← Setup instructions
│
├── frontend/                        ← Public website (port 3000)
│   ├── package.json
│   ├── next.config.mjs
│   ├── postcss.config.mjs
│   ├── jsconfig.json
│   ├── eslint.config.mjs
│   ├── .env.local                   ← git-ignored (copy from .env.example)
│   ├── .env.example
│   └── src/
│       ├── app/
│       │   ├── (user)/              ← All public pages (route group)
│       │   │   ├── page.jsx         ← Home
│       │   │   ├── about-us/
│       │   │   ├── academics/
│       │   │   ├── admissions/
│       │   │   ├── gallery/
│       │   │   ├── news-events/
│       │   │   ├── contact-us/
│       │   │   ├── downloads/
│       │   │   ├── careers/
│       │   │   └── privacy-policy/
│       │   ├── admin/
│       │   │   └── page.jsx         ← Hard 404 (admin is on port 3001)
│       │   ├── globals.css          ← Tailwind v4 + design tokens
│       │   ├── layout.jsx           ← Root HTML layout
│       │   └── not-found.jsx
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Header.jsx       ← Fixed nav, red utility bar, mobile menu
│       │   │   └── Footer.jsx
│       │   ├── home/                ← Homepage section components
│       │   ├── about/
│       │   ├── academics/
│       │   ├── admissions/
│       │   └── shared/
│       ├── data/                    ← Static data files (no API calls yet)
│       │   ├── siteConfig.js
│       │   ├── navigation.js
│       │   ├── home.js
│       │   ├── about.js
│       │   ├── academics.js
│       │   ├── admissions.js
│       │   ├── gallery.js
│       │   ├── newsEvents.js
│       │   └── contact.js
│       └── lib/
│           └── adminApi.js          ← Admin API client (unused in public site)
│
├── admin/                           ← Admin panel (port 3001) — standalone app
│   ├── package.json
│   ├── next.config.mjs              ← /api/* proxy → localhost:5000
│   ├── postcss.config.mjs
│   ├── jsconfig.json
│   ├── eslint.config.mjs
│   ├── .env.local                   ← git-ignored
│   ├── .env.example
│   └── src/
│       ├── app/
│       │   ├── layout.jsx           ← Root HTML + AuthProvider + AdminShell
│       │   ├── globals.css          ← Tailwind v4 + design tokens + dark mode
│       │   ├── AuthContext.jsx      ← JWT auth state, login/logout
│       │   ├── AdminShell.jsx       ← Layout shell, sidebar, auth guard
│       │   ├── page.jsx             ← Dashboard (charts, stats, activity)
│       │   ├── login/page.jsx
│       │   ├── admissions/page.jsx  ← Applications table, filters, status
│       │   ├── content/page.jsx     ← CMS blocks editor
│       │   ├── gallery/page.jsx     ← Photo upload + manage
│       │   ├── news/page.jsx        ← News/events CRUD
│       │   ├── documents/page.jsx   ← Document upload + manage
│       │   ├── fees/page.jsx        ← Fee structure table
│       │   ├── faqs/page.jsx        ← FAQ CRUD
│       │   ├── contact/page.jsx     ← Contact enquiries list
│       │   ├── settings/page.jsx    ← Site settings (full form)
│       │   ├── users/page.jsx       ← Admin users + permissions
│       │   └── components/
│       │       ├── Sidebar.jsx      ← Navy sidebar, collapse, permission filter
│       │       ├── TopBar.jsx       ← Breadcrumb, dark mode, notifications, profile
│       │       ├── AuthContext.jsx
│       │       ├── Badge.jsx
│       │       ├── Modal.jsx
│       │       ├── ConfirmDialog.jsx
│       │       ├── EmptyState.jsx
│       │       ├── PageHeader.jsx
│       │       ├── Spinner.jsx
│       │       └── StatCard.jsx
│       └── lib/
│           └── adminApi.js          ← Complete API client for all admin endpoints
│
├── backend/                         ← Express REST API (port 5000)
│   ├── package.json                 ← type: module (ES Modules)
│   ├── .env                         ← git-ignored (real values)
│   ├── .env.example                 ← committed template
│   └── src/
│       ├── server.js                ← MongoDB connect → listen
│       ├── app.js                   ← Express: middleware, routes, error handlers
│       ├── config/
│       │   ├── db.js
│       │   └── env.js               ← All env var exports
│       ├── models/
│       │   ├── AdminUser.model.js
│       │   ├── AdmissionApplication.model.js
│       │   ├── ActivityLog.model.js
│       │   ├── ContactEnquiry.model.js
│       │   ├── Content.model.js
│       │   ├── Counter.model.js
│       │   ├── Document.model.js
│       │   ├── Faq.model.js
│       │   ├── FeeRow.model.js
│       │   ├── GalleryImage.model.js
│       │   ├── NewsPost.model.js
│       │   └── SiteSettings.model.js
│       ├── routes/
│       │   ├── health.js
│       │   ├── auth.routes.js
│       │   ├── user.routes.js
│       │   ├── dashboard.routes.js
│       │   ├── application.routes.js  ← public + admin exports
│       │   ├── content.routes.js
│       │   ├── gallery.routes.js
│       │   ├── news.routes.js
│       │   ├── document.routes.js
│       │   ├── fee.routes.js
│       │   ├── faq.routes.js
│       │   ├── settings.routes.js
│       │   └── contact.routes.js
│       ├── controllers/             ← One file per route group
│       ├── middleware/
│       │   ├── auth.middleware.js   ← JWT cookie verify
│       │   ├── errorHandler.js
│       │   ├── notFound.js
│       │   ├── rateLimiter.middleware.js
│       │   └── upload.middleware.js ← multer config
│       ├── validators/              ← Zod schemas
│       ├── seed/
│       │   ├── seed.js              ← Admin user + settings + fees + FAQs
│       │   └── contentSeed.js
│       └── utils/
│           ├── asyncHandler.js
│           ├── response.js
│           ├── jwt.js               ← Sign token, set/clear httpOnly cookie
│           └── activityLogger.js
│
└── nginx/
    └── tilakglobalschool.conf       ← Production Nginx config (subdomain routing)
```

---

## 3. How to Run (Development)

### Prerequisites
- Node.js LTS (v20+)
- MongoDB Community Server running on `localhost:27017`
- MongoDB Compass (optional, for viewing data)

### Option A — All at once (from root)
```bash
npm install          # installs concurrently at root
npm run dev          # starts all 3 servers simultaneously
```

### Option B — Individually (3 separate terminals)
```bash
# Terminal 1 — Backend
cd backend
npm install
npm run dev          # http://localhost:5000

# Terminal 2 — Public Site
cd frontend
npm install
npm run dev          # http://localhost:3000

# Terminal 3 — Admin Panel
cd admin
npm install
npm run dev          # http://localhost:3001
```

### First-time seed (run once after backend starts)
```bash
cd backend
npm run seed         # creates admin user + default data
```

### Admin login credentials
| Field | Value |
|---|---|
| URL | http://localhost:3001/login |
| Email | `admin@tilakglobalschool.in` |
| Password | `ChangeMe123!` |

---

## 4. Environment Variables

### `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tilak_school
NODE_ENV=development
JWT_SECRET=tilak_school_dev_secret_change_before_production
JWT_EXPIRES_IN=7d
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=10
CLIENT_URL=http://localhost:3000,http://localhost:3001
COOKIE_DOMAIN=
# Production:
# CLIENT_URL=https://tilakglobalschool.in,https://admin-portal.tilakglobalschool.in
# COOKIE_DOMAIN=.tilakglobalschool.in
```

### `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### `admin/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
NEXT_PUBLIC_PUBLIC_URL=http://localhost:3000
```

---

## 5. API Routes (Backend — prefix `/api`)

### Public Routes (no auth)
| Method | Path | Description |
|---|---|---|
| GET | `/health` | Health check + DB status |
| POST | `/auth/login` | Admin login → sets httpOnly cookie |
| GET | `/content/:page` | Published content blocks |
| GET | `/settings` | Site settings (contact, banner, director) |
| GET | `/news` | Published news/events |
| GET | `/news/:slug` | Single news post |
| GET | `/gallery` | Published gallery images |
| GET | `/documents` | Published documents |
| GET | `/fees` | Fee structure table |
| GET | `/faqs` | Published FAQs |
| POST | `/applications` | Submit admission enquiry (rate-limited) |
| POST | `/contact` | Submit contact form (rate-limited) |

### Protected Admin Routes (JWT cookie required)
| Method | Path | Description |
|---|---|---|
| GET | `/auth/me` | Current user profile |
| POST | `/auth/logout` | Clear cookie |
| POST | `/auth/change-password` | Change password |
| GET | `/admin/dashboard/stats` | Total, by-status, by-source counts |
| GET | `/admin/dashboard/stats/trend` | 30-day trend data |
| GET | `/admin/dashboard/stats/by-class` | Enquiries by class |
| GET | `/admin/dashboard/activity` | Recent activity log |
| CRUD | `/admin/applications` | Admission applications |
| PATCH | `/admin/applications/:id/status` | Approve/reject/info-request |
| CRUD | `/admin/content` | Content blocks (CMS) |
| CRUD | `/admin/gallery` | Gallery images |
| CRUD | `/admin/news` | News & events |
| CRUD | `/admin/documents` | Documents |
| CRUD | `/admin/fees` | Fee structure rows |
| CRUD | `/admin/faqs` | FAQs |
| GET/PUT | `/admin/settings` | Site settings |
| POST | `/admin/settings/logo` | Upload logo |
| POST | `/admin/settings/favicon` | Upload favicon |
| POST | `/admin/settings/director-photo` | Upload director photo |
| CRUD | `/admin/users` | Admin user management |
| PATCH | `/admin/users/:id/permissions` | Update permissions |
| POST | `/admin/users/:id/reset-password` | Reset user password |
| CRUD | `/admin/contact` | Contact enquiries |

---

## 6. Data Flow

```
Browser (localhost:3000)          Browser (localhost:3001)
  Public Website                    Admin Panel
       │                                 │
       │ fetch('/api/...')               │ fetch('/api/...')
       │ (Next.js rewrite proxy)        │ (Next.js rewrite proxy)
       ▼                                 ▼
  localhost:3000/api/*  ──────►  localhost:5000/api/*
  localhost:3001/api/*  ──────►  localhost:5000/api/*
                                         │
                                   Express.js API
                                         │
                            ┌────────────┴────────────┐
                            │                         │
                      JWT middleware            Public routes
                      (httpOnly cookie)         (no auth)
                            │                         │
                     Admin controllers          Public controllers
                            │                         │
                            └────────────┬────────────┘
                                         │
                                    MongoDB Atlas
                                 (localhost:27017)
                                  tilak_school DB
```

### Authentication Flow
1. Admin visits `localhost:3001/login`
2. Submits email + password → `POST /api/auth/login`
3. Backend verifies bcrypt hash → signs JWT → sets `adminToken` httpOnly cookie
4. Every subsequent admin request sends the cookie automatically
5. Backend `auth.middleware.js` verifies JWT on every `/api/admin/*` route
6. On logout → `POST /api/auth/logout` → cookie cleared

---

## 7. Database Models (MongoDB)

| Model | Collection | Key Fields |
|---|---|---|
| `AdminUser` | `adminusers` | name, email, passwordHash, role, permissions, isActive |
| `AdmissionApplication` | `admissionapplications` | applicationId (APP-0001), studentName, classApplying, status, statusHistory |
| `SiteSettings` | `sitesettings` | schoolName, phone, email, address, directorName, admissionSession (singleton) |
| `Content` | `contents` | key (e.g. `home.hero.title`), value, page, status (draft/published) |
| `NewsPost` | `newsposts` | title, slug, category, date, body, isFeatured, status |
| `GalleryImage` | `galleryimages` | imageUrl, caption, category, order, status |
| `Document` | `documents` | title, category, fileUrl, fileType, date, status |
| `FeeRow` | `feerows` | classGroup, admissionFee, tuitionFee, otherCharges |
| `Faq` | `faqs` | question, answer, order, status |
| `ContactEnquiry` | `contactenquiries` | name, phone, email, message, status |
| `ActivityLog` | `activitylogs` | admin, action, module, detail, createdAt |
| `Counter` | `counters` | Used for auto-increment applicationId (APP-0001) |

---

## 8. Design System

### Design Tokens (Tailwind CSS v4 `@theme`)
| Token | Color | Usage |
|---|---|---|
| `navy` | `#0F2A5C` | Headers, nav, primary buttons |
| `navy-2` | `#1B3C7A` | Hover states, gradients |
| `blue` | `#3E7BC4` | Accents |
| `sky` | `#E8F1FB` | Light backgrounds |
| `sky-2` | `#CFE2F6` | Input borders |
| `gold` | `#C9A24A` | CTA buttons, highlights |
| `gold-2` | `#F6EBCB` | Tags, notes |
| `ink` | `#1F2A44` | Body text |
| `muted` | `#5B6785` | Secondary text |
| `line` | `#E3E9F2` | Borders |
| `success` | `#2E8B57` | Status badge |
| `warning` | `#D98A1F` | Status badge |
| `danger` | `#C0392B` | Status badge |

### Fonts
- **Headings:** Lora (serif) — Google Fonts
- **Body:** Poppins — Google Fonts

---

## 9. Subdomain Architecture

### Development
| App | URL |
|---|---|
| Public site | `http://localhost:3000` |
| Admin panel | `http://localhost:3001` |
| Backend API | `http://localhost:5000` |

### Production (after domain purchase)
| App | Domain |
|---|---|
| Public site | `https://tilakglobalschool.in` |
| Admin panel | `https://admin-portal.tilakglobalschool.in` |
| Backend API | Internal only (proxied through Nginx) |

### Security Isolation
- `/admin` on the public site (port 3000) returns **hard 404** — admin is completely inaccessible via the public domain
- Admin cookies are scoped to `COOKIE_DOMAIN=.tilakglobalschool.in` in production
- CORS allows only both origins explicitly — no wildcard
- Admin panel has `robots: noindex, nofollow` meta tag

---

## 10. Git Repository Structure

| Repo | GitHub | Contains |
|---|---|---|
| Frontend + Admin + Root | `Tilak-Global-School-Frontend.git` | `frontend/`, `admin/`, `nginx/`, root config files |
| Backend | `Tilak-Global-School-Backend.git` | `backend/` folder only |

The `backend/` folder has its own independent git repo. Root `.gitignore` excludes it.

---

## 11. ✅ What Is Working

### Backend
- ✅ Express server starts on port 5000
- ✅ MongoDB connects successfully (local)
- ✅ `GET /api/health` returns `{ success: true, db: "connected" }`
- ✅ `POST /api/auth/login` — JWT auth, httpOnly cookie, bcrypt verification
- ✅ `GET /api/auth/me` — returns current user from JWT
- ✅ `POST /api/auth/logout` — clears cookie
- ✅ All admin CRUD routes registered and protected by auth middleware
- ✅ All public read routes registered
- ✅ Rate limiting on `/api` globally
- ✅ File upload middleware (multer) configured
- ✅ CORS allows both `localhost:3000` and `localhost:3001`
- ✅ Activity logging on auth events
- ✅ Seed script creates admin user + default fee rows + FAQs

### Admin Panel (port 3001)
- ✅ Runs as completely separate Next.js app on port 3001
- ✅ Login page — email/password form, error handling
- ✅ JWT cookie auth — persists across page refresh
- ✅ Auth guard — unauthenticated users redirected to `/login`
- ✅ Sidebar navigation with permission-based visibility
- ✅ Sidebar collapse/expand
- ✅ Dark mode toggle (persists in localStorage)
- ✅ TopBar — breadcrumb, notifications, profile dropdown, logout
- ✅ Dashboard page — stat cards (recharts: donut, bar, line charts)
- ✅ Admissions page — table, search, filters, status update modal, detail modal
- ✅ Gallery page — photo grid, upload modal, edit/delete
- ✅ News page — list, create/edit modal, publish/unpublish/feature
- ✅ Documents page — upload, manage
- ✅ Fees page — fee structure table edit
- ✅ FAQs page — CRUD
- ✅ Contact page — enquiries list
- ✅ Settings page — full school settings form with file uploads
- ✅ Users page — create, edit, permissions matrix, reset password, deactivate
- ✅ All routes use correct paths (no `/admin` prefix)
- ✅ `@/*` import alias resolves correctly via jsconfig.json
- ✅ Builds clean (`next build` — no errors)

### Public Site (port 3000)
- ✅ Runs on port 3000
- ✅ Header — fixed nav, red utility bar, mobile hamburger menu, dropdown submenus
- ✅ Footer
- ✅ Home page — Hero, Stats bar, Welcome, Academic Stages, Director Message, Facilities, Why Choose Us, News preview, Gallery preview, FAQ, CTA banner
- ✅ About Us page — structure in place
- ✅ Academics page — structure in place
- ✅ Admissions page — structure in place
- ✅ Gallery, News & Events, Contact Us, Downloads pages — structure in place
- ✅ `/admin` route returns hard 404 (cannot access admin via public domain)
- ✅ Tailwind CSS v4 with design tokens
- ✅ Responsive design (mobile → desktop)
- ✅ Builds clean (`next build`)

---

## 12. ❌ What Is NOT Yet Working / Pending

### Public Site — Data Not Connected to Backend
- ❌ All public pages use **static data files** (`src/data/*.js`) — not live from backend API
- ❌ Home page content (hero text, director message, stats) is hardcoded
- ❌ Gallery page shows static placeholder data — not fetching from `/api/gallery`
- ❌ News & Events shows static data — not fetching from `/api/news`
- ❌ Contact form does not submit to `/api/contact`
- ❌ Admission enquiry form does not submit to `/api/applications`
- ❌ Fee structure is hardcoded — not fetching from `/api/fees`
- ❌ FAQs are hardcoded — not fetching from `/api/faqs`
- ❌ Downloads page shows static data — not fetching from `/api/documents`

### Admin Panel — Functionality Gaps
- ❌ Dashboard charts show data only if backend `/admin/dashboard/*` routes are implemented and seeded — needs testing
- ❌ Content page (CMS) — UI exists but the `Content` model needs data to be seeded to show blocks
- ❌ Image upload in Gallery actually sends to backend — needs `uploads/` folder to exist in backend
- ❌ Settings logo/favicon/director photo upload — needs backend upload endpoint working
- ❌ Change password flow — UI not fully wired (no dedicated settings page section for it)
- ❌ Pagination is UI-only in some pages — backend responses need correct `meta` shape

### Backend — Not Yet Implemented / Untested
- ❌ `uploads/` directory not created — multer will fail on first file upload
- ❌ `contentSeed.js` — content seed not run yet (CMS has no default blocks)
- ❌ Dashboard stats routes not confirmed working with real data
- ❌ CSV export for applications — not implemented
- ❌ Email notifications (enquiry confirmations) — not in scope yet
- ❌ Password reset via email — not implemented

### Infrastructure / Deployment
- ❌ Production deployment not done — no VPS/domain yet
- ❌ Nginx config exists (`nginx/tilakglobalschool.conf`) but not deployed
- ❌ SSL certificates (Let's Encrypt) not set up
- ❌ PM2 / process manager not configured for production
- ❌ Domain DNS not pointed to server

---

## 13. Next Steps (Recommended Order)

```
Step 1 ── Create backend/uploads/ folder
Step 2 ── Run: npm run seed:all  (seed admin + content blocks)
Step 3 ── Test all admin panel pages against live backend
Step 4 ── Connect public site pages to backend APIs one by one:
           Home → /api/settings + /api/news + /api/gallery
           Gallery → /api/gallery
           News → /api/news
           Admissions → /api/fees + /api/faqs + POST /api/applications
           Contact → POST /api/contact
           Downloads → /api/documents
Step 5 ── Add real school content via admin panel
Step 6 ── Replace all placeholder data with real school data
Step 7 ── Test complete flow: public form → admin table → status update
Step 8 ── Deploy to VPS: backend (PM2) + frontend build + admin build
Step 9 ── Set up Nginx + Let's Encrypt SSL
Step 10 ─ Handover + training
```

---

## 14. Known Issues / Bugs

| # | Issue | Severity | Where |
|---|---|---|---|
| 1 | `uploads/` folder missing in backend — file uploads will fail | High | Backend |
| 2 | Content blocks not seeded — CMS page will show empty | Medium | Admin |
| 3 | Public site data is all static — not connected to API | High | Frontend |
| 4 | ESLint version conflict (eslint-plugin-react vs es-abstract) — build works, lint may show warnings | Low | Frontend/Admin |
| 5 | recharts v2 used (not v3) — v3 had broken es-toolkit dependency | Info | Admin |

---

## 15. Tech Stack Summary

| Layer | Package | Version |
|---|---|---|
| Frontend framework | Next.js | 15.4.0 |
| Admin framework | Next.js | 15.5.28 |
| UI library | React | 19.0.0 |
| Styling | Tailwind CSS | v4 |
| Icons | lucide-react | 1.58.0 |
| Charts (admin) | recharts | 2.15.0 |
| Toasts | react-hot-toast | 2.6.1 |
| Backend framework | Express | 5.x |
| ODM | Mongoose | 9.x |
| Auth | jsonwebtoken + bcryptjs | — |
| File upload | multer | 2.x |
| Validation | zod | 4.x |
| Security | helmet, cors, express-rate-limit | — |
| Dev server | nodemon | 3.x |
| Monorepo scripts | concurrently | 9.x |

---

## 16. Contact / Support

| Person | Role |
|---|---|
| Dishant Saini | Lead Developer, Code Craft IT Solution |
| Kartik Maru | Teammate (public site) |
| Aman | Teammate (admin panel) |

> **Client:** Tilak Global School, Bindayaka, Mukandpura Road, Jaipur, Rajasthan  
> **Support period:** 6 months post go-live (free). After: ₹2,500/month optional.

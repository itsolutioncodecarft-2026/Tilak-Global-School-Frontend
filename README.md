# Tilak Global School — Website & Admin Panel

> CBSE English Medium School | Nursery to XII | Bindayaka, Mukandpura Road, Jaipur, Rajasthan  
> Developed by **Code Craft IT Solution** — Dishant Saini & Team

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Public Website | Next.js (App Router) | 15.x |
| Admin Panel | Next.js (App Router) | 15.x |
| UI Framework | React | 19.x |
| Styling | Tailwind CSS | v4 |
| Icons | Lucide React | latest |
| Charts (admin) | Recharts | 2.x |
| Backend | Express.js | 5.x |
| Database | MongoDB + Mongoose | 9.x |
| Auth | JWT + bcrypt (httpOnly cookies) | — |
| File Upload | Multer | 2.x |
| Validation | Zod | 4.x |
| Dev tools | Concurrently, Nodemon | — |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCTION                               │
│                                                                 │
│  tilakglobalschool.in          admin-portal.tilakglobalschool.in│
│  (Vercel — frontend/)          (Vercel — admin/)                │
│         │                               │                       │
│         └──── /api/* rewrite ───────────┘                       │
│                       │                                         │
│              api.tilakglobalschool.in                           │
│              (Railway — backend/)                               │
│                       │                                         │
│              MongoDB Atlas / Railway DB                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       DEVELOPMENT                               │
│                                                                 │
│  localhost:3000 (frontend)     localhost:3001 (admin)           │
│         │                               │                       │
│         └──── /api/* rewrite ───────────┘                       │
│                       │                                         │
│              localhost:5000 (backend)                           │
│                       │                                         │
│              localhost:27017 (MongoDB local)                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

- **Node.js** LTS v20 or higher — https://nodejs.org
- **MongoDB Community Server** running on `localhost:27017` — https://www.mongodb.com/try/download/community
- **Git** — https://git-scm.com

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/itsolutioncodecarft-2026/Tilak-Global-School-Frontend.git
cd Tilak-Global-School-Frontend

# 2. Install root dependencies (concurrently)
npm install

# 3. Set up frontend env
cd frontend
cp .env.example .env.local
cd ..

# 4. Set up admin env
cd admin
cp .env.example .env.local
cd ..

# 5. Install app dependencies
cd frontend && npm install && cd ..
cd admin    && npm install && cd ..

# 6. Start both apps (2 terminals)
npm run dev             # starts frontend (3000) + admin (3001)
# OR individually:
npm run dev:frontend    # only frontend
npm run dev:admin       # only admin
```

> **Backend** is in a separate repo: `Tilak-Global-School-Backend`  
> Clone and start it separately before running the frontend apps.

```bash
# Backend (separate terminal)
cd backend
cp .env.example .env
npm install
npm run seed    # run ONCE to create admin user + seed data
npm run dev     # starts on http://localhost:5000
```

**Admin login** (after running seed):
| Field | Value |
|---|---|
| URL | http://localhost:3001/login |
| Email | `admin@tilakglobalschool.in` |
| Password | `ChangeMe123!` |

---

## Folder Structure

```
tilak-global-school/
├── package.json          ← Root dev scripts (concurrently)
├── .gitignore
├── README.md
├── PROJECT_STATUS.md     ← Full project status & what's working
├── PROJECT_BRIEF.md      ← Client requirements (source of truth)
│
├── frontend/             ← Public website → tilakglobalschool.in
│   ├── package.json
│   ├── next.config.mjs   ← API rewrites (dev + prod)
│   ├── vercel.json       ← Vercel deployment config
│   ├── .env.example      ← Copy to .env.local
│   └── src/
│       ├── app/(user)/   ← All public pages
│       ├── components/   ← UI components
│       ├── data/         ← Static data (will be replaced by API)
│       └── lib/api.js    ← Public API client
│
├── admin/                ← Admin panel → admin-portal.tilakglobalschool.in
│   ├── package.json
│   ├── next.config.mjs
│   ├── vercel.json
│   ├── .env.example
│   └── src/
│       ├── app/          ← All admin pages (dashboard, admissions, etc.)
│       └── lib/adminApi.js ← Admin API client
│
├── nginx/
│   └── tilakglobalschool.conf  ← Production Nginx config (VPS option)
│
└── backend/              ← ⛔ SEPARATE REPO — not tracked here
```

---

## Available Scripts

Run from the **project root**:

| Script | Description |
|---|---|
| `npm run dev` | Start frontend (3000) + admin (3001) |
| `npm run dev:all` | Start frontend + admin + backend |
| `npm run dev:frontend` | Start only public site |
| `npm run dev:admin` | Start only admin panel |
| `npm run build` | Build both apps for production |
| `npm run build:frontend` | Build public site only |
| `npm run build:admin` | Build admin panel only |
| `npm run start:frontend` | Start built public site |
| `npm run start:admin` | Start built admin panel |

---

## Environment Variables

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

> **On Vercel (production):**  
> Set `NEXT_PUBLIC_API_URL` to `/api` — Vercel rewrites handle routing to Railway.

---

## Team Workflow Rules

> ⚠️ **Everyone must follow these rules — no exceptions.**

### Branch Strategy
```
main          ← production-ready code only
dev           ← integration branch (merge features here first)
feature/xxx   ← individual feature branches
fix/xxx       ← bug fix branches
```

### Daily Workflow
```bash
# Before starting ANY work:
git checkout dev
git pull origin dev

# Create your feature branch:
git checkout -b feature/your-feature-name

# Work, commit often:
git add .
git commit -m "feat: description of what you did"

# Push and open PR:
git push origin feature/your-feature-name
# → Open PR on GitHub: feature/xxx → dev
```

### Rules

| Rule | Detail |
|---|---|
| ❌ NEVER push to `main` directly | Only PRs after review |
| ❌ NEVER commit `.env.local` | Contains secrets |
| ❌ NEVER commit `node_modules/` | Auto-installed via `npm install` |
| ✅ ALWAYS pull before starting work | Avoid merge conflicts |
| ✅ ALWAYS commit `.env.example` | Safe template for teammates |

### Who Works Where
| Person | Folder |
|---|---|
| **Kartik** | `frontend/src/` — public website pages |
| **Aman** | `admin/src/` — admin panel pages |
| **Dishant** | Root config, backend, deployment |

### Commit Message Format
```
feat: add gallery page
fix: correct admin login redirect
chore: update dependencies
docs: update README
style: fix header spacing
```

---

## Deployment

### Frontend & Admin → Vercel

1. Go to https://vercel.com → New Project
2. Import repo → set **Root Directory** to `frontend/` (or `admin/`)
3. Vercel auto-detects Next.js
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` = `/api`
   - `NEXT_PUBLIC_SITE_URL` = `https://tilakglobalschool.in`
5. Deploy

> Do this **twice** — once for `frontend/`, once for `admin/` — as separate Vercel projects.

### Backend → Railway

1. Go to https://railway.app → New Project → Deploy from GitHub
2. Select `Tilak-Global-School-Backend` repo
3. Add environment variables (from `backend/.env.example`)
4. Set `PORT=5000`, `MONGO_URI=<Atlas connection string>`, etc.
5. Add custom domain: `api.tilakglobalschool.in`

### Backend CORS (update before production)
In `backend/.env` on Railway:
```env
CLIENT_URL=https://tilakglobalschool.in,https://admin-portal.tilakglobalschool.in
COOKIE_DOMAIN=.tilakglobalschool.in
```

---

## Support

| Person | Role | Contact |
|---|---|---|
| Dishant Saini | Lead Developer | Code Craft IT Solution |
| Kartik Maru | Frontend Developer | — |
| Aman | Admin Panel Developer | — |

> Free support: **6 months** after go-live.  
> After that: optional maintenance at **₹2,500/month**.

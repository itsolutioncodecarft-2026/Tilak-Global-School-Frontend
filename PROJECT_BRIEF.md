# PROJECT BRIEF – Tilak Global School Website (Phase 1)

> Is file ko project ke root folder mein rakho. Har baar AI se kaam karwane se pehle isko padhne ko bolo.
> Rule number 1: **sirf Phase 1 banao. Phase 2 / 3 ka kuch bhi mat banao.**

---

## 1. Project overview

| Item | Detail |
|---|---|
| Client | Tilak Global School, Bindayaka, Mukandpura Road, Jaipur, Rajasthan |
| Board / Medium | CBSE / English |
| Classes | Nursery to XII |
| Existing website | https://tilakglobalschool.com/ (reference only) |
| Developer | Dishant Saini, IT Solution Code Craft (teammate: Kartik Maru) |
| Package | Phase 1: Public Website + Admin Panel (CMS) + Admission Management |
| Price | ₹80,000 (₹90,000 – ₹10,000 discount) |
| Timeline | About 4–6 weeks, from advance payment and school content |
| Free support | 6 months after go-live. Then optional maintenance ₹2,500 / month |
| Stack | MERN (MongoDB, Express, React, Node) + Docker |

**Goal:** school ki public website banana, jise school staff admin panel se khud update kar sake, aur online admission enquiry / application lena.

---

## 2. Scope (client ke saath confirm ho chuka hai)

### 2.1 IN SCOPE (banana hai)

**A. Public website, 10 pages** (mobile-friendly, SSL ready)
1. Home
2. About Us
3. Academics
4. Admissions (enquiry form, application form preview, documents list, fee table, FAQs)
5. Facilities
6. Gallery
7. News & Events
8. Results & Academic Resources (sirf notices aur downloadable documents)
9. Contact Us (enquiry form, map, WhatsApp enquiry button)
10. Mandatory Disclosure & Downloads

**B. Admin panel (CMS)**: school staff ke liye secure login. Staff bina developer ke ye badal sake:
- Saare pages ka text aur images
- Homepage banner headline, button text, admission banner message
- Director / Principal ka message, naam aur photo
- Gallery: photos add / delete, captions, categories (Campus, Classrooms, Sports, Events, Activities)
- News & Events: create, edit, delete (date, category, image, details), featured event set karna
- Notices & downloads: PDF / document upload ya replace (disclosure, policies, forms, calendar, timetable) date ke saath
- Admissions page ka fee structure table aur FAQs
- Contact details: phone, email, address, office timings, WhatsApp number, map location
- Draft save, preview, publish / unpublish

**C. Admission management**
- Website par online enquiry / application form
- Saari applications ek admin table mein, search aur filters ke saath
- Har application ka status: Pending, Approved, Rejected, Info requested
- Approve / Reject / Request more information buttons
- Dashboard par counts (total, pending, approved, info requested)

**D. Launch aur training** (code ke bahar ka kaam, par deploy ke liye taiyaar rakho)
- Go-live setup
- Admin / office staff training
- Short user guide

### 2.2 OUT OF SCOPE (BILKUL MAT BANANA)
- Student, parent aur teacher portals / login
- Attendance, homework, timetable, results management
- Fee management aur online payment (Razorpay)
- Online exams, MCQ test, report cards
- SMS / WhatsApp notifications aur mobile app
- Students ki class-wise list
- Photography, content writing, logo design
- Purane software se data migration

> Public website par **kisi bachche ka naam, photo ya result mat dikhao.**
> Header / footer mein **"Parent Login / Student Login" jaise links mat rakho.**

---

## 3. Design reference

Designs yahan hain (PNG): `Phase1_Client_Samples/`
- `01_Home_Page.png` se `10_Mandatory_Disclosure_Downloads.png` (public pages)
- `A1_Admin_Overview.png`, `A2_Admission_Management.png`, `A3_Website_Content_Gallery_Management.png`, `A4_Notices_Downloads_Settings.png` (admin)

Designs ko jitna ho sake utna exactly follow karo. Ye client ne dekhe aur approve kiye hain.

### 3.1 Design tokens

| Token | Value | Use |
|---|---|---|
| navy | `#0F2A5C` | headings, nav, primary buttons |
| navy-2 | `#1B3C7A` | gradients, hover |
| blue | `#3E7BC4` | accents |
| sky | `#E8F1FB` | light backgrounds, icon chips |
| sky-2 | `#CFE2F6` | input borders |
| gold | `#C9A24A` | highlights, CTA buttons |
| gold-2 | `#F6EBCB` | notes, tags, placeholders |
| ink | `#1F2A44` | body text |
| muted | `#5B6785` | secondary text |
| line | `#E3E9F2` | borders |
| success / warning / danger | `#2E8B57` / `#D98A1F` / `#C0392B` | status badges |

- **Fonts:** headings `Lora` (serif), body `Poppins`. Google Fonts se load karo.
- **Style:** white background, rounded cards (radius 16–24px), soft shadows, generous spacing, navy header, gold CTA buttons.
- **Layout:** website 1440px desktop design hai, par **responsive** (mobile aur tablet) banao.
- **Admin:** left navy sidebar, top bar (search, bell, profile), cards aur tables, status badges.

### 3.2 Navigation (public)
Home · About Us · Academics · Admissions · Facilities · Gallery · News & Events · Contact
Header ke right mein gold button: **Admission Enquiry**.
Footer: Quick links, Resources (Mandatory Disclosure, Results & Resources, News & Events, Admission Enquiry), Contact.

---

## 4. Tech stack

| Layer | Choice |
|---|---|
| Frontend | React + Vite, React Router, Axios, CSS (Tailwind ya CSS modules, jo simple lage) |
| Backend | Node.js (LTS) + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT (admin login), bcrypt se password hash |
| File upload | multer (local `uploads/` folder; baad mein cloud storage possible) |
| Validation | zod ya express-validator |
| Security | helmet, cors (allowed origin only), express-rate-limit |
| Container | Docker + Docker Compose |
| Reverse proxy (production) | Nginx |

---

## 5. Folder structure

```
project-root/
├── PROJECT_BRIEF.md
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── app.js
│       ├── config/        (db.js, env.js)
│       ├── models/        (User, Content, Setting, NewsPost, GalleryImage, Document, FeeRow, Faq, Application)
│       ├── routes/        (auth, content, settings, news, gallery, documents, fees, faqs, applications, uploads)
│       ├── controllers/
│       ├── middleware/    (auth, role, upload, validate, errorHandler, rateLimit)
│       ├── seed/          (admin user + default content)
│       └── utils/
├── backend/uploads/       (docker volume; git mein mat daalo)
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/           (axios instance)
        ├── components/    (Header, Footer, Hero, Card, Button, FormField, Badge, Table, ...)
        ├── pages/         (Home, About, Academics, Admissions, Facilities, Gallery, News, Results, Contact, Downloads)
        ├── admin/         (Login, Layout, Overview, Applications, Content, Gallery, News, Documents, Settings)
        └── styles/        (tokens.css)
```

---

## 6. Docker setup

### 6.1 Services (docker-compose.yml)
| Service | Image / build | Port | Notes |
|---|---|---|---|
| mongo | `mongo` (official image) | 27017 | volume `mongo_data` |
| backend | build `./backend` | 5000 | env se Mongo URI, volume `uploads` |
| frontend | build `./frontend` | 5173 | dev mein Vite; production mein Nginx static build |

- Backend `depends_on: mongo`.
- Dev mein code folders **volume mount** karo taaki change turant dikhe (hot reload).
- Data volumes: `mongo_data`, `uploads_data`. `docker compose down` se data nahi jaana chahiye (sirf `-v` se jaata hai).

### 6.2 Commands (yaad rakho)
```
docker compose up --build      # pehli baar ya Dockerfile badalne par
docker compose up              # roz ka start
docker compose down            # band karna
docker compose logs -f backend # logs dekhna
docker compose exec backend sh # backend ke andar jaana
```

### 6.3 Environment variables (`.env.example`)
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://mongo:27017/tilak_school
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=10
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
VITE_API_URL=http://localhost:5000/api
```
- `.env` ko **git mein kabhi mat daalo** (`.gitignore` mein rakho). Sirf `.env.example` commit hoga.
- Production mein `JWT_SECRET` aur admin password alag aur strong rakho.

---

## 7. Roles aur auth
- Public visitors: login nahi chahiye. Sirf website dekh sakte hain aur forms bhar sakte hain.
- Admin panel: `/admin/login`. Roles:
  - `admin`: sab kuch, user manage karna.
  - `staff` (editor): content aur admissions manage kar sakta hai.
- Password reset: Phase 1 mein admin khud naya password set kare (email-based reset optional).
- Token expire ho to login par wapas bhejo.
- Pehla admin `seed` script se banao (env se email aur password).

---

## 8. Database models (Mongoose)

**User**: name, email (unique), passwordHash, role (`admin` | `staff`), isActive, createdAt

**Content** (pages ke text blocks): key (jaise `home.hero.title`), value (text / rich text), type (`text` | `richtext` | `image` | `list`), page, status (`draft` | `published`), updatedBy, updatedAt

**Setting** (ek hi document): schoolName, phone, email, address, officeTimings, whatsappNumber, mapEmbedUrl, directorName, directorMessage, directorPhotoUrl, socialLinks, admissionBannerText, admissionSession

**NewsPost**: title, slug, category (`News` | `Event` | `Notice`), date, summary, body, imageUrl, isFeatured, status (`draft` | `published`), createdAt

**GalleryImage**: imageUrl, caption, category (`Campus` | `Classrooms` | `Sports` | `Events` | `Activities`), order, status, createdAt

**Document**: title, category (`Disclosure` | `Notice` | `Academic` | `Policy` | `Form` | `Certificate`), fileUrl, fileType (`PDF` | `DOC` | `XLS`), date, status, createdAt

**FeeRow** (Admissions page ka table): classGroup, admissionFee, tuitionFee, otherCharges, order. Values school khud bharega. **Koi fees invent mat karo.**

**Faq**: question, answer, order, status

**Application** (admission):
- applicationId (jaise `APP-0001`, auto)
- studentName, dateOfBirth, gender, classApplying
- previousSchool
- parentName, phone, email, address
- message
- status: `pending` | `approved` | `rejected` | `info_requested` (default `pending`)
- statusNote (info maangne par kya poochha)
- statusHistory: [{status, note, changedBy, changedAt}]
- source: `enquiry` | `application`
- createdAt, updatedAt

---

## 9. API plan (prefix `/api`)

**Public (login nahi)**
```
GET  /content/:page            page ke published blocks
GET  /settings                 contact, director message, banner
GET  /news                     published list (?category=)
GET  /news/:slug
GET  /gallery                  (?category=)
GET  /documents                (?category=)
GET  /fees                     fee table
GET  /faqs
POST /applications             admission enquiry / application (rate limited)
POST /contact                  contact form message (rate limited)
```

**Admin (JWT + role)**
```
POST   /auth/login
GET    /auth/me
POST   /auth/change-password

GET/PUT          /admin/content/:key
GET/PUT          /admin/settings
CRUD             /admin/news
CRUD             /admin/gallery
CRUD             /admin/documents
CRUD             /admin/fees
CRUD             /admin/faqs
POST             /admin/upload            (image / document)
GET              /admin/applications      (?search=&status=&class=&page=)
GET              /admin/applications/:id
PATCH            /admin/applications/:id/status   body: {status, note}
GET              /admin/stats             counts for overview
GET              /admin/applications/export       (CSV, optional)
```

Har response ek jaisa rakho: `{ success, data, message }`. Error par sahi HTTP status (400, 401, 403, 404, 422, 500).

---

## 10. Admission flow

**Parent (website):**
1. Admissions page par process, eligibility, documents list, fee table, FAQs dekhta hai.
2. Enquiry / application form bharta hai: student name, class, DOB, previous school, parent name, mobile, email, message.
3. Submit karne par "Aapki application mil gayi" ka confirmation aur application ID dikhta hai.

**School (admin):**
1. Nayi application admin table mein dikhti hai (ID, naam, class, date, status).
2. Search aur filter: naam, class, status.
3. Detail panel kholne par sab fields dikhte hain.
4. Staff Approve / Reject / Request info dabata hai (note ke saath). `statusHistory` mein record banta hai.
5. Overview par counts update hote hain.

**Is phase mein nahi:** admission fee ka online payment, parent ko SMS / WhatsApp status, parent ka status tracking login, entrance test scheduling, document verification.
**Documents upload:** application form mein **optional** (default: sirf list dikhao, upload nahi). Client se confirm hone par hi banao.

---

## 11. Page-wise requirements (public)

Har page par: same header, navigation, footer, consistent buttons aur typography. Content admin se editable hona chahiye (jahan `Content` / `Setting` se aaye).

1. **Home:** top contact bar, hero (admission banner + "Enquire for Admission" button), stats strip (Nursery–XII, CBSE, Since 2016, Co-Ed, Tilak Group), Welcome, 4 academic stage cards, Director's message, facilities cards, Why choose us, News & Events preview, Gallery preview, Admission CTA, footer.
2. **About Us:** introduction, Vision / Mission / Values, history, management, Director's message, campus images.
3. **Academics:** 4 stage cards, CBSE curriculum, teaching methodology, calendar preview, timetable download card, exam information.
4. **Admissions:** hero, 4-step process, eligibility table, documents checklist, enquiry form, application preview, fee table, FAQs.
5. **Facilities:** 8 large cards (Smart Classrooms, Science Labs, Computer Lab, Library, Sports, Auditorium, Music & Art, Transport & Security). **"Subject to school confirmation".**
6. **Gallery:** category tabs, photo grid, "Load more", lightbox (optional).
7. **News & Events:** featured event, upcoming events, news list, notices, previous events.
8. **Results & Academic Resources:** exam notices, resources, downloads. **Koi student login ya result nahi.**
9. **Contact Us:** details, enquiry form, map, office timings, WhatsApp button (`https://wa.me/<number>`).
10. **Mandatory Disclosure & Downloads:** grouped document cards with type aur date.

---

## 12. Verified facts vs placeholders

**Verified (school ki website se):**
- English medium, co-educational, Nursery to XII, NCERT / CBSE
- Founded 2016, Tilak Group (Tilak Public School, Triveni Nagar, Jaipur)
- Director: R. S. Tanwar
- Stage cards: Kindergarten (20+ activities, 10+ classrooms), Primary / Middle / Senior (15+ activities, 20+ classrooms)
- Senior school focus: IIT, NEET, CPT selection with career guidance
- News: new session from 4 April, final exams Nursery–IX, Annual Day

**Placeholders (jab tak school verified data na de, `[ ... ]` rakho):**
Phone, email, office timings, fee amounts, admission session, Vision / Mission / Values, management names (Principal etc.), results / achievements, photos, logo, document files.

> **Kuch bhi invent mat karo** (fees, achievements, naam, numbers). Placeholder dikhao: `[to be confirmed]`.
> Logo ke liye clearly labelled placeholder rakho jab tak school asli logo na de.

---

## 13. Security aur quality checklist
- Passwords bcrypt se hash; plain text kabhi store nahi.
- JWT secret env mein; admin routes par auth + role check.
- Input validation har POST / PUT par; HTML / script sanitize (XSS).
- Public forms par rate limit aur spam protection (honeypot field, baad mein captcha optional).
- File upload: sirf allowed types (jpg, png, webp, pdf, doc, docx, xls, xlsx), size limit, random file names.
- CORS sirf `CLIENT_URL` ke liye.
- Errors mein stack trace production mein mat dikhao.
- Application data (parent phone / email) sirf admin ko dikhe. Public API mein kabhi nahi.
- Performance: images compress / lazy-load, pagination lists mein.
- SEO basics: har page ka title, meta description, semantic HTML, alt text.
- Accessibility basics: readable contrast, keyboard focus, labels on forms.
- Responsive: 360px mobile se 1440px desktop tak check karo.

---

## 14. Build order (isi order mein kaam karo)

1. **Setup:** Docker compose (mongo + backend + frontend), env, hello-world API aur React page chal rahe hon.
2. **Backend base:** Express app, MongoDB connect, error handler, health route.
3. **Auth:** User model, seed admin, login, `/auth/me`, middleware.
4. **Frontend base:** tokens, Header, Footer, routing, shared components.
5. **Settings + Content APIs** aur admin Settings / Content screens.
6. **Public pages** ek-ek karke (Home pehle), data API se aaye.
7. **News, Gallery, Documents, FAQs, Fees** (API + admin screens + public pages).
8. **Uploads** (images aur documents).
9. **Admissions:** form, API, admin table, filters, status actions, detail panel, stats.
10. **Admin Overview** screen (counts, recent activity, quick actions).
11. **Polish:** responsive, SEO, errors, loading aur empty states.
12. **Testing** (neeche checklist) aur bug fix.
13. **Deployment:** production Docker build, Nginx, SSL, domain, backup.
14. **Handover:** admin training, user guide, support contact.

Har step ke baad chala ke dekho aur git commit karo.

---

## 15. Done checklist (client ko dikhane se pehle)
- [ ] 10 public pages designs ke jaise dikhte hain, mobile par bhi theek
- [ ] Admin login kaam karta hai, galat password par error
- [ ] Admin se text, images, gallery, news, documents, fees, FAQs badal sakte hain, aur draft / preview / publish chalta hai
- [ ] Website par admission form submit hota hai aur admin table mein dikhta hai
- [ ] Search, filter aur status badalna (Approve / Reject / Request info) chalta hai, history save hoti hai
- [ ] Koi student / parent login ya Phase 2–3 feature nahi hai
- [ ] Koi invented data nahi, placeholders sahi se mark hain
- [ ] `docker compose up` se fresh machine par poora project chalta hai
- [ ] `.env` git mein nahi hai, README mein setup steps likhe hain
- [ ] Backup aur restore ka tareeka documented hai

---

## 16. AI ke liye instructions (is brief ke saath hamesha follow karo)
1. Pehle is brief ko poora padho. Phir sirf wahi banao jo maanga gaya hai.
2. **Scope ke bahar kuch mat banao** (section 2.2). Shak ho to poochho.
3. Ek baar mein ek chhota step karo. Har step ke baad bataao ki kya chalana hai aur kya dikhna chahiye.
4. Naye packages tabhi jodo jab zaroori ho, aur bataao kyun.
5. Code simple aur saaf likho, jisse hamari team baad mein badal sake. Comments sirf jahan zaroori ho.
6. Secrets (`JWT_SECRET`, passwords) code mein hardcode mat karo. Env use karo.
7. Design tokens (section 3.1) aur designs (`Phase1_Client_Samples/`) follow karo.
8. Koi bhi verified-na-hua data mat likho. Placeholder rakho.
9. Error aane par pehle logs dekho (`docker compose logs`), phir fix karo.
10. Kaam khatam hone par chhota summary do: kya bana, kaun si files badli, kaise test karein.

---

## 17. Open questions (client / team se confirm karne hain)
1. Admission form mein **documents upload** chahiye ya nahi? (default: nahi)
2. Nayi enquiry aane par **school ko email** jaani chahiye? Parent ko confirmation email? (SMTP chahiye; abhi confirmed scope mein nahi)
3. Applications ka **Excel / CSV export** chahiye?
4. **Hosting:** VPS kaun sa, aur domain / DNS ka access kiske paas hai?
5. Existing site (tilakglobalschool.com) se **purane pages ke redirects** chahiye?
6. Maps ke liye Google Maps embed ka link / location.
7. **Admin users:** kitne staff accounts, kaun admin aur kaun staff?
8. Source code handover ki terms (poora payment ke baad?).

---

*Last updated: 2026-10-12. Scope source: Phase 1 confirmation email (Dishant Saini, IT Solution Code Craft).*

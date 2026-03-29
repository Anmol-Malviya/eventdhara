# EventDhara — Full Project Analysis Report
> Generated: 2026-03-28 | Analyst: Antigravity AI

---

## 1. Executive Summary

EventDhara is an event-services booking platform (think "Airbnb for event vendors") built with a **Next.js 16 / React 19 / TypeScript / TailwindCSS** frontend and a planned **AI service** layer. The project is currently in a **very early scaffolding phase**. The architecture, design system, and authentication infrastructure have been thoughtfully planned, but the vast majority of actual UI pages and business logic have **not yet been implemented** — most files are empty placeholders.

| Dimension | Status |
|---|---|
| Project Architecture | ✅ Well-designed |
| Design System (CSS tokens) | ✅ Implemented |
| Auth Infrastructure | ✅ Implemented |
| Auth Pages (UI) | ❌ Empty / stub |
| Core Pages (Home, Services, Vendors) | ❌ Empty |
| Shared Components (Navbar, Footer, UI kit) | ❌ Empty |
| Context (BookContext, CartContext) | ❌ Empty |
| Backend / API | ❌ Does not exist yet |
| AI Service | ❌ Does not exist yet |

---

## 2. Project Structure Overview

```
EventDhara-New-Model/
├── .github/                    # GitHub Actions (CI pipeline - unexplored)
├── ai_service/                 # Python AI service — EMPTY (no code)
│   ├── README.md               # empty
│   ├── requirements.txt        # empty
│   └── setup.txt
└── frontend/                   # Next.js App (main codebase)
    ├── app/
    │   ├── layout.tsx          # ✅ Root layout with AuthProvider
    │   ├── page.tsx            # ❌ Empty home page
    │   ├── globals.css         # ✅ Complete design tokens
    │   ├── auth/
    │   │   ├── Login/page.tsx       # ❌ EMPTY FILE (0 bytes)
    │   │   ├── Register/page.tsx    # ⚠️  Stub only ("Register" text)
    │   │   └── VendorRegister/page.tsx # ⚠️ Stub only
    │   ├── components/
    │   │   ├── Navbar.tsx      # ❌ EMPTY FILE
    │   │   ├── Footer.tsx      # ❌ EMPTY FILE
    │   │   └── ui/
    │   │       ├── Button.tsx  # ❌ EMPTY FILE
    │   │       ├── Card.tsx    # ❌ EMPTY FILE
    │   │       ├── Input.tsx   # ❌ EMPTY FILE
    │   │       └── Skeleton.tsx # ❌ EMPTY FILE
    │   └── services/page.tsx   # ❌ EMPTY FILE
    ├── context/
    │   ├── AuthContext.tsx     # ✅ Fully implemented
    │   ├── BookContext.tsx     # ❌ EMPTY FILE
    │   └── CartContext.tsx     # ❌ EMPTY FILE
    ├── hooks/
    │   └── UseAuth.tsx         # ✅ Fully implemented
    ├── lib/
    │   ├── api.ts              # ✅ Fully implemented
    │   ├── constants.ts        # ✅ Fully implemented
    │   └── utils.ts            # ✅ Fully implemented
    ├── types/
    │   ├── User.ts             # ✅ Well typed
    │   ├── Api.ts              # ✅ Well typed
    │   ├── BookingStatus.ts    # ✅ Well typed
    │   └── Service.ts          # ✅ Well typed
    ├── proxy.ts                # ✅ Logic correct, ⚠️ WRONG FILENAME
    └── next.config.ts          # ⚠️  Blank (no customisation)
```

---

## 3. Technology Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | Next.js | 16.2.1 | App Router |
| UI Library | React | 19.2.4 | Latest stable |
| Language | TypeScript | ^5 | Strict typing used |
| Styling | TailwindCSS | ^4.2.2 | + custom CSS design tokens |
| HTTP Client | Axios | ^1.14.0 | Installed but **never used** |
| Icons | lucide-react | ^1.7.0 | Installed but **never used** |
| Toast Notifications | sonner | ^2.0.7 | Installed but **never used** |
| Date Formatting | date-fns | ^4.1.0 | Installed but **never used** |
| Font | Plus Jakarta Sans | — | Via Google Fonts CDN |

> ⚠️ **Inconsistency:** The root README says "Don't use CDN icons to prevent load problems", but the font is loaded via Google Fonts CDN (`@import url(...)` in globals.css). This should be replaced with `next/font/google`.

---

## 4. What Is Implemented ✅

### 4.1 Design Token System (`globals.css`)
A solid CSS custom-property-based design system:
- Typography scale: h1–h4 sizes + responsive overrides at 768px
- Spacing scale: 9 steps (space-1 → space-20)
- Color palette: Purple primary (`#7C3AED`), Amber accent (`#F59E0B`)
- Border radius tokens, `.container` and `.section` utility classes

### 4.2 Authentication Context (`context/AuthContext.tsx`)
Production-quality implementation:
- Token persistence in both `localStorage` AND cookies (dual storage for SSR + CSR)
- `useMemo` to prevent unnecessary consumer re-renders
- Token validation on mount via `/auth/me` call
- Proper `isLoading` state to prevent flash of wrong UI

### 4.3 Auth Hooks (`hooks/UseAuth.tsx`)
Three reusable, well-documented hooks:
- `useRequireAuth()` — redirect to login if unauthenticated
- `useRequireRole(role)` — redirect if wrong role (vendor-only pages)
- `useIsVendor()` — simple boolean for conditional rendering

### 4.4 API Client (`lib/api.ts`)
- Generic `request<T>` wrapper using native `fetch`
- Automatic Bearer token injection from `localStorage`
- Typed `get`, `post`, `patch`, `delete` helper methods
- Handles 204 No Content and parses error response bodies

### 4.5 Route Protection Middleware (`proxy.ts`)
- Server-side cookie-based token reading (correct SSR approach)
- Protected routes: `/dashboard`, `/bookings`, `/profile`
- Guest-only routes: `/auth/Login`, `/auth/Register`, `/auth/VendorRegister`
- Redirect with `?from=` param for post-login return

### 4.6 TypeScript Types (`types/`)
- `User` with `UserRole` union (`'user' | 'vendor' | 'admin'`)
- `Booking` with `BookingStatus` union (`pending | confirmed | cancelled | completed`)
- `Service` with pricing type and availability flag
- Generic `ApiResponse<T>`, `PaginatedResponse<T>`, `ApiError`

### 4.7 Constants (`lib/constants.ts`)
- Centralized `API_BASE_URL` via `NEXT_PUBLIC_API_URL` env variable
- `NAV_LINKS` as `as const` (type-safe, readonly)
- `SERVICE_CATEGORIES` (8 categories) with derived `ServiceCategory` type
- Cookie/storage key names unified in one place

---

## 5. What Is Missing / Incomplete ❌

### 5.1 UI Pages — All Empty

| Page | Route | Status |
|---|---|---|
| Home | `/` | ❌ Blank `<div>`, no content |
| Login | `/auth/Login` | ❌ **0-byte empty file** |
| Register | `/auth/Register` | ⚠️ Stub text only |
| Vendor Register | `/auth/VendorRegister` | ⚠️ Stub text only |
| Services | `/services` | ❌ **0-byte empty file** |
| Vendors | `/vendors` | ❌ Route does not exist |
| About | `/about` | ❌ Route does not exist |
| User Dashboard | `/dashboard/user` | ❌ Does not exist (causes 404 loop after login) |
| Bookings | `/bookings` | ❌ Does not exist |
| Profile | `/profile` | ❌ Does not exist |

### 5.2 Shared Components — All Empty

| Component | Status |
|---|---|
| `Navbar.tsx` | ❌ 0-byte empty file |
| `Footer.tsx` | ❌ 0-byte empty file |
| `Button.tsx` | ❌ 0-byte empty file |
| `Card.tsx` | ❌ 0-byte empty file |
| `Input.tsx` | ❌ 0-byte empty file |
| `Skeleton.tsx` | ❌ 0-byte empty file |

### 5.3 Context — Partially Empty

| Context | Status |
|---|---|
| `AuthContext.tsx` | ✅ Complete |
| `BookContext.tsx` | ❌ 0-byte empty file |
| `CartContext.tsx` | ❌ 0-byte empty file |

### 5.4 Backend — Does Not Exist
- No backend service anywhere in the repository
- `AuthContext` calls `/auth/me` and `/auth/login` — these endpoints don't exist
- `constants.ts` defaults to `http://localhost:3001` — nothing runs there
- `axios` is installed but never imported in any file

### 5.5 AI Service — Complete Placeholder
- `ai_service/` directory exists with empty README and empty requirements.txt
- Zero Python code, models, or configurations

### 5.6 Public Assets
- `public/` contains only default Next.js placeholder SVGs
- No EventDhara logo, hero images, or branding assets present

---

## 6. Bugs & Issues Found

### 🔴 Critical

| # | Bug | Location | Impact |
|---|---|---|---|
| 1 | **Middleware wrong filename** — Next.js requires `middleware.ts` at the project root, not `proxy.ts` | `frontend/proxy.ts` | Route protection is **completely inactive** |
| 2 | **Login page is 0 bytes** | `app/auth/Login/page.tsx` | App will crash / show blank screen |
| 3 | **Redirects to non-existent route** — authenticated users are sent to `/dashboard/user` which has no `page.tsx` | `proxy.ts` line 48 | **404 loop after login** |
| 4 | **Invalid HTML structure** — `<AuthProvider>` is placed between `<html>` and `<body>`, not inside `<body>` | `app/layout.tsx` lines 20-25 | Hydration warnings, invalid DOM |

### 🟡 Warnings

| # | Issue | Location | Impact |
|---|---|---|---|
| 5 | Font loaded from Google Fonts CDN (breaks project's own rule) | `globals.css` line 1 | Performance on slow networks |
| 6 | `axios` dependency installed but completely unused | `package.json` | Unused bundle weight |
| 7 | `useRequireAuth` redirects to `/auth/Login` (capital L) — case-sensitive on Linux/Vercel | `hooks/UseAuth.tsx` line 30 | Redirect silently fails in production |
| 8 | `BookingStatus` type defined twice: `types/BookingStatus.ts` AND `lib/constants.ts` | Both files | Potential type drift |
| 9 | `next.config.ts` is completely empty | `next.config.ts` | No image domains, headers, or rewrites |
| 10 | `AUTH_STORAGE_KEY` and `AUTH_COOKIE_NAME` have the same string value `'ed_token'` | `constants.ts` | Misleading naming, potential confusion |

---

## 7. Architecture Assessment

### Strengths ✅
- App Router used correctly with `page.tsx` conventions
- Clean separation: `lib/`, `types/`, `context/`, `hooks/` all have distinct responsibilities
- TypeScript generics used throughout (API client, context, types)
- Dual token storage (localStorage + cookies) — correct approach for hybrid SSR/CSR auth
- `useMemo` in `AuthContext` — shows performance awareness
- Well-commented code explaining the *why*, not just the *what*

### Weaknesses ❌
- No backend — the entire data layer is absent
- Middleware is not actually registered (wrong filename)
- `BookingStatus` type duplication between `types/` and `lib/constants.ts`
- No error boundaries — unhandled errors will crash the whole app
- No `.env.local.example` file — new team members won't know what env vars to configure
- Zero test coverage

---

## 8. Planned Feature Set (Inferred from Code)

| Feature | Planned | Built |
|---|---|---|
| User Auth (Login / Register) | ✅ | ❌ 0% |
| Vendor Registration | ✅ | ❌ 0% |
| Service Listings (8 categories) | ✅ | ❌ 0% |
| Booking System | ✅ | ❌ 0% |
| Cart System | ✅ | ❌ 0% |
| User Dashboard | ✅ | ❌ 0% |
| Vendor Dashboard | ✅ (implied) | ❌ 0% |
| Admin Panel | ✅ (implied by UserRole) | ❌ 0% |
| Role-Based Access Control | ✅ | ⚠️ Logic only, no UI |
| AI Service Integration | ✅ (implied) | ❌ 0% |
| Navbar & Footer | ✅ | ❌ 0% |

---

## 9. Prioritized Action Plan

### 🔴 Priority 1 — Fix Critical Bugs First

**Fix 1: Rename and move the middleware**
```
frontend/proxy.ts  →  frontend/middleware.ts
```
Also rename the exported function from `proxy` to `middleware`.

**Fix 2: Fix layout.tsx HTML structure**
```tsx
// WRONG (current):
<html lang="en">
  <AuthProvider>
    <body suppressHydrationWarning>
      {children}
    </body>
  </AuthProvider>
</html>

// CORRECT:
<html lang="en">
  <body suppressHydrationWarning>
    <AuthProvider>
      {children}
    </AuthProvider>
  </body>
</html>
```

**Fix 3: Create `/dashboard/user/page.tsx`** (even a placeholder) to stop the post-login 404 loop.

**Fix 4: Implement `app/auth/Login/page.tsx`** — it is currently a 0-byte file.

---

### 🟠 Priority 2 — Core UI Shell

5. Implement `Navbar.tsx` and `Footer.tsx`
6. Implement `Button.tsx`, `Input.tsx`, `Card.tsx`, `Skeleton.tsx`
7. Implement `app/page.tsx` (Home page)
8. Replace Google Fonts CDN with `next/font/google`

---

### 🟡 Priority 3 — Feature Buildout

9. Create a backend service (Node.js/NestJS/Express) at `localhost:3001`
   - `POST /auth/login`
   - `POST /auth/register`
   - `GET  /auth/me`
   - CRUD for services, bookings, vendors
10. Implement `BookContext.tsx` and `CartContext.tsx`
11. Build Services listing page and Service detail page
12. Build User Dashboard and Booking flow
13. Build Vendor Dashboard

---

### 🟢 Priority 4 — Quality & Infrastructure

14. Add `.env.local.example` with all required variables documented
15. Remove or properly use `axios` (either replace `lib/api.ts` to use it, or uninstall it)
16. Add Jest + React Testing Library for component tests
17. Configure `next.config.ts`: image optimization domains, security headers
18. Populate `ai_service/` with Python FastAPI service
19. Review and activate GitHub Actions CI pipeline

---

## 10. Summary Scorecard

| Category | Score | Notes |
|---|---|---|
| Architecture Design | 8 / 10 | Clean patterns, good separation |
| Code Quality (existing files) | 8 / 10 | Well-commented, typed, performant |
| Project Completeness | 2 / 10 | ~5% of UI actually built |
| Bug Severity | 4 / 10 | One critical middleware bug, one HTML bug |
| Backend Readiness | 0 / 10 | No backend exists |
| Test Coverage | 0 / 10 | Zero tests |
| **Overall Project Readiness** | **2 / 10** | Solid blueprint, execution is pending |

---

> **Bottom line:** The team has built an excellent architectural blueprint with thoughtful patterns and clean code. However, the application is largely empty — approximately 95% of the UI and 100% of the backend still needs to be built. The most urgent action items are the middleware filename bug (route protection is completely broken) and the HTML structure bug in `layout.tsx`. After those, focus should shift to building the UI shell (Navbar, Footer, UI components) and then the feature pages.

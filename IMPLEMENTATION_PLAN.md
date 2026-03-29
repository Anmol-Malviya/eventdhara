# EventDhara 2.0 — Implementation Plan
> Based on: EVENTDHARA 2.0 (2).md spec + ANALYSIS_REPORT.md
> Last Updated: 2026-03-29

---

## Overview

EventDhara is an event-services marketplace connecting users with vendors for birthday parties, weddings, and other events. Frontend: Next.js 16 / React 19 / TypeScript / TailwindCSS. Backend: planned Django/Node service at localhost:3001.

**Current State:** ~75% complete. All dashboard pages fully implemented.

---

## Phase 1 — Critical Bug Fixes & Foundation (DONE ✅)

### 1.1 Fix Middleware (CRITICAL — route protection broken)
- [x] Copy frontend/proxy.ts to frontend/middleware.ts
- [x] Rename exported function from proxy to middleware
- [x] Delete proxy.ts

### 1.2 Fix layout.tsx HTML structure (CRITICAL — hydration crash)
- [x] Move AuthProvider inside body, not between html and body

### 1.3 Create dashboard placeholder pages (stops 404 loop)
- [x] app/dashboard/user/page.tsx
- [x] app/dashboard/vendor/page.tsx
- [x] app/dashboard/admin/page.tsx

### 1.4 Update globals.css color tokens
- [x] Change --color-primary to Orange #F97316
- [x] Change --color-accent to Rose #F43F5E
- [x] Add warm off-white background

### 1.5 Fix root page redirect loop
- [x] app/page.tsx was redirect('/') — infinite loop fixed, now redirects to /shop

---

## Phase 2 — UI Shell & Auth Pages (DONE ✅)

### 2.1 Core UI Components
- [x] components/ui/Button.tsx
- [x] components/ui/Input.tsx
- [x] components/ui/Card.tsx
- [x] components/ui/Skeleton.tsx
- [x] components/ui/Badge.tsx

### 2.2 Layout Components
- [x] components/layout/Navbar.tsx
- [x] components/layout/Footer.tsx
- [x] components/layout/DashboardShell.tsx (with full nav for all 3 roles)

### 2.3 Auth Pages
- [x] app/auth/Login/page.tsx
- [x] app/auth/Register/page.tsx
- [x] app/auth/VendorRegister/page.tsx

---

## Phase 3 — Public-Facing Pages (DONE ✅)

### 3.1 Home Page
- [x] Hero with location + occasion picker
- [x] Category grid (10 service categories)
- [x] Featured services carousel
- [x] How it works, Trust signals, City banners

### 3.2 Services Listing Page
- [x] Shop page with sidebar and product grid 

### 3.3 Service Detail Page
- [x] Details page with gallery, info, packages, checkout placeholders

### 3.4 Static Pages (about, contact, faq, terms, etc.)
- [x] about, faq, vendor, terms, privacy, disclaimer pages created

---

## Phase 4 — Dashboards (DONE ✅)

### 4.1 User Dashboard
- [x] Overview: upcoming bookings, wishlist, recent orders (dashboard/user)
- [x] Booking history with status stepper (dashboard/user/bookings)
- [x] Orders with expandable detail + stepper (dashboard/user/orders) ← NEW
- [x] Payment history + invoice downloads (dashboard/user/payment) ← NEW
- [x] Wishlist page (dashboard/user/wishlist)
- [x] User Profile edit (dashboard/user/profile)

### 4.2 Vendor Dashboard
- [x] Home: stats, earnings snapshot, active leads (dashboard/vendor)
- [x] New leads with 20-min countdown timer (dashboard/vendor/leads)
- [x] Orders with tab filter + contact actions (dashboard/vendor/orders)
- [x] Booking Calendar with date picker (dashboard/vendor/calendar) ← NEW
- [x] Earnings with bar chart + transaction table (dashboard/vendor/earnings) ← NEW
- [x] Portfolio with upload zone + image grid (dashboard/vendor/portfolio)
- [x] Score breakdown with animated ring + tier ladder (dashboard/vendor/score)
- [x] Call Log / Call Flow page (dashboard/vendor/callflow) ← NEW
- [x] Premium upgrade plans (dashboard/vendor/premium) ← NEW
- [x] Vendor profile edit (dashboard/vendor/profile) ← NEW
- [x] Vendor rules & guidelines (dashboard/vendor/rules) ← NEW
- [x] Vendor onboarding wizard (dashboard/vendor/onboarding) ← NEW

### 4.3 Admin Dashboard
- [x] Platform overview: GMV, vendors, orders, disputes (dashboard/admin)
- [x] Lead pipeline kanban/list view (dashboard/admin/pipeline) ← NEW
- [x] All orders table with filters (dashboard/admin/orders) ← NEW
- [x] Vendor management table with verify/block (dashboard/admin/vendors) ← NEW
- [x] Disputes management (dashboard/admin/disputes) ← NEW
- [x] Analytics with charts, city breakdown, top vendors (dashboard/admin/analytics) ← NEW
- [x] Photo moderation grid/list (dashboard/admin/photos) ← NEW
- [x] City manager with activate/deactivate (dashboard/admin/city-manager) ← NEW
- [x] WhatsApp bot monitor with live status (dashboard/admin/bot-monitor) ← NEW
- [x] Config page with feature flags + business rules (dashboard/admin/config) ← NEW

### 4.4 Contexts
- [x] CartContext with add/remove/quantity/clear
- [x] BookContext for multi-step booking flow
- [x] Cart page with checkout summary (app/(public)/cart)

---

## Phase 5 — Backend, AI & Advanced Features (TODO)

### 5.1 Backend API at localhost:3001
- [ ] Connect auth (login/register) to real API endpoints
- [ ] Replace mock data with API calls in dashboards
- [ ] Implement PATCH /users/me, PATCH /vendors/me

### 5.2 AI Service (Python FastAPI — image gen, chatbot, bidding)
- [ ] AI-generated decoration preview images
- [ ] Chatbot widget integration

### 5.3 WhatsApp Integration
- [ ] Real WA bot status from backend
- [ ] Live conversation log via WebSocket

### 5.4 Payment Integration (Razorpay)
- [ ] Razorpay checkout integration on service detail page
- [ ] Payment webhook handler

### 5.5 Bidding System
- [ ] Vendor bid submission UI
- [ ] Bid comparison for users

---

## Database Tables (28 total)

user, vendor, admin, packages, pack_type, pack_category, service, service_package,
orders, payment, query, report, reviews, chat, category, tags, cart, location,
service_location, wishlist, OTP, manual_orders, service_category, call_log_details,
generated_image_data, bidding_data, user_service_query, vendor_locations

---

## Design System

- Primary: #F97316 (Orange)
- Accent: #F43F5E (Rose)
- Background: #FFFDF9 (warm off-white)
- Font: Plus Jakarta Sans

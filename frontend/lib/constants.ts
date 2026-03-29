// ─────────────────────────────────────────────
// EventDhara 2.0 — Global Constants
// ─────────────────────────────────────────────

export const APP_NAME = "EventDhara";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "919XXXXXXXXX";
export const COMMISSION_RATE = 0.15; // 15% platform cut
export const VENDOR_PAYOUT_RATE = 0.85; // 85% to vendor
export const LEAD_TIMER_SECONDS = 20 * 60; // 20 minutes
export const MONTHLY_PREMIUM_PRICE = 999; // ₹999/month
export const AUTH_COOKIE_NAME = "ed_token";
export const AUTH_STORAGE_KEY = "ed_token";

// ─── Cities ───────────────────────────────────
export const CITIES = [
  "Indore",
  "Bhopal",
  "Jabalpur",
  "Gwalior",
  "Ujjain",
  "Rewa",
] as const;

export type City = (typeof CITIES)[number];

// ─── Event Occasions ──────────────────────────
export const OCCASIONS = [
  { id: "birthday", label: "Birthday", emoji: "🎂" },
  { id: "anniversary", label: "Anniversary", emoji: "💍" },
  { id: "baby_shower", label: "Baby Shower", emoji: "👶" },
  { id: "wedding", label: "Wedding", emoji: "💒" },
  { id: "bachelorette", label: "Bachelorette", emoji: "👰" },
  { id: "baby_welcome", label: "Baby Welcome", emoji: "🎉" },
  { id: "engagement", label: "Engagement", emoji: "💎" },
  { id: "rice_ceremony", label: "Rice Ceremony", emoji: "🍚" },
] as const;

export type OccasionId = (typeof OCCASIONS)[number]["id"];

// ─── Service Categories ───────────────────────
export const CATEGORIES = [
  "Balloon Decoration",
  "Floral Decoration",
  "Cake & Desserts",
  "Photography",
  "Videography",
  "Makeup & Styling",
  "DJ & Music",
  "Mehndi",
  "Lighting",
  "Invitation Cards",
] as const;

export type ServiceCategory = (typeof CATEGORIES)[number];

// ─── Vendor Tiers ─────────────────────────────
export const VENDOR_TIERS = {
  BRONZE: { label: "Bronze", minScore: 0, color: "#cd7f32" },
  SILVER: { label: "Silver", minScore: 40, color: "#c0c0c0" },
  GOLD: { label: "Gold", minScore: 70, color: "#ffd700" },
  PREMIUM: { label: "Premium", minScore: 90, color: "#f43f5e" },
} as const;

export type VendorTier = keyof typeof VENDOR_TIERS;

// ─── Urgency Levels ───────────────────────────
export const URGENCY_LEVELS = {
  CRITICAL: { label: "Critical", color: "#ef4444", hours: 2 },
  HIGH: { label: "High", color: "#f97316", hours: 24 },
  MEDIUM: { label: "Medium", color: "#eab308", hours: 72 },
  LOW: { label: "Low", color: "#22c55e", hours: 168 },
} as const;

export type UrgencyLevel = keyof typeof URGENCY_LEVELS;

// ─── Booking Status ───────────────────────────
export const BOOKING_STAGES = [
  { id: "booked", label: "Booked", step: 1 },
  { id: "paid", label: "Paid", step: 2 },
  { id: "confirmed", label: "Confirmed", step: 3 },
  { id: "delivered", label: "Delivered", step: 4 },
  { id: "reviewed", label: "Reviewed", step: 5 },
] as const;

// ─── Order Status ─────────────────────────────
export const ORDER_STATUS = [
  "pending",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
  "disputed",
] as const;

export type OrderStatus = (typeof ORDER_STATUS)[number];

// ─── Lead Status ──────────────────────────────
export const LEAD_STATUS = [
  "new",
  "assigned",
  "accepted",
  "declined",
  "expired",
  "converted",
] as const;

export type LeadStatus = (typeof LEAD_STATUS)[number];

// ─── Score Metrics ────────────────────────────
export const SCORE_METRICS = [
  { id: "rating", label: "Customer Rating", weight: 30 },
  { id: "response_time", label: "Response Time", weight: 25 },
  { id: "completion", label: "Completion Rate", weight: 20 },
  { id: "proximity", label: "Proximity Match", weight: 15 },
  { id: "premium", label: "Premium Status", weight: 10 },
] as const;

// ─── Navigation (Vendor Dashboard) ───────────────
export const VENDOR_NAV = [
  { href: "/dashboard/vendor", label: "Home", icon: "Home" },
  { href: "/dashboard/vendor/leads", label: "New Leads", icon: "Bell" },
  { href: "/dashboard/vendor/orders", label: "My Orders", icon: "ShoppingBag" },
  { href: "/dashboard/vendor/calendar", label: "Calendar", icon: "Calendar" },
  { href: "/dashboard/vendor/earnings", label: "Earnings", icon: "IndianRupee" },
  { href: "/dashboard/vendor/portfolio", label: "Portfolio", icon: "Image" },
  { href: "/dashboard/vendor/score", label: "My Score", icon: "Star" },
] as const;

// ─── Navigation (Admin Dashboard) ─────────────────
export const ADMIN_NAV = [
  { href: "/dashboard/admin", label: "Overview", icon: "LayoutDashboard" },
  { href: "/dashboard/admin/pipeline", label: "Lead Pipeline", icon: "GitBranch" },
  { href: "/dashboard/admin/orders", label: "All Orders", icon: "ShoppingBag" },
  { href: "/dashboard/admin/vendors", label: "Vendors", icon: "Users" },
  { href: "/dashboard/admin/disputes", label: "Disputes", icon: "AlertTriangle" },
  { href: "/dashboard/admin/analytics", label: "Analytics", icon: "BarChart2" },
  { href: "/dashboard/admin/city-manager", label: "City Manager", icon: "MapPin" },
  { href: "/dashboard/admin/bot-monitor", label: "WA Bot", icon: "MessageCircle" },
  { href: "/dashboard/admin/config", label: "Config", icon: "Settings" },
] as const;
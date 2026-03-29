// ─────────────────────────────────────────────
// EventDhara 2.0 — Core TypeScript Type Definitions
// ─────────────────────────────────────────────
// Maps 1:1 with Prisma schema (28 tables)

import type { City, OccasionId, ServiceCategory, VendorTier, UrgencyLevel, OrderStatus, LeadStatus } from "@/lib/constants";

// ════════════════════════════════════════════
// USER
// ════════════════════════════════════════════
export interface User {
  userId: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  isBlacklisted: boolean;
  role: UserRole;           // 'user' | 'vendor' | 'admin'
  createdAt: string;
  updatedAt: string;
}

// ════════════════════════════════════════════
// VENDOR
// ════════════════════════════════════════════
export interface Vendor {
  vendorId: string;
  name: string;           // NEVER expose full name to user — use first name only
  aadhaar?: string;       // Sensitive — only for admin
  phone: string;          // NEVER expose to user — use masked relay
  email?: string;
  storeName?: string;
  storeAddress?: string;
  city: City;
  isBlocklisted: boolean;
  isPremium: boolean;
  isVerified: boolean;
  tier: VendorTier;
  score: number;          // 0–100 composite score
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VendorScore {
  vendorId: string;
  ratingScore: number;        // 30% weight
  responseTimeScore: number;  // 25% weight
  completionScore: number;    // 20% weight
  proximityScore: number;     // 15% weight
  premiumScore: number;       // 10% weight
  totalScore: number;
  tier: VendorTier;
  reviewCount: number;
  avgRating: number;
}

// ════════════════════════════════════════════
// ADMIN
// ════════════════════════════════════════════
export interface Admin {
  adminId: string;
  name: string;
  email: string;
  role: "super_admin" | "city_manager" | "support";
  city?: City;
}

// ════════════════════════════════════════════
// SERVICE & PACKAGE
// ════════════════════════════════════════════
export interface Service {
  serviceId: string;
  vendorId: string;
  title: string;
  description: string;
  category: ServiceCategory;
  basePrice: number;
  discountPrice?: number;
  city: City;
  isActive: boolean;
  images: string[];       // Cloudinary watermarked URLs
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Package {
  packageId: string;
  vendorId: string;
  title: string;
  description: string;
  packType: "basic" | "standard" | "premium";
  packCategory: ServiceCategory;
  packLocation: City;
  price: number;
  discountPrice?: number;
  includes: string[];
  images: string[];       // Watermarked
  isActive: boolean;
  createdAt: string;
}

// ════════════════════════════════════════════
// LEAD (Query + Assignment)
// ════════════════════════════════════════════
export interface Lead {
  leadId: string;
  userId: string;
  vendorId?: string;        // Assigned vendor
  occasion: OccasionId;
  eventDate: string;
  city: City;
  budget: number;
  guestCount: number;
  specialRequirements?: string;
  status: LeadStatus;
  urgencyScore: number;
  urgencyLevel: UrgencyLevel;
  assignedAt?: string;
  expiresAt?: string;       // 20 min after assignment
  createdAt: string;
}

export interface LeadAssignment {
  assignmentId: string;
  leadId: string;
  vendorId: string;
  assignedAt: string;
  respondedAt?: string;
  response: "pending" | "accepted" | "declined" | "expired";
  vendorScore: number;      // Score at time of assignment (for audit)
}

// ════════════════════════════════════════════
// ORDER
// ════════════════════════════════════════════
export interface Order {
  orderId: string;
  userId: string;
  vendorId: string;
  leadId: string;
  status: OrderStatus;
  agreedPrice?: number;     // Final price confirmed by vendor after call
  platformFee: number;      // 15%
  vendorPayout: number;     // 85%
  eventDate: string;
  city: City;
  occasion: OccasionId;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderService {
  orderServiceId: string;
  orderId: string;
  serviceId: string;
  price: number;
  quantity: number;
}

export interface OrderPackage {
  orderPackageId: string;
  orderId: string;
  packageId: string;
  price: number;
}

// ════════════════════════════════════════════
// PAYMENT (Razorpay Escrow)
// ════════════════════════════════════════════
export interface Payment {
  paymentId: string;
  orderId: string;
  userId: string;
  vendorId: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: "INR";
  status: "created" | "paid" | "in_escrow" | "released" | "refunded" | "failed";
  paymentType: "advance" | "full" | "balance";
  escrowReleasedAt?: string;  // After delivery confirmed
  createdAt: string;
}

// ════════════════════════════════════════════
// REVIEW
// ════════════════════════════════════════════
export interface Review {
  reviewId: string;
  orderId: string;
  userId: string;
  vendorId: string;
  rating: number;           // 1–5
  title?: string;
  body?: string;
  hasImage: boolean;
  hasVideo: boolean;
  imageUrls?: string[];
  videoUrls?: string[];
  isVerified: boolean;      // Only from confirmed orders
  createdAt: string;
}

// ════════════════════════════════════════════
// DISPUTE
// ════════════════════════════════════════════
export interface Dispute {
  disputeId: string;
  orderId: string;
  raisedBy: "user" | "vendor";
  reason: string;
  description: string;
  status: "open" | "under_review" | "resolved_user" | "resolved_vendor" | "escalated";
  resolution?: string;
  slaDeadline: string;      // 48 hrs from creation
  resolvedAt?: string;
  createdAt: string;
}

// ════════════════════════════════════════════
// EARNINGS
// ════════════════════════════════════════════
export interface Earning {
  earningId: string;
  vendorId: string;
  orderId: string;
  grossAmount: number;
  platformFee: number;
  netAmount: number;
  status: "pending" | "released" | "paid_out";
  releasedAt?: string;
  paidOutAt?: string;
}

// ════════════════════════════════════════════
// CART & WISHLIST
// ════════════════════════════════════════════
export interface CartItem {
  cartItemId: string;
  userId: string;
  packageId?: string;
  serviceId?: string;
  quantity: number;
  addedAt: string;
}

export interface WishlistItem {
  wishlistItemId: string;
  userId: string;
  packageId?: string;
  serviceId?: string;
  addedAt: string;
}

// ════════════════════════════════════════════
// CALL LOG (Masked Calling)
// ════════════════════════════════════════════
export interface CallLog {
  callId: string;
  orderId: string;
  userId: string;
  vendorId: string;
  exotelCallId: string;
  duration?: number;        // seconds
  recordingUrl?: string;    // For dispute resolution
  initiatedAt: string;
  endedAt?: string;
  status: "initiated" | "answered" | "missed" | "failed";
}

// ════════════════════════════════════════════
// LOCATION
// ════════════════════════════════════════════
export interface LocationData {
  locationId: string;
  city: City;
  area: string;
  pincode: string;
  lat?: number;
  lng?: number;
}

// ════════════════════════════════════════════
// API RESPONSE WRAPPER
// ════════════════════════════════════════════
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ════════════════════════════════════════════
// AUTH
// ════════════════════════════════════════════
export type UserRole = "user" | "vendor" | "admin";

export interface AuthSession {
  userId?: string;
  vendorId?: string;
  adminId?: string;
  role: UserRole;
  name: string;
  phone?: string;
  email?: string;
  token: string;
  expiresAt: string;
}

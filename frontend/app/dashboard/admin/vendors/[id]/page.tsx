'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft, CheckCircle, XCircle, Star, MapPin, Phone,
  Mail, Award, BarChart2, ShoppingBag, Camera, Shield,
  TrendingUp, Calendar, AlertTriangle, MessageCircle
} from 'lucide-react';

// Mock vendor data — keyed by id
const VENDORS: Record<string, {
  id: string; name: string; owner: string; phone: string; email: string;
  city: string; category: string; tier: string; score: number;
  rating: number; reviews: number; totalOrders: number; monthlyGMV: number;
  joinedAt: string; isVerified: boolean; isBlocked: boolean; isPremium: boolean;
  bio: string; aadhaar: string; gstin: string;
  recentOrders: { id: string; customer: string; amount: number; status: string; date: string }[];
}> = {
  default: {
    id: 'VND-001',
    name: 'Balloon World Studio',
    owner: 'Rohit Sharma',
    phone: '+91 98765 43210',
    email: 'rohit@balloonworld.in',
    city: 'Indore',
    category: 'Balloon Decoration',
    tier: 'GOLD',
    score: 88,
    rating: 4.8,
    reviews: 142,
    totalOrders: 187,
    monthlyGMV: 84000,
    joinedAt: '2024-06-15',
    isVerified: true,
    isBlocked: false,
    isPremium: true,
    bio: 'Specialising in premium balloon decoration for parties, weddings, and corporate events across Indore and Bhopal.',
    aadhaar: '****-****-4521',
    gstin: '23ABCDE1234F1Z5',
    recentOrders: [
      { id: 'ORD-201', customer: 'Priya Sharma',  amount: 4999,  status: 'Completed',   date: '2026-03-28' },
      { id: 'ORD-198', customer: 'Kushal Verma',  amount: 2499,  status: 'In Progress', date: '2026-03-27' },
      { id: 'ORD-195', customer: 'Aditi Singh',   amount: 7500,  status: 'Completed',   date: '2026-03-22' },
      { id: 'ORD-188', customer: 'Rahul Gupta',   amount: 1999,  status: 'Cancelled',   date: '2026-03-15' },
    ],
  },
};

const TIER_COLORS: Record<string, string> = {
  BRONZE:  'bg-amber-100 text-amber-800 border-amber-200',
  SILVER:  'bg-gray-100 text-gray-700 border-gray-200',
  GOLD:    'bg-yellow-100 text-yellow-800 border-yellow-200',
  PREMIUM: 'bg-rose-100 text-rose-800 border-rose-200',
};

const ORDER_STATUS_VARIANT: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
  'Completed':   'success',
  'In Progress': 'warning',
  'Cancelled':   'danger',
  'Confirmed':   'default',
};

export default function AdminVendorDetailPage() {
  const params = useParams();
  const id = (params.id as string) ?? 'default';
  const vendor = VENDORS[id] ?? VENDORS['default'];

  const [isBlocked, setIsBlocked]   = useState(vendor.isBlocked);
  const [isVerified, setIsVerified] = useState(vendor.isVerified);

  const SCORE_COLOR =
    vendor.score >= 80 ? 'text-green-600' :
    vendor.score >= 60 ? 'text-amber-600' : 'text-red-600';

  const SCORE_BG =
    vendor.score >= 80 ? 'from-green-500' :
    vendor.score >= 60 ? 'from-amber-500' : 'from-red-500';

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/admin/vendors"
        className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Vendors
      </Link>

      {/* Header card */}
      <Card className="border border-[var(--color-border)] overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-orange-400 to-rose-400" />
        <CardContent className="p-6 -mt-12">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div className="flex items-end gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-3xl">
                🎈
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold">{vendor.name}</h1>
                  {isVerified && (
                    <span className="flex items-center gap-1 text-blue-600 bg-blue-50 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  )}
                  {isBlocked && (
                    <Badge variant="danger">Blocked</Badge>
                  )}
                  {vendor.isPremium && (
                    <Badge variant="warning" className="gap-1">
                      <Award className="w-3 h-3" /> Premium
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  {vendor.owner} · {vendor.category} · 
                  <MapPin className="w-3 h-3 inline mx-1 text-gray-400" />
                  {vendor.city}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant={isVerified ? 'ghost' : 'primary'}
                className={`gap-1.5 text-xs ${isVerified ? 'text-blue-600 hover:bg-blue-50' : ''}`}
                onClick={() => setIsVerified(v => !v)}
              >
                {isVerified ? <><XCircle className="w-3.5 h-3.5" /> Unverify</> : <><CheckCircle className="w-3.5 h-3.5" /> Verify</>}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={`gap-1.5 text-xs ${isBlocked ? 'text-green-600 hover:bg-green-50' : 'text-red-500 hover:bg-red-50'}`}
                onClick={() => setIsBlocked(v => !v)}
              >
                {isBlocked ? <><CheckCircle className="w-3.5 h-3.5" /> Unblock</> : <><XCircle className="w-3.5 h-3.5" /> Block</>}
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                <MessageCircle className="w-3.5 h-3.5" /> Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* ── Left column ─────────────────────────────── */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Score',         value: `${vendor.score}/100`,                       icon: BarChart2,   color: SCORE_COLOR,   bg: vendor.score >= 80 ? 'bg-green-50' : 'bg-amber-50' },
              { label: 'Rating',        value: `⭐ ${vendor.rating} (${vendor.reviews})`,   icon: Star,        color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Total Orders',  value: vendor.totalOrders,                           icon: ShoppingBag, color: 'text-blue-600',  bg: 'bg-blue-50' },
              { label: 'Monthly GMV',   value: `₹${(vendor.monthlyGMV/1000).toFixed(0)}k`,  icon: TrendingUp,  color: 'text-purple-600',bg: 'bg-purple-50' },
            ].map(s => (
              <Card key={s.label} className="border border-[var(--color-border)]">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <div>
                    <div className={`font-bold text-sm ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-gray-400">{s.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Orders */}
          <Card className="border border-[var(--color-border)]">
            <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[var(--color-primary)]" /> Recent Orders
              </h2>
              <Link href="/dashboard/admin/orders" className="text-xs text-[var(--color-primary)] hover:underline">
                View all →
              </Link>
            </div>
            <CardContent className="p-0 divide-y divide-[var(--color-border)]">
              {vendor.recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <div>
                    <div className="text-sm font-medium">{order.customer}</div>
                    <div className="text-xs text-gray-400">{order.id} · {order.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={ORDER_STATUS_VARIANT[order.status] ?? 'default'}>{order.status}</Badge>
                    <span className="font-semibold text-sm">₹{order.amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Bio */}
          <Card className="border border-[var(--color-border)]">
            <CardContent className="p-5">
              <h2 className="font-semibold mb-3">About the Business</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{vendor.bio}</p>
            </CardContent>
          </Card>
        </div>

        {/* ── Right column ─────────────────────────────── */}
        <div className="space-y-5">
          {/* Tier & Score ring */}
          <Card className="border border-[var(--color-border)]">
            <CardContent className="p-5 text-center space-y-3">
              <div className={`border text-sm font-bold px-3 py-1.5 rounded-full inline-block ${TIER_COLORS[vendor.tier] ?? TIER_COLORS.BRONZE}`}>
                {vendor.tier} TIER
              </div>
              <div className="relative w-24 h-24 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="38" fill="none"
                    stroke={vendor.score >= 80 ? '#22c55e' : vendor.score >= 60 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 38 * vendor.score / 100} ${2 * Math.PI * 38 * (1 - vendor.score / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-2xl font-extrabold ${SCORE_COLOR}`}>{vendor.score}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">Vendor Score</p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border border-[var(--color-border)]">
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold">Contact</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{vendor.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{vendor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>{vendor.city}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>Joined {vendor.joinedAt}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KYC */}
          <Card className="border border-[var(--color-border)]">
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--color-primary)]" /> KYC Documents
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Aadhaar</span>
                  <span className="font-medium">{vendor.aadhaar}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">GSTIN</span>
                  <span className="font-medium text-xs">{vendor.gstin}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {isVerified
                    ? <Badge variant="success" className="gap-1"><CheckCircle className="w-3 h-3" /> KYC Verified</Badge>
                    : <Badge variant="warning" className="gap-1"><AlertTriangle className="w-3 h-3" /> Pending Verification</Badge>
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card className="border border-[var(--color-border)]">
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Camera className="w-4 h-4 text-[var(--color-primary)]" /> Portfolio Photos
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className={`aspect-square rounded-lg bg-gradient-to-br ${
                    ['from-orange-200 to-amber-100','from-rose-200 to-pink-100','from-purple-200 to-indigo-100','from-blue-200 to-cyan-100','from-green-200 to-teal-100','from-yellow-200 to-orange-100'][i]
                  } flex items-center justify-center text-lg`}>
                    🎈
                  </div>
                ))}
              </div>
              <Link href="/dashboard/admin/photos" className="text-xs text-[var(--color-primary)] hover:underline block text-center">
                Manage in Photo Moderation →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

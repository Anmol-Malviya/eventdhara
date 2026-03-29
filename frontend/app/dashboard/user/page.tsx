'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BOOKING_STAGES, OCCASIONS } from '@/lib/constants';
import { ShoppingBag, Heart, Star, Clock, ChevronRight, Calendar } from 'lucide-react';

// Placeholder data until backend exists
const RECENT_ORDERS = [
  { id: 'ORD-001', service: 'Golden Balloon Décor', vendor: 'Royal Events', date: '2026-04-15', status: 'confirmed', amount: 4999 },
  { id: 'ORD-002', service: 'Wedding Photography', vendor: 'PixelPro Studios', date: '2026-05-02', status: 'pending', amount: 12500 },
  { id: 'ORD-003', service: 'Mehndi Artist', vendor: 'Henna Queens', date: '2026-03-20', status: 'completed', amount: 2200 },
];

const STATUS_BADGE: Record<string, React.ReactNode> = {
  pending:   <Badge variant="warning">Pending</Badge>,
  confirmed: <Badge variant="info">Confirmed</Badge>,
  completed: <Badge variant="success">Completed</Badge>,
  cancelled: <Badge variant="danger">Cancelled</Badge>,
};

const STATS = [
  { label: 'Total Bookings', value: '12', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Wishlist Items', value: '5', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
  { label: 'Avg Rating Given', value: '4.6', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Upcoming Events', value: '2', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Welcome back, {user?.name?.split(' ')[0] ?? 'there'} 👋
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Here's what's happening with your events.</p>
        </div>
        <Link href="/shop">
          <Button className="hidden sm:flex gap-2 items-center">
            Browse Services
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <Card key={s.label} className="border border-[var(--color-border)]">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-[var(--color-text)]">{s.value}</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Progress Section */}
      <Card className="border border-[var(--color-border)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border)]">
            {RECENT_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[var(--color-text)]">{order.service}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">by {order.vendor} · {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="font-semibold text-sm">₹{order.amount.toLocaleString('en-IN')}</div>
                  </div>
                  {STATUS_BADGE[order.status]}
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[var(--color-border)]">
            <Link href="/dashboard/user/bookings">
              <Button variant="ghost" size="sm" className="text-[var(--color-primary)]">
                View all bookings <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Booking Status Explainer */}
      <Card className="border border-[var(--color-border)]">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">How your booking progresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-0">
            {BOOKING_STAGES.map((stage, idx) => (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    idx <= 1
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                      : 'bg-white text-gray-400 border-gray-200'
                  }`}>
                    {stage.step}
                  </div>
                  <span className="text-xs text-center text-[var(--color-text-muted)] hidden sm:block">{stage.label}</span>
                </div>
                {idx < BOOKING_STAGES.length - 1 && (
                  <div className={`h-0.5 flex-1 ${idx < 1 ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: '/dashboard/user/bookings', label: 'My Bookings', desc: 'View and manage your bookings', icon: ShoppingBag },
          { href: '/dashboard/user/wishlist', label: 'Wishlist', desc: 'Services you saved for later', icon: Heart },
          { href: '/dashboard/user/profile', label: 'My Profile', desc: 'Edit your personal details', icon: Star },
        ].map(link => (
          <Link key={link.href} href={link.href}>
            <Card hoverable className="h-full border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors">
              <CardContent className="p-5 flex items-start gap-3">
                <link.icon className="w-5 h-5 text-[var(--color-primary)] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">{link.label}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{link.desc}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

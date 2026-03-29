'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { VENDOR_TIERS, LEAD_TIMER_SECONDS, SCORE_METRICS } from '@/lib/constants';
import { Bell, IndianRupee, ShoppingBag, Star, TrendingUp, Clock, CheckCircle, XCircle, Phone } from 'lucide-react';

// Placeholder data
const PENDING_LEADS = [
  { id: 'LD-101', occasion: '🎂 Birthday', city: 'Indore', budget: 5000, date: '2026-04-20', urgency: 'HIGH', timeLeft: 847 },
  { id: 'LD-102', occasion: '💒 Wedding', city: 'Bhopal', budget: 25000, date: '2026-05-10', urgency: 'MEDIUM', timeLeft: 1180 },
];

const RECENT_ORDERS = [
  { id: 'ORD-201', customer: 'Priya Sharma', service: 'Birthday Décor Premium', amount: 4999, status: 'in_progress', date: '2026-04-02' },
  { id: 'ORD-202', customer: 'Rahul Gupta', service: 'Anniversary Decoration', amount: 3200, status: 'confirmed', date: '2026-04-08' },
  { id: 'ORD-203', customer: 'Sunita Verma', service: 'Baby Shower Setup', amount: 2800, status: 'completed', date: '2026-03-28' },
];

const SCORE_DATA = { rating: 85, response_time: 90, completion: 78, proximity: 70, premium: 100, total: 85 };

function LeadTimer({ seconds }: { seconds: number }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pct = (seconds / LEAD_TIMER_SECONDS) * 100;
  const isUrgent = seconds < 300;

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3" />
          <circle cx="18" cy="18" r="15.9" fill="none"
            stroke={isUrgent ? '#ef4444' : '#F97316'}
            strokeWidth="3"
            strokeDasharray={`${pct} 100`}
            strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-500' : 'text-[var(--color-primary)]'}`} />
        </div>
      </div>
      <span className={`text-sm font-mono font-bold ${isUrgent ? 'text-red-500' : 'text-[var(--color-text)]'}`}>
        {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
      </span>
    </div>
  );
}

const STATUS_BADGE: Record<string, React.ReactNode> = {
  confirmed:   <Badge variant="info">Confirmed</Badge>,
  in_progress: <Badge variant="warning">In Progress</Badge>,
  completed:   <Badge variant="success">Completed</Badge>,
  cancelled:   <Badge variant="danger">Cancelled</Badge>,
};

export default function VendorDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'This Month Revenue', value: '₹28,400', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Orders', value: '4', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'New Leads Today', value: '3', icon: Bell, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Vendor Panel <span className="text-[var(--color-primary)]">— {user?.name?.split(' ')[0] ?? 'Dashboard'}</span>
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Manage your leads, orders, and grow your business</p>
        </div>
        <Badge variant="accent" className="text-sm px-3 py-1.5">
          🏆 PREMIUM Vendor
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="border border-[var(--color-border)]">
            <CardContent className="p-5 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Leads — Time-Sensitive */}
      <Card className="border-2 border-[var(--color-primary)] bg-orange-50/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5 text-[var(--color-primary)]" />
            New Leads — Accept Within 20 Minutes!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {PENDING_LEADS.length === 0 ? (
            <div className="p-8 text-center text-[var(--color-text-muted)]">No new leads right now. Check back soon!</div>
          ) : (
            <div className="divide-y divide-orange-100">
              {PENDING_LEADS.map(lead => (
                <div key={lead.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{lead.occasion}</span>
                      <Badge variant={lead.urgency === 'HIGH' ? 'danger' : 'warning'}>{lead.urgency}</Badge>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      📍 {lead.city} · 📅 {lead.date} · 💰 Budget: ₹{lead.budget.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <LeadTimer seconds={lead.timeLeft} />
                    <Button size="sm" className="gap-1 bg-green-500 hover:bg-green-600 text-white border-0">
                      <CheckCircle className="w-4 h-4" /> Accept
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 gap-1">
                      <XCircle className="w-4 h-4" /> Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="border border-[var(--color-border)]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border)]">
            {RECENT_ORDERS.map(order => (
              <div key={order.id} className="flex items-center justify-between p-5 hover:bg-gray-50">
                <div>
                  <p className="font-medium text-sm">{order.service}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">for {order.customer} · {order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-sm hidden sm:block">₹{order.amount.toLocaleString('en-IN')}</span>
                  {STATUS_BADGE[order.status]}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Score */}
      <Card className="border border-[var(--color-border)]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
              Your Vendor Score
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-extrabold text-[var(--color-primary)]">{SCORE_DATA.total}</span>
              <span className="text-sm text-[var(--color-text-muted)]">/ 100</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {SCORE_METRICS.map(metric => {
            const score = SCORE_DATA[metric.id as keyof typeof SCORE_DATA] as number;
            return (
              <div key={metric.id}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{metric.label}</span>
                  <span className="text-[var(--color-text-muted)]">{score}/100 <span className="text-xs">(weight: {metric.weight}%)</span></span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${score}%`,
                      backgroundColor: score >= 80 ? '#22c55e' : score >= 60 ? '#f97316' : '#ef4444'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

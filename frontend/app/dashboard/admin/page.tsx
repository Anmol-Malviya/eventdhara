'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CITIES, VENDOR_TIERS } from '@/lib/constants';
import {
  Users, ShoppingBag, IndianRupee, TrendingUp, AlertTriangle,
  CheckCircle, XCircle, Activity, MapPin, Clock, BarChart2
} from 'lucide-react';

// Placeholder data
const PLATFORM_STATS = [
  { label: 'Total GMV (MTD)', value: '₹4.2L', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50', trend: '+18%' },
  { label: 'Active Vendors', value: '142', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', trend: '+3' },
  { label: 'Orders This Month', value: '87', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50', trend: '+12%' },
  { label: 'Open Disputes', value: '3', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', trend: '-1' },
];

const RECENT_VENDORS = [
  { id: 'V-01', name: 'Royal Events Ltd', city: 'Indore', tier: 'PREMIUM', score: 92, verified: true, orders: 34 },
  { id: 'V-02', name: 'PixelPro Studios', city: 'Bhopal', tier: 'GOLD', score: 76, verified: true, orders: 18 },
  { id: 'V-03', name: 'Henna Queens', city: 'Indore', tier: 'SILVER', score: 55, verified: false, orders: 9 },
  { id: 'V-04', name: 'DJ Nights Crew', city: 'Gwalior', tier: 'BRONZE', score: 30, verified: false, orders: 3 },
];

const RECENT_ORDERS = [
  { id: 'ORD-301', user: 'Priya S.', vendor: 'Royal Events', amount: 4999, status: 'completed', city: 'Indore' },
  { id: 'ORD-302', user: 'Rahul G.', vendor: 'PixelPro', amount: 12500, status: 'in_progress', city: 'Bhopal' },
  { id: 'ORD-303', user: 'Kavya M.', vendor: 'Henna Queens', amount: 2200, status: 'disputed', city: 'Indore' },
];

const PIPELINE = [
  { stage: 'New Leads', count: 24, color: 'bg-blue-500' },
  { stage: 'Assigned', count: 18, color: 'bg-orange-400' },
  { stage: 'Accepted', count: 12, color: 'bg-amber-500' },
  { stage: 'In Progress', count: 8, color: 'bg-purple-500' },
  { stage: 'Completed', count: 87, color: 'bg-green-500' },
];

const TIER_COLORS: Record<string, string> = {
  PREMIUM: 'text-rose-600 bg-rose-50 border-rose-200',
  GOLD: 'text-amber-600 bg-amber-50 border-amber-200',
  SILVER: 'text-gray-600 bg-gray-100 border-gray-200',
  BRONZE: 'text-orange-700 bg-orange-50 border-orange-200',
};

const ORDER_STATUS_BADGE: Record<string, React.ReactNode> = {
  completed:   <Badge variant="success">Completed</Badge>,
  in_progress: <Badge variant="warning">In Progress</Badge>,
  disputed:    <Badge variant="danger">Disputed</Badge>,
  confirmed:   <Badge variant="info">Confirmed</Badge>,
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Admin Overview</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Platform-wide performance and management panel</p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORM_STATS.map(s => (
          <Card key={s.label} className="border border-[var(--color-border)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {s.trend}
                </span>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Lead Pipeline */}
        <Card className="border border-[var(--color-border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-[var(--color-primary)]" />
              Lead Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {PIPELINE.map(p => (
              <div key={p.stage} className="flex items-center gap-4">
                <span className="text-sm w-28 text-[var(--color-text-muted)] shrink-0">{p.stage}</span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${p.color}`}
                    style={{ width: `${Math.min((p.count / 100) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-bold w-8 text-right">{p.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* City Breakdown */}
        <Card className="border border-[var(--color-border)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
              Revenue by City
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {CITIES.map((city, idx) => {
              const pct = Math.max(20, 100 - idx * 15);
              return (
                <div key={city} className="flex items-center gap-4">
                  <span className="text-sm w-20 text-[var(--color-text-muted)] shrink-0">{city}</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] w-8 text-right">{pct}%</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

      </div>

      {/* Vendor Management Table */}
      <Card className="border border-[var(--color-border)]">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-4 h-4 text-[var(--color-primary)]" />
            Recent Vendors
          </CardTitle>
          <Button size="sm" variant="outline">View All</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-[var(--color-text-muted)] uppercase tracking-wide">
                <tr>
                  <th className="px-5 py-3 text-left">Vendor</th>
                  <th className="px-5 py-3 text-left">City</th>
                  <th className="px-5 py-3 text-left">Tier</th>
                  <th className="px-5 py-3 text-left">Score</th>
                  <th className="px-5 py-3 text-left">Orders</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {RECENT_VENDORS.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium">{v.name}</td>
                    <td className="px-5 py-4 text-[var(--color-text-muted)]">{v.city}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${TIER_COLORS[v.tier]}`}>
                        {v.tier}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-bold ${v.score >= 80 ? 'text-green-600' : v.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                        {v.score}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[var(--color-text-muted)]">{v.orders}</td>
                    <td className="px-5 py-4">
                      {v.verified
                        ? <span className="flex items-center gap-1 text-green-600 text-xs"><CheckCircle className="w-3.5 h-3.5" /> Verified</span>
                        : <span className="flex items-center gap-1 text-orange-500 text-xs"><Clock className="w-3.5 h-3.5" /> Pending</span>
                      }
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-green-600 hover:bg-green-50">Verify</Button>
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-500 hover:bg-red-50">Block</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="border border-[var(--color-border)]">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[var(--color-primary)]" />
            Recent Orders
          </CardTitle>
          <Button size="sm" variant="outline">View All</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[var(--color-border)]">
            {RECENT_ORDERS.map(order => (
              <div key={order.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium">{order.vendor}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{order.user} · {order.city}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-sm">₹{order.amount.toLocaleString('en-IN')}</span>
                  {ORDER_STATUS_BADGE[order.status]}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

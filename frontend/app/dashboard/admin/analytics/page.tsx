'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrendingUp, TrendingDown, Users, ShoppingBag, IndianRupee, Star, BarChart2, MapPin } from 'lucide-react';

const MONTHLY = [
  { month: 'Oct', gmv: 420000, orders: 128, vendors: 32 },
  { month: 'Nov', gmv: 510000, orders: 154, vendors: 38 },
  { month: 'Dec', gmv: 780000, orders: 236, vendors: 45 },
  { month: 'Jan', gmv: 380000, orders: 115, vendors: 40 },
  { month: 'Feb', gmv: 560000, orders: 168, vendors: 52 },
  { month: 'Mar', gmv: 640000, orders: 193, vendors: 58 },
];

const CITIES = [
  { name: 'Indore',    gmv: 280000, orders: 84,  pct: 44 },
  { name: 'Bhopal',   gmv: 180000, orders: 54,  pct: 28 },
  { name: 'Ujjain',   gmv: 90000,  orders: 27,  pct: 14 },
  { name: 'Jabalpur', gmv: 60000,  orders: 18,  pct: 9  },
  { name: 'Others',   gmv: 30000,  orders: 10,  pct: 5  },
];

const OCCASIONS = [
  { name: 'Birthday',    count: 98,  pct: 51, color: '#F97316' },
  { name: 'Wedding',     count: 42,  pct: 22, color: '#F43F5E' },
  { name: 'Anniversary', count: 28,  pct: 15, color: '#8B5CF6' },
  { name: 'Baby Shower', count: 15,  pct: 8,  color: '#06B6D4' },
  { name: 'Other',       count: 10,  pct: 5,  color: '#10B981' },
];

const TOP_VENDORS = [
  { name: 'Rohit Decoration House', city: 'Indore', orders: 22, revenue: 94000, rating: 4.9 },
  { name: 'Magic Moments Décor',    city: 'Bhopal',  orders: 18, revenue: 76000, rating: 4.7 },
  { name: 'Royal Floral Co.',       city: 'Indore', orders: 15, revenue: 68000, rating: 4.8 },
  { name: 'Dreamland Events',       city: 'Ujjain', orders: 12, revenue: 48000, rating: 4.6 },
];

const KPIS = [
  { label: 'Monthly GMV',     value: '₹6.4L',  delta: '+14%', up: true,  icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Total Orders',    value: '193',    delta: '+15%', up: true,  icon: ShoppingBag, color: 'text-blue-600',  bg: 'bg-blue-50' },
  { label: 'Active Vendors',  value: '58',     delta: '+12%', up: true,  icon: Users,       color: 'text-orange-600',bg: 'bg-orange-50' },
  { label: 'Avg Order Value', value: '₹3,316', delta: '-2%',  up: false, icon: TrendingUp,  color: 'text-purple-600',bg: 'bg-purple-50' },
];

const MAX_GMV = Math.max(...MONTHLY.map(m => m.gmv));

export default function AdminAnalyticsPage() {
  const [metric, setMetric] = useState<'gmv' | 'orders'>('gmv');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Platform performance, growth, and revenue insights.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {KPIS.map(k => (
          <Card key={k.label} className="border border-[var(--color-border)]">
            <CardContent className="p-5 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${k.bg} flex items-center justify-center shrink-0`}>
                <k.icon className={`w-5 h-5 ${k.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold">{k.value}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs text-[var(--color-text-muted)]">{k.label}</span>
                  <span className={`text-xs font-semibold ${k.up ? 'text-green-600' : 'text-red-500'}`}>
                    {k.up ? '↑' : '↓'} {k.delta}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2"><BarChart2 className="w-4 h-4 text-[var(--color-primary)]" /> Monthly Trends</h2>
          <div className="flex gap-2">
            {(['gmv', 'orders'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg uppercase transition-all ${metric === m ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-end gap-3 h-40">
            {MONTHLY.map(d => {
              const val = metric === 'gmv' ? d.gmv : d.orders;
              const maxVal = metric === 'gmv' ? MAX_GMV : Math.max(...MONTHLY.map(x => x.orders));
              const pct = (val / maxVal) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-400">
                    {metric === 'gmv' ? `₹${(d.gmv / 1000).toFixed(0)}k` : d.orders}
                  </span>
                  <div className="w-full relative rounded-t-md" style={{ height: '96px', backgroundColor: '#f3f4f6' }}>
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[var(--color-primary)] to-orange-300 rounded-t-md transition-all duration-500"
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500">{d.month}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* City Breakdown */}
        <Card className="border border-[var(--color-border)]">
          <div className="px-6 py-4 border-b border-[var(--color-border)]">
            <h2 className="font-semibold flex items-center gap-2"><MapPin className="w-4 h-4 text-[var(--color-primary)]" /> Revenue by City</h2>
          </div>
          <CardContent className="p-5 space-y-4">
            {CITIES.map(c => (
              <div key={c.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-[var(--color-text-muted)]">₹{(c.gmv / 1000).toFixed(0)}k · {c.orders} orders</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-orange-300 transition-all" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Occasions */}
        <Card className="border border-[var(--color-border)]">
          <div className="px-6 py-4 border-b border-[var(--color-border)]">
            <h2 className="font-semibold">Bookings by Occasion</h2>
          </div>
          <CardContent className="p-5 space-y-4">
            {OCCASIONS.map(o => (
              <div key={o.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{o.name}</span>
                  <span className="text-[var(--color-text-muted)]">{o.count} bookings · {o.pct}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${o.pct}%`, backgroundColor: o.color }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Vendors */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="font-semibold">Top Performing Vendors</h2>
        </div>
        <CardContent className="p-0 divide-y divide-[var(--color-border)]">
          {TOP_VENDORS.map((v, i) => (
            <div key={v.name} className="flex items-center justify-between p-5 hover:bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-orange-100 text-[var(--color-primary)] flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-medium text-sm">{v.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{v.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm shrink-0">
                <div className="text-center hidden md:block">
                  <div className="font-semibold">₹{(v.revenue / 1000).toFixed(0)}k</div>
                  <div className="text-xs text-gray-400">Revenue</div>
                </div>
                <div className="text-center hidden md:block">
                  <div className="font-semibold">{v.orders}</div>
                  <div className="text-xs text-gray-400">Orders</div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-semibold text-xs">{v.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, ShoppingBag, CheckCircle, Clock, XCircle, Phone, Eye } from 'lucide-react';

type OrderStatus = 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

const ALL_ORDERS: {
  id: string; customer: string; vendor: string; service: string;
  amount: number; city: string; status: OrderStatus; date: string;
}[] = [
  { id: 'ORD-201', customer: 'Priya Sharma',    vendor: 'Rohit Decoration House', service: 'Birthday Décor Premium',   amount: 4999,  city: 'Indore', status: 'in_progress', date: '2026-04-02' },
  { id: 'ORD-202', customer: 'Rahul Gupta',     vendor: 'Magic Moments Décor',    service: 'Anniversary Decoration',   amount: 3200,  city: 'Bhopal', status: 'confirmed',   date: '2026-04-08' },
  { id: 'ORD-203', customer: 'Sunita Verma',    vendor: 'Dreamland Events',       service: 'Baby Shower Setup',        amount: 2800,  city: 'Ujjain', status: 'completed',   date: '2026-03-28' },
  { id: 'ORD-204', customer: 'Amit Joshi',      vendor: 'Royal Floral Co.',        service: 'Wedding Floral Setup',     amount: 18500, city: 'Indore', status: 'completed',   date: '2026-03-10' },
  { id: 'ORD-205', customer: 'Komal Singh',     vendor: 'Balloon World',           service: 'Birthday Balloon Package', amount: 1500,  city: 'Indore', status: 'cancelled',   date: '2026-02-21' },
  { id: 'ORD-206', customer: 'Deepak Pandey',   vendor: 'Rohit Decoration House', service: 'Corporate Event Setup',    amount: 12000, city: 'Bhopal', status: 'confirmed',   date: '2026-04-15' },
  { id: 'ORD-207', customer: 'Anjali Singh',    vendor: 'Magic Moments Décor',    service: 'Birthday Décor Standard',  amount: 2500,  city: 'Indore', status: 'in_progress', date: '2026-04-05' },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; variant: 'warning' | 'info' | 'success' | 'danger'; icon: React.ElementType }> = {
  confirmed:   { label: 'Confirmed',   variant: 'info',    icon: CheckCircle },
  in_progress: { label: 'In Progress', variant: 'warning', icon: Clock },
  completed:   { label: 'Completed',   variant: 'success', icon: CheckCircle },
  cancelled:   { label: 'Cancelled',   variant: 'danger',  icon: XCircle },
};

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<'all' | OrderStatus>('all');
  const [search, setSearch] = useState('');

  const filtered = ALL_ORDERS.filter(o =>
    (filter === 'all' || o.status === filter) &&
    (o.customer.toLowerCase().includes(search.toLowerCase()) ||
     o.vendor.toLowerCase().includes(search.toLowerCase()) ||
     o.id.toLowerCase().includes(search.toLowerCase()) ||
     o.city.toLowerCase().includes(search.toLowerCase()))
  );

  const totalRevenue = ALL_ORDERS.filter(o => o.status === 'completed').reduce((s, o) => s + o.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">All Orders</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Monitor every order across the platform.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders',   value: ALL_ORDERS.length,                                              color: 'text-gray-700',  bg: 'bg-gray-100' },
          { label: 'In Progress',    value: ALL_ORDERS.filter(o => o.status === 'in_progress').length,      color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Completed',      value: ALL_ORDERS.filter(o => o.status === 'completed').length,        color: 'text-green-700', bg: 'bg-green-50' },
          { label: 'Gross Revenue',  value: `₹${(totalRevenue / 1000).toFixed(1)}k`,                        color: 'text-blue-700',  bg: 'bg-blue-50'  },
        ].map(s => (
          <Card key={s.label} className="border border-[var(--color-border)]">
            <CardContent className={`p-4 ${s.bg} rounded-xl`}>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer, vendor, order ID, or city…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'confirmed', 'in_progress', 'completed', 'cancelled'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border capitalize transition-all ${
                filter === s ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-gray-500 border-[var(--color-border)] hover:bg-gray-50'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <Card className="border border-[var(--color-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-[var(--color-border)]">
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Order</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Vendor</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">City</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">No orders found.</td></tr>
              ) : filtered.map(order => {
                const cfg = STATUS_CONFIG[order.status];
                return (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-semibold">{order.service}</div>
                      <div className="text-xs text-gray-400">{order.customer} · {order.id}</div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-sm text-gray-600">{order.vendor}</td>
                    <td className="px-4 py-4 hidden lg:table-cell text-sm text-gray-600">{order.city}</td>
                    <td className="px-4 py-4 hidden lg:table-cell text-sm text-gray-500">{order.date}</td>
                    <td className="px-4 py-4 font-semibold">₹{order.amount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-4"><Badge variant={cfg.variant}>{cfg.label}</Badge></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Button size="sm" variant="outline" className="gap-1 text-xs">
                          <Eye className="w-3.5 h-3.5" /> View
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-1 text-xs">
                          <Phone className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[var(--color-border)] bg-gray-50 flex justify-between text-xs text-gray-400">
          <span>{filtered.length} of {ALL_ORDERS.length} orders</span>
          <span>Total GMV shown: ₹{filtered.reduce((s, o) => s + o.amount, 0).toLocaleString('en-IN')}</span>
        </div>
      </Card>
    </div>
  );
}

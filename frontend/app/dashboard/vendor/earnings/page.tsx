'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrendingUp, TrendingDown, IndianRupee, BarChart2, Download, Calendar } from 'lucide-react';

const MONTHLY_DATA = [
  { month: 'Oct', revenue: 28000, orders: 8,  leads: 14 },
  { month: 'Nov', revenue: 32000, orders: 11, leads: 18 },
  { month: 'Dec', revenue: 48000, orders: 16, leads: 24 },
  { month: 'Jan', revenue: 22000, orders: 7,  leads: 12 },
  { month: 'Feb', revenue: 35000, orders: 12, leads: 20 },
  { month: 'Mar', revenue: 41000, orders: 14, leads: 22 },
];

const TRANSACTIONS: { id: string; date: string; customer: string; service: string; amount: number; commission: number; net: number; status: 'paid' | 'pending' }[] = [
  { id: 'TXN-001', date: '2026-03-28', customer: 'Priya Sharma',  service: 'Birthday Décor Premium',   amount: 4999,  commission: 500,  net: 4499,  status: 'paid' },
  { id: 'TXN-002', date: '2026-03-22', customer: 'Rahul Gupta',   service: 'Anniversary Decoration',   amount: 3200,  commission: 320,  net: 2880,  status: 'paid' },
  { id: 'TXN-003', date: '2026-03-15', customer: 'Sunita Verma',  service: 'Baby Shower Setup',        amount: 2800,  commission: 280,  net: 2520,  status: 'pending' },
  { id: 'TXN-004', date: '2026-03-10', customer: 'Amit Joshi',    service: 'Wedding Floral Décor',     amount: 18500, commission: 1850, net: 16650, status: 'paid' },
  { id: 'TXN-005', date: '2026-03-02', customer: 'Komal Singh',   service: 'Graduation Decoration',    amount: 5000,  commission: 500,  net: 4500,  status: 'paid' },
];

const SUMMARY = [
  { label: 'This Month Revenue', value: '₹41,000', delta: '+17%', up: true,  icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Total Orders',       value: '14',       delta: '+16%', up: true,  icon: BarChart2,   color: 'text-blue-600',  bg: 'bg-blue-50' },
  { label: 'Pending Payout',     value: '₹2,520',   delta: '',     up: null,  icon: Calendar,    color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'All-Time Earned',    value: '₹2,06,000',delta: '',     up: null,  icon: TrendingUp,  color: 'text-purple-600',bg: 'bg-purple-50' },
];

const MAX_REV = Math.max(...MONTHLY_DATA.map(d => d.revenue));

export default function VendorEarningsPage() {
  const [tab, setTab] = useState<'revenue' | 'orders'>('revenue');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Earnings</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Track your revenue, payouts, and platform commissions.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SUMMARY.map(s => (
          <Card key={s.label} className="border border-[var(--color-border)]">
            <CardContent className="p-5 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold">{s.value}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="text-xs text-[var(--color-text-muted)]">{s.label}</div>
                  {s.delta && (
                    <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                      {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {s.delta}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <h2 className="font-semibold">Monthly Overview</h2>
          <div className="flex gap-2">
            {(['revenue', 'orders'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                  tab === t ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex items-end gap-3 h-40">
            {MONTHLY_DATA.map(d => {
              const val = tab === 'revenue' ? d.revenue : d.orders;
              const maxVal = tab === 'revenue' ? MAX_REV : Math.max(...MONTHLY_DATA.map(x => x.orders));
              const pct = (val / maxVal) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-400 mb-1">
                    {tab === 'revenue' ? `₹${(d.revenue / 1000).toFixed(0)}k` : d.orders}
                  </span>
                  <div className="w-full relative rounded-t-md overflow-hidden" style={{ height: '96px' }}>
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

      {/* Transactions */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <h2 className="font-semibold">Transaction History</h2>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>
        </div>
        <CardContent className="p-0 divide-y divide-[var(--color-border)]">
          {TRANSACTIONS.map(t => (
            <div key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 hover:bg-gray-50/50 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm">{t.service}</span>
                  <Badge variant={t.status === 'paid' ? 'success' : 'warning'}>{t.status}</Badge>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">{t.customer} · {t.date} · {t.id}</p>
              </div>
              <div className="text-sm text-right shrink-0 space-y-0.5 ml-4 sm:ml-0">
                <div className="font-bold text-[var(--color-text)]">₹{t.net.toLocaleString('en-IN')}</div>
                <div className="text-xs text-gray-400">
                  ₹{t.amount.toLocaleString('en-IN')} – ₹{t.commission.toLocaleString('en-IN')} fee
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="px-6 py-3 bg-gray-50 border-t border-[var(--color-border)] flex justify-between text-sm font-semibold">
          <span className="text-[var(--color-text-muted)]">Platform fee: 10% per order</span>
          <span>Net Earned: ₹{TRANSACTIONS.filter(t => t.status === 'paid').reduce((s, t) => s + t.net, 0).toLocaleString('en-IN')}</span>
        </div>
      </Card>
    </div>
  );
}

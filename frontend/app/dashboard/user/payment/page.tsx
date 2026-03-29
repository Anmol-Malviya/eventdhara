'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { IndianRupee, CreditCard, CheckCircle, Clock, AlertCircle, Download, Shield } from 'lucide-react';

type PayStatus = 'paid' | 'pending' | 'refunded' | 'failed';

const PAYMENTS: { id: string; orderId: string; service: string; amount: number; method: string; status: PayStatus; date: string }[] = [
  { id: 'PAY-001', orderId: 'ORD-201', service: 'Birthday Décor Premium',   amount: 4999,  method: 'UPI',          status: 'paid',     date: '2026-04-01' },
  { id: 'PAY-002', orderId: 'ORD-202', service: 'Anniversary Decoration',   amount: 3200,  method: 'Credit Card',  status: 'paid',     date: '2026-04-07' },
  { id: 'PAY-003', orderId: 'ORD-203', service: 'Baby Shower Setup',        amount: 2800,  method: 'UPI',          status: 'paid',     date: '2026-03-27' },
  { id: 'PAY-004', orderId: 'ORD-204', service: 'Wedding Floral Setup',     amount: 18500, method: 'Net Banking',  status: 'paid',     date: '2026-03-09' },
  { id: 'PAY-005', orderId: 'ORD-205', service: 'Birthday Balloon Package', amount: 1500,  method: 'UPI',          status: 'refunded', date: '2026-02-22' },
];

const STATUS_CONFIG: Record<PayStatus, { label: string; variant: 'success' | 'warning' | 'info' | 'danger'; icon: React.ElementType }> = {
  paid:     { label: 'Paid',     variant: 'success', icon: CheckCircle },
  pending:  { label: 'Pending',  variant: 'warning', icon: Clock },
  refunded: { label: 'Refunded', variant: 'info',    icon: IndianRupee },
  failed:   { label: 'Failed',   variant: 'danger',  icon: AlertCircle },
};

const SUMMARY = [
  { label: 'Total Spent',   value: '₹31,499', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Total Orders',  value: '5',        icon: CreditCard,  color: 'text-blue-600',  bg: 'bg-blue-50' },
  { label: 'Pending',       value: '₹0',       icon: Clock,       color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Refunded',      value: '₹1,500',   icon: Shield,      color: 'text-purple-600',bg: 'bg-purple-50' },
];

export default function UserPaymentPage() {
  const [filter, setFilter] = useState<'all' | PayStatus>('all');

  const filtered = PAYMENTS.filter(p => filter === 'all' || p.status === filter);
  const totalAmount = filtered.reduce((sum, p) => sum + (p.status !== 'refunded' ? p.amount : 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payment History</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">All your transactions and invoices in one place.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SUMMARY.map(s => (
          <Card key={s.label} className="border border-[var(--color-border)]">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`w-4.5 h-4.5 ${s.color}`} style={{ width: '1.125rem', height: '1.125rem' }} />
              </div>
              <div>
                <div className="text-lg font-bold">{s.value}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'paid', 'pending', 'refunded', 'failed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full border capitalize transition-all ${
              filter === tab ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-gray-500 border-[var(--color-border)] hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Transaction table */}
      <Card className="border border-[var(--color-border)]">
        <CardContent className="p-0 divide-y divide-[var(--color-border)]">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-400">No transactions found.</div>
          ) : filtered.map(p => {
            const cfg = STATUS_CONFIG[p.status];
            return (
              <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 hover:bg-gray-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{p.service}</span>
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">{p.orderId} · {p.method} · {p.date}</p>
                  <p className="text-xs text-gray-400">Transaction ID: {p.id}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className={`font-bold ${p.status === 'refunded' ? 'text-purple-600' : p.status === 'failed' ? 'text-red-500' : 'text-[var(--color-text)]'}`}>
                      {p.status === 'refunded' ? '-' : ''}₹{p.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                    <Download className="w-3.5 h-3.5" /> Invoice
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
        {/* Footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 bg-gray-50 border-t border-[var(--color-border)] flex justify-between items-center text-sm font-semibold">
            <span className="text-[var(--color-text-muted)]">Showing {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}</span>
            <span>Net Total: ₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>
        )}
      </Card>

      {/* Security note */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 text-sm">
        <Shield className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" style={{ width: '1.125rem', height: '1.125rem' }} />
        <div>
          <strong className="text-blue-800">Secure Payments</strong>
          <span className="text-blue-600 ml-1">All transactions are encrypted and processed via Razorpay. We never store your card details.</span>
        </div>
      </div>
    </div>
  );
}

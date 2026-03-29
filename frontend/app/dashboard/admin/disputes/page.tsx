'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Clock, CheckCircle, XCircle, Search, MessageCircle, IndianRupee } from 'lucide-react';

type DisputeStatus = 'open' | 'investigating' | 'resolved' | 'closed';
type DisputeType = 'quality' | 'no_show' | 'refund' | 'fraud' | 'other';

const DISPUTES: {
  id: string; orderId: string; customer: string; vendor: string;
  type: DisputeType; amount: number; status: DisputeStatus;
  openedDate: string; description: string;
}[] = [
  { id: 'DSP-001', orderId: 'ORD-310', customer: 'Ananya Singh',   vendor: 'Balloon World',          type: 'quality',  amount: 2500,  status: 'open',          openedDate: '2026-03-26', description: 'Balloons deflated within 2 hours of setup. Poor quality material used.' },
  { id: 'DSP-002', orderId: 'ORD-298', customer: 'Karan Mehta',    vendor: 'StarDust Décor',         type: 'no_show',  amount: 8000,  status: 'investigating', openedDate: '2026-03-24', description: 'Vendor did not arrive on the day of the event. No prior communication.' },
  { id: 'DSP-003', orderId: 'ORD-285', customer: 'Nisha Rao',      vendor: 'Magic Moments Décor',    type: 'refund',   amount: 3200,  status: 'resolved',      openedDate: '2026-03-18', description: 'Customer cancelled 5 days before. Requesting full refund per policy.' },
  { id: 'DSP-004', orderId: 'ORD-270', customer: 'Dhruv Patel',    vendor: 'Dreamland Events',       type: 'fraud',    amount: 12000, status: 'closed',        openedDate: '2026-03-10', description: 'Suspicion of fake reviews and inflated bookings.' },
  { id: 'DSP-005', orderId: 'ORD-312', customer: 'Sakshi Verma',   vendor: 'Rohit Decoration House', type: 'quality',  amount: 5000,  status: 'open',          openedDate: '2026-03-28', description: 'LED lights did not work during the event. Vendor unresponsive.' },
];

const STATUS_CONFIG: Record<DisputeStatus, { label: string; variant: 'danger' | 'warning' | 'success' | 'default' }> = {
  open:          { label: 'Open',          variant: 'danger'  },
  investigating: { label: 'Investigating', variant: 'warning' },
  resolved:      { label: 'Resolved',      variant: 'success' },
  closed:        { label: 'Closed',        variant: 'default' },
};

const TYPE_LABELS: Record<DisputeType, string> = {
  quality:  '🔧 Quality Issue',
  no_show:  '🚫 No Show',
  refund:   '💸 Refund Request',
  fraud:    '⚠️ Fraud',
  other:    '❓ Other',
};

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState(DISPUTES);
  const [filter, setFilter] = useState<'all' | DisputeStatus>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = disputes.filter(d =>
    (filter === 'all' || d.status === filter) &&
    (d.customer.toLowerCase().includes(search.toLowerCase()) || d.vendor.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: string, status: DisputeStatus) =>
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status } : d));

  const openCount = disputes.filter(d => d.status === 'open').length;
  const investigatingCount = disputes.filter(d => d.status === 'investigating').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dispute Management</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Review and resolve customer-vendor disputes.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-center">
            <div className="text-xl font-bold text-red-600">{openCount}</div>
            <div className="text-xs text-red-400">Open</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-center">
            <div className="text-xl font-bold text-amber-600">{investigatingCount}</div>
            <div className="text-xs text-amber-400">Under Review</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by customer, vendor, or ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'open', 'investigating', 'resolved', 'closed'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border capitalize transition-all ${
                filter === s ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-gray-500 border-[var(--color-border)] hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Dispute cards */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="border border-dashed border-gray-200">
            <CardContent className="p-12 text-center text-sm text-gray-400">No disputes found.</CardContent>
          </Card>
        ) : filtered.map(d => {
          const cfg = STATUS_CONFIG[d.status];
          const isExpanded = expandedId === d.id;
          return (
            <Card key={d.id} className={`border ${d.status === 'open' ? 'border-red-200' : 'border-[var(--color-border)]'} overflow-hidden`}>
              <button className="w-full text-left" onClick={() => setExpandedId(isExpanded ? null : d.id)}>
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <AlertTriangle className={`w-4 h-4 ${d.status === 'open' ? 'text-red-500' : 'text-amber-500'}`} />
                      <span className="font-semibold text-sm">{TYPE_LABELS[d.type]}</span>
                      <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {d.customer} vs. {d.vendor} · {d.orderId} · Opened {d.openedDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="font-bold flex items-center gap-1">
                        <IndianRupee className="w-3.5 h-3.5" />₹{d.amount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-400">{d.id}</div>
                    </div>
                  </div>
                </CardContent>
              </button>

              {isExpanded && (
                <div className="border-t border-[var(--color-border)] px-5 py-4 bg-gray-50/50 space-y-4">
                  <p className="text-sm text-gray-700 bg-white border border-[var(--color-border)] rounded-lg p-3">
                    💬 <em>"{d.description}"</em>
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {d.status === 'open' && (
                      <Button size="sm" className="gap-1.5 text-xs" onClick={() => updateStatus(d.id, 'investigating')}>
                        <Clock className="w-3.5 h-3.5" /> Start Investigation
                      </Button>
                    )}
                    {d.status === 'investigating' && (
                      <>
                        <Button size="sm" className="gap-1.5 text-xs bg-green-500 hover:bg-green-600 text-white border-0" onClick={() => updateStatus(d.id, 'resolved')}>
                          <CheckCircle className="w-3.5 h-3.5" /> Mark Resolved
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-1.5 text-xs text-red-500 hover:bg-red-50" onClick={() => updateStatus(d.id, 'closed')}>
                          <XCircle className="w-3.5 h-3.5" /> Close
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      <MessageCircle className="w-3.5 h-3.5" /> Contact Parties
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      <IndianRupee className="w-3.5 h-3.5" /> Issue Refund
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Phone, PhoneIncoming, PhoneMissed, PhoneOutgoing, Clock, Search, Filter } from 'lucide-react';

type CallDir = 'incoming' | 'outgoing' | 'missed';

const CALLS: { id: string; customer: string; phone: string; dir: CallDir; duration: string; time: string; occasion: string; notes: string }[] = [
  { id: 'CL-001', customer: 'Priya Sharma',   phone: '+91 98765 43210', dir: 'incoming', duration: '4:32',  time: '2026-03-28 02:15 PM', occasion: 'Birthday',    notes: 'Wants balloon arch + fairy lights. Budget ₹5k.' },
  { id: 'CL-002', customer: 'Amit Joshi',      phone: '+91 87654 32109', dir: 'outgoing', duration: '2:10',  time: '2026-03-28 11:00 AM', occasion: 'Anniversary', notes: 'Confirmed package. Advance paid.' },
  { id: 'CL-003', customer: 'Rahul Gupta',     phone: '+91 76543 21098', dir: 'missed',   duration: '--',    time: '2026-03-27 06:30 PM', occasion: 'Wedding',     notes: '' },
  { id: 'CL-004', customer: 'Sunita Verma',    phone: '+91 65432 10987', dir: 'incoming', duration: '7:01',  time: '2026-03-27 03:45 PM', occasion: 'Baby Shower', notes: 'Requested customised theme — pastel pink.' },
  { id: 'CL-005', customer: 'Komal Singh',     phone: '+91 54321 09876', dir: 'outgoing', duration: '1:04',  time: '2026-03-26 10:15 AM', occasion: 'Graduation',  notes: 'Rescheduled to April 28.' },
  { id: 'CL-006', customer: 'Deepak Pandey',   phone: '+91 43210 98765', dir: 'missed',   duration: '--',    time: '2026-03-26 09:00 AM', occasion: 'Birthday',    notes: '' },
];

const DIR_CONFIG = {
  incoming: { icon: PhoneIncoming,  label: 'Incoming', color: 'text-green-500',  bg: 'bg-green-50',  badge: 'success' as const },
  outgoing: { icon: PhoneOutgoing,  label: 'Outgoing', color: 'text-blue-500',   bg: 'bg-blue-50',   badge: 'info'    as const },
  missed:   { icon: PhoneMissed,    label: 'Missed',   color: 'text-red-500',    bg: 'bg-red-50',    badge: 'danger'  as const },
};

export default function VendorCallFlowPage() {
  const [filter, setFilter] = useState<'all' | CallDir>('all');
  const [search, setSearch] = useState('');

  const filtered = CALLS.filter(c =>
    (filter === 'all' || c.dir === filter) &&
    (c.customer.toLowerCase().includes(search.toLowerCase()) || c.occasion.toLowerCase().includes(search.toLowerCase()))
  );

  const summary = [
    { label: 'Total Calls',   value: CALLS.length,                              icon: Phone,         color: 'text-gray-600',  bg: 'bg-gray-100' },
    { label: 'Incoming',      value: CALLS.filter(c => c.dir === 'incoming').length, icon: PhoneIncoming, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Outgoing',      value: CALLS.filter(c => c.dir === 'outgoing').length, icon: PhoneOutgoing, color: 'text-blue-600',  bg: 'bg-blue-50' },
    { label: 'Missed',        value: CALLS.filter(c => c.dir === 'missed').length,   icon: PhoneMissed,   color: 'text-red-600',   bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Call Log</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Track all customer calls and follow-ups.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summary.map(s => (
          <Card key={s.label} className="border border-[var(--color-border)]">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`w-4.5 h-4.5 ${s.color}`} style={{ width: '1.125rem', height: '1.125rem' }} />
              </div>
              <div>
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{s.label}</div>
              </div>
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
            placeholder="Search customer or occasion…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'incoming', 'outgoing', 'missed'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all capitalize ${
                filter === f ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-gray-500 border-[var(--color-border)] hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Call list */}
      <Card className="border border-[var(--color-border)]">
        <CardContent className="p-0 divide-y divide-[var(--color-border)]">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-sm text-gray-400">No calls found.</div>
          ) : filtered.map(call => {
            const cfg = DIR_CONFIG[call.dir];
            return (
              <div key={call.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full ${cfg.bg} flex items-center justify-center shrink-0`}>
                    <cfg.icon className={`w-4.5 h-4.5 ${cfg.color}`} style={{ width: '1.125rem', height: '1.125rem' }} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{call.customer}</span>
                      <Badge variant={cfg.badge}>{cfg.label}</Badge>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">{call.phone} · {call.occasion}</p>
                    {call.notes && <p className="text-xs text-gray-400 italic mt-1">"{call.notes}"</p>}
                  </div>
                </div>
                <div className="flex items-center gap-6 ml-14 sm:ml-0 shrink-0">
                  <div className="text-center hidden md:block">
                    <p className="text-xs text-gray-400">Duration</p>
                    <p className="text-sm font-mono font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />{call.duration}
                    </p>
                  </div>
                  <div className="text-center hidden md:block">
                    <p className="text-xs text-gray-400">Time</p>
                    <p className="text-xs font-medium text-gray-600">{call.time}</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                    <Phone className="w-3.5 h-3.5" /> Call Back
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

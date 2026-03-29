'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GitBranch, Search, Users, IndianRupee, Calendar, Filter, Phone, MessageCircle } from 'lucide-react';

type Stage = 'inquiry' | 'quoted' | 'negotiating' | 'booked' | 'lost';

const LEADS: {
  id: string; customer: string; phone: string; occasion: string;
  city: string; budget: number; date: string; stage: Stage;
  vendor: string; createdAt: string;
}[] = [
  { id: 'LD-101', customer: 'Ananya Singh',  phone: '+91 98765 43210', occasion: '🎂 Birthday',    city: 'Indore', budget: 5000,  date: '2026-04-20', stage: 'inquiry',    vendor: 'Unassigned',              createdAt: '2026-03-28' },
  { id: 'LD-102', customer: 'Karan Mehta',   phone: '+91 87654 32109', occasion: '💒 Wedding',     city: 'Bhopal', budget: 25000, date: '2026-05-10', stage: 'quoted',     vendor: 'Rohit Decoration House',  createdAt: '2026-03-27' },
  { id: 'LD-103', customer: 'Nisha Rao',     phone: '+91 76543 21098', occasion: '💍 Anniversary', city: 'Indore', budget: 8000,  date: '2026-04-30', stage: 'negotiating',vendor: 'Magic Moments Décor',    createdAt: '2026-03-26' },
  { id: 'LD-104', customer: 'Dhruv Patel',   phone: '+91 65432 10987', occasion: '👶 Baby Shower', city: 'Ujjain', budget: 3000,  date: '2026-04-15', stage: 'booked',     vendor: 'Dreamland Events',        createdAt: '2026-03-24' },
  { id: 'LD-105', customer: 'Sakshi Verma',  phone: '+91 54321 09876', occasion: '🎂 Birthday',    city: 'Indore', budget: 4500,  date: '2026-04-12', stage: 'lost',       vendor: 'Royal Floral Co.',        createdAt: '2026-03-22' },
  { id: 'LD-106', customer: 'Rahul Kumar',   phone: '+91 43210 98765', occasion: '🎓 Graduation',  city: 'Bhopal', budget: 6000,  date: '2026-04-28', stage: 'quoted',     vendor: 'Royal Floral Co.',        createdAt: '2026-03-21' },
];

const STAGE_CONFIG: Record<Stage, { label: string; color: string; bg: string; border: string; variant: 'default' | 'info' | 'warning' | 'success' | 'danger' }> = {
  inquiry:    { label: 'Inquiry',    color: 'text-blue-700',  bg: 'bg-blue-50',   border: 'border-blue-200',  variant: 'info'    },
  quoted:     { label: 'Quoted',     color: 'text-amber-700', bg: 'bg-amber-50',  border: 'border-amber-200', variant: 'warning' },
  negotiating:{ label: 'Negotiating',color: 'text-purple-700',bg: 'bg-purple-50', border: 'border-purple-200',variant: 'default' },
  booked:     { label: 'Booked',     color: 'text-green-700', bg: 'bg-green-50',  border: 'border-green-200', variant: 'success' },
  lost:       { label: 'Lost',       color: 'text-red-600',   bg: 'bg-red-50',    border: 'border-red-200',   variant: 'danger'  },
};

const STAGES: Stage[] = ['inquiry', 'quoted', 'negotiating', 'booked', 'lost'];

export default function AdminPipelinePage() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [search, setSearch] = useState('');

  const filtered = LEADS.filter(l =>
    l.customer.toLowerCase().includes(search.toLowerCase()) ||
    l.occasion.toLowerCase().includes(search.toLowerCase()) ||
    l.city.toLowerCase().includes(search.toLowerCase())
  );

  const byStage = (s: Stage) => filtered.filter(l => l.stage === s);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Lead Pipeline</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Track every lead from inquiry to booking.</p>
        </div>
        <div className="flex gap-2">
          {(['kanban', 'list'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg capitalize transition-all border ${
                view === v ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-gray-500 border-[var(--color-border)] hover:bg-gray-50'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex gap-3 flex-wrap">
        {STAGES.map(s => {
          const cfg = STAGE_CONFIG[s];
          const count = LEADS.filter(l => l.stage === s).length;
          return (
            <div key={s} className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${cfg.border} ${cfg.bg}`}>
              <span className={`font-bold ${cfg.color}`}>{count}</span>
              <span className={`text-sm ${cfg.color}`}>{cfg.label}</span>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search leads by customer, occasion, or city…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
        />
      </div>

      {view === 'kanban' ? (
        /* Kanban view */
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto">
          {STAGES.map(stage => {
            const cfg = STAGE_CONFIG[stage];
            const stageLeads = byStage(stage);
            return (
              <div key={stage} className="space-y-3 min-w-[200px]">
                <div className={`flex items-center justify-between px-3 py-2 rounded-lg ${cfg.bg} border ${cfg.border}`}>
                  <span className={`text-xs font-bold uppercase tracking-wide ${cfg.color}`}>{cfg.label}</span>
                  <span className={`text-xs font-bold ${cfg.color}`}>{stageLeads.length}</span>
                </div>
                {stageLeads.map(lead => (
                  <Card key={lead.id} className={`border ${cfg.border} bg-white`}>
                    <CardContent className="p-3 space-y-2">
                      <div className="font-semibold text-sm">{lead.customer}</div>
                      <div className="text-xs text-gray-500">{lead.occasion} · {lead.city}</div>
                      <div className="text-xs font-medium text-[var(--color-primary)]">₹{lead.budget.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-gray-400">{lead.date}</div>
                      <div className="flex gap-1 pt-1">
                        <button className="flex-1 text-xs py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors">
                          <Phone className="w-3 h-3 inline mr-1" />Call
                        </button>
                        <button className="flex-1 text-xs py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors">
                          <MessageCircle className="w-3 h-3 inline mr-1" />Chat
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        /* List view */
        <Card className="border border-[var(--color-border)]">
          <CardContent className="p-0 divide-y divide-[var(--color-border)]">
            {filtered.length === 0 ? (
              <div className="p-12 text-center text-sm text-gray-400">No leads found.</div>
            ) : filtered.map(lead => {
              const cfg = STAGE_CONFIG[lead.stage];
              return (
                <div key={lead.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-gray-50/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{lead.customer}</span>
                      <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">{lead.occasion} · {lead.city} · {lead.date} · {lead.vendor}</p>
                    <p className="text-xs text-gray-400">{lead.id} · Opened {lead.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="font-bold text-sm">₹{lead.budget.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-gray-400">budget</div>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      <Phone className="w-3.5 h-3.5" /> Contact
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

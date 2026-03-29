'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BOOKING_STAGES } from '@/lib/constants';
import { ShoppingBag, ChevronRight, Star } from 'lucide-react';

const ALL_ORDERS = [
  { id: 'ORD-001', service: 'Golden Balloon Décor', vendor: 'Royal Events', date: '2026-04-15', status: 'confirmed', amount: 4999, stage: 2 },
  { id: 'ORD-002', service: 'Wedding Photography', vendor: 'PixelPro Studios', date: '2026-05-02', status: 'pending', amount: 12500, stage: 1 },
  { id: 'ORD-003', service: 'Mehndi Artist', vendor: 'Henna Queens', date: '2026-03-20', status: 'completed', amount: 2200, stage: 5 },
  { id: 'ORD-004', service: 'DJ & Sound System', vendor: 'DJ Nights', date: '2026-02-14', status: 'completed', amount: 3500, stage: 5 },
];

const STATUS_BADGE: Record<string, React.ReactNode> = {
  pending:   <Badge variant="warning">Pending</Badge>,
  confirmed: <Badge variant="info">Confirmed</Badge>,
  completed: <Badge variant="success">Completed</Badge>,
  cancelled: <Badge variant="danger">Cancelled</Badge>,
};

const TABS = ['All', 'Upcoming', 'Completed', 'Cancelled'];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = ALL_ORDERS.filter(o => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Upcoming') return ['pending', 'confirmed'].includes(o.status);
    if (activeTab === 'Completed') return o.status === 'completed';
    if (activeTab === 'Cancelled') return o.status === 'cancelled';
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab
                ? 'bg-white shadow text-[var(--color-text)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <Card className="border border-[var(--color-border)]">
            <CardContent className="p-12 text-center text-[var(--color-text-muted)]">
              No {activeTab.toLowerCase()} bookings found.
            </CardContent>
          </Card>
        )}

        {filtered.map(order => (
          <Card key={order.id} className="border border-[var(--color-border)] overflow-hidden">
            <button
              className="w-full text-left"
              onClick={() => setExpanded(prev => prev === order.id ? null : order.id)}
            >
              <CardContent className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{order.service}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">by {order.vendor} · {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-sm hidden sm:block">₹{order.amount.toLocaleString('en-IN')}</span>
                  {STATUS_BADGE[order.status]}
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${expanded === order.id ? 'rotate-90' : ''}`} />
                </div>
              </CardContent>
            </button>

            {/* Expanded detail */}
            {expanded === order.id && (
              <div className="px-5 pb-5 border-t border-[var(--color-border)] bg-gray-50/50">
                {/* Progress stepper */}
                <div className="pt-5 pb-4">
                  <div className="flex items-center gap-0">
                    {BOOKING_STAGES.map((stage, idx) => (
                      <React.Fragment key={stage.id}>
                        <div className="flex flex-col items-center gap-1.5 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                            idx < order.stage
                              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                              : idx === order.stage - 1
                              ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] ring-2 ring-orange-200'
                              : 'bg-white text-gray-400 border-gray-200'
                          }`}>
                            {idx < order.stage ? '✓' : stage.step}
                          </div>
                          <span className="text-[10px] text-center text-[var(--color-text-muted)]">{stage.label}</span>
                        </div>
                        {idx < BOOKING_STAGES.length - 1 && (
                          <div className={`h-0.5 flex-1 mb-5 ${idx < order.stage - 1 ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap">
                  {order.status === 'completed' && (
                    <Button size="sm" variant="outline" className="gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500" /> Write a Review
                    </Button>
                  )}
                  <Button size="sm" variant="secondary">Contact Vendor</Button>
                  {['pending', 'confirmed'].includes(order.status) && (
                    <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">Cancel Booking</Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

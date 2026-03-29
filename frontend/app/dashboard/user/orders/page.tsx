'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Clock, Package, Star, ChevronRight, IndianRupee } from 'lucide-react';
import Link from 'next/link';

type OrderStatus = 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

const ORDERS: { id: string; service: string; vendor: string; amount: number; status: OrderStatus; date: string; rating: number | null }[] = [
  { id: 'ORD-201', service: 'Birthday Décor Premium',    vendor: 'Rohit Decoration House', amount: 4999,  status: 'in_progress', date: '2026-04-02', rating: null },
  { id: 'ORD-202', service: 'Anniversary Decoration',    vendor: 'Magic Moments Décor',    amount: 3200,  status: 'confirmed',   date: '2026-04-08', rating: null },
  { id: 'ORD-203', service: 'Baby Shower Setup',         vendor: 'Dreamland Events',       amount: 2800,  status: 'completed',   date: '2026-03-28', rating: 5 },
  { id: 'ORD-204', service: 'Wedding Floral Setup',      vendor: 'Royal Floral Co.',        amount: 18500, status: 'completed',   date: '2026-03-10', rating: 4 },
  { id: 'ORD-205', service: 'Birthday Balloon Package',  vendor: 'Balloon World',           amount: 1500,  status: 'cancelled',   date: '2026-02-21', rating: null },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; variant: 'warning' | 'info' | 'success' | 'danger'; icon: React.ElementType }> = {
  confirmed:   { label: 'Confirmed',   variant: 'info',    icon: CheckCircle },
  in_progress: { label: 'In Progress', variant: 'warning', icon: Clock },
  completed:   { label: 'Completed',   variant: 'success', icon: CheckCircle },
  cancelled:   { label: 'Cancelled',   variant: 'danger',  icon: Package },
};

const STEPS = ['Order Placed', 'Confirmed', 'In Progress', 'Completed'];
const STATUS_STEP: Record<OrderStatus, number> = { confirmed: 1, in_progress: 2, completed: 3, cancelled: -1 };

export default function UserOrdersPage() {
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = ORDERS.filter(o => activeTab === 'all' || o.status === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Track all your event bookings and services.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'in_progress', 'confirmed', 'completed', 'cancelled'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-full border transition-all capitalize ${
              activeTab === tab ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-gray-500 border-[var(--color-border)] hover:bg-gray-50'
            }`}
          >
            {tab === 'all' ? 'All Orders' : tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="border border-dashed border-gray-200">
            <CardContent className="p-12 text-center text-sm text-gray-400">No orders found.</CardContent>
          </Card>
        ) : filtered.map(order => {
          const cfg = STATUS_CONFIG[order.status];
          const step = STATUS_STEP[order.status];
          const isExpanded = expandedId === order.id;
          return (
            <Card key={order.id} className="border border-[var(--color-border)] overflow-hidden">
              <button
                className="w-full text-left"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{order.service}</span>
                      <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">by {order.vendor} · {order.date}</p>
                    {order.rating && (
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: order.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                        <span className="text-xs text-gray-400 ml-1">Your rating</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="font-bold">₹{order.amount.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-gray-400">{order.id}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </CardContent>
              </button>

              {/* Expanded: steps */}
              {isExpanded && order.status !== 'cancelled' && (
                <div className="border-t border-[var(--color-border)] px-5 py-4 bg-gray-50/50 space-y-4">
                  <div className="flex items-center gap-2">
                    {STEPS.map((s, i) => (
                      <React.Fragment key={s}>
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            i <= step ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-200 text-gray-400'
                          }`}>
                            {i <= step ? '✓' : i + 1}
                          </div>
                          <span className="text-[10px] text-gray-500 text-center whitespace-nowrap">{s}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className={`flex-1 h-0.5 mb-4 rounded ${i < step ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {order.status === 'completed' && !order.rating && (
                      <Link href={`/dashboard/user/review/${order.id}`}>
                        <Button size="sm" className="gap-1.5">
                          <Star className="w-3.5 h-3.5" /> Leave Review
                        </Button>
                      </Link>
                    )}
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <IndianRupee className="w-3.5 h-3.5" /> View Invoice
                    </Button>
                    {order.status === 'confirmed' && (
                      <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">Cancel Order</Button>
                    )}
                  </div>
                </div>
              )}
              {isExpanded && order.status === 'cancelled' && (
                <div className="border-t border-[var(--color-border)] px-5 py-3 bg-red-50/50 text-sm text-red-500">
                  This order was cancelled. A refund (if applicable) will be processed within 5–7 business days.
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

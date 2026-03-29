'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, ChevronRight, Phone, MessageCircle, CheckCircle } from 'lucide-react';

const ALL_ORDERS = [
  { id: 'ORD-201', customer: 'Priya Sharma', service: 'Birthday Décor Premium', amount: 4999, status: 'in_progress', date: '2026-04-15', city: 'Indore', phone: '+91 9876543210' },
  { id: 'ORD-202', customer: 'Rahul Gupta', service: 'Anniversary Decoration', amount: 3200, status: 'confirmed', date: '2026-04-22', city: 'Bhopal', phone: '+91 8765432109' },
  { id: 'ORD-203', customer: 'Sunita Verma', service: 'Baby Shower Setup', amount: 2800, status: 'completed', date: '2026-03-28', city: 'Indore', phone: '+91 7654321098' },
  { id: 'ORD-204', customer: 'Amit Patel', service: 'Wedding Photography', amount: 18000, status: 'confirmed', date: '2026-05-10', city: 'Bhopal', phone: '+91 6543210987' },
  { id: 'ORD-205', customer: 'Kavya Modi', service: 'Engagement Balloon Arch', amount: 6500, status: 'completed', date: '2026-03-15', city: 'Indore', phone: '+91 5432109876' },
];

const STATUS_BADGE: Record<string, React.ReactNode> = {
  confirmed:   <Badge variant="info">Confirmed</Badge>,
  in_progress: <Badge variant="warning">In Progress</Badge>,
  completed:   <Badge variant="success">Completed</Badge>,
  cancelled:   <Badge variant="danger">Cancelled</Badge>,
};

const TABS = ['All', 'Active', 'Completed'];

export default function VendorOrdersPage() {
  const [tab, setTab] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = ALL_ORDERS.filter(o => {
    if (tab === 'Active') return ['confirmed', 'in_progress'].includes(o.status);
    if (tab === 'Completed') return o.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              tab === t ? 'bg-white shadow text-[var(--color-text)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(order => (
          <Card key={order.id} className="border border-[var(--color-border)] overflow-hidden">
            <button
              className="w-full text-left"
              onClick={() => setExpanded(p => p === order.id ? null : order.id)}
            >
              <CardContent className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{order.service}</p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{order.customer} · {order.city} · {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-sm hidden sm:block">₹{order.amount.toLocaleString('en-IN')}</span>
                  {STATUS_BADGE[order.status]}
                  <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform ${expanded === order.id ? 'rotate-90' : ''}`} />
                </div>
              </CardContent>
            </button>

            {expanded === order.id && (
              <div className="px-5 pb-5 border-t border-[var(--color-border)] bg-gray-50/50">
                <div className="pt-4 flex flex-wrap gap-3">
                  <Button size="sm" variant="secondary" className="gap-2">
                    <Phone className="w-3.5 h-3.5" /> Call Customer
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </Button>
                  {order.status === 'in_progress' && (
                    <Button size="sm" className="gap-2 bg-green-500 hover:bg-green-600 text-white border-0">
                      <CheckCircle className="w-3.5 h-3.5" /> Mark as Completed
                    </Button>
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

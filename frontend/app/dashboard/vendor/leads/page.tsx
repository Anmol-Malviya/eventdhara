'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LEAD_TIMER_SECONDS } from '@/lib/constants';
import { Bell, Clock, CheckCircle, XCircle, MapPin, Calendar, IndianRupee, Users } from 'lucide-react';

const LEADS = [
  { id: 'LD-101', occasion: 'Birthday', emoji: '🎂', city: 'Indore', budget: 5000, date: '2026-04-20', urgency: 'HIGH', guestCount: 50, notes: 'Need balloon arch + fairy lights', timeLeft: 847 },
  { id: 'LD-102', occasion: 'Wedding', emoji: '💒', city: 'Bhopal', budget: 25000, date: '2026-05-10', urgency: 'MEDIUM', guestCount: 200, notes: 'Premium floral setup for reception', timeLeft: 1180 },
  { id: 'LD-103', occasion: 'Anniversary', emoji: '💍', city: 'Indore', budget: 8000, date: '2026-04-30', urgency: 'LOW', guestCount: 30, notes: 'Romantic candle dinner setup', timeLeft: 300 },
];

function CountdownTimer({ initialSeconds }: { initialSeconds: number }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pct = Math.max(0, (seconds / LEAD_TIMER_SECONDS) * 100);
  const isUrgent = seconds < 300;
  const isDead = seconds <= 0;

  if (isDead) return <Badge variant="danger">Expired</Badge>;

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <circle
            cx="22" cy="22" r="18" fill="none"
            stroke={isUrgent ? '#ef4444' : '#F97316'}
            strokeWidth="4"
            strokeDasharray={`${(pct / 100) * 113.1} 113.1`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-500' : 'text-[var(--color-primary)]'}`} />
        </div>
      </div>
      <div>
        <div className={`text-base font-mono font-bold ${isUrgent ? 'text-red-500' : 'text-[var(--color-text)]'}`}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>
        <div className="text-xs text-gray-400">{isUrgent ? 'Act now!' : 'left'}</div>
      </div>
    </div>
  );
}

const URGENCY_BADGE: Record<string, React.ReactNode> = {
  HIGH:   <Badge variant="danger">🔴 High Urgency</Badge>,
  MEDIUM: <Badge variant="warning">🟡 Medium</Badge>,
  LOW:    <Badge variant="default">🟢 Low</Badge>,
};

export default function VendorLeadsPage() {
  const [accepted, setAccepted] = useState<string[]>([]);
  const [declined, setDeclined] = useState<string[]>([]);

  const activeleads = LEADS.filter(l => !accepted.includes(l.id) && !declined.includes(l.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Leads</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Accept leads within 20 minutes — missed leads reduce your score.
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3 text-sm">
        <Bell className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[var(--color-text)]">How leads work:</strong>
          <span className="text-[var(--color-text-muted)] ml-1">
            You receive leads based on your score, city, and availability.
            Accepting leads boosts your completion rate and score.
          </span>
        </div>
      </div>

      {activeleads.length === 0 ? (
        <Card className="border border-[var(--color-border)]">
          <CardContent className="p-16 text-center space-y-3">
            <Bell className="w-12 h-12 text-gray-200 mx-auto" />
            <p className="text-[var(--color-text-muted)] font-medium">No new leads at the moment.</p>
            <p className="text-sm text-gray-400">We'll notify you when new leads arrive in your city.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {activeleads.map(lead => (
            <Card key={lead.id} className="border-2 border-[var(--color-primary)]/30 bg-gradient-to-r from-orange-50/50 to-transparent overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  {/* Lead details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-2xl">{lead.emoji}</span>
                      <h2 className="text-xl font-bold">{lead.occasion}</h2>
                      {URGENCY_BADGE[lead.urgency]}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                        <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                        <span>{lead.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                        <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
                        <span>{lead.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                        <IndianRupee className="w-4 h-4 text-[var(--color-primary)]" />
                        <span>₹{lead.budget.toLocaleString('en-IN')} budget</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                        <Users className="w-4 h-4 text-[var(--color-primary)]" />
                        <span>{lead.guestCount} guests</span>
                      </div>
                    </div>

                    {lead.notes && (
                      <div className="bg-white rounded-lg px-4 py-2.5 text-sm text-[var(--color-text-muted)] border border-[var(--color-border)]">
                        💬 <em>"{lead.notes}"</em>
                      </div>
                    )}
                  </div>

                  {/* Timer + Actions */}
                  <div className="flex flex-row md:flex-col items-center gap-4 shrink-0">
                    <CountdownTimer initialSeconds={lead.timeLeft} />
                    <div className="flex flex-col gap-2 w-full">
                      <Button
                        className="gap-2 bg-green-500 hover:bg-green-600 text-white border-0 shadow-md"
                        onClick={() => setAccepted(prev => [...prev, lead.id])}
                      >
                        <CheckCircle className="w-4 h-4" /> Accept Lead
                      </Button>
                      <Button
                        variant="ghost"
                        className="gap-2 text-red-500 hover:bg-red-50"
                        onClick={() => setDeclined(prev => [...prev, lead.id])}
                      >
                        <XCircle className="w-4 h-4" /> Decline
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Accepted summary */}
      {accepted.length > 0 && (
        <Card className="border border-green-200 bg-green-50">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-green-800">
              ✅ You accepted {accepted.length} lead{accepted.length > 1 ? 's' : ''}. Check <strong>My Orders</strong> to start working.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

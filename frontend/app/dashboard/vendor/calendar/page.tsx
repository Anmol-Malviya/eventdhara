'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, CalendarDays, Clock, MapPin } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const BOOKINGS: Record<string, { occasion: string; customer: string; city: string; status: string; time: string }[]> = {
  '2026-04-05': [{ occasion: '🎂 Birthday', customer: 'Priya Sharma', city: 'Indore', status: 'confirmed', time: '4:00 PM' }],
  '2026-04-10': [{ occasion: '💒 Wedding', customer: 'Rahul + Meena', city: 'Bhopal', status: 'in_progress', time: '10:00 AM' }],
  '2026-04-15': [{ occasion: '👶 Baby Shower', customer: 'Sunita Verma', city: 'Indore', status: 'confirmed', time: '2:00 PM' }],
  '2026-04-20': [
    { occasion: '🎂 Birthday', customer: 'Amit Joshi', city: 'Indore', status: 'pending', time: '6:00 PM' },
    { occasion: '💍 Anniversary', customer: 'Mr & Mrs Patel', city: 'Ujjain', status: 'confirmed', time: '7:30 PM' },
  ],
  '2026-04-28': [{ occasion: '🎓 Graduation', customer: 'Komal Singh', city: 'Bhopal', status: 'confirmed', time: '12:00 PM' }],
};

const STATUS_CONFIG: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'danger' }> = {
  confirmed:   { label: 'Confirmed',   variant: 'success' },
  in_progress: { label: 'In Progress', variant: 'warning' },
  pending:     { label: 'Pending',     variant: 'info' },
  cancelled:   { label: 'Cancelled',   variant: 'danger' },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

export default function VendorCalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const dateKey = (day: number) => `${year}-${pad2(month + 1)}-${pad2(day)}`;
  const selectedBookings = selected ? (BOOKINGS[selected] ?? []) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Booking Calendar</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">View and manage your scheduled events.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-6">
        {/* Calendar Grid */}
        <Card className="border border-[var(--color-border)]">
          <CardContent className="p-5">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
              <h2 className="font-semibold text-lg">{MONTHS[month]} {year}</h2>
              <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
              ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, idx) => {
                if (!day) return <div key={idx} />;
                const key = dateKey(day);
                const hasBooking = !!BOOKINGS[key];
                const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                const isSelected = key === selected;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelected(isSelected ? null : key)}
                    className={`relative aspect-square rounded-lg flex flex-col items-center justify-start pt-1.5 text-sm font-medium transition-all
                      ${isSelected ? 'bg-[var(--color-primary)] text-white shadow-md' : isToday ? 'bg-orange-50 text-[var(--color-primary)] font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    {day}
                    {hasBooking && (
                      <span className={`mt-1 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[var(--color-primary)]'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Booking Detail Panel */}
        <div className="space-y-3">
          {selected ? (
            <>
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-muted)]">
                <CalendarDays className="w-4 h-4 text-[var(--color-primary)]" />
                {new Date(selected + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
              </div>
              {selectedBookings.length > 0 ? selectedBookings.map((b, i) => (
                <Card key={i} className="border border-[var(--color-border)] hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{b.occasion}</span>
                      <Badge variant={STATUS_CONFIG[b.status]?.variant ?? 'default'}>
                        {STATUS_CONFIG[b.status]?.label ?? b.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] font-medium">{b.customer}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 pt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{b.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{b.city}</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button size="sm" variant="outline" className="flex-1 text-xs">View Order</Button>
                      <Button size="sm" className="flex-1 text-xs">Contact</Button>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <Card className="border border-dashed border-gray-200">
                  <CardContent className="p-6 text-center text-sm text-gray-400">No bookings on this day.</CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="border border-dashed border-gray-200">
              <CardContent className="p-8 text-center space-y-2">
                <CalendarDays className="w-8 h-8 text-gray-200 mx-auto" />
                <p className="text-sm text-gray-400">Click a date to view bookings.</p>
              </CardContent>
            </Card>
          )}

          {/* Legend */}
          <div className="text-xs text-gray-400 flex items-center gap-2 pt-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] inline-block" />
            Dates with bookings
          </div>
        </div>
      </div>
    </div>
  );
}

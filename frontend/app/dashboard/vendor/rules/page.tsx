'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CheckCircle, AlertCircle, Info, Shield, Clock, Star, IndianRupee, Users, Zap } from 'lucide-react';

const RULES = [
  {
    section: 'Lead Management',
    icon: Zap,
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    items: [
      { text: 'Accept or decline leads within 20 minutes. Missed leads reduce your monthly score.', type: 'warning' as const },
      { text: 'You can decline up to 5 leads per month without penalty.', type: 'info' as const },
      { text: 'Accepted leads must be fulfilled. Canceling after acceptance leads to a score deduction.', type: 'warning' as const },
      { text: 'Leads are distributed based on your score, city coverage, and availability status.', type: 'info' as const },
    ],
  },
  {
    section: 'Orders & Delivery',
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    items: [
      { text: 'Confirm the order within 2 hours of customer payment.', type: 'info' as const },
      { text: 'Be on-site at least 30 minutes before the event start time.', type: 'warning' as const },
      { text: 'Mark the order "Completed" in the app after delivery. Do not rely on the customer to do it.', type: 'info' as const },
      { text: 'Photo proof of decoration must be uploaded for all orders above ₹5,000.', type: 'warning' as const },
    ],
  },
  {
    section: 'Payments & Earnings',
    icon: IndianRupee,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    items: [
      { text: 'EventDhara collects a 10% platform commission on all orders.', type: 'info' as const },
      { text: 'Earnings are released within 48 hours of order completion.', type: 'info' as const },
      { text: 'Do not accept cash from customers for orders booked via the platform.', type: 'warning' as const },
      { text: 'Premium vendors receive payouts within 24 hours.', type: 'success' as const },
    ],
  },
  {
    section: 'Customer Conduct',
    icon: Users,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    items: [
      { text: 'Treat every customer with respect. Rude behavior results in immediate suspension.', type: 'warning' as const },
      { text: 'Do not share personal contact details with customers outside the platform.', type: 'warning' as const },
      { text: 'Respond to customer messages within 4 hours during business hours.', type: 'info' as const },
      { text: 'All disputes must be raised through the platform. Direct settlement is not allowed.', type: 'warning' as const },
    ],
  },
  {
    section: 'Reviews & Ratings',
    icon: Star,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    items: [
      { text: 'You may report a review if it is abusive or factually incorrect.', type: 'info' as const },
      { text: 'Vendors with average rating below 3.5 for 3 consecutive months face suspension.', type: 'warning' as const },
      { text: 'Positive reviews boost your score and lead priority.', type: 'success' as const },
    ],
  },
  {
    section: 'Account & Compliance',
    icon: Shield,
    color: 'text-gray-600',
    bg: 'bg-gray-100',
    items: [
      { text: 'Keep your profile, portfolio, and service packages up to date.', type: 'info' as const },
      { text: 'Vendors must complete KYC verification within 30 days of registration.', type: 'warning' as const },
      { text: 'Any fraudulent activity results in permanent account ban and legal action.', type: 'warning' as const },
      { text: 'EventDhara reserves the right to modify these rules at any time with 7-day notice.', type: 'info' as const },
    ],
  },
];

const TYPE_CONFIG = {
  info:    { icon: Info,         color: 'text-blue-500',   bg: 'bg-blue-50'   },
  warning: { icon: AlertCircle,  color: 'text-amber-500',  bg: 'bg-amber-50'  },
  success: { icon: CheckCircle,  color: 'text-green-500',  bg: 'bg-green-50'  },
};

export default function VendorRulesPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Vendor Rules & Guidelines</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Please read and follow all platform rules to maintain your account standing.
        </p>
      </div>

      {/* Last updated banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-sm">
        <Clock className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" style={{ width: '1.125rem', height: '1.125rem' }} />
        <div>
          <strong className="text-blue-800">Last updated:</strong>
          <span className="text-blue-600 ml-1">March 2026 — v2.1</span>
        </div>
      </div>

      {/* Rules sections */}
      {RULES.map(section => (
        <Card key={section.section} className="border border-[var(--color-border)]">
          <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg ${section.bg} flex items-center justify-center`}>
              <section.icon className={`w-4 h-4 ${section.color}`} />
            </div>
            <h2 className="font-semibold">{section.section}</h2>
          </div>
          <CardContent className="p-5 space-y-3">
            {section.items.map((item, i) => {
              const cfg = TYPE_CONFIG[item.type];
              return (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${cfg.bg}`}>
                  <cfg.icon className={`w-4 h-4 ${cfg.color} shrink-0 mt-0.5`} />
                  <p className="text-sm text-gray-700">{item.text}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}

      {/* Agreement */}
      <Card className="border-2 border-[var(--color-primary)]/30 bg-orange-50/30">
        <CardContent className="p-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[var(--color-primary)]"
            />
            <span className="text-sm text-gray-700">
              I have read, understood, and agree to abide by all EventDhara vendor rules and guidelines.
            </span>
          </label>
          <div className="mt-4">
            <Button disabled={!agreed} className="gap-2">
              <CheckCircle className="w-4 h-4" /> Confirm Agreement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

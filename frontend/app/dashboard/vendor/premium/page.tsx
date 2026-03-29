'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Star, Zap, TrendingUp, Bell, Shield, CheckCircle, Award } from 'lucide-react';

const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'Free forever',
    badge: null,
    features: [
      'Up to 5 leads/month',
      'Basic profile listing',
      'Standard support',
      'Bronze / Silver tier only',
    ],
    cta: 'Current Plan',
    disabled: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 999,
    period: '/month',
    badge: 'Most Popular',
    features: [
      'Unlimited leads',
      'Priority lead allocation',
      'Featured profile badge',
      'Gold tier access',
      'WhatsApp notification alerts',
      'Analytics dashboard access',
    ],
    cta: 'Upgrade to Pro',
    disabled: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 2499,
    period: '/month',
    badge: 'Best Value',
    features: [
      'Everything in Pro',
      'Premium tier & 💎 badge',
      'Top 3 search placement',
      'Dedicated account manager',
      'AI-driven lead matching',
      'Priority dispute resolution',
      'Custom portfolio showcase',
    ],
    cta: 'Upgrade to Premium',
    disabled: false,
  },
];

const PERKS = [
  { icon: Bell,      title: 'Priority Lead Alerts',   desc: 'Get notified of high-value leads before others.' },
  { icon: TrendingUp,title: 'Score Boost',             desc: 'Premium status adds +20 pts to your vendor score.' },
  { icon: Shield,    title: 'Verified Badge',          desc: 'Build customer trust with our verified seal.' },
  { icon: Zap,       title: 'Faster Payouts',          desc: 'Receive earnings within 24 hours of order completion.' },
];

export default function VendorPremiumPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="text-center space-y-2">
        <Badge variant="accent" className="text-sm px-3 py-1">💎 Premium Plans</Badge>
        <h1 className="text-3xl font-extrabold">Grow Faster with Premium</h1>
        <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-sm">
          Unlock priority leads, featured placement, and powerful analytics to maximize your earnings on EventDhara.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-full p-1 flex gap-1">
          {(['monthly', 'annual'] as const).map(b => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={`px-5 py-1.5 rounded-full text-sm font-semibold capitalize transition-all ${
                billing === b ? 'bg-white shadow text-[var(--color-text)]' : 'text-gray-400'
              }`}
            >
              {b}
              {b === 'annual' && <span className="ml-1.5 text-xs text-green-600 font-bold">-20%</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map(plan => {
          const price = billing === 'annual' && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price;
          const isPro = plan.id === 'pro';
          const isPremium = plan.id === 'premium';
          return (
            <Card
              key={plan.id}
              className={`relative border-2 flex flex-col transition-shadow ${
                isPremium ? 'border-rose-400 shadow-xl scale-[1.02]' : isPro ? 'border-[var(--color-primary)] shadow-md' : 'border-[var(--color-border)]'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-0.5 rounded-full text-white ${isPremium ? 'bg-rose-500' : 'bg-[var(--color-primary)]'}`}>
                  {plan.badge}
                </div>
              )}
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-1">
                    {isPremium ? <Award className="w-5 h-5 text-rose-500" /> : isPro ? <Star className="w-5 h-5 text-[var(--color-primary)]" /> : <Shield className="w-5 h-5 text-gray-400" />}
                    <h2 className="font-bold text-lg">{plan.name}</h2>
                  </div>
                  <div className="text-3xl font-extrabold mt-3">
                    {price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`}
                    <span className="text-sm font-normal text-gray-400 ml-1">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isPremium ? 'text-rose-500' : isPro ? 'text-[var(--color-primary)]' : 'text-gray-400'}`} />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  disabled={plan.disabled}
                  className={`w-full ${isPremium ? 'bg-rose-500 hover:bg-rose-600 border-0 text-white' : ''}`}
                  variant={plan.disabled ? 'outline' : 'primary'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Perks */}
      <div>
        <h2 className="text-xl font-bold mb-4">Why go Premium?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {PERKS.map(p => (
            <Card key={p.title} className="border border-[var(--color-border)]">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <p.icon className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{p.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{p.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trust note */}
      <div className="text-center text-xs text-gray-400 pb-4">
        🔒 Secure payment via Razorpay · Cancel anytime · GST invoice provided
      </div>
    </div>
  );
}

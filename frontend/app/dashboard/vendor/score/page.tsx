'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SCORE_METRICS, VENDOR_TIERS } from '@/lib/constants';
import { TrendingUp, Star, Clock, CheckCircle, MapPin, Award } from 'lucide-react';

const SCORE_DATA = {
  rating: 85,
  response_time: 90,
  completion: 78,
  proximity: 70,
  premium: 100,
  total: 85,
};

const ICON_MAP: Record<string, React.ReactNode> = {
  rating:        <Star className="w-4 h-4" />,
  response_time: <Clock className="w-4 h-4" />,
  completion:    <CheckCircle className="w-4 h-4" />,
  proximity:     <MapPin className="w-4 h-4" />,
  premium:       <Award className="w-4 h-4" />,
};

const TIER_INFO = [
  { key: 'BRONZE', label: 'Bronze', range: '0–39',  color: '#cd7f32', bg: 'bg-orange-50',  active: false },
  { key: 'SILVER', label: 'Silver', range: '40–69', color: '#c0c0c0', bg: 'bg-gray-100',   active: false },
  { key: 'GOLD',   label: 'Gold',   range: '70–89', color: '#ffd700', bg: 'bg-yellow-50',  active: true },
  { key: 'PREMIUM',label: 'Premium',range: '90–100',color: '#f43f5e', bg: 'bg-rose-50',    active: false },
];

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f97316' : '#ef4444';

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="60" cy="60" r="52" fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold" style={{ color }}>{score}</span>
        <span className="text-xs text-gray-400 font-medium">/ 100</span>
      </div>
    </div>
  );
}

export default function VendorScorePage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">My Vendor Score</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Your score determines lead priority and your tier badge visible to customers.
        </p>
      </div>

      {/* Score ring */}
      <Card className="border border-[var(--color-border)]">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0">
            <ScoreRing score={SCORE_DATA.total} />
            <div className="text-center mt-4">
              <Badge variant="accent" className="text-sm px-3 py-1">🏆 GOLD Tier</Badge>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-bold">You're doing great!</h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              Your current score of <strong>85</strong> puts you in the <strong>Gold</strong> tier.
              Reach <strong>90+</strong> to unlock Premium status and get priority lead allocation.
            </p>
            <div className="pt-2">
              <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
                <span>Progress to Premium</span>
                <span>85 / 90</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-rose-500" style={{ width: '94%' }} />
              </div>
              <p className="text-xs text-gray-400 mt-1.5">5 more points to reach Premium 🎯</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metric Breakdown */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[var(--color-primary)]" />
            Score Breakdown
          </h2>
        </div>
        <CardContent className="p-6 space-y-5">
          {SCORE_METRICS.map(metric => {
            const score = SCORE_DATA[metric.id as keyof typeof SCORE_DATA] as number;
            const barColor = score >= 80 ? '#22c55e' : score >= 60 ? '#f97316' : '#ef4444';
            const impact = Math.round((score * metric.weight) / 100);
            return (
              <div key={metric.id}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-[var(--color-primary)]">{ICON_MAP[metric.id]}</span>
                    {metric.label}
                    <span className="text-xs text-gray-400 font-normal">({metric.weight}% weight)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">+{impact} pts</span>
                    <span className="font-bold text-sm" style={{ color: barColor }}>{score}/100</span>
                  </div>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${score}%`, backgroundColor: barColor }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Tier Ladder */}
      <Card className="border border-[var(--color-border)]">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="font-semibold">Tier Ladder</h2>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TIER_INFO.map(tier => (
              <div
                key={tier.key}
                className={`p-4 rounded-xl border-2 text-center space-y-2 ${
                  tier.active
                    ? 'border-amber-400 bg-amber-50 shadow-md'
                    : 'border-[var(--color-border)] bg-gray-50'
                }`}
              >
                <div className="text-2xl">
                  {tier.key === 'BRONZE' ? '🥉' : tier.key === 'SILVER' ? '🥈' : tier.key === 'GOLD' ? '🥇' : '💎'}
                </div>
                <div className="font-bold text-sm" style={{ color: tier.color }}>{tier.label}</div>
                <div className="text-xs text-gray-500">{tier.range} pts</div>
                {tier.active && <Badge variant="warning" className="text-[10px]">Current</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

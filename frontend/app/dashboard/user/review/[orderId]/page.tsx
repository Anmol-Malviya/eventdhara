'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Star, ArrowLeft, CheckCircle, Camera, Send,
  ThumbsUp, Award, Clock, Heart
} from 'lucide-react';

const REVIEW_ASPECTS = [
  { id: 'quality',       label: 'Work Quality',     icon: Award },
  { id: 'punctuality',   label: 'Punctuality',       icon: Clock },
  { id: 'communication', label: 'Communication',     icon: Send },
  { id: 'value',         label: 'Value for Money',   icon: ThumbsUp },
];

// Mock order data based on orderId
const MOCK_ORDER = {
  id: 'ORD-205',
  service: 'Premium Balloon Bouquet Arch',
  vendor: 'Balloon World Studio',
  date: '2026-03-25',
  amount: 2499,
  emoji: '🎈',
  gradient: 'from-orange-200 to-amber-100',
};

export default function ReviewPage() {
  const params     = useParams();
  const router     = useRouter();
  const orderId    = params.orderId as string;

  const [overall, setOverall]       = useState(0);
  const [hoverOverall, setHoverOverall] = useState(0);
  const [aspects, setAspects]       = useState<Record<string, number>>({});
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setAspect = (id: string, val: number) =>
    setAspects(prev => ({ ...prev, [id]: val }));

  const handleSubmit = async () => {
    if (overall === 0) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  const canSubmit = overall > 0 && reviewText.trim().length >= 10;

  const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'];

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-16">
        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Review Submitted!</h1>
          <p className="text-[var(--color-text-muted)] mt-2 text-sm">
            Thank you for your feedback. It helps other users make better decisions and motivates vendors to deliver excellence.
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 text-amber-500">
          {Array(overall).fill(0).map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-current" />
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/dashboard/user/orders">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> My Orders
            </Button>
          </Link>
          <Link href="/shop">
            <Button className="gap-2">
              <Heart className="w-4 h-4" /> Browse More Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/user/orders"
        className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Write a Review</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Share your experience with this service</p>
      </div>

      {/* Order context */}
      <Card className="border border-[var(--color-border)]">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${MOCK_ORDER.gradient} flex items-center justify-center text-3xl shrink-0`}>
              {MOCK_ORDER.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{MOCK_ORDER.service}</h3>
              <p className="text-sm text-gray-500 mt-0.5">by {MOCK_ORDER.vendor}</p>
              <div className="flex items-center gap-3 mt-1">
                <Badge variant="default" className="text-[10px]">{orderId || MOCK_ORDER.id}</Badge>
                <span className="text-xs text-gray-400">{MOCK_ORDER.date}</span>
                <span className="text-xs font-semibold text-[var(--color-primary)]">₹{MOCK_ORDER.amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Rating */}
      <Card className="border-2 border-[var(--color-primary)]/30">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-bold text-lg">Overall Rating</h2>
          <p className="text-sm text-gray-500">How was your overall experience?</p>

          <div className="flex items-center gap-3 py-2">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverOverall(star)}
                  onMouseLeave={() => setHoverOverall(0)}
                  onClick={() => setOverall(star)}
                  className="transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoverOverall || overall)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            {(hoverOverall || overall) > 0 && (
              <span className="text-lg font-bold text-amber-500">
                {STAR_LABELS[hoverOverall || overall]}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Aspect Ratings */}
      <Card className="border border-[var(--color-border)]">
        <CardContent className="p-6 space-y-5">
          <h2 className="font-bold">Rate Specific Aspects</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {REVIEW_ASPECTS.map(aspect => (
              <div key={aspect.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <aspect.icon className="w-4 h-4 text-[var(--color-primary)]" />
                  <label className="text-sm font-medium">{aspect.label}</label>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button
                      key={s}
                      onClick={() => setAspect(aspect.id, s)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          s <= (aspects[aspect.id] ?? 0)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Written Review */}
      <Card className="border border-[var(--color-border)]">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-bold">Your Review</h2>
          <div className="space-y-2">
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Tell others what made this service great (or not)... Be honest and specific — your review helps both vendors and future customers."
              className="w-full px-4 py-3 text-sm border border-[var(--color-border)] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 min-h-[120px]"
              maxLength={1000}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{reviewText.length < 10 ? `${10 - reviewText.length} more characters required` : '✓ Minimum length met'}</span>
              <span>{reviewText.length}/1000</span>
            </div>
          </div>

          {/* Photo upload placeholder */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Add Photos (optional)</p>
            <div className="grid grid-cols-4 gap-2">
              {Array(4).fill(0).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-[var(--color-primary)] transition-colors flex items-center justify-center cursor-pointer group"
                >
                  <Camera className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-primary)] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <Button
          size="lg"
          className="flex-1 h-12 gap-2"
          disabled={!canSubmit}
          isLoading={submitting}
          onClick={handleSubmit}
        >
          <Send className="w-4 h-4" /> Submit Review
        </Button>
        <Link href="/dashboard/user/orders">
          <Button variant="outline" size="lg" className="h-12">Cancel</Button>
        </Link>
      </div>

      {!canSubmit && overall === 0 && (
        <p className="text-xs text-amber-600 text-center">
          ⭐ Please select an overall rating to continue
        </p>
      )}
    </div>
  );
}

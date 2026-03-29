'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { useCart } from '@/context/CartContext';
import {
  Star, Heart, Shield, MapPin, ChevronRight, ShoppingCart,
  CheckCircle, Calendar, Clock, Share2, ArrowLeft
} from 'lucide-react';

const CATEGORY_GRADIENTS: Record<string, string> = {
  'balloon': 'from-orange-300 via-amber-200 to-orange-100',
  'floral':  'from-rose-300 via-pink-200 to-rose-100',
  'cake':    'from-amber-300 via-yellow-200 to-orange-100',
  'photo':   'from-blue-300 via-sky-200 to-cyan-100',
  'video':   'from-purple-300 via-purple-200 to-indigo-100',
  'makeup':  'from-pink-300 via-rose-200 to-fuchsia-100',
  'dj':      'from-indigo-300 via-blue-200 to-purple-100',
  'mehndi':  'from-green-300 via-emerald-200 to-teal-100',
  'light':   'from-yellow-300 via-amber-200 to-yellow-100',
  'invite':  'from-teal-300 via-cyan-200 to-blue-100',
};

// Rich dummy service data (would come from API)
const DUMMY_SERVICE = {
  id: 'sv-default',
  name: 'Premium Golden Glow Event Decoration',
  category: 'Balloon Decoration',
  categoryKey: 'balloon',
  emoji: '🎈',
  rating: 4.8,
  reviews: 124,
  description: 'Transform any venue into a magical space with our signature golden theme balloon and floral arrangements. Perfect for anniversaries, birthdays, and grand celebrations in Indore and nearby areas.',
  includes: [
    'Professional setup & teardown (included)',
    'Transportation within city limits',
    'High-quality imported metallic balloons',
    '4 hours of dedicated support during the event',
    'Same-day booking available',
  ],
  vendor: {
    name: 'Royal Events Ltd',
    score: 92,
    tier: 'PREMIUM',
    location: 'Indore',
    ordersCompleted: 187,
    responseTime: '< 30 min',
  },
  packages: [
    { id: 'starter', name: 'Starter Package', price: 2999, desc: 'Basic balloon arch, 100 loose balloons, happy birthday banner.', popular: false },
    { id: 'classic', name: 'Classic Package', price: 4999, desc: 'Premium balloon arrangements, LED tags, floral touchups, 200 balloons.', popular: true },
    { id: 'luxury',  name: 'Luxury Package',  price: 8999, desc: 'Complete venue transformation, thematic backdrops, props, customized lighting.', popular: false },
  ],
};

const REVIEWS_DATA = [
  { name: 'Priya S.',   rating: 5, text: 'Absolutely stunning setup! The team was professional and set everything up beautifully.', date: 'March 2026' },
  { name: 'Rahul K.',  rating: 5, text: 'Exceeded expectations. The balloon arch was gorgeous, very reasonable price.', date: 'February 2026' },
  { name: 'Sunita V.', rating: 4, text: 'Great service, prompt and clean execution. Minor delay in setup but overall amazing.', date: 'January 2026' },
];

export default function ServiceDetailPage() {
  const params = useParams();
  const { addItem } = useCart();

  const [selectedPkg, setSelectedPkg] = useState(DUMMY_SERVICE.packages[1].id);
  const [wishlisted, setWishlisted]   = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const selectedPackage = DUMMY_SERVICE.packages.find(p => p.id === selectedPkg)!;
  const gradient = CATEGORY_GRADIENTS[DUMMY_SERVICE.categoryKey] ?? CATEGORY_GRADIENTS['balloon'];

  const handleAddToCart = () => {
    addItem({
      id: `${DUMMY_SERVICE.id}-${selectedPkg}`,
      name: `${DUMMY_SERVICE.name} — ${selectedPackage.name}`,
      price: selectedPackage.price,
      type: 'package',
      quantity: 1,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="container py-8 md:py-12 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm mb-6 text-gray-400">
        <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/shop" className="hover:text-[var(--color-primary)] transition-colors">Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-700">{DUMMY_SERVICE.category}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

        {/* ── Left: Images & Details ─────────────────────── */}
        <div className="flex-1 space-y-8">
          {/* Main image */}
          <div className={`aspect-[16/9] bg-gradient-to-br ${gradient} rounded-2xl overflow-hidden relative flex items-center justify-center shadow-md`}>
            <span className="text-9xl">{DUMMY_SERVICE.emoji}</span>
            <button
              onClick={() => setWishlisted(v => !v)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
            </button>
            <button className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-110 transition-transform">
              <Share2 className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-4 gap-3">
            {[0,1,2,3].map(i => (
              <div key={i} className={`aspect-square rounded-xl bg-gradient-to-br ${gradient} opacity-${60 + i * 10} flex items-center justify-center text-3xl cursor-pointer hover:ring-2 ring-[var(--color-primary)] transition-all`}>
                {DUMMY_SERVICE.emoji}
              </div>
            ))}
          </div>

          {/* About */}
          <div className="space-y-5 pt-2 border-t border-[var(--color-border)]">
            <h2 className="text-2xl font-bold">About this service</h2>
            <p className="text-gray-600 leading-relaxed">{DUMMY_SERVICE.description}</p>

            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" /> What's included
              </h3>
              <ul className="space-y-2">
                {DUMMY_SERVICE.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-4 pt-2 border-t border-[var(--color-border)]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Customer Reviews</h2>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 text-amber-400">
                  {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="font-semibold">{DUMMY_SERVICE.rating}</span>
                <span className="text-sm text-gray-400">({DUMMY_SERVICE.reviews} reviews)</span>
              </div>
            </div>
            <div className="space-y-4">
              {REVIEWS_DATA.map((r, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
                        {r.name[0]}
                      </div>
                      <span className="font-semibold text-sm">{r.name}</span>
                      <Badge variant="success" className="text-[10px] gap-1"><CheckCircle className="w-2.5 h-2.5" /> Verified</Badge>
                    </div>
                    <div className="flex gap-0.5 text-amber-400">
                      {Array(r.rating).fill(0).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">"{r.text}"</p>
                  <p className="text-xs text-gray-400">{r.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Booking ─────────────────────────────── */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="sticky top-24 space-y-5">

            {/* Title & Rating */}
            <div className="space-y-3">
              <Badge variant="primary">{DUMMY_SERVICE.category}</Badge>
              <h1 className="text-2xl font-extrabold leading-tight text-gray-900">{DUMMY_SERVICE.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(DUMMY_SERVICE.rating) ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                  <span className="ml-1">{DUMMY_SERVICE.rating}</span>
                </div>
                <span className="text-sm text-gray-400">({DUMMY_SERVICE.reviews} reviews)</span>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✓ Verified</span>
              </div>
            </div>

            {/* Package selector */}
            <div className="space-y-3">
              <h3 className="font-bold">Select Package</h3>
              {DUMMY_SERVICE.packages.map(pkg => (
                <label
                  key={pkg.id}
                  className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer relative transition-all ${
                    selectedPkg === pkg.id
                      ? 'border-[var(--color-primary)] bg-orange-50/50'
                      : 'border-gray-100 bg-white hover:border-gray-300'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-2.5 left-4 text-[10px] font-bold bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="package"
                        value={pkg.id}
                        checked={selectedPkg === pkg.id}
                        onChange={() => setSelectedPkg(pkg.id)}
                        className="w-4 h-4 accent-[var(--color-primary)]"
                      />
                      <span className="font-semibold text-sm">{pkg.name}</span>
                    </div>
                    <span className="font-bold text-base">₹{pkg.price.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">{pkg.desc}</p>
                </label>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-gray-600">Selected total</span>
                <span className="text-xl font-extrabold text-[var(--color-primary)]">
                  ₹{selectedPackage.price.toLocaleString('en-IN')}
                </span>
              </div>

              <Button
                size="lg"
                className="w-full h-13 text-base font-bold shadow-md hover:-translate-y-0.5 transition-transform gap-2"
              >
                <Calendar className="w-5 h-5" /> Book Now
              </Button>

              <Button
                size="lg"
                variant="outline"
                className={`w-full h-12 gap-2 transition-all ${addedToCart ? 'bg-green-50 border-green-400 text-green-700' : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart
                  ? <><CheckCircle className="w-4 h-4 text-green-500" /> Added to Cart!</>
                  : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                }
              </Button>

              {addedToCart && (
                <Link href="/cart">
                  <Button variant="ghost" size="sm" className="w-full text-[var(--color-primary)] text-xs gap-1">
                    View Cart & Checkout →
                  </Button>
                </Link>
              )}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
              {[
                { icon: Shield, text: 'Secure Payment' },
                { icon: CheckCircle, text: 'Verified Vendor' },
                { icon: Clock, text: `Response: ${DUMMY_SERVICE.vendor.responseTime}` },
                { icon: Star, text: `${DUMMY_SERVICE.vendor.ordersCompleted}+ Orders Done` },
              ].map(t => (
                <div key={t.text} className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-2">
                  <t.icon className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  {t.text}
                </div>
              ))}
            </div>

            {/* Vendor Card */}
            <Card className="border border-[var(--color-border)]">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xl shrink-0">
                  R
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{DUMMY_SERVICE.vendor.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="accent" className="text-[10px]">{DUMMY_SERVICE.vendor.tier}</Badge>
                    <span className="text-xs text-green-600 font-semibold">{DUMMY_SERVICE.vendor.score} Score</span>
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {DUMMY_SERVICE.vendor.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

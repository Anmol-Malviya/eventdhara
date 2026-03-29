'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Tag, IndianRupee } from 'lucide-react';

// Gradient colours for cart item thumbnails
const GRADIENTS = [
  'from-orange-200 to-amber-100',
  'from-rose-200 to-pink-100',
  'from-purple-200 to-indigo-100',
  'from-blue-200 to-cyan-100',
  'from-green-200 to-teal-100',
];

const EMOJIS = ['🎈', '🌸', '🎂', '📸', '🎬', '💄', '🎵', '🎨'];

export default function UserCartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 max-w-sm mx-auto">
        <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-[var(--color-primary)]/40" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-[var(--color-text-muted)] text-sm">
            Browse our services to add something magical to your event!
          </p>
        </div>
        <Link href="/shop">
          <Button className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Browse Services
          </Button>
        </Link>
      </div>
    );
  }

  const platformFee = Math.round(totalPrice * 0.02);
  const grandTotal  = totalPrice + platformFee;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">My Cart</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            {totalItems} item{totalItems !== 1 ? 's' : ''} ready to book
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/shop">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Add More
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:bg-red-50 gap-1.5 text-xs"
            onClick={clearCart}
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Cart Items ────────────────────────────────── */}
        <div className="flex-1 space-y-4">
          {items.map((item, idx) => (
            <Card key={item.id} className="border border-[var(--color-border)] overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-stretch">
                  {/* Thumbnail */}
                  <div className={`w-24 shrink-0 bg-gradient-to-br ${GRADIENTS[idx % GRADIENTS.length]} flex items-center justify-center text-3xl`}>
                    {EMOJIS[idx % EMOJIS.length]}
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <Badge variant="primary" className="text-[10px] mb-1.5">
                        {item.type === 'package' ? 'Package' : 'Service'}
                      </Badge>
                      <h3 className="font-semibold text-sm leading-snug truncate">{item.name}</h3>
                      <div className="text-lg font-bold mt-1 text-[var(--color-primary)]">
                        ₹{item.price.toLocaleString('en-IN')}
                        <span className="text-xs text-gray-400 font-normal ml-1">per unit</span>
                      </div>
                    </div>

                    {/* Qty + Remove */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex items-center border border-[var(--color-border)] rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-400 hover:text-red-600 flex items-center gap-0.5 mt-1 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Order Summary ─────────────────────────────── */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24 space-y-4">
            {/* Coupon */}
            <Card className="border border-[var(--color-border)]">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-[var(--color-primary)]" />
                  <h3 className="font-semibold text-sm">Apply Coupon</h3>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code…"
                    className="flex-1 text-sm px-3 py-2 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 uppercase"
                  />
                  <Button size="sm" variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>

            {/* Price breakdown */}
            <Card className="border border-[var(--color-border)]">
              <CardContent className="p-5 space-y-4">
                <h2 className="font-bold text-lg flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-[var(--color-primary)]" /> Order Summary
                </h2>

                <div className="space-y-2 text-sm">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-gray-600">
                      <span className="truncate flex-1 mr-2">
                        {item.name}
                        {item.quantity > 1 && <span className="text-gray-400 ml-1">×{item.quantity}</span>}
                      </span>
                      <span className="shrink-0 font-medium">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-[var(--color-border)] pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Platform fee (2%)</span>
                    <span>₹{platformFee.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>— ₹0</span>
                  </div>
                </div>

                <div className="border-t border-[var(--color-border)] pt-3 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-extrabold text-lg text-[var(--color-primary)]">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <Button size="lg" className="w-full h-12 text-base font-bold shadow-md hover:-translate-y-0.5 transition-transform gap-2">
                  <ShieldCheck className="w-4 h-4" /> Proceed to Checkout
                </Button>

                <p className="text-[10px] text-gray-400 text-center">
                  100% secure payment · Powered by Razorpay
                </p>
              </CardContent>
            </Card>

            {/* Trust */}
            <div className="flex items-center gap-4 px-2 text-xs text-gray-400">
              <span className="flex items-center gap-1">🔒 Encrypted</span>
              <span className="flex items-center gap-1">✅ Verified vendors</span>
              <span className="flex items-center gap-1">💯 Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

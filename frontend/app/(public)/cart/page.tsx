'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-16 md:py-24 flex flex-col items-center justify-center text-center space-y-6">
        <ShoppingCart className="w-20 h-20 text-gray-200" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-[var(--color-text-muted)]">Add services you love to start planning your event.</p>
        </div>
        <Link href="/shop">
          <Button size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Browse Services
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/shop" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <Badge variant="primary" className="ml-auto">{totalItems} items</Badge>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1 space-y-4">
          {items.map(item => (
            <Card key={item.id} className="border border-[var(--color-border)]">
              <CardContent className="p-5 flex items-start gap-4">
                {/* Image placeholder */}
                <div className="w-20 h-20 rounded-xl bg-[var(--color-primary-light)] flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-8 h-8 text-[var(--color-primary)] opacity-60" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.type === 'package' ? 'Package' : 'Service'}</p>
                  <div className="text-lg font-bold mt-1">₹{item.price.toLocaleString('en-IN')}</div>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  {/* Quantity */}
                  <div className="flex items-center gap-2 border border-[var(--color-border)] rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:underline"
          >
            Clear entire cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24">
            <Card className="border border-[var(--color-border)]">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-bold text-lg">Order Summary</h2>

                <div className="space-y-2 text-sm">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-[var(--color-text-muted)]">
                      <span className="truncate flex-1 mr-2">{item.name}</span>
                      <span className="shrink-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[var(--color-border)] pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>

                <Button size="lg" className="w-full h-12 text-base font-bold shadow-md">
                  Proceed to Checkout
                </Button>

                <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] justify-center">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Secured by Razorpay · 100% Safe
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

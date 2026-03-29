'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const WISHLIST_ITEMS = [
  { id: 'W-1', name: 'Premium Floral Arch Setup', category: 'Floral Decoration', price: 7500, rating: 4.9, vendor: 'Bloom Studio' },
  { id: 'W-2', name: 'Cinematic Wedding Package', category: 'Videography', price: 18000, rating: 4.8, vendor: 'LensArt Films' },
  { id: 'W-3', name: 'Luxury Mehendi Night', category: 'Mehndi', price: 6000, rating: 4.7, vendor: 'Henna Queens' },
];

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <span className="text-sm text-[var(--color-text-muted)]">{WISHLIST_ITEMS.length} saved items</span>
      </div>

      {WISHLIST_ITEMS.length === 0 ? (
        <Card className="border border-[var(--color-border)]">
          <CardContent className="p-12 text-center space-y-4">
            <Heart className="w-12 h-12 text-gray-200 mx-auto" />
            <p className="text-[var(--color-text-muted)]">Your wishlist is empty. Save services you love!</p>
            <Link href="/shop">
              <Button>Browse Services</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WISHLIST_ITEMS.map(item => (
            <Card key={item.id} hoverable className="border border-[var(--color-border)] overflow-hidden">
              {/* Image placeholder */}
              <div className="h-40 bg-gradient-to-br from-[var(--color-primary-light)] to-pink-100 flex items-center justify-center">
                <Heart className="w-8 h-8 text-[var(--color-primary)] opacity-50" />
              </div>
              <CardContent className="p-4 space-y-3">
                <Badge variant="primary">{item.category}</Badge>
                <h3 className="font-semibold text-sm">{item.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-lg">₹{item.price.toLocaleString('en-IN')}</span>
                  <span className="text-amber-500">⭐ {item.rating}</span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">by {item.vendor}</p>
                <div className="flex gap-2 pt-1">
                  <Link href={`/shop/${item.id}`} className="flex-1">
                    <Button size="sm" className="w-full gap-1">
                      <ShoppingCart className="w-3.5 h-3.5" /> Book Now
                    </Button>
                  </Link>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 px-2">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon, Upload, Trash2, Plus, Eye } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  { id: 'P-1', title: 'Golden Birthday Setup', category: 'Balloon Decoration', views: 234, likes: 18 },
  { id: 'P-2', title: 'Floral Wedding Arch', category: 'Floral Decoration', views: 512, likes: 42 },
  { id: 'P-3', title: 'Candle Dinner Setup', category: 'Lighting', views: 189, likes: 27 },
  { id: 'P-4', title: 'Royal Baby Shower', category: 'Balloon Decoration', views: 301, likes: 31 },
  { id: 'P-5', title: 'DJ Night Setup', category: 'DJ & Music', views: 145, likes: 12 },
  { id: 'P-6', title: 'Mehndi Night Decor', category: 'Mehndi', views: 278, likes: 24 },
];

const GRADIENT_COLORS = [
  'from-orange-200 to-rose-200',
  'from-purple-200 to-blue-200',
  'from-green-200 to-teal-200',
  'from-amber-200 to-orange-200',
  'from-pink-200 to-purple-200',
  'from-blue-200 to-indigo-200',
];

export default function VendorPortfolioPage() {
  const [items, setItems] = useState(PORTFOLIO_ITEMS);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Portfolio</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Showcase your best work to attract more customers.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Add Photos
        </Button>
      </div>

      {/* Upload zone */}
      <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-10 text-center hover:border-[var(--color-primary)] hover:bg-orange-50/30 transition-all cursor-pointer group">
        <Upload className="w-10 h-10 text-gray-300 group-hover:text-[var(--color-primary)] mx-auto mb-3 transition-colors" />
        <p className="text-sm font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors">
          Drag & drop photos here, or <span className="text-[var(--color-primary)] font-semibold">browse files</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB · Watermarks added automatically</p>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div key={item.id} className="group relative rounded-xl overflow-hidden border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition-all">
            {/* Image placeholder */}
            <div className={`aspect-square bg-gradient-to-br ${GRADIENT_COLORS[idx % GRADIENT_COLORS.length]} flex items-center justify-center`}>
              <ImageIcon className="w-10 h-10 text-white/60" />
            </div>

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                <Eye className="w-4 h-4 text-gray-700" />
              </button>
              <button
                className="p-2 bg-white/90 rounded-full hover:bg-red-50 transition-colors"
                onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>

            {/* Card info */}
            <div className="p-3 space-y-1">
              <p className="font-medium text-sm truncate">{item.title}</p>
              <Badge variant="primary" className="text-[10px]">{item.category}</Badge>
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] pt-1">
                <span>👁 {item.views}</span>
                <span>❤️ {item.likes}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Add placeholder */}
        <div className="aspect-square rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[var(--color-primary)] hover:bg-orange-50/30 transition-all group">
          <Plus className="w-8 h-8 text-gray-300 group-hover:text-[var(--color-primary)] transition-colors" />
          <span className="text-xs text-gray-400 group-hover:text-[var(--color-primary)] transition-colors">Add Photo</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon, Upload, CheckCircle, XCircle, Eye, Grid, List, Search, Star, Trash2 } from 'lucide-react';

type PhotoStatus = 'approved' | 'pending' | 'rejected';

const PHOTOS: {
  id: string; vendor: string; city: string; occasion: string;
  status: PhotoStatus; uploadedAt: string; featured: boolean;
  width: number; height: number;
}[] = [
  { id: 'PH-001', vendor: 'Rohit Decoration House', city: 'Indore', occasion: 'Birthday',    status: 'approved', uploadedAt: '2026-03-28', featured: true,  width: 4, height: 3 },
  { id: 'PH-002', vendor: 'Magic Moments Décor',    city: 'Bhopal', occasion: 'Wedding',     status: 'pending',  uploadedAt: '2026-03-28', featured: false, width: 3, height: 4 },
  { id: 'PH-003', vendor: 'Royal Floral Co.',       city: 'Indore', occasion: 'Anniversary', status: 'approved', uploadedAt: '2026-03-27', featured: false, width: 4, height: 3 },
  { id: 'PH-004', vendor: 'Dreamland Events',       city: 'Ujjain', occasion: 'Baby Shower', status: 'pending',  uploadedAt: '2026-03-27', featured: false, width: 3, height: 3 },
  { id: 'PH-005', vendor: 'Balloon World',          city: 'Indore', occasion: 'Birthday',    status: 'rejected', uploadedAt: '2026-03-26', featured: false, width: 4, height: 3 },
  { id: 'PH-006', vendor: 'Rohit Decoration House', city: 'Indore', occasion: 'Wedding',     status: 'approved', uploadedAt: '2026-03-25', featured: false, width: 3, height: 4 },
  { id: 'PH-007', vendor: 'Magic Moments Décor',    city: 'Bhopal', occasion: 'Birthday',    status: 'approved', uploadedAt: '2026-03-24', featured: true,  width: 4, height: 3 },
  { id: 'PH-008', vendor: 'StarDust Décor',         city: 'Bhopal', occasion: 'Graduation',  status: 'pending',  uploadedAt: '2026-03-24', featured: false, width: 3, height: 3 },
];

const COLORS = [
  'from-orange-200 to-orange-400',
  'from-rose-200 to-rose-400',
  'from-purple-200 to-purple-400',
  'from-blue-200 to-blue-400',
  'from-green-200 to-green-400',
  'from-amber-200 to-amber-400',
  'from-pink-200 to-pink-400',
  'from-teal-200 to-teal-400',
];

const STATUS_CONFIG: Record<PhotoStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  approved: { label: 'Approved', variant: 'success' },
  pending:  { label: 'Pending',  variant: 'warning' },
  rejected: { label: 'Rejected', variant: 'danger'  },
};

export default function AdminPhotosPage() {
  const [photos, setPhotos] = useState(PHOTOS);
  const [filter, setFilter] = useState<'all' | PhotoStatus>('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = photos.filter(p =>
    (filter === 'all' || p.status === filter) &&
    (p.vendor.toLowerCase().includes(search.toLowerCase()) || p.occasion.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: string, status: PhotoStatus) =>
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, status } : p));

  const toggleFeatured = (id: string) =>
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Photo Moderation</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Review, approve, and feature vendor portfolio photos.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border border-[var(--color-border)] rounded-lg overflow-hidden">
            {(['grid', 'list'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`p-2 transition-colors ${view === v ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                {v === 'grid' ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: 'Total',    value: photos.length,                                          bg: 'bg-gray-100',   color: 'text-gray-700'  },
          { label: 'Pending',  value: photos.filter(p => p.status === 'pending').length,      bg: 'bg-amber-50',   color: 'text-amber-700' },
          { label: 'Approved', value: photos.filter(p => p.status === 'approved').length,     bg: 'bg-green-50',   color: 'text-green-700' },
          { label: 'Featured', value: photos.filter(p => p.featured).length,                  bg: 'bg-orange-50',  color: 'text-orange-700'},
        ].map(s => (
          <div key={s.label} className={`flex items-center gap-2 px-4 py-2 rounded-xl ${s.bg}`}>
            <span className={`font-bold ${s.color}`}>{s.value}</span>
            <span className={`text-sm ${s.color}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by vendor or occasion…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
          />
        </div>
        {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border capitalize transition-all ${
              filter === f ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-gray-500 border-[var(--color-border)] hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((photo, i) => {
            const cfg = STATUS_CONFIG[photo.status];
            return (
              <Card key={photo.id} className={`border overflow-hidden ${photo.status === 'pending' ? 'border-amber-200' : 'border-[var(--color-border)]'}`}>
                {/* Mock photo */}
                <div className={`bg-gradient-to-br ${COLORS[i % COLORS.length]} aspect-square flex items-center justify-center`}>
                  <ImageIcon className="w-8 h-8 text-white/60" />
                  {photo.featured && (
                    <div className="absolute top-2 right-2 bg-amber-400 rounded-full p-1">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                </div>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={cfg.variant} className="text-[10px]">{cfg.label}</Badge>
                    <span className="text-[10px] text-gray-400">{photo.id}</span>
                  </div>
                  <p className="text-xs font-medium truncate">{photo.vendor}</p>
                  <p className="text-xs text-gray-400">{photo.occasion}</p>
                  <div className="flex gap-1 pt-1">
                    {photo.status === 'pending' && (
                      <>
                        <button onClick={() => updateStatus(photo.id, 'approved')} className="flex-1 text-xs py-1 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors font-medium">✓</button>
                        <button onClick={() => updateStatus(photo.id, 'rejected')} className="flex-1 text-xs py-1 bg-red-50 text-red-500 rounded hover:bg-red-100 transition-colors font-medium">✗</button>
                      </>
                    )}
                    <button
                      onClick={() => toggleFeatured(photo.id)}
                      className={`flex-1 text-xs py-1 rounded transition-colors font-medium ${photo.featured ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      <Star className="w-3 h-3 inline" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border border-[var(--color-border)]">
          <CardContent className="p-0 divide-y divide-[var(--color-border)]">
            {filtered.map((photo, i) => {
              const cfg = STATUS_CONFIG[photo.status];
              return (
                <div key={photo.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/50">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${COLORS[i % COLORS.length]} flex items-center justify-center shrink-0`}>
                    <ImageIcon className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">{photo.vendor}</span>
                      <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      {photo.featured && <Badge variant="warning" className="text-xs gap-1"><Star className="w-2.5 h-2.5 fill-current" /> Featured</Badge>}
                    </div>
                    <p className="text-xs text-gray-400">{photo.occasion} · {photo.city} · {photo.uploadedAt} · {photo.id}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {photo.status === 'pending' && (
                      <>
                        <Button size="sm" className="gap-1 text-xs bg-green-500 hover:bg-green-600 text-white border-0" onClick={() => updateStatus(photo.id, 'approved')}>
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-1 text-xs text-red-500 hover:bg-red-50" onClick={() => updateStatus(photo.id, 'rejected')}>
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

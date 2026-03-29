'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Search, CheckCircle, XCircle, Eye, Shield, Star, MapPin } from 'lucide-react';

type VendorStatus = 'active' | 'pending' | 'suspended' | 'blocked';

const VENDORS: {
  id: string; name: string; owner: string; city: string; phone: string;
  orders: number; rating: number; joinDate: string;
  status: VendorStatus; verified: boolean; premium: boolean;
}[] = [
  { id: 'VND-001', name: 'Rohit Decoration House', owner: 'Rohit Sharma',    city: 'Indore', phone: '+91 98765 43210', orders: 82, rating: 4.9, joinDate: '2025-08-10', status: 'active',    verified: true,  premium: true  },
  { id: 'VND-002', name: 'Magic Moments Décor',    owner: 'Puja Patel',     city: 'Bhopal', phone: '+91 87654 32109', orders: 64, rating: 4.7, joinDate: '2025-09-25', status: 'active',    verified: true,  premium: false },
  { id: 'VND-003', name: 'Royal Floral Co.',       owner: 'Vikram Singh',   city: 'Indore', phone: '+91 76543 21098', orders: 51, rating: 4.8, joinDate: '2025-10-12', status: 'active',    verified: true,  premium: true  },
  { id: 'VND-004', name: 'Dreamland Events',       owner: 'Sanjay Mehta',   city: 'Ujjain', phone: '+91 65432 10987', orders: 28, rating: 4.6, joinDate: '2025-11-01', status: 'pending',   verified: false, premium: false },
  { id: 'VND-005', name: 'Balloon World',          owner: 'Reena Gupta',    city: 'Indore', phone: '+91 54321 09876', orders: 15, rating: 3.8, joinDate: '2025-12-15', status: 'suspended', verified: true,  premium: false },
  { id: 'VND-006', name: 'StarDust Décor',         owner: 'Manish Tiwari',  city: 'Bhopal', phone: '+91 43210 98765', orders: 0,  rating: 0,   joinDate: '2026-03-01', status: 'blocked',   verified: false, premium: false },
];

const STATUS_CONFIG: Record<VendorStatus, { label: string; variant: 'success' | 'warning' | 'danger' | 'default' }> = {
  active:    { label: 'Active',    variant: 'success' },
  pending:   { label: 'Pending',   variant: 'warning' },
  suspended: { label: 'Suspended', variant: 'danger'  },
  blocked:   { label: 'Blocked',   variant: 'danger'  },
};

export default function AdminVendorsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | VendorStatus>('all');
  const [vendors, setVendors] = useState(VENDORS);

  const filtered = vendors.filter(v =>
    (statusFilter === 'all' || v.status === statusFilter) &&
    (v.name.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase()) || v.owner.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleVerify = (id: string) => setVendors(prev => prev.map(v => v.id === id ? { ...v, verified: !v.verified } : v));
  const toggleBlock = (id: string) => setVendors(prev => prev.map(v => v.id === id ? { ...v, status: v.status === 'blocked' ? 'active' : 'blocked' } : v));
  const approve = (id: string) => setVendors(prev => prev.map(v => v.id === id && v.status === 'pending' ? { ...v, status: 'active', verified: true } : v));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Vendor Management</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Verify, manage, and monitor all vendors on the platform.</p>
        </div>
        <div className="flex gap-3">
          {(['all', 'active', 'pending', 'suspended', 'blocked'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border capitalize transition-all ${
                statusFilter === s ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]' : 'bg-white text-gray-500 border-[var(--color-border)] hover:bg-gray-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, city, or owner…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40"
        />
      </div>

      {/* Vendors Table */}
      <Card className="border border-[var(--color-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-[var(--color-border)]">
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Vendor</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">City</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Orders</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Rating</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400">No vendors found.</td></tr>
              ) : filtered.map(v => (
                <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">{v.name}</span>
                        {v.verified && <Shield className="w-3.5 h-3.5 text-green-500" />}
                        {v.premium && <span className="text-xs text-rose-500 font-bold">💎</span>}
                      </div>
                      <p className="text-xs text-gray-400">{v.owner} · {v.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="flex items-center gap-1 text-gray-600"><MapPin className="w-3.5 h-3.5 text-gray-400" />{v.city}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell font-medium">{v.orders}</td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    {v.rating > 0 ? (
                      <span className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />{v.rating}
                      </span>
                    ) : <span className="text-gray-400">—</span>}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={STATUS_CONFIG[v.status].variant}>{STATUS_CONFIG[v.status].label}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end flex-wrap">
                      {v.status === 'pending' && (
                        <Button size="sm" className="gap-1 text-xs bg-green-500 hover:bg-green-600 text-white border-0" onClick={() => approve(v.id)}>
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </Button>
                      )}
                      <Link href={`/dashboard/admin/vendors/${v.id}`}>
                        <Button size="sm" variant="outline" className="gap-1 text-xs">
                          <Eye className="w-3.5 h-3.5" /> View
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={() => toggleVerify(v.id)}>
                        <Shield className="w-3.5 h-3.5" /> {v.verified ? 'Unverify' : 'Verify'}
                      </Button>
                      <Button
                        size="sm"
                        variant={v.status === 'blocked' ? 'outline' : 'ghost'}
                        className={`gap-1 text-xs ${v.status !== 'blocked' ? 'text-red-500 hover:bg-red-50' : 'text-green-600'}`}
                        onClick={() => toggleBlock(v.id)}
                      >
                        <XCircle className="w-3.5 h-3.5" /> {v.status === 'blocked' ? 'Unblock' : 'Block'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[var(--color-border)] bg-gray-50 text-xs text-gray-400">
          Showing {filtered.length} of {vendors.length} vendors
        </div>
      </Card>
    </div>
  );
}

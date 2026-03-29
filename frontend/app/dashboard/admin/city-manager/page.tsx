'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MapPin, Plus, Pencil, Trash2, CheckCircle, XCircle, Users, ShoppingBag, TrendingUp } from 'lucide-react';

type CityStatus = 'active' | 'inactive' | 'coming_soon';

const CITIES: {
  id: string; name: string; state: string; status: CityStatus;
  vendors: number; orders: number; gmv: number; launchDate: string;
}[] = [
  { id: 'CTY-001', name: 'Indore',    state: 'Madhya Pradesh', status: 'active',      vendors: 32, orders: 384, gmv: 1280000, launchDate: '2025-06-01' },
  { id: 'CTY-002', name: 'Bhopal',   state: 'Madhya Pradesh', status: 'active',      vendors: 18, orders: 192, gmv: 640000,  launchDate: '2025-07-15' },
  { id: 'CTY-003', name: 'Ujjain',   state: 'Madhya Pradesh', status: 'active',      vendors: 8,  orders: 64,  gmv: 220000,  launchDate: '2025-10-01' },
  { id: 'CTY-004', name: 'Jabalpur', state: 'Madhya Pradesh', status: 'inactive',    vendors: 4,  orders: 12,  gmv: 40000,   launchDate: '2025-12-01' },
  { id: 'CTY-005', name: 'Gwalior',  state: 'Madhya Pradesh', status: 'coming_soon', vendors: 0,  orders: 0,   gmv: 0,       launchDate: '2026-05-01' },
  { id: 'CTY-006', name: 'Raipur',   state: 'Chhattisgarh',  status: 'coming_soon', vendors: 0,  orders: 0,   gmv: 0,       launchDate: '2026-06-01' },
];

const STATUS_CONFIG: Record<CityStatus, { label: string; variant: 'success' | 'danger' | 'info' }> = {
  active:      { label: 'Active',      variant: 'success' },
  inactive:    { label: 'Inactive',    variant: 'danger'  },
  coming_soon: { label: 'Coming Soon', variant: 'info'    },
};

export default function AdminCityManagerPage() {
  const [cities, setCities] = useState(CITIES);

  const toggleStatus = (id: string) => {
    setCities(prev => prev.map(c =>
      c.id === id
        ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
        : c
    ));
  };

  const totalVendors = cities.filter(c => c.status === 'active').reduce((s, c) => s + c.vendors, 0);
  const totalOrders = cities.filter(c => c.status === 'active').reduce((s, c) => s + c.orders, 0);
  const totalGMV = cities.filter(c => c.status === 'active').reduce((s, c) => s + c.gmv, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">City Manager</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">Manage operational cities and vendor coverage areas.</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" /> Add New City</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Cities', value: cities.filter(c => c.status === 'active').length, icon: MapPin, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Total Vendors', value: totalVendors,                                       icon: Users,  color: 'text-blue-600',  bg: 'bg-blue-50' },
          { label: 'Gross Revenue', value: `₹${(totalGMV / 100000).toFixed(1)}L`,             icon: TrendingUp,color:'text-orange-600',bg:'bg-orange-50'},
        ].map(s => (
          <Card key={s.label} className="border border-[var(--color-border)]">
            <CardContent className="p-5 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cities Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {cities.map(city => {
          const cfg = STATUS_CONFIG[city.status];
          return (
            <Card key={city.id} className={`border ${city.status === 'active' ? 'border-[var(--color-border)]' : city.status === 'coming_soon' ? 'border-blue-200 bg-blue-50/20' : 'border-gray-200 bg-gray-50/50'}`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${city.status === 'active' ? 'bg-orange-50' : 'bg-gray-100'}`}>
                      <MapPin className={`w-5 h-5 ${city.status === 'active' ? 'text-[var(--color-primary)]' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{city.name}</h3>
                      <p className="text-xs text-gray-400">{city.state}</p>
                    </div>
                  </div>
                  <Badge variant={cfg.variant}>{cfg.label}</Badge>
                </div>

                {city.status !== 'coming_soon' ? (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center bg-gray-50 rounded-lg py-2">
                      <div className="font-bold text-sm">{city.vendors}</div>
                      <div className="text-xs text-gray-400">Vendors</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg py-2">
                      <div className="font-bold text-sm">{city.orders}</div>
                      <div className="text-xs text-gray-400">Orders</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg py-2">
                      <div className="font-bold text-sm">₹{(city.gmv / 100000).toFixed(1)}L</div>
                      <div className="text-xs text-gray-400">GMV</div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 text-sm text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                    🚀 Planned launch: {city.launchDate}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={city.status === 'active' ? 'ghost' : 'primary'}
                    className={`flex-1 gap-1.5 text-xs ${city.status === 'active' ? 'text-red-500 hover:bg-red-50' : ''}`}
                    onClick={() => toggleStatus(city.id)}
                  >
                    {city.status === 'active' ? <><XCircle className="w-3.5 h-3.5" /> Deactivate</> : <><CheckCircle className="w-3.5 h-3.5" /> Activate</>}
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

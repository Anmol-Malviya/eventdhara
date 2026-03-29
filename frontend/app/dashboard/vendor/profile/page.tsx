'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Phone, Mail, MapPin, Store, Save, Camera, Star, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const INITIAL = {
  name: 'Rohit Decoration House',
  ownerName: 'Rohit Sharma',
  email: 'rohit@decorhouse.in',
  phone: '+91 98765 43210',
  city: 'Indore',
  address: '12 Vijay Nagar, Indore, MP 452010',
  bio: 'Specializing in premium event decoration for birthdays, weddings, and corporate events. 5+ years of experience.',
  services: 'Birthday Décor, Wedding Setup, Anniversary, Baby Shower',
};

export default function VendorProfilePage() {
  const [form, setForm] = useState(INITIAL);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    setSaved(true);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Vendor Profile</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Your profile is visible to customers. Keep it updated to build trust.</p>
      </div>

      {/* Profile Card */}
      <Card className="border border-[var(--color-border)]">
        <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-4xl text-white font-extrabold shadow-md">
              {form.ownerName?.[0]?.toUpperCase() ?? 'V'}
            </div>
            <button className="absolute -bottom-2 -right-2 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
              <Camera className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{form.name}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{form.city}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="success" className="gap-1"><Shield className="w-3 h-3" /> Verified</Badge>
              <Badge variant="warning" className="gap-1"><Star className="w-3 h-3" /> Gold Tier</Badge>
              <Badge variant="default">⭐ 4.8 Rating</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Info */}
      <Card className="border border-[var(--color-border)]">
        <CardContent className="p-6 space-y-5">
          <h3 className="font-semibold text-lg border-b border-[var(--color-border)] pb-3">Business Information</h3>
          <Input
            label="Business Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            leftIcon={<Store className="w-4 h-4" />}
            placeholder="Rohit Decoration House"
          />
          <Input
            label="Owner Name"
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            leftIcon={<User className="w-4 h-4" />}
            placeholder="Your full name"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            leftIcon={<Mail className="w-4 h-4" />}
            placeholder="you@business.com"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            leftIcon={<Phone className="w-4 h-4" />}
            placeholder="+91 98765 43210"
          />
          <Input
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            leftIcon={<MapPin className="w-4 h-4" />}
            placeholder="Indore"
          />
          <Input
            label="Full Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            leftIcon={<MapPin className="w-4 h-4" />}
            placeholder="Street, City, State"
          />

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Services Offered</label>
            <textarea
              name="services"
              value={form.services}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 resize-none"
              placeholder="Birthday Décor, Wedding Setup…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">About Your Business</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2.5 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 resize-none"
              placeholder="Describe your business, experience, specialties…"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
              Save Changes
            </Button>
            {saved && <span className="text-sm text-green-600 font-medium">✓ Changes saved</span>}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border border-red-200 bg-red-50/30">
        <CardContent className="p-6">
          <h3 className="font-semibold text-red-700 mb-1">Danger Zone</h3>
          <p className="text-sm text-red-500 mb-4">Deactivating your account hides your profile and stops lead distribution. This is reversible.</p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">Deactivate Account</Button>
            <Button variant="danger" size="sm">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

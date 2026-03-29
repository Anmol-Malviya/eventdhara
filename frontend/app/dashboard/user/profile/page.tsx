'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Phone, Mail, MapPin, Building, Save } from 'lucide-react';

export default function UserProfilePage() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: call PATCH /users/me API
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">My Profile</h1>

      {/* Avatar */}
      <Card className="border border-[var(--color-border)]">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-3xl text-white font-bold shadow-md">
            {formData.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{formData.name || 'Your Name'}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">{formData.email || 'email@example.com'}</p>
            <Button size="sm" variant="outline" className="mt-3">Change Photo</Button>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="border border-[var(--color-border)]">
        <CardContent className="p-6 space-y-5">
          <h3 className="font-semibold text-lg">Personal Information</h3>
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            leftIcon={<User className="w-4 h-4" />}
            placeholder="John Doe"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            leftIcon={<Mail className="w-4 h-4" />}
            placeholder="you@example.com"
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            leftIcon={<Phone className="w-4 h-4" />}
            placeholder="+91 9876543210"
          />
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            leftIcon={<MapPin className="w-4 h-4" />}
            placeholder="123 Main St, Indore"
          />

          <div className="pt-2">
            <Button
              onClick={handleSave}
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border border-red-200 bg-red-50/30">
        <CardContent className="p-6">
          <h3 className="font-semibold text-red-700 mb-1">Danger Zone</h3>
          <p className="text-sm text-red-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <Button variant="danger" size="sm">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}

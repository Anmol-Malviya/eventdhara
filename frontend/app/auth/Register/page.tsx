'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to backend API
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/Login');
    }, 1000);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Create an account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          
          <Button type="submit" className="w-full h-11" isLoading={isLoading}>
            Sign Up
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <div className="text-sm text-[var(--color-text-muted)]">
            Already have an account?{' '}
            <Link href="/auth/Login" className="font-semibold text-[var(--color-primary)] hover:underline">
              Log in
            </Link>
          </div>
          <div className="text-sm mt-4 pt-4 border-t">
            Are you a service provider?{' '}
            <Link href="/auth/VendorRegister" className="font-semibold text-[var(--color-accent)] hover:underline block mt-1">
              Register as a Vendor here
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

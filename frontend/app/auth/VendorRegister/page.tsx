'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function VendorRegister() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    name: '', email: '', phone: '', password: '', 
    aadhaar: '', storeName: '', address: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Connect to backend API
    setTimeout(() => {
      setIsLoading(false);
      router.push('/auth/Login');
    }, 1500);
  };

  return (
    <Card className="border-0 shadow-lg mt-4 max-w-lg mx-auto">
      <CardContent className="p-8">
        <h2 className="text-2xl font-semibold text-center mb-2">Partner with EventDhara</h2>
        <p className="text-center text-sm text-[var(--color-text-muted)] mb-6">
          Step {step} of 2: {step === 1 ? 'Personal Details' : 'Business Details'}
        </p>
        
        <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="space-y-4">
          
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
              <Input label="Full Name" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
              <Input label="Email Address" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="vendor@example.com" />
              <Input label="Phone Number" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" />
              <Input label="Password" name="password" type="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" />
              <Button type="button" onClick={nextStep} className="w-full h-11 mt-6">Continue to Business Details</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <Input label="Store/Business Name" name="storeName" required value={formData.storeName} onChange={handleChange} placeholder="Royal Events Ltd" />
              <Input label="Aadhaar Number" name="aadhaar" required value={formData.aadhaar} onChange={handleChange} placeholder="1234 5678 9012" helperText="Required for KYC verification" />
              <Input label="Business Address" name="address" required value={formData.address} onChange={handleChange} placeholder="123 Market St, Indore" />
              <div className="flex gap-4 mt-6">
                <Button type="button" variant="outline" onClick={prevStep} className="w-1/3">Back</Button>
                <Button type="submit" className="w-2/3" isLoading={isLoading}>Complete Registration</Button>
              </div>
            </div>
          )}

        </form>

        <div className="mt-8 pt-4 text-center border-t text-sm text-[var(--color-text-muted)]">
          Already a partner?{' '}
          <Link href="/auth/Login" className="font-semibold text-[var(--color-primary)] hover:underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
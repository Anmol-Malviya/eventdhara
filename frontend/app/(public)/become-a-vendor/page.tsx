import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function BecomeVendorPage() {
  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto text-center space-y-8">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Grow Your Business with EventDhara</h1>
      <p className="text-xl text-[var(--color-text-muted)]">Join thousands of vendors who get consistent bookings and grow their revenue organically.</p>
      <div className="pt-8">
        <Link href="/auth/VendorRegister">
          <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">Start Registration</Button>
        </Link>
      </div>
    </div>
  );
}

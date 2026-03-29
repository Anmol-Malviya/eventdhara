import React from 'react';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-[var(--color-border)] text-[var(--color-text)]">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img src="https://eventdhara.in/Eventdhara_logo.png" alt="Eventdhara Logo" className="h-10 md:h-12 object-contain" />
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              The premier platform for booking event vendors and services. Make your event magical with {APP_NAME}.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[var(--color-text)]">Company</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><Link href="/about" className="hover:text-[var(--color-primary)] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-primary)] transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-[var(--color-primary)] transition-colors">FAQ</Link></li>
              <li><Link href="/become-a-vendor" className="hover:text-[var(--color-accent)] transition-colors font-medium">Become a Vendor</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[var(--color-text)]">Services</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><Link href="/shop" className="hover:text-[var(--color-primary)] transition-colors">All Categories</Link></li>
              <li><Link href="/shop?category=Birthday" className="hover:text-[var(--color-primary)] transition-colors">Birthdays</Link></li>
              <li><Link href="/shop?category=Wedding" className="hover:text-[var(--color-primary)] transition-colors">Weddings</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[var(--color-text)]">Legal</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><Link href="/terms" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-[var(--color-primary)] transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] text-sm text-center text-[var(--color-text-muted)]">
          &copy; {currentYear} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

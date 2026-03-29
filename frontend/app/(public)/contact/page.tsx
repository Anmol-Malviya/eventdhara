import React from 'react';

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)]">Contact Us</h1>
      <div className="prose max-w-none text-[var(--color-text-muted)] text-lg leading-relaxed">
        <p>Have questions? We're here to help.</p>
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-[var(--color-border)]">
          <p className="font-semibold text-[var(--color-text)]">Email: support@eventdhara.com</p>
          <p className="font-semibold text-[var(--color-text)] mt-2">Phone: +91 98765 43210</p>
        </div>
      </div>
    </div>
  );
}

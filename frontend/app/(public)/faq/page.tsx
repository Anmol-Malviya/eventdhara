import React from 'react';

export default function FAQPage() {
  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)]">Frequently Asked Questions</h1>
      <div className="prose max-w-none text-[var(--color-text-muted)] text-lg leading-relaxed space-y-6">
        <div>
          <h3 className="text-[var(--color-text)] font-semibold mb-2">How do I book a vendor?</h3>
          <p>Browse through the services, choose your preferred package, and click "Book Now" to view availability and proceed to checkout.</p>
        </div>
        <div>
          <h3 className="text-[var(--color-text)] font-semibold mb-2">Can I customize my package?</h3>
          <p>Yes! Many vendors allow custom add-ons or modifications, which you can specify while raising a service query.</p>
        </div>
      </div>
    </div>
  );
}

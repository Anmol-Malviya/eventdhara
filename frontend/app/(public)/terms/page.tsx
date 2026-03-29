import React from 'react';

export default function GenericStaticPage({ title }: { title: string }) {
  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)]">{title}</h1>
      <div className="prose max-w-none text-[var(--color-text-muted)] text-lg leading-relaxed">
        <p>This content is currently being drafted by our legal and content teams. Please check back later.</p>
      </div>
    </div>
  );
}

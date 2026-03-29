import React from 'react';

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-text)]">About <span className="text-[var(--color-primary)]">EventDhara</span></h1>
      <div className="prose max-w-none text-[var(--color-text-muted)] text-lg leading-relaxed">
        <p>Welcome to EventDhara, the premier destination for discovering, customizing, and booking event vendors and services.</p>
        <p className="mt-4">Our mission is to make event planning a seamless, delightful experience by connecting you with top-rated professionals who can bring your vision to life.</p>
      </div>
    </div>
  );
}

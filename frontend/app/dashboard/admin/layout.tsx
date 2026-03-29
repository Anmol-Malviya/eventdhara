import React from 'react';

// Admin pages are wrapped by the parent dashboard/layout.tsx (DashboardShell).
// This segment layout just passes children through.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

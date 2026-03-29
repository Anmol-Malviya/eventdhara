'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard, ShoppingBag, Bell, Star, Home,
  Calendar, Users, BarChart2, Heart, User, IndianRupee,
  Image, GitBranch, AlertTriangle, MapPin, MessageCircle,
  Settings, Menu, X, ChevronRight, LogOut, CreditCard,
  Phone, Award, BookOpen, ShoppingCart
} from 'lucide-react';

const USER_NAV = [
  { href: '/dashboard/user',          label: 'Overview',    icon: LayoutDashboard },
  { href: '/dashboard/user/bookings', label: 'My Bookings', icon: ShoppingBag },
  { href: '/dashboard/user/orders',   label: 'My Orders',   icon: BookOpen },
  { href: '/dashboard/user/cart',     label: 'My Cart',     icon: ShoppingCart },
  { href: '/dashboard/user/payment',  label: 'Payments',    icon: CreditCard },
  { href: '/dashboard/user/wishlist', label: 'Wishlist',    icon: Heart },
  { href: '/dashboard/user/profile',  label: 'My Profile',  icon: User },
];

const VENDOR_NAV_ITEMS = [
  { href: '/dashboard/vendor',             label: 'Overview',   icon: Home },
  { href: '/dashboard/vendor/leads',       label: 'New Leads',  icon: Bell },
  { href: '/dashboard/vendor/orders',      label: 'My Orders',  icon: ShoppingBag },
  { href: '/dashboard/vendor/calendar',    label: 'Calendar',   icon: Calendar },
  { href: '/dashboard/vendor/earnings',    label: 'Earnings',   icon: IndianRupee },
  { href: '/dashboard/vendor/portfolio',   label: 'Portfolio',  icon: Image },
  { href: '/dashboard/vendor/score',       label: 'My Score',   icon: Star },
  { href: '/dashboard/vendor/callflow',    label: 'Call Log',   icon: Phone },
  { href: '/dashboard/vendor/premium',     label: 'Premium',    icon: Award },
  { href: '/dashboard/vendor/profile',     label: 'Profile',    icon: User },
  { href: '/dashboard/vendor/rules',       label: 'Rules',      icon: BookOpen },
];

const ADMIN_NAV_ITEMS = [
  { href: '/dashboard/admin',              label: 'Overview',      icon: LayoutDashboard },
  { href: '/dashboard/admin/pipeline',     label: 'Lead Pipeline', icon: GitBranch },
  { href: '/dashboard/admin/orders',       label: 'All Orders',    icon: ShoppingBag },
  { href: '/dashboard/admin/vendors',      label: 'Vendors',       icon: Users },
  { href: '/dashboard/admin/disputes',     label: 'Disputes',      icon: AlertTriangle },
  { href: '/dashboard/admin/analytics',    label: 'Analytics',     icon: BarChart2 },
  { href: '/dashboard/admin/photos',       label: 'Photos',        icon: Image },
  { href: '/dashboard/admin/city-manager', label: 'City Manager',  icon: MapPin },
  { href: '/dashboard/admin/bot-monitor',  label: 'WA Bot',        icon: MessageCircle },
  { href: '/dashboard/admin/config',       label: 'Config',        icon: Settings },
];

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems =
    user?.role === 'vendor' ? VENDOR_NAV_ITEMS :
    user?.role === 'admin'  ? ADMIN_NAV_ITEMS  :
    USER_NAV;

  const roleLabel =
    user?.role === 'vendor' ? 'Vendor Panel' :
    user?.role === 'admin'  ? 'Admin Panel'  :
    'My Account';

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-[var(--color-border)]">
        <Link href="/" className="text-xl font-extrabold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
          EventDhara
        </Link>
        <div className="mt-1 text-xs text-gray-400 uppercase tracking-widest font-semibold">{roleLabel}</div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/dashboard/user' && href !== '/dashboard/vendor' && href !== '/dashboard/admin' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-[var(--color-primary)]' : 'text-gray-400 group-hover:text-gray-600'}`} style={{ width: '1.125rem', height: '1.125rem' }} />
              {label}
              {isActive && <ChevronRight className="ml-auto w-3.5 h-3.5 text-[var(--color-primary)] opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold shrink-0">
            {user?.name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-gray-800">{user?.name ?? 'User'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email ?? user?.phone ?? ''}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 bg-white border-r border-[var(--color-border)]">
        <SidebarContent />
      </aside>

      {/* ─── Mobile Sidebar Drawer ─── */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white shadow-2xl md:hidden">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ─── Main Content ─── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[var(--color-border)] shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-[var(--color-primary)]">EventDhara</span>
          <Link href="/" className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 text-xs">Home</Link>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

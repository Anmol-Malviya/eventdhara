'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { CITIES } from '@/lib/constants';
import {
  ShoppingCart,
  Menu,
  X,
  MapPin,
  Search,
  ChevronDown,
  Heart,
  UserCircle,
  LayoutDashboard,
  LogOut,
  Mic,
  ImageIcon,
  Sparkles,
} from 'lucide-react';

// ── Nav links row ──────────────────────────────────────
const NAV_LINKS = [
  { href: '/',                label: 'Home'            },
  { href: '/shop',            label: 'Shop'            },
  { href: '/become-a-vendor', label: 'Become a Vendor' },
  { href: '/deal',            label: 'Sales & Deals'   },
];

export function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart();
  const pathname  = usePathname();
  const router    = useRouter();

  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [city,        setCity]        = useState('Indore');
  const [cityOpen,    setCityOpen]    = useState(false);
  const [query,       setQuery]       = useState('');
  const [userOpen,    setUserOpen]    = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const dashboardHref =
    user?.role === 'vendor' ? '/dashboard/vendor'
    : user?.role === 'admin'  ? '/dashboard/admin'
    : '/dashboard/user';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/shop?q=${encodeURIComponent(query.trim())}&city=${city}`);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-shadow duration-200 ${scrolled ? 'shadow-lg' : ''}`}>

      {/* ══ ROW 1 — Brand bar (dark) ══════════════════════ */}
      <div className="bg-[#1a1a1a] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 mr-2 group">
            <img src="https://eventdhara.in/Eventdhara_logo.png" alt="Eventdhara Logo" className="h-7 sm:h-8 md:h-9 object-contain drop-shadow-sm transition-transform group-hover:scale-105" />
          </Link>

          {/* City selector */}
          <div ref={cityRef} className="relative hidden sm:block shrink-0">
            <button
              onClick={() => setCityOpen(v => !v)}
              className="flex items-center gap-1 text-xs text-gray-300 hover:text-white transition-colors group"
            >
              <MapPin className="w-3 h-3 text-[var(--color-primary)]" />
              <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none">Delivering to</p>
                <p className="text-sm font-semibold text-white flex items-center gap-0.5">
                  {city} <ChevronDown className={`w-3 h-3 transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
                </p>
              </div>
            </button>

            {/* City dropdown */}
            {cityOpen && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 py-1">
                {CITIES.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCity(c); setCityOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors
                      ${c === city
                        ? 'bg-orange-50 text-[var(--color-primary)] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <MapPin className="w-3.5 h-3.5 opacity-60" /> {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-6 bg-white/10 shrink-0" />

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white/20 rounded-xl px-3 h-9 gap-2 border border-white/10 focus-within:border-white/30 transition-all">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={`Search "Christmas Decor"`}
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 outline-none min-w-0"
              />
              <div className="flex items-center gap-1.5 shrink-0">
                <button type="button" title="Image search" className="p-1 rounded-md text-gray-400 hover:text-white transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button type="button" title="Voice search" className="p-1 rounded-md text-gray-400 hover:text-white transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-1">

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="p-2 rounded-lg text-gray-400 hover:text-[var(--color-accent)] transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-0.5 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isLoggedIn ? (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setUserOpen(v => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <UserCircle className="w-4.5 h-4.5" />
                  <span className="hidden sm:inline">{user?.name?.split(' ')[0] ?? 'Account'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userOpen ? 'rotate-180' : ''}`} />
                </button>

                {userOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 py-1">
                    <Link
                      href={dashboardHref}
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-400" /> Dashboard
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      onClick={() => { logout(); setUserOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/Login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors ml-1"
              >
                <UserCircle className="w-4 h-4" />
                Login
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="ml-1 md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ══ ROW 2 — Nav links (white) ═════════════════════ */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-6">
          <nav className="flex items-center gap-0" aria-label="Site navigation">
            {NAV_LINKS.map(link => {
              const active = link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-4 py-3 text-sm font-medium transition-colors duration-150
                    ${active
                      ? 'text-[var(--color-primary)]'
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  {link.label}
                  {/* Active underline */}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)] rounded-t-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ══ Mobile menu (slides down) ══════════════════════ */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          {/* Mobile city + search */}
          <div className="px-4 pt-3 pb-2 space-y-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                className="flex-1 text-sm text-gray-700 bg-transparent outline-none font-medium"
              >
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-xl px-3 h-10 gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search services..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder-gray-400"
              />
            </form>
          </div>

          {/* Mobile nav links */}
          <nav className="px-2 py-2">
            {NAV_LINKS.map(link => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${active
                      ? 'text-[var(--color-primary)] bg-orange-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile auth */}
          {!isLoggedIn && (
            <div className="px-4 py-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/auth/Login"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <UserCircle className="w-4 h-4" /> Log in
              </Link>
              <Link
                href="/auth/Register"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-sm font-semibold text-white shadow-sm"
              >
                Sign up free
              </Link>
            </div>
          )}
        </div>
      )}

    </header>
  );
}

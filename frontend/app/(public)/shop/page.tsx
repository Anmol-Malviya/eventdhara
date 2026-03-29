'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES, CITIES } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Search, Star, Heart, SlidersHorizontal, X, MapPin, ArrowUpDown, ChevronRight } from 'lucide-react';

// ── Rich dummy services ───────────────────────────────────────────────────────
const CATEGORY_EMOJIS: Record<string, string> = {
  'Balloon Decoration': '🎈',
  'Floral Decoration':  '🌸',
  'Cake & Desserts':    '🎂',
  'Photography':        '📸',
  'Videography':        '🎬',
  'Makeup & Styling':   '💄',
  'DJ & Music':         '🎵',
  'Mehndi':             '🎨',
  'Lighting':           '💡',
  'Invitation Cards':   '💌',
};

type Service = {
  id: string;
  name: string;
  category: string;
  city: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  vendor: string;
  image: string;
  tag?: string;
  isNew?: boolean;
};

const ALL_SERVICES: Service[] = [
  { id: 's1',  name: 'Premium Balloon Bouquet Arch',            category: 'Balloon Decoration', city: 'Indore', price: 2499, originalPrice: 3500, rating: 4.9, reviews: 128, vendor: 'Balloon World Studio',     image: '/images/home/balloon-p.jpg', tag: 'Best Seller' },
  { id: 's2',  name: 'Royal Floral Table Setup',                category: 'Floral Decoration',  city: 'Indore', price: 3999, originalPrice: 4500, rating: 4.7, reviews: 84,  vendor: 'Petal Perfect Events',    image: '/images/home/wedding-decor-p.jpg' },
  { id: 's3',  name: 'Custom Designer Fondant Cake',            category: 'Cake & Desserts',    city: 'Bhopal', price: 1999, originalPrice: 2500, rating: 4.8, reviews: 211, vendor: 'Sweet Creations Bakery', image: '/images/home/cake-p.jpg', tag: 'Top Rated' },
  { id: 's4',  name: 'Professional Birthday Photography',       category: 'Photography',        city: 'Indore', price: 4999, originalPrice: 6000, rating: 4.6, reviews: 67,  vendor: 'FrameIt Studios',         image: '/images/home/photography-p.jpg' },
  { id: 's5',  name: 'Cinematic Event Videography',             category: 'Videography',        city: 'Bhopal', price: 7999, originalPrice: 9999, rating: 4.9, reviews: 45,  vendor: 'ReelMoments Media',       image: '/images/home/videography-p.jpg', isNew: true },
  { id: 's6',  name: 'Bridal Makeup & Hair Package',            category: 'Makeup & Styling',   city: 'Ujjain', price: 5499, originalPrice: 7000, rating: 4.8, reviews: 156, vendor: 'GlowUp Studio',           image: '/images/home/makeup-p.jpg', tag: 'Popular' },
  { id: 's7',  name: 'DJ with Live Sound System Setup',         category: 'DJ & Music',         city: 'Indore', price: 8999, originalPrice: 11000,rating: 4.5, reviews: 38,  vendor: 'BeatBox DJ Events',       image: '/images/home/engagement-decor-p.jpg' },
  { id: 's8',  name: 'Traditional Rajasthani Mehndi Artist',    category: 'Mehndi',             city: 'Bhopal', price: 1499, originalPrice: 2000, rating: 4.9, reviews: 302, vendor: 'Henna Hands Art',         image: '/images/home/mehadi-p.jpg', tag: 'Best Seller' },
  { id: 's9',  name: 'LED Fairy Light Indoor Lighting Setup',   category: 'Lighting',           city: 'Indore', price: 3499,  rating: 4.7, reviews: 72,  vendor: 'LightCraft Decor',        image: '/images/home/anniversary-decor-p.jpg' },
  { id: 's10', name: 'Customized Digital Invitation Design',    category: 'Invitation Cards',   city: 'Ujjain', price: 799,   originalPrice: 1200, rating: 4.6, reviews: 189, vendor: 'CardCraft Studio',        image: '/images/home/invitation-p.jpg', isNew: true },
  { id: 's11', name: 'Golden Balloon Ceiling Surprise Setup',   category: 'Balloon Decoration', city: 'Bhopal', price: 1999,  originalPrice: 2800, rating: 4.7, reviews: 95,  vendor: 'Balloon World Studio',    image: '/images/home/birthday-decor-p.jpg' },
  { id: 's12', name: 'Organic Floral Mandap Decoration',        category: 'Floral Decoration',  city: 'Indore', price: 9999,  originalPrice: 15000,rating: 4.9, reviews: 33,  vendor: 'BloomBox Events',         image: '/images/home/wedding-decor-p.jpg', tag: 'Premium' },
  { id: 's13', name: 'Kids Birthday Party Full Package',        category: 'Balloon Decoration', city: 'Indore', price: 4499,  originalPrice: 5500, rating: 4.8, reviews: 142, vendor: 'FunZone Events',          image: '/images/home/babyshower-decor-p.jpg', tag: 'Popular' },
  { id: 's14', name: 'Candlelight Anniversary Dinner Setup',    category: 'Floral Decoration',  city: 'Ujjain', price: 5999,  rating: 4.9, reviews: 61,  vendor: 'Romance & Décor',        image: '/images/home/anniversary-decor-p.jpg' },
  { id: 's15', name: 'Pre-Wedding Story Photography',           category: 'Photography',        city: 'Indore', price: 9999,  originalPrice: 12500,rating: 5.0, reviews: 28,  vendor: 'FrameIt Studios',         image: '/images/home/photography-p.jpg', tag: 'Top Pick' },
  { id: 's16', name: 'Drone Aerial Videography',                category: 'Videography',        city: 'Indore', price: 12999, rating: 4.8, reviews: 19,  vendor: 'SkyView Shoots',          image: '/images/home/videography-p.jpg' },
];

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price_asc',   label: 'Price: Low to High' },
  { value: 'price_desc',  label: 'Price: High to Low' },
  { value: 'rating',      label: 'Top Rated' },
  { value: 'reviews',     label: 'Most Reviewed' },
];

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCities, setSelectedCities]         = useState<string[]>([]);
  const [priceMax, setPriceMax]                     = useState<number>(15000);
  const [sort, setSort]                             = useState('recommended');
  const [search, setSearch]                         = useState('');
  const [wishlist, setWishlist]                     = useState<Set<string>>(new Set());
  const [mobileFilters, setMobileFilters]           = useState(false);

  const toggleCategory = (cat: string) =>
    setSelectedCategories(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat]);

  const toggleCity = (city: string) =>
    setSelectedCities(p => p.includes(city) ? p.filter(c => c !== city) : [...p, city]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlist(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = ALL_SERVICES.filter(s => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(s.category)) return false;
      if (selectedCities.length > 0 && !selectedCities.includes(s.city)) return false;
      if (s.price > priceMax) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) &&
          !s.vendor.toLowerCase().includes(search.toLowerCase()) &&
          !s.category.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    if (sort === 'price_asc')  result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     result = [...result].sort((a, b) => b.rating - a.rating);
    if (sort === 'reviews')    result = [...result].sort((a, b) => b.reviews - a.reviews);

    return result;
  }, [selectedCategories, selectedCities, priceMax, sort, search]);

  const activeFilters = selectedCategories.length + selectedCities.length + (priceMax < 15000 ? 1 : 0);

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Search Services</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Keywords…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          />
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Categories */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Service Type</h3>
        <div className="space-y-3">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500 accent-rose-500 transition-colors"
              />
              <span className={`text-sm flex items-center gap-2 transition-colors ${selectedCategories.includes(cat) ? 'text-gray-900 font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                <span className="opacity-70 group-hover:opacity-100">{CATEGORY_EMOJIS[cat]}</span> {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Cities */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">City</h3>
        <div className="space-y-3">
          {CITIES.map(city => (
            <label key={city} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCities.includes(city)}
                onChange={() => toggleCity(city)}
                className="w-4 h-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500 accent-rose-500 transition-colors"
              />
              <span className={`text-sm flex items-center gap-2 transition-colors ${selectedCities.includes(city) ? 'text-gray-900 font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-rose-400" /> {city}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-100" />

      {/* Price */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Max Price</h3>
          <span className="text-sm font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md">
            {priceMax >= 15000 ? 'Any' : `₹${priceMax.toLocaleString('en-IN')}`}
          </span>
        </div>
        <input
          type="range"
          min={500} max={15000} step={500}
          value={priceMax}
          onChange={e => setPriceMax(+e.target.value)}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />
        <div className="flex justify-between text-[11px] font-medium text-gray-400 mt-2 uppercase">
          <span>₹500</span><span>₹15,000+</span>
        </div>
      </div>

      {activeFilters > 0 && (
        <button
          onClick={() => { setSelectedCategories([]); setSelectedCities([]); setPriceMax(15000); setSearch(''); }}
          className="w-full py-2.5 text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-red-600 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <X className="w-4 h-4" /> Clear filters ({activeFilters})
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12 py-6 md:py-10">
      
      {/* ── Page Header Hero ─────────────────────────────── */}
      <div className="mb-8 md:mb-12 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-rose-50 via-orange-50/50 to-orange-50 border border-orange-100/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background shape */}
        <div className="absolute -top-24 -right-12 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-12 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Explore <span className="text-rose-500">Services</span></h1>
          <p className="text-gray-600 mt-3 text-sm md:text-base font-medium max-w-xl">
            Find and book top-rated decorators, photographers, and makeup artists to make your next event truly unforgettable.
          </p>
        </div>
        <div className="hidden lg:flex relative z-10 shrink-0 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 flex items-center gap-3">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 text-xl">🎉</div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Trusted Vendors</p>
              <p className="font-extrabold text-lg text-gray-900">500+</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100 flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 text-xl">⭐</div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Happy Clients</p>
              <p className="font-extrabold text-lg text-gray-900">10k+</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-10">
        {/* ── Desktop Sidebar ──────────────────────────── */}
        <aside className="hidden md:block w-72 shrink-0">
          <div className="sticky top-24 bg-white rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.02)] p-6 md:p-8">
            <FilterPanel />
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-6 bg-white p-3 md:p-4 rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex-wrap">
            <span className="text-sm font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg">
              {filtered.length === 0 ? 'No services found' : `${filtered.length} Result${filtered.length !== 1 ? 's' : ''}`}
            </span>
            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFilters(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold hover:bg-rose-100 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {activeFilters > 0 && <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{activeFilters}</span>}
              </button>
              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide hidden sm:block">Sort By</span>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-sm font-medium border-none bg-gray-50 rounded-xl px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500/30 text-gray-800"
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {activeFilters > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map(cat => (
                <button key={cat} onClick={() => toggleCategory(cat)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors shadow-sm">
                  {cat} <X className="w-3.5 h-3.5 opacity-70" />
                </button>
              ))}
              {selectedCities.map(city => (
                <button key={city} onClick={() => toggleCity(city)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition-colors shadow-sm">
                  <MapPin className="w-3 h-3" /> {city} <X className="w-3.5 h-3.5 opacity-70" />
                </button>
              ))}
              {priceMax < 15000 && (
                <button onClick={() => setPriceMax(15000)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
                  Up to ₹{priceMax.toLocaleString('en-IN')} <X className="w-3.5 h-3.5 opacity-70" />
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="bg-gray-50 rounded-3xl text-center py-24 md:py-32 border border-gray-100 border-dashed">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
              <button onClick={() => { setSelectedCategories([]); setSelectedCities([]); setPriceMax(15000); setSearch(''); }} className="mt-6 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl shadow-sm hover:bg-gray-50 transition-all">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filtered.map((service) => (
                <Link key={service.id} href={`/shop/${service.id}`} className="group h-full">
                  <Card className="h-full border border-gray-100 bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-rose-100 transition-all duration-300 transform group-hover:-translate-y-1">
                    {/* Image area */}
                    <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                      <Image 
                        src={service.image} 
                        alt={service.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                      />
                      
                      {/* Gradient Overlay for texture */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Wishlist */}
                      <button
                        onClick={(e) => toggleWishlist(service.id, e)}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform z-10"
                      >
                        <Heart className={`w-4.5 h-4.5 relative top-px ${wishlist.has(service.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
                      </button>

                      {/* Tags */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {service.tag && <Badge className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wide border-none shadow-md px-2 py-1">{service.tag}</Badge>}
                        {service.isNew && <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] uppercase tracking-wide border-none shadow-md px-2 py-1">New Arrival</Badge>}
                      </div>
                    </div>

                    <CardContent className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs text-gray-500 font-semibold bg-gray-50 px-2 py-1 rounded-md flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-rose-500" /> {service.city}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-1 rounded-md">
                          <Star className="w-3 h-3 fill-current" />
                          {service.rating.toFixed(1)}
                          <span className="text-amber-600/60 font-medium ml-0.5">({service.reviews})</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-base leading-snug mb-1.5 text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-5 font-medium">
                        by <span className="text-gray-900">{service.vendor}</span>
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Starting From</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-extrabold text-gray-900">
                              ₹{service.price.toLocaleString('en-IN')}
                            </span>
                            {service.originalPrice && (
                              <span className="text-sm font-medium text-gray-400 line-through">
                                ₹{service.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all transform group-hover:-rotate-45">
                          <ArrowUpDown className="w-5 h-5 rotate-90" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="mt-14 mb-8 flex items-center justify-center">
              <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 p-1">
                <Button variant="ghost" className="text-gray-500 hover:text-gray-900 font-medium" disabled>Prev</Button>
                <div className="flex items-center px-2">
                  <Button variant="ghost" className="w-9 h-9 p-0 bg-rose-500 text-white hover:bg-rose-600 hover:text-white font-bold rounded-lg">1</Button>
                  <Button variant="ghost" className="w-9 h-9 p-0 text-gray-600 font-semibold hover:bg-gray-50 rounded-lg">2</Button>
                  <span className="text-gray-400 px-3 font-medium">...</span>
                  <Button variant="ghost" className="w-9 h-9 p-0 text-gray-600 font-semibold hover:bg-gray-50 rounded-lg">8</Button>
                </div>
                <Button variant="ghost" className="text-gray-700 font-bold hover:text-rose-600">Next <ChevronRight className="w-4 h-4 ml-1" /></Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Backdrop */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
          <div className="relative ml-auto w-[85%] max-w-sm bg-white h-full overflow-y-auto p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-xl text-gray-900">Filters</h3>
              <button onClick={() => setMobileFilters(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1">
              <FilterPanel />
            </div>
            <div className="mt-8 pt-6 border-t border-gray-100 sticky bottom-0 bg-white pb-6">
              <Button className="w-full py-6 text-base font-bold bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-lg shadow-rose-500/30" onClick={() => setMobileFilters(false)}>
                Show {filtered.length} Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, CITIES, OCCASIONS } from '@/lib/constants';
import {
  ArrowRight, ChevronRight, Star, Zap, Shield, Clock,
  MapPin, CheckCircle, Tag, TrendingUp, Award, Users
} from 'lucide-react';

// ─── Data ──────────────────────────────────────────────

const OCCASION_TABS = [
  { id: 'birthday',    label: 'Birthday',    emoji: '🎂', icon: '🎉' },
  { id: 'anniversary', label: 'Anniversary', emoji: '💍', icon: '💑' },
  { id: 'wedding',     label: 'Wedding',     emoji: '💒', icon: '👰' },
  { id: 'baby_shower', label: 'Baby Shower', emoji: '👶', icon: '🍼' },
  { id: 'bachelorette',label: 'Bachelorette',emoji: '🥂', icon: '💃' },
  { id: 'engagement',  label: 'Engagement',  emoji: '💎', icon: '💍' },
];

const MOCK_SERVICES: Record<string, Array<{
  title: string; category: string; price: number; originalPrice: number;
  rating: number; reviews: number; badge?: string; img: string;
}>> = {
  birthday: [
    { title: 'Premium Balloon Decoration',    category: 'Balloon Decoration', price: 2499, originalPrice: 3499, rating: 4.9, reviews: 312, badge: 'Best Seller', img: '/images/home/birthday-decor-p.jpg' },
    { title: 'Birthday Cake + Decoration',    category: 'Cake & Desserts',    price: 1899, originalPrice: 2499, rating: 4.8, reviews: 198, badge: 'PRICE DROP',  img: '/images/home/cake-p.jpg'   },
    { title: 'Photography + Reels Package',   category: 'Photography',         price: 4999, originalPrice: 6500, rating: 5.0, reviews: 87,  badge: undefined,      img: '/images/home/photography-p.jpg'   },
    { title: 'DJ Setup — 4 Hours',            category: 'DJ & Music',          price: 3499, originalPrice: 4500, rating: 4.7, reviews: 143,                        img: '/images/home/lighting-p.jpg' },
  ],
  anniversary: [
    { title: 'Rose & Candle Decoration',      category: 'Floral Decoration',   price: 2999, originalPrice: 3999, rating: 4.9, reviews: 221, badge: 'Best Seller', img: '/images/home/anniversary-decor-p.jpg'    },
    { title: 'Couple Photography Session',    category: 'Photography',         price: 5499, originalPrice: 7000, rating: 5.0, reviews: 104, badge: 'PRICE DROP',  img: '/images/home/photography-p.jpg'   },
    { title: 'Anniversary Cake — 2 kg',       category: 'Cake & Desserts',    price: 1299, originalPrice: 1799, rating: 4.8, reviews: 167,                        img: '/images/home/cake-p.jpg'  },
    { title: 'Full Makeup & Styling',         category: 'Makeup & Styling',    price: 3999, originalPrice: 5500, rating: 4.9, reviews: 89,                        img: '/images/home/makeup-p.jpg' },
  ],
  wedding: [
    { title: 'Complete Wedding Decoration',   category: 'Floral Decoration',   price: 24999, originalPrice: 32000, rating: 4.9, reviews: 56, badge: 'Best Seller', img: '/images/home/wedding-decor-p.jpg'   },
    { title: 'Wedding Photography + Video',   category: 'Videography',         price: 34999, originalPrice: 45000, rating: 5.0, reviews: 43, badge: 'PRICE DROP',  img: '/images/home/photography-p.jpg' },
    { title: 'Mehndi Artist — Full Hands',    category: 'Mehndi',              price: 2499, originalPrice: 3200, rating: 4.8, reviews: 178,                        img: '/images/home/mehndi-decor-p.jpg' },
    { title: 'Bridal Makeup Premium',         category: 'Makeup & Styling',    price: 8999, originalPrice: 12000, rating: 4.9, reviews: 62,                        img: '/images/home/makeup-p.jpg' },
  ],
  baby_shower: [
    { title: 'Baby Shower Balloon Decor',     category: 'Balloon Decoration', price: 2199, originalPrice: 2999, rating: 4.8, reviews: 134, badge: 'Best Seller', img: '/images/home/babyshower-decor-p.jpg'       },
    { title: 'Cute Baby Theme Cake',          category: 'Cake & Desserts',    price: 1499, originalPrice: 1999, rating: 4.7, reviews: 98,  badge: 'PRICE DROP',  img: '/images/home/cake-p.jpg'    },
    { title: 'Baby Shower Photography',       category: 'Photography',         price: 3499, originalPrice: 4500, rating: 4.9, reviews: 67,                        img: '/images/home/photography-p.jpg'   },
    { title: 'Custom Invitations Pack',       category: 'Invitation Cards',    price: 599,  originalPrice: 899,  rating: 4.6, reviews: 213,                       img: '/images/home/invitation-p.jpg'   },
  ],
  bachelorette: [
    { title: 'Party Balloon & Prop Setup',    category: 'Balloon Decoration', price: 3499, originalPrice: 4500, rating: 4.9, reviews: 145, badge: 'Best Seller', img: '/images/home/balloon-p.jpg' },
    { title: 'Bachelorette Photography',      category: 'Photography',         price: 5999, originalPrice: 7500, rating: 5.0, reviews: 72,  badge: 'PRICE DROP',  img: '/images/home/photography-p.jpg'   },
    { title: 'DJ + Dance Floor Setup',        category: 'DJ & Music',          price: 6999, originalPrice: 9000, rating: 4.8, reviews: 54,                        img: '/images/home/lighting-p.jpg' },
    { title: 'Party Lighting Package',        category: 'Lighting',            price: 2999, originalPrice: 3999, rating: 4.7, reviews: 89,                        img: '/images/home/lighting-p.jpg' },
  ],
  engagement: [
    { title: 'Floral Ring Ceremony Decor',    category: 'Floral Decoration',   price: 8999, originalPrice: 12000, rating: 4.9, reviews: 87, badge: 'Best Seller', img: '/images/home/engagement-decor-p.jpg'   },
    { title: 'Engagement Photography',        category: 'Photography',         price: 7999, originalPrice: 10000, rating: 5.0, reviews: 63, badge: 'PRICE DROP',  img: '/images/home/photography-p.jpg'   },
    { title: 'Ring Ceremony Cake',            category: 'Cake & Desserts',    price: 1999, originalPrice: 2799, rating: 4.8, reviews: 112,                        img: '/images/home/cake-p.jpg' },
    { title: 'Couple Mehndi Design',          category: 'Mehndi',              price: 1499, originalPrice: 2000, rating: 4.7, reviews: 94,                        img: '/images/home/mehndi-decor-p.jpg' },
  ],
};

const CATEGORY_ITEMS = [
  { label: 'Balloon Decoration', img: '/images/home/icon-balloon.png',    href: '/shop?category=Balloon+Decoration', bg: 'bg-orange-50'  },
  { label: 'Floral Decoration',  img: '/images/home/icon-flower.png',     href: '/shop?category=Floral+Decoration', bg: 'bg-pink-50'   },
  { label: 'Photography',        img: '/images/home/icon-camera.png',     href: '/shop?category=Photography', bg: 'bg-blue-50'         },
  { label: 'Cake & Desserts',    img: '/images/home/icon-cake.png',       href: '/shop?category=Cake+%26+Desserts', bg: 'bg-amber-50'   },
  { label: 'Mehndi',             img: '/images/home/icon-mehndi.png',     href: '/shop?category=Mehndi', bg: 'bg-green-50'              },
  { label: 'Makeup & Styling',   img: '/images/home/icon-makeup.png',     href: '/shop?category=Makeup+%26+Styling', bg: 'bg-rose-50'  },
  { label: 'DJ & Music',         img: '/images/home/icon-dj.png',         href: '/shop?category=DJ+%26+Music', bg: 'bg-indigo-50'        },
  { label: 'Videography',        img: '/images/home/icon-video.png',      href: '/shop?category=Videography', bg: 'bg-purple-50'         },
  { label: 'Lighting',           img: '/images/home/icon-light.png',      href: '/shop?category=Lighting', bg: 'bg-yellow-50'            },
  { label: 'Invitation Cards',   img: '/images/home/icon-invite.png',     href: '/shop?category=Invitation+Cards', bg: 'bg-red-50'    },
];

const OFFERS = [
  { code: 'FIRST200', title: '₹200 Off',   desc: 'On your first booking',  color: 'from-orange-400 to-amber-400'  },
  { code: 'INDORE50', title: '50% Off',    desc: 'Indore-exclusive deals',  color: 'from-rose-400 to-pink-400'     },
  { code: 'NEWAPP',   title: 'App Deal',   desc: 'Upto ₹300 off on App',   color: 'from-violet-400 to-indigo-400' },
];

const SHOP_BY_RELATION = [
  { label: 'For Her',  emoji: '👩', gradient: 'from-pink-400 to-rose-400'    },
  { label: 'For Him',  emoji: '👨', gradient: 'from-blue-400 to-indigo-400'  },
  { label: 'For Kids', emoji: '🧒', gradient: 'from-amber-400 to-orange-400' },
  { label: 'For Wife', emoji: '💑', gradient: 'from-rose-400 to-pink-400'    },
  { label: 'For BFF',  emoji: '👯', gradient: 'from-purple-400 to-violet-400'},
  { label: 'Parents',  emoji: '👴', gradient: 'from-green-400 to-teal-400'   },
];

const STATS = [
  { value: '10K+',  label: 'Happy Customers', icon: Users    },
  { value: '500+',  label: 'Verified Vendors', icon: Award   },
  { value: '4.8★',  label: 'Avg Rating',       icon: Star    },
  { value: '6',     label: 'Cities Live',       icon: MapPin  },
];

// ─── Badge colours ─────────────────────────────────────
function BadgePill({ text }: { text: string }) {
  const isPrice = text === 'PRICE DROP';
  return (
    <span className={`
      inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full
      ${isPrice ? 'bg-red-500 text-white' : 'bg-violet-600 text-white'}
    `}>
      {text}
    </span>
  );
}

// ─── Service Card ──────────────────────────────────────
function ServiceCard({ s, href }: {
  s: typeof MOCK_SERVICES['birthday'][0];
  href: string;
}) {
  const discount = Math.round((1 - s.price / s.originalPrice) * 100);
  return (
    <Link href={href} className="group block">
      <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
        {/* Image area */}
        <div className="relative bg-gray-100 aspect-[4/5] flex items-center justify-center overflow-hidden">
          <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-[var(--color-primary)] text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
              {discount}% off
            </span>
          )}
          {s.badge && (
            <span className="absolute top-3 right-3 z-10">
              <BadgePill text={s.badge} />
            </span>
          )}
        </div>
        {/* Info */}
        <div className="p-3.5">
          <p className="text-[11px] text-[var(--color-primary)] font-semibold uppercase tracking-wide mb-1">{s.category}</p>
          <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2">{s.title}</h3>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{s.rating}</span>
            <span className="text-xs text-gray-400">| {s.reviews} reviews</span>
          </div>
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-gray-900">₹{s.price.toLocaleString('en-IN')}</span>
            <span className="text-xs text-gray-400 line-through">₹{s.originalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Page Component ────────────────────────────────────
export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* ══ CATEGORY QUICK LINKS (Live Site Match) ══════════════ */}
      <section className="py-6 border-b border-gray-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
          <div className="flex items-start gap-4 md:gap-8 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Special Categories Icon */}
            <Link href="/shop" className="group flex flex-col items-center gap-2 shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-rose-500 flex flex-wrap gap-1 p-3 items-center justify-center shadow-sm group-hover:scale-105 transition-all">
                <div className="w-[40%] h-[40%] bg-white/90 rounded-sm"></div><div className="w-[40%] h-[40%] bg-white/60 rounded-sm"></div>
                <div className="w-[40%] h-[40%] bg-white/60 rounded-sm"></div><div className="w-[40%] h-[40%] bg-white/90 rounded-sm"></div>
              </div>
              <span className="text-[11px] md:text-sm font-semibold text-gray-700 text-center leading-tight">Categories</span>
            </Link>
            
            {/* Dynamic Items */}
            {[
              { label: 'Anniversary', img: '/images/home/anniversary-decor-p.jpg' },
              { label: 'Baby Shower', img: '/images/home/babyshower-decor-p.jpg' },
              { label: 'Bachelor Party', img: '/images/home/balloon-p.jpg' },
              { label: 'Birthday Decor', img: '/images/home/birthday-decor-p.jpg' },
              { label: 'Floral Setup', img: '/images/home/wedding-decor-p.jpg' },
              { label: 'Haldi Decor', img: '/images/home/mehndi-decor-p.jpg' },
              { label: 'Home Decor', img: '/images/home/engagement-decor-p.jpg' }
            ].map(cat => (
              <Link key={cat.label} href="/shop" className="group flex flex-col items-center gap-2 shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-rose-300 group-hover:shadow-md transition-all relative">
                  <Image src={cat.img} alt={cat.label} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-[11px] md:text-sm font-semibold text-gray-700 text-center leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HERO CAROUSEL ══════════════════════════════════ */}
      <section className="mx-auto mt-6 px-4 md:px-8 xl:px-12 relative max-w-[1600px]">
        <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            {
              title: "Birthday Joy,\nGift-Wrapped",
              subtitle: "Curated bloom, cakes & more\nfor thoughtful celebrations",
              button: "ORDER NOW",
              bg: "bg-[#FCF1E2]",
              img: "/images/home/balloon-p.jpg",
              btnColor: "bg-[#7A9C59] hover:bg-[#68854A] text-white",
            },
            {
              title: "Gourmet Cakes for\nYour Celebration",
              subtitle: "Find the sweetest delights\nfor your sweetest moments",
              button: "ORDER NOW",
              bg: "bg-[#F5CFA2]",
              img: "/images/home/cake-p.jpg",
              btnColor: "bg-[#7A9C59] hover:bg-[#68854A] text-white",
            },
            {
              title: "Elegant Weddings &\nAnniversaries",
              subtitle: "Premium decor, photography,\nand complete event setups",
              button: "EXPLORE NOW",
              bg: "bg-[#EAEBED]",
              img: "/images/home/wedding-decor-p.jpg",
              btnColor: "bg-[#7A9C59] hover:bg-[#68854A] text-white",
            }
          ].map((banner, idx) => (
            <div key={idx} className={`relative shrink-0 w-[92vw] sm:w-[85vw] md:w-[700px] lg:w-[850px] xl:w-[950px] h-[300px] sm:h-[350px] md:h-[400px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden snap-center ${banner.bg} shadow-sm border border-black/5 flex items-center`}>
              
              {/* Right Side Image Fade/Mask */}
              <div className="absolute top-0 right-0 w-[55%] md:w-[60%] h-full flex justify-end [mask-image:linear-gradient(to_right,transparent,black_30%)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_30%)]">
                 <div className="relative w-full h-full">
                   <Image src={banner.img} alt="Banner" fill className="object-cover object-right" />
                 </div>
              </div>

              {/* Left Side Content */}
              <div className="relative z-10 w-[65%] pl-6 sm:pl-10 md:pl-16 pr-4 sm:pr-8 flex flex-col justify-center h-full">
                <h2 className="text-[28px] sm:text-4xl md:text-[44px] lg:text-[52px] font-extrabold text-gray-900 leading-[1.1] whitespace-pre-line tracking-tight mb-3 md:mb-5">
                  {banner.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium whitespace-pre-line mb-6 md:mb-8 max-w-[280px] md:max-w-[340px] opacity-90 leading-snug">
                  {banner.subtitle}
                </p>
                <div>
                  <Link href="/shop" className={`inline-flex items-center justify-center px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all tracking-wide ${banner.btnColor}`}>
                    {banner.button}
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>




      {/* ══ OUR EVENT SERVICES ════════════════════════ */}
      <section className="py-8 bg-white max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
        <div className="mb-6 flex flex-col justify-start items-start">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-b-2 border-rose-500 inline-block pb-1 pr-4">Our Event Services</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-2">Book trusted professionals for your special moments</p>
        </div>
        
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { title: 'Anchor', sub: 'Command the Stage', img: '/images/home/photography-p.jpg' },
            { title: 'Makeup Artists', sub: 'Look Stunning', img: '/images/home/makeup-p.jpg' },
            { title: 'DJ Services', sub: 'Feel the Beat', img: '/images/home/lighting-p.jpg' },
            { title: 'Mehendi Artists', sub: 'Art on Hands', img: '/images/home/mehndi-decor-p.jpg' },
            { title: 'Photography', sub: 'Capture Forever', img: '/images/home/wedding-decor-p.jpg' },
            { title: 'Photo Booths', sub: 'Strike a Pose', img: '/images/home/hero-wedding-p.jpg' },
            { title: 'Floral Setup', sub: 'Aesthetic Blooms', img: '/images/home/wedding-decor-p.jpg' },
            { title: 'Choreography', sub: 'Dance to the Beat', img: '/images/home/photography-p.jpg' },
            { title: 'Live Music', sub: 'Soulful Melodies', img: '/images/home/lighting-p.jpg' },
            { title: 'Event Planning', sub: 'Stress-Free Setup', img: '/images/home/anniversary-decor-p.jpg' },
          ].map((s, idx) => (
            <Link href={`/shop?category=${encodeURIComponent(s.title)}`} key={idx} className="group shrink-0 w-[150px] md:w-[200px] snap-start flex flex-col gap-2 relative">
              <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] md:text-xs font-semibold">{s.sub}</div>
              </div>
              <div className="flex items-center justify-between px-1">
                <span className="text-sm font-bold text-gray-800">{s.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ CELEBRATE MOMENTS ════════════════════════ */}
      <section className="py-4 bg-white max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12 mb-8">
        <div className="mb-6 flex flex-col justify-start items-start">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-b-2 border-teal-500 inline-block pb-1 pr-4">Celebrate Life's Precious Moments in Style</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-2">From anniversaries to baby showers, discover decoration themes crafted for your special day.</p>
        </div>
        
        <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { title: 'Anniversary Themes', img: '/images/home/anniversary-decor-p.jpg' },
            { title: 'Birthday Bash', img: '/images/home/birthday-decor-p.jpg' },
            { title: 'Baby Shower', img: '/images/home/babyshower-decor-p.jpg' },
            { title: 'Wedding Ceremonies', img: '/images/home/wedding-decor-p.jpg' },
            { title: 'Corporate Events', img: '/images/home/engagement-decor-p.jpg' },
            { title: 'Private Parties', img: '/images/home/balloon-p.jpg' },
          ].map((s, idx) => (
            <Link href={`/shop`} key={idx} className="group shrink-0 w-[280px] md:w-[380px] snap-start relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[3/2] border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-white text-rose-500 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm hover:bg-rose-50 transition-colors">Explore</div>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-bold text-sm md:text-base">{s.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ OCCASION COLLECTIONS (Screenshot 1) ═════════════════════ */}
      <div className="bg-white">
        {OCCASION_TABS.map((tab, idx) => {
          const items = MOCK_SERVICES[tab.id as keyof typeof MOCK_SERVICES] || [];
          const badges = ['bg-rose-400', 'bg-red-500', 'bg-orange-500', 'bg-pink-500'];
          const tags = ['Classic', 'Most Loved', 'Hot', 'Fun & Bright'];

          return (
            <React.Fragment key={tab.id}>
              <section id={`section-${tab.id}`} className="py-8 scroll-mt-32 max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12 border-t border-gray-100/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-b-2 border-rose-500 inline-block pb-1 pr-4">
                    {tab.label}
                  </h2>
                  <Link
                    href={`/shop?occasion=${tab.id}`}
                    className="inline-flex items-center gap-1 text-xs md:text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Horizontal Scroll Product Collection */}
                <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {[...items, ...items].map((s, i) => (
                    <Link
                      key={i}
                      href={`/shop?occasion=${tab.id}&category=${encodeURIComponent(s.category)}`}
                      className="group shrink-0 w-[240px] md:w-[320px] snap-start rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                    >
                      <div className="relative w-full aspect-[4/3] md:aspect-[3/2] bg-gray-50 overflow-hidden">
                        <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className={`absolute top-2 md:top-3 left-2 md:left-3 text-white text-[10px] md:text-[11px] font-bold px-2 py-0.5 md:py-1 rounded-full z-10 ${badges[i % badges.length]}`}>
                          {tags[i % tags.length]}
                        </div>
                      </div>
                      <div className="p-4 bg-white border-t border-gray-50">
                        <h3 className="text-sm md:text-[15px] font-bold text-gray-800 leading-snug mb-1 md:mb-1.5">{s.title}</h3>
                        <p className="text-xs text-gray-400 font-medium">Premium decoration</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* ══ FNP STYLE BIRTHDAY SPECIALS (Requested Block) ══════════════ */}
              {tab.id === 'birthday' && (
                <section className="pb-12 bg-white max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
                  <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Large Hero Card */}
                    <div className="lg:w-1/3 shrink-0 relative rounded-3xl overflow-hidden bg-[#FFF3E6] border border-[#FFE0C4] p-6 md:p-8 flex flex-col min-h-[300px] lg:min-h-[380px] shadow-sm hover:shadow-md transition-shadow">
                      <div className="absolute top-0 inset-x-0 flex justify-around opacity-70">
                        <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[40px] border-t-[#FFC1C1]"></div>
                        <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[40px] border-t-[#A0D2EB]"></div>
                        <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[40px] border-t-[#D0E6A5]"></div>
                        <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-t-[40px] border-t-[#FFD3B6]"></div>
                      </div>
                      <div className="relative flex-1 min-h-[160px] md:min-h-[200px] w-full mb-4 md:mb-6 mt-4">
                        <Image src="/images/home/balloon-p.jpg" alt="Birthdays Banner" fill className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500 rounded-3xl" />
                      </div>
                      <div className="flex items-end justify-between gap-4 relative z-10 w-full mt-auto bg-white/50 backdrop-blur-sm p-4 rounded-2xl">
                        <div>
                          <h3 className="text-[22px] md:text-[28px] font-extrabold text-[#ED4C5C] leading-tight mb-1">Birthdays Made Special</h3>
                          <p className="text-gray-900 font-bold text-xs md:text-sm">Joyful gifts to #MakeItSpecial</p>
                        </div>
                        <Link href="/shop" className="w-12 h-12 md:w-14 md:h-14 bg-[#ED4C5C] rounded-full flex items-center justify-center text-white hover:bg-rose-600 transition-colors shrink-0 shadow-md hover:scale-105">
                          <ArrowRight className="w-6 h-6 md:w-7 md:h-7" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Grid */}
                    <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-6">
                      {[
                        { label: 'Flowers', img: '/images/home/anniversary-decor-p.jpg' },
                        { label: 'Cakes', img: '/images/home/cake-p.jpg' },
                        { label: 'Personalised', img: '/images/home/photography-p.jpg' },
                        { label: 'Plants', img: '/images/home/engagement-decor-p.jpg' },
                        { label: 'Gift Sets', img: '/images/home/babyshower-decor-p.jpg' },
                        { label: 'Hampers', img: '/images/home/makeup-p.jpg' },
                        { label: 'Balloon Decor', img: '/images/home/balloon-p.jpg' },
                        { label: 'Bestsellers', img: '/images/home/birthday-decor-p.jpg' }
                      ].map((col, idx) => (
                        <Link href="/shop" key={idx} className="group flex flex-col items-center gap-2">
                          <div className="w-full aspect-[5/4] bg-[#FFF8EE] border border-[#FFE8CD] rounded-3xl flex flex-col items-center justify-center relative overflow-hidden transition-all group-hover:bg-[#FFEDD6] group-hover:border-[#FFDFB3] shadow-sm group-hover:shadow">
                            
                            {/* Fake pennant banner mimicking screenshot */}
                            <div className="absolute top-0 inset-x-0 flex justify-around opacity-60 z-10 px-1">
                              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-[#FFC1C1]"></div>
                              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-[#A0D2EB]"></div>
                              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-[#D0E6A5]"></div>
                              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-[#FFD3B6]"></div>
                            </div>
                            
                            <div className="absolute inset-x-3 bottom-0 top-6 overflow-hidden rounded-t-2xl">
                              <Image src={col.img} alt={col.label} fill className="object-cover group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-500 shadow-sm opacity-95" />
                            </div>
                          </div>
                          <span className="text-sm md:text-[15px] font-bold text-gray-900 text-center">{col.label}</span>
                        </Link>
                      ))}
                    </div>
                    
                  </div>
                </section>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ══ TRENDING SERVICES ═════════════════════════════ */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-b-2 border-indigo-500 inline-block pb-1 pr-4">
              Trending Services
            </h2>
            <Link href="/shop" className="hidden md:flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {MOCK_SERVICES.birthday.concat(MOCK_SERVICES.wedding[0]).slice(0, 5).map((s, i) => (
              <ServiceCard key={i} s={s} href={`/shop?category=${encodeURIComponent(s.category)}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ OUR VIDEO WORKS (REELS) ════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-b-2 border-rose-500 inline-block pb-1 pr-4">Our Video Works</h2>
          </div>
          
          <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { id: 1, title: 'Grand Entry', img: '/images/home/wedding-decor-p.jpg' },
              { id: 2, title: 'Ring Ceremony', img: '/images/home/engagement-decor-p.jpg' },
              { id: 3, title: 'Surprise Birthday', img: '/images/home/birthday-decor-p.jpg' },
              { id: 4, title: 'Baby Shower', img: '/images/home/babyshower-decor-p.jpg' },
              { id: 5, title: 'Haldi Function', img: '/images/home/mehndi-decor-p.jpg' }
            ].map(video => (
              <div key={video.id} className="group shrink-0 w-[160px] md:w-[220px] snap-start relative rounded-3xl overflow-hidden aspect-[9/16] bg-gray-900 cursor-pointer shadow-sm hover:shadow-xl transition-all">
                <Image src={video.img} alt={video.title} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/50 group-hover:bg-rose-500 group-hover:border-rose-500 transition-all">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>
                {/* Title */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-bold text-sm leading-tight text-center">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════ */}
      <section className="py-12 bg-rose-50">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
           <div className="mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">What People Are Saying</h2>
            <p className="text-gray-600 mt-2">Trusted by over 10,000+ happy customers</p>
          </div>
          
          <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { name: 'Kritika Sharma', loc: 'Indore', review: 'Amazing decoration by EventDhara. They made my anniversary so special!', rating: 5 },
              { name: 'Rahul Verma', loc: 'Bhopal', review: 'Very professional team. Everything was set up perfectly on time for the birthday bash.', rating: 5 },
              { name: 'Sneha Patel', loc: 'Ujjain', review: 'The floral decor was exactly how I showed them on Pinterest. Best vendors in town!', rating: 4 },
              { name: 'Amit Singh', loc: 'Indore', review: 'Booked a DJ and photographer. Extremely seamless experience from start to end.', rating: 5 },
            ].map((t, idx) => (
              <div key={idx} className="shrink-0 w-[280px] md:w-[350px] snap-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1 italic">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center font-bold text-rose-600">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Verified • {t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VENDOR CTA ═══════════════════════════════════ */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-1.5 rounded-full text-sm font-semibold">
            <Award className="w-4 h-4" /> 500+ Vendors already earning
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Are you an event vendor?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Join EventDhara and get pre-qualified leads on WhatsApp. No cold calling. No hustling.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/auth/VendorRegister" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--color-primary)] hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/30 transition-all">
              Register as Vendor <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/become-a-vendor" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium">
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready to plan your next event?
          </h2>
          <p className="text-white/90">
            Join 10,000+ happy customers who made their events magical with EventDhara.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-[var(--color-primary)] font-extrabold text-base shadow-lg hover:bg-gray-50 transition-all">
              Browse Services
            </Link>
            <Link href="/auth/Register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/50 bg-transparent text-white font-semibold hover:bg-white/10 transition-all">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

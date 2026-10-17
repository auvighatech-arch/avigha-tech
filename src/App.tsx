/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Share2,
  PhoneCall,
  Search,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { LinkItem, StoreInfo } from './types.ts';
import { DEFAULT_LINKS, DEFAULT_STORE_INFO } from './data/defaultLinks.ts';
import { AuvighaLogo } from './components/AuvighaLogo.tsx';
import { AuvighaBanner } from './components/AuvighaBanner.tsx';
import { DynamicLinkCard } from './components/DynamicLinkCard.tsx';
import { ShareModal } from './components/ShareModal.tsx';
import { SaveContactButton } from './components/SaveContactButton.tsx';
import { StoreStatusBar } from './components/StoreStatusBar.tsx';
import { OuedknissTicker } from './components/OuedknissTicker.tsx';

export default function App() {
  // Ensure permanently clean light mode as requested (remove night mode)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    try {
      localStorage.removeItem('auvigha_tech_theme');
    } catch (e) {
      // ignore
    }
  }, []);

  // Load persisted links or default (and auto-heal links including Instagram & TikTok)
  const [links, setLinks] = useState<LinkItem[]>(() => {
    try {
      const saved = localStorage.getItem('auvigha_tech_links');
      if (saved) {
        let parsed: LinkItem[] = JSON.parse(saved);
        let changed = false;

        parsed = parsed.map((item) => {
          if (
            item.platform === 'instagram' &&
            (!item.url.includes('auvigha_tech') || item.url.includes('auvighatech'))
          ) {
            changed = true;
            return {
              ...item,
              url: 'https://www.instagram.com/auvigha_tech/',
            };
          }
          if (item.platform === 'tiktok') {
            if (item.url !== 'https://www.tiktok.com/@auvighatech?_r=1&_t=ZS-9AZyYFKoNcq') {
              changed = true;
              return {
                ...item,
                url: 'https://www.tiktok.com/@auvighatech?_r=1&_t=ZS-9AZyYFKoNcq',
              };
            }
          }
          if (item.platform === 'ouedkniss') {
            if (
              item.url !== 'https://www.ouedkniss.com/store/19821/auvigha-tech/accueil' ||
              item.title !== 'محلنا على موقع واد كنيس' ||
              item.subtitle !== 'منتجاتنا'
            ) {
              changed = true;
              return {
                ...item,
                title: 'محلنا على موقع واد كنيس',
                subtitle: 'منتجاتنا',
                url: 'https://www.ouedkniss.com/store/19821/auvigha-tech/accueil',
              };
            }
          }
          return item;
        });

        // Ensure TikTok is present in existing cached lists
        const hasTikTok = parsed.some((item) => item.platform === 'tiktok');
        if (!hasTikTok) {
          changed = true;
          const tiktokItem: LinkItem = {
            id: 'tiktok-main',
            platform: 'tiktok',
            title: 'حسابنا الرسمي على تيك توك',
            subtitle: 'فيديوهات وعروض حية لأحدث الحواسيب والعتاد المعلوماتي',
            url: 'https://www.tiktok.com/@auvighatech?_r=1&_t=ZS-9AZyYFKoNcq',
            accentColor: '#000000',
            badgeText: 'تيك توك',
            active: true,
            order: 4,
            clicks: 92,
          };
          parsed.splice(3, 0, tiktokItem);
        }

        // Ensure Ouedkniss is present in existing cached lists
        const hasOuedkniss = parsed.some((item) => item.platform === 'ouedkniss');
        if (!hasOuedkniss) {
          changed = true;
          const ouedknissItem: LinkItem = {
            id: 'ouedkniss-store',
            platform: 'ouedkniss',
            title: 'محلنا على موقع واد كنيس',
            subtitle: 'منتجاتنا',
            url: 'https://www.ouedkniss.com/store/19821/auvigha-tech/accueil',
            accentColor: '#F25C05',
            badgeText: 'واد كنيس',
            active: true,
            order: 5,
            clicks: 108,
          };
          const tiktokIndex = parsed.findIndex((item) => item.platform === 'tiktok');
          if (tiktokIndex !== -1) {
            parsed.splice(tiktokIndex + 1, 0, ouedknissItem);
          } else {
            parsed.splice(4, 0, ouedknissItem);
          }
        }

        if (changed) {
          // Re-index orders
          parsed.forEach((item, idx) => {
            item.order = idx + 1;
          });
          try {
            localStorage.setItem('auvigha_tech_links', JSON.stringify(parsed));
          } catch (e) {
            // ignore
          }
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed reading links from storage:', e);
    }
    return DEFAULT_LINKS;
  });

  // Load persisted store info or default
  const [storeInfo] = useState<StoreInfo>(() => {
    try {
      const saved = localStorage.getItem('auvigha_tech_store');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          !parsed.workingHours ||
          parsed.workingHours.includes('16:00') ||
          parsed.workingHours.includes('19:30') ||
          parsed.workingHours.includes('09:00')
        ) {
          parsed.workingHours = DEFAULT_STORE_INFO.workingHours;
          try {
            localStorage.setItem('auvigha_tech_store', JSON.stringify(parsed));
          } catch (e) {
            // ignore
          }
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed reading store info from storage:', e);
    }
    return DEFAULT_STORE_INFO;
  });

  // Modals state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize links to localStorage whenever updated
  const handleUpdateLinks = (newLinks: LinkItem[]) => {
    setLinks(newLinks);
    try {
      localStorage.setItem('auvigha_tech_links', JSON.stringify(newLinks));
    } catch (e) {
      console.error('Failed saving links:', e);
    }
  };

  // Click tracking
  const handleLinkClick = (id: string) => {
    const updated = links.map((item) =>
      item.id === id ? { ...item, clicks: (item.clicks || 0) + 1 } : item
    );
    handleUpdateLinks(updated);
  };

  // Filter active links
  const activeLinks = links
    .filter((link) => link.active)
    .sort((a, b) => a.order - b.order)
    .filter((link) => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        link.title.toLowerCase().includes(query) ||
        link.subtitle.toLowerCase().includes(query) ||
        link.platform.toLowerCase().includes(query)
      );
    });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-500 selection:text-white pb-20 relative transition-colors duration-200">
      {/* Top Notification Ticker for Ouedkniss Store Deals & Products */}
      <OuedknissTicker />

      {/* Visible Alert & Operating Hours Status Bar (Turns vibrant orange when closed) */}
      <StoreStatusBar storeInfo={storeInfo} />

      {/* Top Bar - Clean One-Row Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 no-print">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single element brand wordmark */}
          <div className="flex items-center gap-2.5">
            <AuvighaLogo size="sm" className="scale-75" />
            <div className="leading-tight">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 block">
                {storeInfo.name}
              </span>
              <span className="text-[11px] font-medium text-slate-500 hidden sm:block">
                {storeInfo.tagline}
              </span>
            </div>
          </div>

          {/* Quick Action CTA: Share button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors shadow-2xs"
              title="مشاركة الصفحة"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
              <span>مشاركة</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6 no-print">
        {/* Brand Emblem & Welcome Header */}
        <section className="text-center flex flex-col items-center">
          <AuvighaLogo size="lg" className="mb-3" />

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {storeInfo.name}
          </h1>
          <p className="text-sm sm:text-base font-semibold text-red-600 mt-1">
            {storeInfo.tagline}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-md">
            {storeInfo.taglineArabic}
          </p>

          {/* Direct Fast Hotline Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
            <a
              href={`tel:${storeInfo.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <PhoneCall className="w-4 h-4" />
              <span>اتصال مباشر: {storeInfo.phone}</span>
            </a>
            <a
              href={`https://wa.me/213${storeInfo.phone.replace(/^0/, '').replace(/\s+/g, '')}?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20AUVIGHA%20Tech`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب سريع</span>
            </a>
          </div>
        </section>

        {/* Store Specialties & Equipment Showcase */}
        <section>
          <AuvighaBanner
            storeInfo={storeInfo}
            onOpenContact={() => {}}
          />
        </section>

        {/* Search & Filter Bar */}
        <section className="space-y-3" dir="rtl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>منصات وقنوات التواصل المباشر</span>
            </h2>
            <span className="text-xs text-slate-500">
              {activeLinks.length} قناة تواصل مفعلة
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن منصة (واد كنيس، فيسبوك، تيك توك، واتساب، إنستغرام...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pr-10 pl-4 rounded-xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all shadow-2xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </section>

        {/* Dynamic Links List */}
        <section className="space-y-3">
          {activeLinks.length > 0 ? (
            activeLinks.map((item, idx) => (
              <DynamicLinkCard
                key={item.id}
                item={item}
                index={idx}
                onLinkClick={handleLinkClick}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-bold text-slate-700">
                لا توجد منصات تطابق بحثك
              </p>
              <p className="text-xs text-slate-500 mt-1">
                جرب البحث بكلمة أخرى أو تواصل معنا مباشرة عبر الهاتف أو واتساب.
              </p>
            </div>
          )}
        </section>

        {/* Save Store Contact to Phone (vCard) */}
        <section className="pt-1">
          <SaveContactButton storeInfo={storeInfo} />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500 no-print" dir="rtl">
        <div className="max-w-3xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-700">
            {storeInfo.name} · {storeInfo.tagline}
          </p>
          <p className="text-[11px] text-slate-500">
            {storeInfo.deliveryNote}
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            <span>© {new Date().getFullYear()} جميع الحقوق محفوظة</span>
          </div>
        </div>
      </footer>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        storeInfo={storeInfo}
      />
    </div>
  );
}

import React from 'react';
import {
  Laptop,
  Monitor,
  Printer,
  Headphones,
  Cpu,
  PackageCheck,
  Truck,
  PhoneCall,
  Clock,
  Sparkles,
} from 'lucide-react';
import { StoreInfo } from '../types.ts';

interface AuvighaBannerProps {
  storeInfo: StoreInfo;
  onOpenContact?: () => void;
}

export const AuvighaBanner: React.FC<AuvighaBannerProps> = ({
  storeInfo,
  onOpenContact,
}) => {
  const categories = [
    {
      title: 'PC Portables',
      sub: 'Neufs & Occasions',
      icon: Laptop,
    },
    {
      title: 'PC Fixes',
      sub: 'Gaming & Bureautique',
      icon: Cpu,
    },
    {
      title: 'Écrans',
      sub: 'LCD / LED HD 4K',
      icon: Monitor,
    },
    {
      title: 'Imprimantes',
      sub: 'Jet d’encre & Laser',
      icon: Printer,
    },
    {
      title: 'Cartouches',
      sub: 'Originales & Encre',
      icon: PackageCheck,
    },
    {
      title: 'Périphériques',
      sub: 'Claviers, Souris, Casques',
      icon: Headphones,
    },
  ];

  const highlights = [
    {
      icon: Truck,
      title: 'Livraison 69 wilaya',
      desc: 'توصيل سريع لكافة ربوع الجزائر',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: Sparkles,
      title: 'Conseils & Assistance',
      desc: 'مرافقة تقنية قبل وبعد البيع',
      color: 'text-red-600 bg-red-50',
    },
  ];

  const getShopStatus = () => {
    const now = new Date();
    // UTC+1 for Algeria timezone
    const utcHours = now.getUTCHours();
    const utcDay = now.getUTCDay(); // 0: Sunday, 5: Friday, 6: Saturday
    const algeriaHour = (utcHours + 1) % 24;

    if (utcDay === 5) {
      return {
        isOpen: false,
        label: 'مغلق اليوم الجمعة',
        badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      };
    }

    if (algeriaHour >= 8 && algeriaHour < 18) {
      return {
        isOpen: true,
        label: 'مفتوح الآن (نستقبلكم حتى 18:00)',
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      };
    }

    return {
      isOpen: false,
      label: 'مغلق الآن (نستقبلكم من 08:00)',
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    };
  };

  const status = getShopStatus();

  return (
    <div className="w-full space-y-3">
      {/* Trust Badges Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            >
              <div className={`p-2 rounded-lg shrink-0 ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Categories Quick Showcase */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-4 sm:p-5 shadow-md relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase">
                Matériel & Équipements High-Tech
              </span>
              <h3 className="text-sm font-bold text-white">
                أحدث الأجهزة والعتاد المعلوماتي المتاح في المحل
              </h3>
            </div>
            <a
              href={`tel:${storeInfo.phone.replace(/\s+/g, '')}`}
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{storeInfo.phone}</span>
            </a>
          </div>

          {/* 6 Category Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  key={i}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/40 rounded-xl p-2.5 transition-all text-center flex flex-col items-center justify-center group"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {cat.title}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight mt-0.5">
                    {cat.sub}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick timing and delivery bar */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{storeInfo.workingHours}</span>
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${status.badgeClass}`}>
                {status.label}
              </span>
            </div>
            <span className="text-slate-300 font-medium">
              ⭐ Votre satisfaction est notre priorité !
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

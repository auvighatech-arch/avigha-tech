import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Flame,
  X,
  Store,
} from 'lucide-react';

const OUEDKNISS_STORE_URL =
  'https://www.ouedkniss.com/store/19821/auvigha-tech/accueil';

interface TickerOffer {
  id: string;
  tag: string;
  tagColor: string;
  text: string;
  highlightText?: string;
}

const OFFERS: TickerOffer[] = [
  {
    id: 'laptops',
    tag: 'وصول جديد',
    tagColor: 'bg-amber-400 text-slate-900',
    text: 'حواسيب محمولة ومكتبية أصلية (Dell, HP, Lenovo) متوفرة الآن في متجرنا على واد كنيس',
    highlightText: 'بأسعار تنافسية وضمان موثوق',
  },
  {
    id: 'discounts',
    tag: 'تخفيضات حصرية',
    tagColor: 'bg-red-500 text-white',
    text: 'عروض خاصة وتخفيضات على شاشات الألعاب الاحترافية وطابعات الليزر والملحقات',
    highlightText: 'خصومات مميزة لفترة محدودة',
  },
  {
    id: 'delivery',
    tag: 'توصيل سريع',
    tagColor: 'bg-emerald-500 text-white',
    text: 'اطلب من متجر واد كنيس واستفد من التوصيل المباشر إلى 69 ولاية في الجزائر',
    highlightText: 'الدفع عند الاستلام',
  },
  {
    id: 'accessories',
    tag: 'قطع غيار وملحقات',
    tagColor: 'bg-sky-500 text-white',
    text: 'أقراص SSD سريعة، ذواكر RAM، شواحن وحبر أصلي لجميع أنواع الحواسيب والطابعات',
    highlightText: 'سلع مضمونة 100%',
  },
  {
    id: 'daily-catalog',
    tag: 'متجر واد كنيس',
    tagColor: 'bg-orange-500 text-white',
    text: 'تحديث يومي للمنتجات والأسعار المتاحة في محل AUVIGHA Tech للإعلام الآلي',
    highlightText: 'شاهد الكتالوج الكامل',
  },
];

export const OuedknissTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-cycle through offers every 4.5 seconds when not hovered
  useEffect(() => {
    if (isPaused || !isVisible) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, isVisible]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + OFFERS.length) % OFFERS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
  };

  if (!isVisible) {
    return (
      <aside aria-label="شريط عروض متجر واد كنيس" className="bg-orange-500/10 border-b border-orange-200 text-orange-950 py-1 px-3 text-center text-[11px] font-semibold flex items-center justify-between no-print" dir="rtl">
        <span className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-orange-600 animate-bounce" />
          <span>عروض واد كنيس الحصرية متوفرة الآن!</span>
        </span>
        <div className="flex items-center gap-2">
          <a
            href={OUEDKNISS_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-700 hover:text-orange-900 underline font-bold"
          >
            زيارة المتجر ↗
          </a>
          <button
            onClick={() => setIsVisible(true)}
            className="text-xs text-orange-600 hover:text-orange-800 px-1.5 py-0.5 rounded bg-orange-100 hover:bg-orange-200 transition-colors"
          >
            إظهار الشريط
          </button>
        </div>
      </aside>
    );
  }

  const currentOffer = OFFERS[currentIndex];

  return (
    <aside
      aria-label="شريط أحدث عروض متجر واد كنيس"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white relative z-50 border-b border-orange-500/50 shadow-sm no-print select-none transition-all"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Left Side: Ouedkniss Live Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={OUEDKNISS_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-orange-700 hover:bg-orange-50 font-black text-xs shadow-xs transition-all active:scale-95 group"
            title="الانتقال إلى متجر واد كنيس"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600" />
            </span>
            <Store className="w-3.5 h-3.5 text-orange-600 group-hover:scale-110 transition-transform" />
            <span className="tracking-tight font-extrabold">واد كنيس</span>
          </a>

          {/* Current Offer Tag (Pill) */}
          <span
            className={`hidden md:inline-flex items-center text-[10px] font-black px-2 py-0.5 rounded-md shadow-2xs transition-colors ${currentOffer.tagColor}`}
          >
            {currentOffer.tag}
          </span>
        </div>

        {/* Center: Interactive Rotating Ticker Content (Clickable) */}
        <a
          href={OUEDKNISS_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 flex items-center justify-center sm:justify-start gap-2 group cursor-pointer hover:opacity-95 transition-opacity text-center sm:text-right"
          title="انقر لفتح هذا العرض على واد كنيس"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0 hidden sm:block animate-pulse" />
          <p className="text-xs sm:text-sm font-semibold truncate leading-tight">
            <span>{currentOffer.text}</span>
            {currentOffer.highlightText && (
              <span className="hidden lg:inline mr-2 text-amber-200 font-bold bg-black/20 px-2 py-0.5 rounded">
                ⚡ {currentOffer.highlightText}
              </span>
            )}
          </p>
        </a>

        {/* Right Side: Navigation Arrows, CTA Button & Close */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick Offer Counter */}
          <span className="text-[10px] font-mono font-bold text-orange-200 hidden sm:inline px-1">
            {currentIndex + 1}/{OFFERS.length}
          </span>

          {/* Manual Arrows */}
          <div className="hidden xs:flex items-center bg-black/15 rounded-lg p-0.5 border border-white/10">
            <button
              onClick={handlePrev}
              aria-label="العرض السابق"
              className="p-1 text-white/80 hover:text-white hover:bg-white/20 rounded transition-colors"
              title="العرض السابق"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="العرض التالي"
              className="p-1 text-white/80 hover:text-white hover:bg-white/20 rounded transition-colors"
              title="العرض التالي"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Call to action button */}
          <a
            href={OUEDKNISS_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-xl bg-slate-950 hover:bg-black text-white font-bold text-[11px] sm:text-xs shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-95"
          >
            <span>مشاهدة العروض</span>
            <ExternalLink className="w-3 h-3 text-orange-400" />
          </a>

          {/* Dismiss button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            aria-label="إغلاق شريط الإشعارات"
            className="p-1 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
            title="إخفاء الشريط"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

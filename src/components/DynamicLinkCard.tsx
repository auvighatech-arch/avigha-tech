import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  Phone,
  MapPin,
  Mail,
  Globe,
  Share2,
  Store,
} from 'lucide-react';
import { motion } from 'motion/react';
import { LinkItem, PlatformType } from '../types.ts';

interface DynamicLinkCardProps {
  item: LinkItem;
  index?: number;
  onLinkClick: (id: string) => void;
}

export const DynamicLinkCard: React.FC<DynamicLinkCardProps> = ({
  item,
  index = 0,
  onLinkClick,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render dedicated high-fidelity dynamic platform icon
  const renderPlatformIcon = (platform: PlatformType) => {
    switch (platform) {
      case 'whatsapp':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            {/* Dynamic pulsating ripple ring */}
            <span className="absolute inset-0 rounded-2xl bg-emerald-400 opacity-25 animate-ping pointer-events-none" />
            <svg className="w-6 h-6 fill-current relative z-10" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </div>
        );

      case 'facebook':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
        );

      case 'telegram':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 fill-current translate-x-[-1px] group-hover:translate-x-[1px] transition-transform" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </div>
        );

      case 'instagram':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </div>
        );

      case 'tiktok':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-black text-white shadow-md shadow-black/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
            </svg>
          </div>
        );

      case 'ouedkniss':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <Store className="w-6 h-6" />
          </div>
        );

      case 'phone':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
            <Phone className="w-6 h-6 animate-pulse" />
          </div>
        );

      case 'maps':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <MapPin className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        );

      case 'email':
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 text-white shadow-md shadow-slate-900/20 group-hover:scale-105 transition-transform">
            <Mail className="w-6 h-6" />
          </div>
        );

      default:
        return (
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-600 text-white shadow-md shadow-slate-700/20 group-hover:scale-105 transition-transform">
            <Globe className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.38,
        delay: Math.min(index * 0.065, 0.6),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onLinkClick(item.id)}
        className="block bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-850 active:bg-slate-100 dark:active:bg-slate-800 rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-500/50 shadow-xs hover:shadow-md transition-all duration-200 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
      >
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* Dynamic Platform Icon */}
          <div className="shrink-0">{renderPlatformIcon(item.platform)}</div>

          {/* Texts & Subtitle */}
          <div className="flex-1 min-w-0 text-right" dir="rtl">
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
                {item.title}
              </h4>
              {item.badgeText && (
                <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/70 text-red-600 dark:text-red-300 border border-red-200/60 dark:border-red-800/60">
                  {item.badgeText}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
              {item.subtitle}
            </p>
          </div>

          {/* Action triggers: Copy link & external arrow */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              title="نسخ الرابط المباشر"
              aria-label="نسخ الرابط"
              className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <div className="p-2 text-slate-300 dark:text-slate-600 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

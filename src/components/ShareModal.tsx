import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Send,
} from 'lucide-react';
import { StoreInfo } from '../types.ts';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeInfo: StoreInfo;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  storeInfo,
}) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `تواصل مع متجر ${storeInfo.name} (${storeInfo.tagline}) - روابط واتساب وفيسبوك وعروض التقنية:`;

  const shareViaWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareText} ${currentUrl}`
    )}`;
    window.open(url, '_blank');
  };

  const shareViaTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      currentUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareViaFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
        dir="rtl"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              مشاركة صفحة وروابط المحل
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            شارك صفحة التواصل الخاصة بـ AUVIGHA Tech مع الزبائن والأصدقاء:
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <button
              onClick={shareViaWhatsApp}
              className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold flex flex-col items-center justify-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span>واتساب</span>
            </button>

            <button
              onClick={shareViaTelegram}
              className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 font-bold flex flex-col items-center justify-center gap-1.5 transition-colors"
            >
              <Send className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              <span>تيليجرام</span>
            </button>

            <button
              onClick={shareViaFacebook}
              className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold flex flex-col items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span>فيسبوك</span>
            </button>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="truncate flex-1 text-left font-mono text-[11px] text-slate-700 dark:text-slate-300" dir="ltr">
              {currentUrl}
            </span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1 shrink-0 hover:bg-slate-50 dark:hover:bg-slate-600"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

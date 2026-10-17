import React, { useState, useEffect } from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { StoreInfo } from '../types.ts';

interface StoreStatusBarProps {
  storeInfo: StoreInfo;
}

interface StatusDetails {
  isOpen: boolean;
  isFriday: boolean;
  algeriaTimeStr: string;
  hour: number;
  messageTitle: string;
  messageSubtitle: string;
}

export const StoreStatusBar: React.FC<StoreStatusBarProps> = ({ storeInfo }) => {
  const [status, setStatus] = useState<StatusDetails>({
    isOpen: false,
    isFriday: false,
    algeriaTimeStr: '',
    hour: 0,
    messageTitle: '',
    messageSubtitle: '',
  });

  const [isExpanded, setIsExpanded] = useState(true);

  // Compute live Algeria status
  const calculateStatus = (): StatusDetails => {
    try {
      const now = new Date();
      // Africa/Algiers timezone (UTC+1)
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Algiers',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        weekday: 'short',
      });

      const parts = formatter.formatToParts(now);
      let hour = 0;
      let minute = 0;
      let weekday = '';

      for (const part of parts) {
        if (part.type === 'hour') hour = parseInt(part.value, 10);
        if (part.type === 'minute') minute = parseInt(part.value, 10);
        if (part.type === 'weekday') weekday = part.value; // Fri, Sat, Sun, Mon, Tue, Wed, Thu
      }

      const timePad = (n: number) => n.toString().padStart(2, '0');
      const timeStr = `${timePad(hour)}:${timePad(minute)}`;

      const isFriday = weekday === 'Fri';
      // Official store schedule: Saturday to Thursday, 08:00 to 18:00
      const isOpen = !isFriday && hour >= 8 && hour < 18;

      let messageTitle = '';
      let messageSubtitle = '';

      if (isFriday) {
        messageTitle = 'المحل مغلق اليوم (عطلة الجمعة الأسبوعية)';
        messageSubtitle =
          'ساعات العمل الرسمية: السبت إلى الخميس من 08:00 إلى 18:00. يمكنكم ترك رسائلكم عبر واتساب وسنرد عليكم صباح السبت!';
      } else if (isOpen) {
        const remainingHours = 18 - hour - 1;
        const remainingMinutes = 60 - minute;
        messageTitle = 'المحل مفتوح الآن ونستقبلكم بكل سرور!';
        messageSubtitle = `الدوام مستمر اليوم حتى 18:00 (متبقي ${
          remainingHours > 0 ? `${remainingHours} ساعة و ` : ''
        }${remainingMinutes} دقيقة على الإغلاق) · السبت إلى الخميس: 08:00 - 18:00`;
      } else {
        // Closed outside hours
        const openingText = hour < 8 ? 'اليوم على الساعة 08:00 صباحاً' : 'غداً على الساعة 08:00 صباحاً';
        messageTitle = 'المحل مغلق حالياً (خارج أوقات الدوام الرسمي)';
        messageSubtitle = `ساعات العمل الرسمية: السبت إلى الخميس من 08:00 إلى 18:00 (الجمعة: مغلق) · نفتح ${openingText}. رسائلكم مرحب بها عبر واتساب!`;
      }

      return {
        isOpen,
        isFriday,
        algeriaTimeStr: timeStr,
        hour,
        messageTitle,
        messageSubtitle,
      };
    } catch (e) {
      // Fallback
      return {
        isOpen: true,
        isFriday: false,
        algeriaTimeStr: '',
        hour: 12,
        messageTitle: 'أوقات العمل الرسمية',
        messageSubtitle: 'السبت إلى الخميس: من 08:00 صباحاً إلى 18:00 مساءً (الجمعة: مغلق)',
      };
    }
  };

  useEffect(() => {
    setStatus(calculateStatus());
    // Recalculate every 30 seconds
    const interval = setInterval(() => {
      setStatus(calculateStatus());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const cleanPhone = storeInfo.phone.replace(/\s+/g, '');
  const whatsappUrl = `https://wa.me/213${cleanPhone.replace(/^0/, '')}?text=${encodeURIComponent(
    'مرحبا AUVIGHA Tech، استفسار عن مواعيد العمل وتوفر الأجهزة'
  )}`;

  // When outside working hours -> ORANGE / AMBER THEME as requested by user
  if (!status.isOpen) {
    return (
      <aside
        aria-label="تنبيه حالة وساعات العمل"
        className="w-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white shadow-md border-b-2 border-orange-700/40 relative z-50 no-print"
        dir="rtl"
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            {/* Status Info */}
            <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-0">
              <div className="p-1.5 sm:p-2 rounded-xl bg-white/20 text-white shrink-0 mt-0.5 sm:mt-0 backdrop-blur-xs">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100 animate-bounce" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-xs sm:text-sm tracking-wide text-white">
                    {status.messageTitle}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/25 text-amber-100 border border-white/20">
                    الدوام: 08:00 - 18:00
                  </span>
                </div>

                {isExpanded && (
                  <p className="text-[11px] sm:text-xs text-orange-100/95 leading-relaxed mt-0.5 font-medium">
                    {status.messageSubtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions in Orange Bar */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-orange-700 hover:bg-orange-50 font-bold text-xs shadow-xs transition-transform active:scale-[0.98]"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>اترك رسالة واتساب</span>
              </a>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg bg-black/15 hover:bg-black/25 text-white/90 transition-colors"
                title={isExpanded ? 'تصغير التنبيه' : 'عرض التفاصيل'}
                aria-label={isExpanded ? 'تصغير شريط التنبيه' : 'عرض تفاصيل أوقات العمل'}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // When store is OPEN -> Green / Emerald theme
  return (
    <aside
      aria-label="ساعات العمل الرسمية للمحل"
      className="w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white shadow-xs border-b border-emerald-800/30 relative z-50 no-print"
      dir="rtl"
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          {/* Status Info */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="p-1.5 rounded-lg bg-white/20 text-white shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-100" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-white">
                  {status.messageTitle}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/30 text-emerald-100 border border-emerald-400/30">
                  نستقبلكم حتى 18:00
                </span>
              </div>
              {isExpanded && (
                <p className="text-[11px] text-emerald-100/90 leading-tight mt-0.5">
                  {status.messageSubtitle}
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions in Open Bar */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <a
              href={`tel:${cleanPhone}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs shadow-2xs transition-transform active:scale-[0.98]"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>اتصل الآن ({storeInfo.phone})</span>
            </a>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-md bg-black/15 hover:bg-black/25 text-white/90 transition-colors"
              title={isExpanded ? 'تصغير' : 'عرض التفاصيل'}
              aria-label={isExpanded ? 'تصغير شريط التنبيه' : 'عرض تفاصيل أوقات العمل'}
            >
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

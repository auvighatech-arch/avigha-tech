import React, { useState } from 'react';
import { UserPlus, Check } from 'lucide-react';
import { StoreInfo } from '../types.ts';

interface SaveContactButtonProps {
  storeInfo: StoreInfo;
}

export const SaveContactButton: React.FC<SaveContactButtonProps> = ({
  storeInfo,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadVCard = () => {
    // Generate clean vCard 3.0 format
    const cleanPhone = storeInfo.phone.replace(/\s+/g, '');
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${storeInfo.name}`,
      `ORG:${storeInfo.name}`,
      `TITLE:${storeInfo.tagline}`,
      `TEL;TYPE=WORK,VOICE:${cleanPhone}`,
      `NOTE:${storeInfo.deliveryNote} - ${storeInfo.tagline}`,
      `URL:${typeof window !== 'undefined' ? window.location.href : ''}`,
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${storeInfo.name.replace(/\s+/g, '-')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <button
      onClick={handleDownloadVCard}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm shadow-2xs hover:border-red-300 dark:hover:border-red-500/50 transition-all active:scale-[0.99]"
    >
      {downloaded ? (
        <>
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="text-emerald-700">تم حفظ بطاقة جهة الاتصال في هاتفك!</span>
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 text-red-600" />
          <span>حفظ رقم جهة اتصال المحل في هاتفك (vCard)</span>
        </>
      )}
    </button>
  );
};

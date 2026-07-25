'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Language } from '@/data/translations';
import { Clock } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    language,
    setLanguage,
    t,
  } = useApp();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'uz', label: 'UZ' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#090909]/95 backdrop-blur-md border-b border-[#222222] px-3 py-1 pt-safe-inset flex items-center justify-between">
      {/* Compact Brand */}
      <button
        onClick={() => setCurrentView('dashboard')}
        className="flex items-center space-x-1.5 active:scale-95 transition-transform"
      >
        <div className="w-6 h-6 rounded-[6px] bg-[#111111] border border-[#222222] flex items-center justify-center font-bold text-white text-[10px]">
          25
        </div>
        <span className="text-xs font-bold text-white tracking-tight">{t('systemTitle')}</span>
      </button>

      {/* Ultra Compact Controls */}
      <div className="flex items-center space-x-1.5">
        {/* Micro Language Switcher */}
        <div className="flex items-center bg-[#111111] border border-[#222222] rounded-[6px] p-0.5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-1.5 py-0.5 text-[8px] font-mono font-bold rounded-[4px] transition-all duration-180 ${
                language === lang.code
                  ? 'bg-[#4F8CFF] text-white'
                  : 'text-[#8B8B8B] hover:text-white'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Compact Today Button */}
        <button
          onClick={() => setCurrentView('today')}
          className={`px-2 py-1 border rounded-[6px] text-[10px] font-semibold flex items-center space-x-1 transition-all duration-180 ${
            currentView === 'today'
              ? 'bg-[#181818] border-[#4F8CFF] text-white'
              : 'bg-[#111111] border-[#222222] text-[#8B8B8B] hover:text-white'
          }`}
        >
          <Clock className="w-3 h-3 text-[#4F8CFF]" />
          <span>{t('todayBtn')}</span>
        </button>
      </div>
    </header>
  );
};

'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, Search, Clock, Zap, Flame, Shield, User } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setIsCommandPaletteOpen,
    setIsFocusTimerOpen,
    setIsAICoachModalOpen,
    profile,
    islam,
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-[#090909]/95 backdrop-blur-md border-b border-[#222222] px-4 py-3 flex items-center justify-between">
      {/* Brand & Level Badge */}
      <div className="flex items-center space-x-2.5">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="w-8 h-8 rounded-[12px] bg-[#111111] border border-[#222222] flex items-center justify-center font-bold text-white text-xs"
        >
          25
        </button>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-sm font-bold text-white tracking-tight">PROJECT 25</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[6px] bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/20 font-bold">
              LVL {profile.level}
            </span>
          </div>
          <p className="text-[10px] text-[#8B8B8B] font-medium">Personal Operating System</p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentView('today')}
          className={`px-2.5 py-1.5 border rounded-[12px] text-xs font-semibold flex items-center space-x-1.5 transition-all duration-180 ${
            currentView === 'today'
              ? 'bg-[#181818] border-[#4F8CFF] text-white'
              : 'bg-[#111111] border-[#222222] text-[#8B8B8B] hover:text-white'
          }`}
          title="Today Schedule Timeline"
        >
          <Clock className="w-3.5 h-3.5 text-[#4F8CFF]" />
          <span className="hidden sm:inline">Today</span>
        </button>

        <button
          onClick={() => setIsAICoachModalOpen(true)}
          className="px-2.5 py-1.5 bg-[#111111] hover:bg-[#161616] border border-[#222222] rounded-[12px] text-xs font-semibold text-[#8B8B8B] hover:text-white flex items-center space-x-1.5 transition-all duration-180"
          title="AI Coach Evening Review"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span className="hidden sm:inline">AI Review</span>
        </button>

        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="p-2 bg-[#111111] hover:bg-[#161616] border border-[#222222] rounded-[12px] text-[#8B8B8B] hover:text-white transition-colors"
          title="Command Palette (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ViewType } from '@/types';
import { LayoutDashboard, Target, BookOpen, FolderGit2, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const tabs: { id: ViewType; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mission', label: 'Mission', icon: Target },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090909]/95 backdrop-blur-md border-t border-[#222222] pb-safe px-4 py-2 flex items-center justify-around select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          currentView === tab.id ||
          (tab.id === 'dashboard' && (currentView === 'today' || currentView === 'fitness' || currentView === 'islam' || currentView === 'finance' || currentView === 'books' || currentView === 'analytics')) ||
          (tab.id === 'learn' && currentView === 'learn');

        return (
          <button
            key={tab.id}
            onClick={() => setCurrentView(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-[12px] transition-all duration-180 ${
              isActive ? 'text-[#4F8CFF]' : 'text-[#8B8B8B] hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-1 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

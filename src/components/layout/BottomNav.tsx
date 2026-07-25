'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ViewType } from '@/types';
import { LayoutDashboard, Target, BookOpen, FolderGit2, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, setCurrentView, t } = useApp();

  const tabs: { id: ViewType; labelKey: string; icon: React.ElementType }[] = [
    { id: 'dashboard', labelKey: 'navDashboard', icon: LayoutDashboard },
    { id: 'mission', labelKey: 'navMission', icon: Target },
    { id: 'learn', labelKey: 'navLearn', icon: BookOpen },
    { id: 'projects', labelKey: 'navProjects', icon: FolderGit2 },
    { id: 'profile', labelKey: 'navProfile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#090909]/95 backdrop-blur-md border-t border-[#222222] pb-safe px-2 py-1 flex items-center justify-around select-none h-12">
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
            className={`flex flex-col items-center justify-center py-0.5 px-2 rounded-[8px] transition-all duration-180 ${
              isActive ? 'text-[#4F8CFF]' : 'text-[#8B8B8B] hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[9px] font-medium mt-0.5 tracking-tight">{t(tab.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
};

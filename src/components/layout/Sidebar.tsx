'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ViewType } from '@/types';
import {
  LayoutDashboard,
  Target,
  BookOpen,
  FolderGit2,
  Dumbbell,
  Moon,
  Wallet,
  Library,
  Calendar,
  BarChart3,
  Sparkles,
  Settings,
  Command,
  Timer,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  id: ViewType;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    isSidebarOpen,
    setIsSidebarOpen,
    setIsCommandPaletteOpen,
    setIsFocusTimerOpen,
    tasks,
  } = useApp();

  const activeTasksCount = tasks.filter((t) => t.status !== 'completed').length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mission', label: 'Mission', icon: Target },
    { id: 'learn', label: 'Learning', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'islam', label: 'Islam', icon: Moon },
    { id: 'finance', label: 'Finance', icon: Wallet },
    { id: 'books', label: 'Books', icon: Library },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: activeTasksCount },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai-reviews', label: 'AI Reviews', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!isSidebarOpen) {
    return (
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-[#111111] hover:bg-[#181818] border border-[#232323] text-[#8A8A8A] hover:text-white rounded-[12px] transition-all duration-200 shadow-sm flex items-center justify-center"
          title="Open Sidebar ([)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <aside className="w-64 bg-[#090909] border-r border-[#232323] flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#232323] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-[8px] bg-[#111111] border border-[#232323] flex items-center justify-center text-white font-semibold text-sm">
            FX
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-semibold text-sm tracking-tight">FX LIFE OS</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#181818] border border-[#232323] text-[#8A8A8A] font-mono">
                AGE 25
              </span>
            </div>
            <p className="text-[11px] text-[#8A8A8A] font-medium">Personal Operating System</p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="p-1 text-[#8A8A8A] hover:text-white rounded hover:bg-[#181818] transition-colors"
          title="Collapse Sidebar ([)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Launch Action */}
      <div className="p-3 border-b border-[#232323] space-y-1.5">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full px-3 py-2 bg-[#111111] hover:bg-[#161616] border border-[#232323] text-[#8A8A8A] hover:text-white rounded-[8px] flex items-center justify-between text-xs transition-all duration-200"
        >
          <div className="flex items-center space-x-2">
            <Command className="w-3.5 h-3.5 text-[#4F8CFF]" />
            <span>Search / Command</span>
          </div>
          <kbd className="px-1.5 py-0.5 bg-[#181818] border border-[#232323] rounded text-[10px] font-mono text-[#8A8A8A]">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={() => setIsFocusTimerOpen(true)}
          className="w-full px-3 py-2 bg-[#111111] hover:bg-[#161616] border border-[#232323] text-[#8A8A8A] hover:text-white rounded-[8px] flex items-center justify-between text-xs transition-all duration-200"
        >
          <div className="flex items-center space-x-2">
            <Timer className="w-3.5 h-3.5 text-[#16C784]" />
            <span>Deep Work Session</span>
          </div>
          <kbd className="px-1.5 py-0.5 bg-[#181818] border border-[#232323] rounded text-[10px] font-mono text-[#8A8A8A]">
            ⌘F
          </kbd>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-2 py-3 overflow-y-auto space-y-0.5 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full px-3 py-2 rounded-[8px] flex items-center justify-between text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#181818] text-white font-semibold border border-[#232323]'
                  : 'text-[#8A8A8A] hover:text-white hover:bg-[#111111]'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#4F8CFF]' : 'text-[#8A8A8A]'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#181818] border border-[#232323] text-[#4F8CFF] font-mono font-medium">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Profile */}
      <div className="p-3 border-t border-[#232323] bg-[#090909]">
        <div className="p-2.5 bg-[#111111] border border-[#232323] rounded-[8px] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-full bg-[#4F8CFF] text-[#090909] font-bold text-[11px] flex items-center justify-center">
              FX
            </div>
            <div>
              <p className="text-xs font-medium text-white leading-none">F.X. User</p>
              <p className="text-[10px] text-[#8A8A8A] mt-0.5 font-mono">Streak: 42 Days</p>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-[#16C784] animate-pulse" title="System Active" />
        </div>
      </div>
    </aside>
  );
};

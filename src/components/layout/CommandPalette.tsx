'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { ViewType } from '@/types';
import {
  Search,
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
  Timer,
  CheckSquare,
  ArrowRight,
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setCurrentView,
    setIsFocusTimerOpen,
    tasks,
    toggleTask,
    roadmaps,
    projects,
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const viewsList: { id: ViewType; label: string; icon: React.ElementType; group: string }[] = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, group: 'Navigation' },
    { id: 'mission', label: 'Go to Mission Roadmap (Age 17-25)', icon: Target, group: 'Navigation' },
    { id: 'learn', label: 'Go to Learning Roadmaps (Programming, Security, SAT)', icon: BookOpen, group: 'Navigation' },
    { id: 'projects', label: 'Go to Projects (ReadForge, Life OS, Cyber)', icon: FolderGit2, group: 'Navigation' },
    { id: 'fitness', label: 'Go to Fitness & Recovery Tracker', icon: Dumbbell, group: 'Navigation' },
    { id: 'islam', label: 'Go to Islam & Prayer Operations', icon: Moon, group: 'Navigation' },
    { id: 'finance', label: 'Go to Sovereign Finance & Assets', icon: Wallet, group: 'Navigation' },
    { id: 'books', label: 'Go to Books & Highlights', icon: Library, group: 'Navigation' },
    { id: 'calendar', label: 'Go to Calendar & Timeblocks', icon: Calendar, group: 'Navigation' },
    { id: 'analytics', label: 'Go to Analytics & Life Score', icon: BarChart3, group: 'Navigation' },
    { id: 'ai-reviews', label: 'Go to AI Reviews & Coach', icon: Sparkles, group: 'Navigation' },
    { id: 'settings', label: 'Go to Settings', icon: Settings, group: 'Navigation' },
  ];

  const filteredViews = viewsList.filter((v) =>
    v.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredRoadmaps = roadmaps.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectView = (view: ViewType) => {
    setCurrentView(view);
    setIsCommandPaletteOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center pt-20 p-4 transition-all duration-200"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="bg-[#111111] border border-[#232323] rounded-[12px] w-full max-w-xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-3.5 border-b border-[#232323] flex items-center space-x-3 bg-[#090909]">
          <Search className="w-4 h-4 text-[#8A8A8A]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (e.g. Navigation, Tasks, Focus Timer)..."
            className="w-full bg-transparent text-white text-xs placeholder-[#525252] outline-none font-medium"
            autoFocus
          />
          <kbd className="px-1.5 py-0.5 bg-[#181818] border border-[#232323] rounded text-[10px] font-mono text-[#8A8A8A]">
            ESC
          </kbd>
        </div>

        {/* Command List Body */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-[#232323]/50">
          {/* Action Trigger */}
          <div className="py-1">
            <button
              onClick={() => {
                setIsCommandPaletteOpen(false);
                setIsFocusTimerOpen(true);
              }}
              className="w-full px-3 py-2 rounded-[8px] flex items-center justify-between text-xs hover:bg-[#181818] text-white transition-colors group"
            >
              <div className="flex items-center space-x-2.5">
                <Timer className="w-4 h-4 text-[#16C784]" />
                <span>Start Deep Work Focus Session</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#525252] group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Navigation Views */}
          {filteredViews.length > 0 && (
            <div className="py-2 space-y-0.5">
              <p className="px-3 py-1 text-[10px] font-semibold text-[#8A8A8A] uppercase tracking-wider">
                Navigation
              </p>
              {filteredViews.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectView(item.id)}
                    className="w-full px-3 py-2 rounded-[8px] flex items-center justify-between text-xs text-[#8A8A8A] hover:text-white hover:bg-[#181818] transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="w-4 h-4 text-[#4F8CFF]" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] text-[#525252] font-mono">Jump</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Tasks */}
          {filteredTasks.length > 0 && (
            <div className="py-2 space-y-0.5">
              <p className="px-3 py-1 text-[10px] font-semibold text-[#8A8A8A] uppercase tracking-wider">
                Tasks ({filteredTasks.length})
              </p>
              {filteredTasks.slice(0, 5).map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className="px-3 py-2 rounded-[8px] flex items-center justify-between text-xs text-[#8A8A8A] hover:text-white hover:bg-[#181818] transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2.5">
                    <CheckSquare
                      className={`w-3.5 h-3.5 ${
                        t.status === 'completed' ? 'text-[#16C784]' : 'text-[#525252]'
                      }`}
                    />
                    <span className={t.status === 'completed' ? 'line-through text-[#525252]' : ''}>
                      {t.title}
                    </span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#090909] border border-[#232323] rounded font-mono text-[#8A8A8A]">
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Roadmaps */}
          {filteredRoadmaps.length > 0 && (
            <div className="py-2 space-y-0.5">
              <p className="px-3 py-1 text-[10px] font-semibold text-[#8A8A8A] uppercase tracking-wider">
                Roadmap Topics
              </p>
              {filteredRoadmaps.slice(0, 4).map((r) => (
                <div
                  key={r.id}
                  onClick={() => handleSelectView('learn')}
                  className="px-3 py-2 rounded-[8px] flex items-center justify-between text-xs text-[#8A8A8A] hover:text-white hover:bg-[#181818] transition-colors cursor-pointer"
                >
                  <span>{r.title}</span>
                  <span className="text-[10px] text-[#4F8CFF] font-mono">
                    {r.completionPercentage}% Complete
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Command Footer */}
        <div className="p-2.5 bg-[#090909] border-t border-[#232323] flex items-center justify-between text-[11px] text-[#525252]">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>FX Life OS ⌘K</span>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { FocusTimerModal } from '@/components/common/FocusTimerModal';
import { AICoachModal } from '@/components/common/AICoachModal';

import { DashboardView } from '@/components/views/DashboardView';
import { TodayView } from '@/components/views/TodayView';
import { MissionView } from '@/components/views/MissionView';
import { LearningView } from '@/components/views/LearningView';
import { ProjectsView } from '@/components/views/ProjectsView';
import { ProfileView } from '@/components/views/ProfileView';
import { FitnessView } from '@/components/views/FitnessView';
import { IslamView } from '@/components/views/IslamView';
import { FinanceView } from '@/components/views/FinanceView';
import { BooksView } from '@/components/views/BooksView';
import { AnalyticsView } from '@/components/views/AnalyticsView';

export default function Home() {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'today':
        return <TodayView />;
      case 'mission':
        return <MissionView />;
      case 'learn':
        return <LearningView />;
      case 'projects':
        return <ProjectsView />;
      case 'profile':
        return <ProfileView />;
      case 'fitness':
        return <FitnessView />;
      case 'islam':
        return <IslamView />;
      case 'finance':
        return <FinanceView />;
      case 'books':
        return <BooksView />;
      case 'analytics':
        return <AnalyticsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col justify-between selection:bg-[#4F8CFF] selection:text-white">
      <Header />
      <main className="flex-1 pb-20">{renderView()}</main>
      <BottomNav />

      <CommandPalette />
      <FocusTimerModal />
      <AICoachModal />
    </div>
  );
}

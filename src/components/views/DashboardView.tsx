'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  Target,
  Clock,
  Flame,
  CheckCircle2,
  Moon,
  Dumbbell,
  BookOpen,
  Droplet,
  TrendingUp,
  Zap,
  ChevronRight,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    milestones,
    todaySchedule,
    tasks,
    setCurrentView,
    fitness,
    islam,
    roadmaps,
    t,
  } = useApp();

  const activeMilestone = milestones.find((m) => m.status === 'in-progress') || milestones[1];
  const pendingTasks = tasks.filter((tItem) => tItem.status !== 'completed');
  const todaysFocusTask = pendingTasks.find((tItem) => tItem.priority === 'urgent' || tItem.priority === 'high') || pendingTasks[0];

  const completedScheduleCount = todaySchedule.filter((item) => item.completed).length;

  const totalLearningHours = roadmaps.reduce(
    (acc, r) =>
      acc +
      (r.completed
        ? r.estimatedHours
        : r.lessons.filter((l) => l.completed).reduce((lAcc, l) => lAcc + l.estimatedHours, 0)),
    0
  );

  const validPrayersCount = [
    islam.prayersToday.fajr,
    islam.prayersToday.dhuhr,
    islam.prayersToday.asr,
    islam.prayersToday.maghrib,
    islam.prayersToday.isha,
  ].filter(Boolean).length;

  return (
    <div className="p-3 max-w-lg mx-auto space-y-3 pb-16">
      {/* 1. Who am I becoming? Hero Card */}
      <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase font-mono font-bold text-[#4F8CFF]">
            {t('whoAmIBecoming')}
          </span>
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-[6px] bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/20">
            {t('targetAge')}
          </span>
        </div>

        <div>
          <h2 className="text-base font-bold text-white tracking-tight leading-snug">
            {t('heroGoal')}
          </h2>
          <p className="text-[11px] text-[#8B8B8B] mt-0.5 leading-relaxed">
            {t('heroDesc')}
          </p>
        </div>

        <div className="space-y-1 pt-0.5">
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-[#8B8B8B]">{t('missionProgress')} ({activeMilestone.title})</span>
            <span className="text-[#22C55E] font-bold">{activeMilestone.completionPercentage}%</span>
          </div>
          <div className="w-full bg-[#090909] h-1.5 rounded-full overflow-hidden border border-[#222222]">
            <div
              className="bg-[#22C55E] h-full transition-all duration-180"
              style={{ width: `${activeMilestone.completionPercentage}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setCurrentView('mission')}
          className="w-full pt-1 flex items-center justify-between text-xs text-[#4F8CFF] font-semibold hover:underline"
        >
          <span>{t('viewTimeline')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. What should I do today? Today's Focus */}
      <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] uppercase font-mono font-bold text-[#8B8B8B]">
            {t('whatShouldIDo')}
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-[6px] bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>{t('deepWorkActive')}</span>
          </span>
        </div>

        {todaysFocusTask ? (
          <div className="bg-[#090909] border border-[#222222] rounded-[12px] p-3 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xs font-bold text-white leading-snug">
                {todaysFocusTask.title}
              </h3>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#181818] text-[#F59E0B] border border-[#222222] uppercase">
                {todaysFocusTask.priority}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-mono text-[#8B8B8B]">
              <span>{todaysFocusTask.estimatedMinutes} mins</span>
              <span className="capitalize">{todaysFocusTask.category}</span>
              {todaysFocusTask.isDeepWork && <span className="text-[#4F8CFF]">{t('deepWorkActive')}</span>}
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#8B8B8B]">All priority focus items completed!</p>
        )}

        {/* Today's Schedule Quick Access Bar */}
        <button
          onClick={() => setCurrentView('today')}
          className="w-full p-2.5 bg-[#090909] border border-[#222222] rounded-[12px] flex items-center justify-between text-xs hover:border-[#4F8CFF] transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-[#4F8CFF]" />
            <span className="font-semibold text-white">{t('scheduleTimeline')}</span>
          </div>
          <span className="text-[10px] font-mono text-[#22C55E]">
            {completedScheduleCount} / {todaySchedule.length} {t('done')} →
          </span>
        </button>
      </div>

      {/* 3. How much progress have I made? Essential Cards Grid */}
      <div className="space-y-2">
        <span className="text-[9px] uppercase font-mono font-bold text-[#8B8B8B] px-1">
          {t('howMuchProgress')}
        </span>

        <div className="grid grid-cols-2 gap-2">
          {/* Streak */}
          <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-3 space-y-0.5">
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">{t('streak')}</span>
              <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
            </div>
            <p className="text-base font-mono font-bold text-white">42 Days</p>
            <p className="text-[9px] text-[#22C55E] font-mono">{t('unbroken')}</p>
          </div>

          {/* Daily Score */}
          <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-3 space-y-0.5">
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">{t('dailyScore')}</span>
              <Zap className="w-3.5 h-3.5 text-[#4F8CFF]" />
            </div>
            <p className="text-base font-mono font-bold text-white">94 / 100</p>
            <p className="text-[9px] text-[#22C55E] font-mono">{t('peakPerf')}</p>
          </div>

          {/* Prayer Status */}
          <div
            onClick={() => setCurrentView('islam')}
            className="bg-[#111111] border border-[#222222] rounded-[18px] p-3 space-y-0.5 cursor-pointer hover:border-[#333333]"
          >
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">{t('prayers')}</span>
              <Moon className="w-3.5 h-3.5 text-[#22C55E]" />
            </div>
            <p className="text-base font-mono font-bold text-white">{validPrayersCount} / 5</p>
            <p className="text-[9px] text-[#22C55E] font-mono">{t('fajrDone')}</p>
          </div>

          {/* Workout Status */}
          <div
            onClick={() => setCurrentView('fitness')}
            className="bg-[#111111] border border-[#222222] rounded-[18px] p-3 space-y-0.5 cursor-pointer hover:border-[#333333]"
          >
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">{t('workout')}</span>
              <Dumbbell className="w-3.5 h-3.5 text-[#4F8CFF]" />
            </div>
            <p className="text-xs font-mono font-bold text-white truncate">
              {fitness.workoutSplit[0]?.splitName.split('-')[0] || 'Push Day'}
            </p>
            <p className="text-[9px] text-[#22C55E] font-mono">{t('completedToday')}</p>
          </div>

          {/* Learning Hours */}
          <div
            onClick={() => setCurrentView('learn')}
            className="bg-[#111111] border border-[#222222] rounded-[18px] p-3 space-y-0.5 cursor-pointer hover:border-[#333333]"
          >
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">{t('learning')}</span>
              <BookOpen className="w-3.5 h-3.5 text-[#4F8CFF]" />
            </div>
            <p className="text-base font-mono font-bold text-white">{totalLearningHours} hrs</p>
            <p className="text-[9px] text-[#8B8B8B] font-mono">{t('roadmapMastery')}</p>
          </div>

          {/* Sleep Score */}
          <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-3 space-y-0.5">
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">{t('sleep')}</span>
              <Clock className="w-3.5 h-3.5 text-[#22C55E]" />
            </div>
            <p className="text-base font-mono font-bold text-white">
              {fitness.sleepQualityScore}/100
            </p>
            <p className="text-[9px] text-[#8B8B8B] font-mono">{fitness.sleepHours} {t('hrsDuration')}</p>
          </div>

          {/* Water */}
          <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-3 space-y-0.5">
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">{t('water')}</span>
              <Droplet className="w-3.5 h-3.5 text-[#4F8CFF]" />
            </div>
            <p className="text-base font-mono font-bold text-white">{fitness.waterLiters} L</p>
            <p className="text-[9px] text-[#22C55E] font-mono">{t('targetMet')}</p>
          </div>

          {/* Weekly Progress Bar */}
          <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-3 space-y-0.5">
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">{t('weeklyGoal')}</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#22C55E]" />
            </div>
            <p className="text-base font-mono font-bold text-[#22C55E]">88%</p>
            <p className="text-[9px] text-[#8B8B8B] font-mono">{t('hrsLogged')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

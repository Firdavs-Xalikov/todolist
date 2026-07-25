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
  Sparkles,
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
    profile,
  } = useApp();

  const activeMilestone = milestones.find((m) => m.status === 'in-progress') || milestones[1];
  const pendingTasks = tasks.filter((t) => t.status !== 'completed');
  const todaysFocusTask = pendingTasks.find((t) => t.priority === 'urgent' || t.priority === 'high') || pendingTasks[0];

  const completedScheduleCount = todaySchedule.filter((item) => item.completed).length;
  const scheduleProgressPct = Math.round((completedScheduleCount / todaySchedule.length) * 100);

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
    <div className="p-4 max-w-lg mx-auto space-y-4 pb-20">
      {/* 1. Who am I becoming? Hero Card */}
      <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono font-bold text-[#4F8CFF]">
            1. WHO AM I BECOMING? • AGE 25
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[8px] bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/20">
            AGE {activeMilestone.age} TARGET
          </span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Sovereign Engineer & Financial Freedom
          </h2>
          <p className="text-xs text-[#8B8B8B] mt-0.5 leading-relaxed">
            Targeting $1,000,000+ Net Worth, SAT 1500+, Top US Scholarship, Senior Software Engineer track, and peak physical/spiritual self-sovereignty by 2032.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-[#8B8B8B]">Mission Progress ({activeMilestone.title})</span>
            <span className="text-[#22C55E] font-bold">{activeMilestone.completionPercentage}%</span>
          </div>
          <div className="w-full bg-[#090909] h-2 rounded-full overflow-hidden border border-[#222222]">
            <div
              className="bg-[#22C55E] h-full transition-all duration-180"
              style={{ width: `${activeMilestone.completionPercentage}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setCurrentView('mission')}
          className="w-full pt-2 flex items-center justify-between text-xs text-[#4F8CFF] font-semibold hover:underline"
        >
          <span>View Mission Timeline</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. What should I do today? Today's Focus */}
      <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono font-bold text-[#8B8B8B]">
            2. WHAT SHOULD I DO TODAY?
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-[8px] bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>Deep Work Active</span>
          </span>
        </div>

        {todaysFocusTask ? (
          <div className="bg-[#090909] border border-[#222222] rounded-[12px] p-3.5 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xs font-bold text-white leading-snug">
                {todaysFocusTask.title}
              </h3>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#181818] text-[#F59E0B] border border-[#222222] uppercase">
                {todaysFocusTask.priority}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-mono text-[#8B8B8B]">
              <span>{todaysFocusTask.estimatedMinutes} mins</span>
              <span className="capitalize">{todaysFocusTask.category}</span>
              {todaysFocusTask.isDeepWork && <span className="text-[#4F8CFF]">Deep Work</span>}
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#8B8B8B]">All priority focus items completed!</p>
        )}

        {/* Today's Schedule Quick Access Bar */}
        <button
          onClick={() => setCurrentView('today')}
          className="w-full p-3 bg-[#090909] border border-[#222222] rounded-[12px] flex items-center justify-between text-xs hover:border-[#4F8CFF] transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <Clock className="w-4 h-4 text-[#4F8CFF]" />
            <span className="font-semibold text-white">Today's Schedule Timeline</span>
          </div>
          <span className="text-[10px] font-mono text-[#22C55E]">
            {completedScheduleCount} / {todaySchedule.length} Done →
          </span>
        </button>
      </div>

      {/* 3. How much progress have I made? Essential Cards Grid */}
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-mono font-bold text-[#8B8B8B] px-1">
          3. HOW MUCH PROGRESS HAVE I MADE?
        </span>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Streak */}
          <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-1">
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">Streak</span>
              <Flame className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <p className="text-lg font-mono font-bold text-white">42 Days</p>
            <p className="text-[9px] text-[#22C55E] font-mono">100% Unbroken</p>
          </div>

          {/* Daily Score */}
          <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-1">
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">Daily Score</span>
              <Zap className="w-4 h-4 text-[#4F8CFF]" />
            </div>
            <p className="text-lg font-mono font-bold text-white">94 / 100</p>
            <p className="text-[9px] text-[#22C55E] font-mono">Peak Performance</p>
          </div>

          {/* Prayer Status */}
          <div
            onClick={() => setCurrentView('islam')}
            className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-1 cursor-pointer hover:border-[#333333]"
          >
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">Prayers</span>
              <Moon className="w-4 h-4 text-[#22C55E]" />
            </div>
            <p className="text-lg font-mono font-bold text-white">{validPrayersCount} / 5</p>
            <p className="text-[9px] text-[#22C55E] font-mono">Fajr Completed</p>
          </div>

          {/* Workout Status */}
          <div
            onClick={() => setCurrentView('fitness')}
            className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-1 cursor-pointer hover:border-[#333333]"
          >
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">Workout</span>
              <Dumbbell className="w-4 h-4 text-[#4F8CFF]" />
            </div>
            <p className="text-xs font-mono font-bold text-white truncate">
              {fitness.workoutSplit[0]?.splitName.split('-')[0] || 'Push Day'}
            </p>
            <p className="text-[9px] text-[#22C55E] font-mono">Completed Today</p>
          </div>

          {/* Learning Hours */}
          <div
            onClick={() => setCurrentView('learn')}
            className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-1 cursor-pointer hover:border-[#333333]"
          >
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">Learning</span>
              <BookOpen className="w-4 h-4 text-[#4F8CFF]" />
            </div>
            <p className="text-lg font-mono font-bold text-white">{totalLearningHours} hrs</p>
            <p className="text-[9px] text-[#8B8B8B] font-mono">Roadmap Mastery</p>
          </div>

          {/* Sleep Score */}
          <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-1">
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">Sleep</span>
              <Clock className="w-4 h-4 text-[#22C55E]" />
            </div>
            <p className="text-lg font-mono font-bold text-white">
              {fitness.sleepQualityScore}/100
            </p>
            <p className="text-[9px] text-[#8B8B8B] font-mono">{fitness.sleepHours} hrs duration</p>
          </div>

          {/* Water */}
          <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-1">
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">Water Intake</span>
              <Droplet className="w-4 h-4 text-[#4F8CFF]" />
            </div>
            <p className="text-lg font-mono font-bold text-white">{fitness.waterLiters} L</p>
            <p className="text-[9px] text-[#22C55E] font-mono">Target Met</p>
          </div>

          {/* Weekly Progress Bar */}
          <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-1">
            <div className="flex items-center justify-between text-[#8B8B8B]">
              <span className="text-[10px] font-semibold">Weekly Goal</span>
              <TrendingUp className="w-4 h-4 text-[#22C55E]" />
            </div>
            <p className="text-lg font-mono font-bold text-[#22C55E]">88%</p>
            <p className="text-[9px] text-[#8B8B8B] font-mono">42 hrs logged</p>
          </div>
        </div>
      </div>
    </div>
  );
};

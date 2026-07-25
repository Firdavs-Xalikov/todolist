'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Calendar as CalendarIcon, Clock, CheckCircle2, Flame, Layers } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { calendarEvents, setIsFocusTimerOpen } = useApp();
  const [activeMode, setActiveMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#4F8CFF]">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>TIME BLOCKING & DEEP WORK CALENDAR</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Daily Timeblock Schedule & Weekly Planner
          </h2>
          <p className="text-xs text-[#8A8A8A]">
            Enforce zero-friction time blocking for high-intensity deep work and recovery.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#090909] border border-[#232323] p-1.5 rounded-[12px]">
          {(['daily', 'weekly', 'monthly'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setActiveMode(m)}
              className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeMode === m
                  ? 'bg-[#181818] text-white border border-[#232323]'
                  : 'text-[#8A8A8A] hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Main Schedule Table / Timeline */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#232323] pb-4">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            {activeMode === 'daily'
              ? "Today's Schedule (Timeblocked 05:30 - 22:30)"
              : activeMode === 'weekly'
              ? 'Weekly Planning Overview'
              : 'Monthly Goal Horizons'}
          </h3>
          <button
            onClick={() => setIsFocusTimerOpen(true)}
            className="px-3.5 py-1.5 bg-[#4F8CFF] text-white text-xs font-semibold rounded-[8px] flex items-center space-x-1.5 hover:bg-[#3B7BFF] transition-colors"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Start Deep Work Timer</span>
          </button>
        </div>

        {activeMode === 'daily' && (
          <div className="space-y-3">
            {calendarEvents.map((evt) => {
              const isDeepWork = evt.category === 'deep-work';
              return (
                <div
                  key={evt.id}
                  className={`p-4 rounded-[12px] border flex items-center justify-between transition-colors ${
                    isDeepWork
                      ? 'bg-[#181818] border-[#4F8CFF]/40'
                      : 'bg-[#090909] border-[#232323]'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="font-mono text-xs font-bold text-[#4F8CFF] w-24">
                      {evt.startTime} - {evt.endTime}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{evt.title}</h4>
                      <span className="text-[10px] font-mono uppercase text-[#8A8A8A]">
                        {evt.category}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                      evt.completed
                        ? 'bg-[#16C784]/10 text-[#16C784] border-[#16C784]/20'
                        : 'bg-[#181818] text-[#8A8A8A] border-[#232323]'
                    }`}
                  >
                    {evt.completed ? 'Completed' : 'Upcoming'}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {activeMode === 'weekly' && (
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div
                key={day}
                className="bg-[#090909] border border-[#232323] rounded-[8px] p-3 space-y-2"
              >
                <p className="font-bold text-[#4F8CFF] font-mono">{day}</p>
                <div className="p-2 bg-[#111111] rounded text-[10px] text-[#8A8A8A]">
                  {idx % 2 === 0 ? 'Push A + Systems' : 'Pull A + Cybersecurity'}
                </div>
                <p className="text-[10px] text-[#16C784] font-mono">6.5 hrs focus</p>
              </div>
            ))}
          </div>
        )}

        {activeMode === 'monthly' && (
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] flex items-center justify-between">
              <div>
                <p className="font-bold text-white">July 2026 Milestone: Next.js App Router Architecture</p>
                <p className="text-[#8A8A8A]">Finish all backend PostgreSQL & Redis caching modules</p>
              </div>
              <span className="text-[#16C784] font-mono">90% Complete</span>
            </div>
            <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] flex items-center justify-between">
              <div>
                <p className="font-bold text-white">August 2026 Milestone: Burp Suite & HTB Active Directory Labs</p>
                <p className="text-[#8A8A8A]">Complete 15 Hack The Box machines & privilege escalation</p>
              </div>
              <span className="text-[#F59E0B] font-mono">Upcoming</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

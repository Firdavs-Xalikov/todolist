'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Clock, CheckCircle2, ArrowRight, CornerDownRight, Zap, RefreshCw, Award } from 'lucide-react';

export const TodayView: React.FC = () => {
  const { todaySchedule, toggleScheduleItem, postponeScheduleItem } = useApp();
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [swipingItemId, setSwipingItemId] = useState<string | null>(null);

  const completedCount = todaySchedule.filter((item) => item.completed).length;
  const progressPct = Math.round((completedCount / todaySchedule.length) * 100);

  const handleTouchStart = (e: React.TouchEvent, id: string) => {
    setTouchStartX(e.touches[0].clientX);
    setSwipingItemId(id);
  };

  const handleTouchEnd = (e: React.TouchEvent, id: string) => {
    if (touchStartX === null || swipingItemId !== id) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;

    // Swipe Right (> 60px) = Complete
    if (diffX > 60) {
      toggleScheduleItem(id);
    }
    // Swipe Left (< -60px) = Postpone
    else if (diffX < -60) {
      postponeScheduleItem(id);
    }

    setTouchStartX(null);
    setSwipingItemId(null);
  };

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      {/* Header Banner */}
      <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#4F8CFF]" />
            <h2 className="text-sm font-bold text-white tracking-tight">Today's Timeline Schedule</h2>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[8px] bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/20">
            {completedCount} / {todaySchedule.length} DONE
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[11px]">
            <span className="text-[#8B8B8B]">Daily Schedule Execution</span>
            <span className="text-white font-mono font-bold">{progressPct}%</span>
          </div>
          <div className="w-full bg-[#090909] h-2 rounded-full overflow-hidden border border-[#222222]">
            <div
              className="bg-[#4F8CFF] h-full transition-all duration-180"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <p className="text-[10px] text-[#8B8B8B] text-center italic">
          Tap to checkmark • Swipe right → Complete • Swipe left ← Postpone
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-2.5 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#222222]">
        {todaySchedule.map((item) => {
          const isDone = item.completed;
          const isPostponed = item.postponed;

          return (
            <div
              key={item.id}
              onTouchStart={(e) => handleTouchStart(e, item.id)}
              onTouchEnd={(e) => handleTouchEnd(e, item.id)}
              onClick={() => toggleScheduleItem(item.id)}
              className={`relative p-3.5 rounded-[18px] border transition-all duration-180 cursor-pointer select-none ${
                isDone
                  ? 'bg-[#111111]/60 border-[#222222] opacity-75'
                  : isPostponed
                  ? 'bg-[#181818] border-[#F59E0B]/40'
                  : 'bg-[#111111] border-[#222222] hover:border-[#333333]'
              }`}
            >
              {/* Node Marker */}
              <div
                className={`absolute -left-[22px] top-4 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                  isDone
                    ? 'bg-[#22C55E] border-[#090909]'
                    : isPostponed
                    ? 'bg-[#F59E0B] border-[#090909]'
                    : 'bg-[#090909] border-[#4F8CFF]'
                }`}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => {}}
                    className="accent-[#22C55E] w-4 h-4 rounded cursor-pointer"
                  />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#4F8CFF]">
                      {item.time}
                    </span>
                    <h4
                      className={`text-xs font-semibold leading-tight ${
                        isDone ? 'line-through text-[#525252]' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h4>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-[6px] border uppercase ${
                    isDone
                      ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20'
                      : isPostponed
                      ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
                      : 'bg-[#090909] text-[#8B8B8B] border-[#222222]'
                  }`}
                >
                  {isDone ? 'Done' : isPostponed ? 'Postponed' : item.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

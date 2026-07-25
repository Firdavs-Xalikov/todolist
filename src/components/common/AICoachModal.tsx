'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, Award, AlertTriangle, Target, Lightbulb, X } from 'lucide-react';

export const AICoachModal: React.FC = () => {
  const { isAICoachModalOpen, setIsAICoachModalOpen, aiCoach } = useApp();

  if (!isAICoachModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={() => setIsAICoachModalOpen(false)}
    >
      <div
        className="bg-[#111111] border border-[#222222] rounded-[18px] w-full max-w-md p-5 space-y-4 shadow-2xl animate-scale-in text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#222222] pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Evening AI Performance Review
            </h3>
          </div>
          <button
            onClick={() => setIsAICoachModalOpen(false)}
            className="text-[#8B8B8B] hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Review Summary */}
        <div className="p-3 bg-[#090909] border border-[#222222] rounded-[12px] text-xs text-white leading-relaxed">
          <span className="font-bold text-[#4F8CFF]">Today's Review: </span>
          {aiCoach.todaysReview}
        </div>

        {/* 4 Cards */}
        <div className="space-y-2 text-xs">
          {/* Biggest Win */}
          <div className="p-3 bg-[#090909] border border-[#222222] rounded-[12px] space-y-1 border-l-2 border-l-[#22C55E]">
            <div className="flex items-center space-x-1.5 text-[#22C55E] font-semibold text-[11px]">
              <Award className="w-3.5 h-3.5" />
              <span>BIGGEST WIN</span>
            </div>
            <p className="text-white leading-snug">{aiCoach.biggestWin}</p>
          </div>

          {/* Biggest Mistake */}
          <div className="p-3 bg-[#090909] border border-[#222222] rounded-[12px] space-y-1 border-l-2 border-l-[#EF4444]">
            <div className="flex items-center space-x-1.5 text-[#EF4444] font-semibold text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>BIGGEST MISTAKE</span>
            </div>
            <p className="text-[#8B8B8B] leading-snug">{aiCoach.biggestMistake}</p>
          </div>

          {/* Tomorrow's Priority */}
          <div className="p-3 bg-[#090909] border border-[#222222] rounded-[12px] space-y-1 border-l-2 border-l-[#4F8CFF]">
            <div className="flex items-center space-x-1.5 text-[#4F8CFF] font-semibold text-[11px]">
              <Target className="w-3.5 h-3.5" />
              <span>TOMORROW'S PRIORITY</span>
            </div>
            <p className="text-white font-medium leading-snug">{aiCoach.tomorrowPriority}</p>
          </div>

          {/* Weekly Advice */}
          <div className="p-3 bg-[#090909] border border-[#222222] rounded-[12px] space-y-1 border-l-2 border-l-[#F59E0B]">
            <div className="flex items-center space-x-1.5 text-[#F59E0B] font-semibold text-[11px]">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>WEEKLY ADVICE</span>
            </div>
            <p className="text-white leading-snug">{aiCoach.weeklyAdvice}</p>
          </div>
        </div>

        <button
          onClick={() => setIsAICoachModalOpen(false)}
          className="w-full py-2 bg-[#4F8CFF] text-white font-semibold text-xs rounded-[12px] hover:bg-[#3B7BFF] transition-colors"
        >
          Close Review
        </button>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, AlertTriangle, Lightbulb, Target, CheckCircle2, TrendingUp } from 'lucide-react';

export const AIReviewsView: React.FC = () => {
  const { aiReviews } = useApp();
  const currentReview = aiReviews[0];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#4F8CFF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI PERFORMANCE COACH & WEAKNESS DETECTION</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Automated Daily & Weekly Performance Synthesis
          </h2>
          <p className="text-xs text-[#8A8A8A]">
            Continuous algorithmic analysis of output, sleep patterns, study gaps, and auto-adjusted targets.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#090909] border border-[#232323] p-3 rounded-[12px]">
          <span className="text-xs font-mono text-[#16C784]">AI Coach Status: Active</span>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#232323] pb-3">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Weekly Synthesis ({currentReview?.date})
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/20 uppercase">
            {currentReview?.type} Report
          </span>
        </div>

        <p className="text-xs text-white leading-relaxed font-medium">
          {currentReview?.summary}
        </p>

        {/* 2-Column AI Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Weakness Detection */}
          <div className="bg-[#090909] border border-[#232323] rounded-[12px] p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#EF4444] uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Detected Weaknesses & Bottlenecks</span>
            </div>
            <div className="space-y-2 text-xs">
              {currentReview?.weaknessesDetected?.map((w: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3 bg-[#111111] border border-[#232323] rounded-[8px] text-[#8A8A8A] border-l-2 border-l-[#EF4444]"
                >
                  {w}
                </div>
              ))}
            </div>
          </div>

          {/* Personal Suggestions */}
          <div className="bg-[#090909] border border-[#232323] rounded-[12px] p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#F59E0B] uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Actionable Study & Habit Recommendations</span>
            </div>
            <div className="space-y-2 text-xs">
              {currentReview?.recommendations?.map((rec: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3 bg-[#111111] border border-[#232323] rounded-[8px] text-white border-l-2 border-l-[#F59E0B]"
                >
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Auto Goal Adjustments */}
        <div className="bg-[#090909] border border-[#232323] rounded-[12px] p-5 space-y-3 mt-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#16C784] uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Automatic Goal Adjustments Executed</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {currentReview?.autoGoalAdjustments?.map((adj: string, idx: number) => (
              <div
                key={idx}
                className="p-3 bg-[#111111] border border-[#232323] rounded-[8px] text-white flex items-center space-x-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#16C784] shrink-0" />
                <span>{adj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

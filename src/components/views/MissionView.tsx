'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Milestone } from '@/types';
import { Target, CheckCircle2, Clock, ShieldCheck, ChevronRight, Layers, Award } from 'lucide-react';

export const MissionView: React.FC = () => {
  const { milestones, updateMilestone } = useApp();
  const [selectedId, setSelectedId] = useState<string>(milestones[1]?.id || 'm2');

  const selectedMilestone = milestones.find((m) => m.id === selectedId) || milestones[0];

  const handleToggleSubGoal = (milestoneId: string, subGoalId: string) => {
    const target = milestones.find((m) => m.id === milestoneId);
    if (!target) return;

    const updatedSubGoals = target.subGoals.map((sg) =>
      sg.id === subGoalId ? { ...sg, completed: !sg.completed } : sg
    );

    const completedCount = updatedSubGoals.filter((sg) => sg.completed).length;
    const completionPercentage = Math.round((completedCount / updatedSubGoals.length) * 100);
    const newStatus =
      completionPercentage === 100
        ? 'completed'
        : completionPercentage > 0
        ? 'in-progress'
        : 'upcoming';

    updateMilestone(milestoneId, {
      subGoals: updatedSubGoals,
      completionPercentage,
      status: newStatus,
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#4F8CFF]">
            <Target className="w-3.5 h-3.5" />
            <span>EXPLICIT AGE 17 → AGE 25 ROADMAP</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Strategic Master Plan to Financial Freedom by Age 25
          </h2>
          <p className="text-xs text-[#8A8A8A]">
            Select any milestone along the 8-year expansion timeline to inspect KPIs, sub-goals, and dependencies.
          </p>
        </div>
      </div>

      {/* Main Grid: Interactive Vertical Timeline + Milestone Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Timeline list (8-year sequence) */}
        <div className="lg:col-span-5 bg-[#111111] border border-[#232323] rounded-[12px] p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-[#232323] pb-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Timeline Milestones
            </h3>
            <span className="text-[11px] font-mono text-[#8A8A8A]">
              7 Strategic Phases
            </span>
          </div>

          <div className="relative pl-4 space-y-3 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-[2px] before:bg-[#232323]">
            {milestones.map((m, index) => {
              const isSelected = m.id === selectedId;
              const isCompleted = m.status === 'completed';
              const isInProgress = m.status === 'in-progress';

              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={`relative p-3.5 rounded-[12px] border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#181818] border-[#4F8CFF] shadow-sm'
                      : 'bg-[#090909] border-[#232323] hover:border-[#333333]'
                  }`}
                >
                  {/* Timeline node marker */}
                  <div
                    className={`absolute -left-[21px] top-4 w-3.5 h-3.5 rounded-full border-2 ${
                      isCompleted
                        ? 'bg-[#16C784] border-[#090909]'
                        : isInProgress
                        ? 'bg-[#4F8CFF] border-[#090909] animate-pulse'
                        : 'bg-[#090909] border-[#525252]'
                    }`}
                  />

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-[#4F8CFF] font-semibold">
                      AGE {m.age} • {m.targetYear}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                        isCompleted
                          ? 'bg-[#16C784]/10 text-[#16C784] border-[#16C784]/20'
                          : isInProgress
                          ? 'bg-[#4F8CFF]/10 text-[#4F8CFF] border-[#4F8CFF]/20'
                          : 'bg-[#181818] text-[#8A8A8A] border-[#232323]'
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white">{m.title}</h4>
                  <p className="text-xs text-[#8A8A8A] mt-0.5">{m.subtitle}</p>

                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-[#8A8A8A] font-mono">Progress</span>
                    <span className="text-white font-mono">{m.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-[#111111] h-1.5 rounded-full overflow-hidden border border-[#232323] mt-1">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isCompleted ? 'bg-[#16C784]' : 'bg-[#4F8CFF]'
                      }`}
                      style={{ width: `${m.completionPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Milestone Detail Card Inspector */}
        <div className="lg:col-span-7 bg-[#111111] border border-[#232323] rounded-[12px] p-6 space-y-6">
          <div className="border-b border-[#232323] pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#4F8CFF] font-semibold">
                PHASE DETAIL • AGE {selectedMilestone.age} ({selectedMilestone.targetYear})
              </span>
              <span
                className={`text-xs font-mono px-2.5 py-1 rounded border font-semibold ${
                  selectedMilestone.status === 'completed'
                    ? 'bg-[#16C784]/10 text-[#16C784] border-[#16C784]/30'
                    : selectedMilestone.status === 'in-progress'
                    ? 'bg-[#4F8CFF]/10 text-[#4F8CFF] border-[#4F8CFF]/30'
                    : 'bg-[#181818] text-[#8A8A8A] border-[#232323]'
                }`}
              >
                {selectedMilestone.status.toUpperCase()}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">
              {selectedMilestone.title}
            </h3>
            <p className="text-xs font-medium text-[#8A8A8A]">{selectedMilestone.subtitle}</p>
            <p className="text-xs text-white leading-relaxed pt-2">
              {selectedMilestone.description}
            </p>
          </div>

          {/* Key Performance Indicators */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-white uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#F59E0B]" />
              <span>Key Performance Indicators (KPIs)</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {selectedMilestone.kpis.map((kpi, idx) => (
                <div
                  key={idx}
                  className="bg-[#090909] border border-[#232323] rounded-[8px] p-3 text-center"
                >
                  <p className="text-xs font-mono font-semibold text-white">{kpi}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Goals Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-semibold text-white uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#16C784]" />
                <span>Actionable Sub-Goals & Deliverables</span>
              </div>
              <span className="text-xs font-mono text-[#8A8A8A]">
                {selectedMilestone.subGoals.filter((sg) => sg.completed).length} /{' '}
                {selectedMilestone.subGoals.length} Completed
              </span>
            </div>

            <div className="space-y-2">
              {selectedMilestone.subGoals.map((sg) => (
                <div
                  key={sg.id}
                  onClick={() => handleToggleSubGoal(selectedMilestone.id, sg.id)}
                  className="p-3 bg-[#090909] hover:bg-[#161616] border border-[#232323] rounded-[8px] flex items-center justify-between text-xs transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={sg.completed}
                      onChange={() => {}}
                      className="accent-[#4F8CFF] w-4 h-4 rounded cursor-pointer"
                    />
                    <span
                      className={`font-medium ${
                        sg.completed ? 'line-through text-[#525252]' : 'text-white'
                      }`}
                    >
                      {sg.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8A8A8A]">
                    {sg.completed ? 'Done' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

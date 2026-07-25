'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Dumbbell, Flame, Droplet, Moon, Scale, Waves, Plus, HeartPulse } from 'lucide-react';

export const FitnessView: React.FC = () => {
  const { fitness, addWorkoutSession, addSwimmingLog } = useApp();

  const [activeTab, setActiveTab] = useState<'gym' | 'swimming' | 'recovery'>('gym');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Weight */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-1">
          <div className="flex items-center justify-between text-[#8A8A8A]">
            <span className="text-[11px] font-medium">Body Weight</span>
            <Scale className="w-4 h-4 text-[#4F8CFF]" />
          </div>
          <p className="text-xl font-bold font-mono text-white">{fitness.weightKg} kg</p>
          <p className="text-[10px] text-[#8A8A8A]">Target: {fitness.targetWeightKg} kg</p>
        </div>

        {/* Sleep */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-1">
          <div className="flex items-center justify-between text-[#8A8A8A]">
            <span className="text-[11px] font-medium">Sleep Score</span>
            <Moon className="w-4 h-4 text-[#16C784]" />
          </div>
          <p className="text-xl font-bold font-mono text-white">{fitness.sleepQualityScore}/100</p>
          <p className="text-[10px] text-[#16C784]">{fitness.sleepHours} hrs total</p>
        </div>

        {/* Water */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-1">
          <div className="flex items-center justify-between text-[#8A8A8A]">
            <span className="text-[11px] font-medium">Hydration</span>
            <Droplet className="w-4 h-4 text-[#4F8CFF]" />
          </div>
          <p className="text-xl font-bold font-mono text-white">{fitness.waterLiters} L</p>
          <p className="text-[10px] text-[#16C784]">Target Hit</p>
        </div>

        {/* Calories */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-1">
          <div className="flex items-center justify-between text-[#8A8A8A]">
            <span className="text-[11px] font-medium">Calories Burned</span>
            <Flame className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <p className="text-xl font-bold font-mono text-white">{fitness.caloriesBurned} kcal</p>
          <p className="text-[10px] text-[#F59E0B]">Active Recovery</p>
        </div>

        {/* Sauna */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-1">
          <div className="flex items-center justify-between text-[#8A8A8A]">
            <span className="text-[11px] font-medium">Sauna Sessions</span>
            <HeartPulse className="w-4 h-4 text-[#EF4444]" />
          </div>
          <p className="text-xl font-bold font-mono text-white">{fitness.saunaSessionsThisWeek} / week</p>
          <p className="text-[10px] text-[#16C784]">High Recovery</p>
        </div>

        {/* Swimming */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-1">
          <div className="flex items-center justify-between text-[#8A8A8A]">
            <span className="text-[11px] font-medium">Weekly Swim</span>
            <Waves className="w-4 h-4 text-[#4F8CFF]" />
          </div>
          <p className="text-xl font-bold font-mono text-white">4,500m</p>
          <p className="text-[10px] text-[#4F8CFF]">2 Sessions Completed</p>
        </div>
      </div>

      {/* Fitness Sub-Tabs */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-6">
        <div className="flex items-center justify-between border-b border-[#232323] pb-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('gym')}
              className={`px-4 py-2 rounded-[8px] text-xs font-semibold flex items-center space-x-2 transition-colors ${
                activeTab === 'gym'
                  ? 'bg-[#181818] text-white border border-[#232323]'
                  : 'text-[#8A8A8A] hover:text-white'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5 text-[#4F8CFF]" />
              <span>Gym & Workout Split</span>
            </button>

            <button
              onClick={() => setActiveTab('swimming')}
              className={`px-4 py-2 rounded-[8px] text-xs font-semibold flex items-center space-x-2 transition-colors ${
                activeTab === 'swimming'
                  ? 'bg-[#181818] text-white border border-[#232323]'
                  : 'text-[#8A8A8A] hover:text-white'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-[#4F8CFF]" />
              <span>Swimming Logs</span>
            </button>

            <button
              onClick={() => setActiveTab('recovery')}
              className={`px-4 py-2 rounded-[8px] text-xs font-semibold flex items-center space-x-2 transition-colors ${
                activeTab === 'recovery'
                  ? 'bg-[#181818] text-white border border-[#232323]'
                  : 'text-[#8A8A8A] hover:text-white'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-[#16C784]" />
              <span>Body Measurements & Sauna</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Gym Workout Split */}
        {activeTab === 'gym' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Workout Sessions & Exercise Logs
            </h3>

            {fitness.workoutSplit.map((session) => (
              <div
                key={session.id}
                className="bg-[#090909] border border-[#232323] rounded-[12px] p-5 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#232323] pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#4F8CFF] font-semibold">
                      {session.date} • {session.durationMinutes} mins
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">{session.splitName}</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16C784]/10 text-[#16C784] border border-[#16C784]/20">
                    Completed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {session.exercises.map((ex) => (
                    <div
                      key={ex.id}
                      className="p-3 bg-[#111111] border border-[#232323] rounded-[8px] flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-semibold text-white">{ex.name}</p>
                        <p className="text-[10px] text-[#8A8A8A]">{ex.targetMuscle}</p>
                      </div>
                      <div className="text-right font-mono">
                        <p className="text-white font-bold">{ex.weightKg} kg</p>
                        <p className="text-[10px] text-[#8A8A8A]">
                          {ex.sets} sets × {ex.reps} reps
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Swimming Logs */}
        {activeTab === 'swimming' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Swimming Sessions & Technique Notes
            </h3>

            {fitness.swimmingLogs.map((log) => (
              <div
                key={log.id}
                className="bg-[#090909] border border-[#232323] rounded-[12px] p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#4F8CFF] font-semibold">
                    {log.date}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                    {log.distanceMeters}m ({log.timeMinutes} mins)
                  </span>
                </div>
                <p className="text-xs text-[#8A8A8A] leading-relaxed">
                  <span className="text-white font-medium">Technique & Drill Notes: </span>
                  {log.techniqueNotes}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Body Measurements */}
        {activeTab === 'recovery' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#090909] border border-[#232323] rounded-[12px] p-5 space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Body Composition & Measurements
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#111111] border border-[#232323] rounded-[8px]">
                  <p className="text-[#8A8A8A]">Chest Circumference</p>
                  <p className="text-base font-mono font-bold text-white mt-1">
                    {fitness.bodyMeasurements.chestCm} cm
                  </p>
                </div>
                <div className="p-3 bg-[#111111] border border-[#232323] rounded-[8px]">
                  <p className="text-[#8A8A8A]">Waist Circumference</p>
                  <p className="text-base font-mono font-bold text-white mt-1">
                    {fitness.bodyMeasurements.waistCm} cm
                  </p>
                </div>
                <div className="p-3 bg-[#111111] border border-[#232323] rounded-[8px]">
                  <p className="text-[#8A8A8A]">Biceps</p>
                  <p className="text-base font-mono font-bold text-white mt-1">
                    {fitness.bodyMeasurements.bicepsCm} cm
                  </p>
                </div>
                <div className="p-3 bg-[#111111] border border-[#232323] rounded-[8px]">
                  <p className="text-[#8A8A8A]">Thighs</p>
                  <p className="text-base font-mono font-bold text-white mt-1">
                    {fitness.bodyMeasurements.thighsCm} cm
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#090909] border border-[#232323] rounded-[12px] p-5 space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Sauna Recovery Protocol
              </h4>
              <p className="text-xs text-[#8A8A8A] leading-relaxed">
                4x weekly Finnish Sauna sessions at 85°C for 20 minutes immediately post-workout. Increases heat shock proteins, accelerates muscle protein recovery, and enhances deep REM sleep.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

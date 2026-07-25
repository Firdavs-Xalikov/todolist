'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { BarChart3, Award, TrendingUp, Zap, Clock } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { roadmaps, fitness, islam } = useApp();

  // Weekly study data
  const studyHoursData = [
    { day: 'Mon', Programming: 6.5, Security: 2.0, Reading: 1.0 },
    { day: 'Tue', Programming: 5.0, Security: 3.5, Reading: 1.5 },
    { day: 'Wed', Programming: 7.0, Security: 2.5, Reading: 1.0 },
    { day: 'Thu', Programming: 4.5, Security: 4.0, Reading: 1.5 },
    { day: 'Fri', Programming: 8.0, Security: 3.0, Reading: 2.0 },
    { day: 'Sat', Programming: 6.0, Security: 5.0, Reading: 2.5 },
    { day: 'Sun', Programming: 5.5, Security: 3.0, Reading: 1.5 },
  ];

  // Sleep & workout consistency
  const sleepData = [
    { day: 'Mon', score: 88, hours: 7.8 },
    { day: 'Tue', score: 92, hours: 8.2 },
    { day: 'Wed', score: 85, hours: 7.5 },
    { day: 'Thu', score: 95, hours: 8.5 },
    { day: 'Fri', score: 90, hours: 8.0 },
    { day: 'Sat', score: 94, hours: 8.4 },
    { day: 'Sun', score: 92, hours: 8.2 },
  ];

  // Personal Life Score calculation algorithm
  const disciplineScore = 96;
  const learningScore = 92;
  const healthScore = 90;
  const faithScore = 100;
  const overallLifeScore = Math.round(
    disciplineScore * 0.25 + learningScore * 0.25 + healthScore * 0.25 + faithScore * 0.25
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Life Score Banner */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[11px] font-mono text-[#4F8CFF]">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>QUANTIFIED SELF & ANALYTICS</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Personal Life Operating Score: {overallLifeScore} / 100
            </h2>
            <p className="text-xs text-[#8A8A8A]">
              Weighted aggregate score calculated from discipline, coding hours, fitness consistency, prayer streak, and reading velocity.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-[#090909] border border-[#232323] p-3 rounded-[12px]">
            <div className="text-right font-mono">
              <p className="text-[10px] text-[#8A8A8A]">System Status</p>
              <p className="text-xs font-bold text-[#16C784]">Peak Performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Study & Coding Hours */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Hours Studied per Day (Programming vs Security vs Reading)
            </h3>
            <span className="text-[10px] font-mono text-[#4F8CFF]">Total: 62.5 hrs/wk</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232323" />
                <XAxis dataKey="day" stroke="#8A8A8A" fontSize={11} tickLine={false} />
                <YAxis stroke="#8A8A8A" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    borderColor: '#232323',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="Programming" fill="#4F8CFF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Security" fill="#16C784" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Reading" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Sleep & Recovery Trend */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Sleep Quality Score & Duration Trend
            </h3>
            <span className="text-[10px] font-mono text-[#16C784]">Avg Quality: 92/100</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232323" />
                <XAxis dataKey="day" stroke="#8A8A8A" fontSize={11} tickLine={false} />
                <YAxis stroke="#8A8A8A" fontSize={11} tickLine={false} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#111111',
                    borderColor: '#232323',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#16C784"
                  fill="rgba(22, 199, 132, 0.15)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Breakdown Score Matrix */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-5 space-y-4">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
          Life Sub-System Score Matrix
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] space-y-1">
            <p className="text-[#8A8A8A]">Discipline & Consistency</p>
            <p className="text-xl font-mono font-bold text-[#16C784]">{disciplineScore}%</p>
          </div>
          <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] space-y-1">
            <p className="text-[#8A8A8A]">Coding & Learning</p>
            <p className="text-xl font-mono font-bold text-[#4F8CFF]">{learningScore}%</p>
          </div>
          <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] space-y-1">
            <p className="text-[#8A8A8A]">Health & Swimming</p>
            <p className="text-xl font-mono font-bold text-[#F59E0B]">{healthScore}%</p>
          </div>
          <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] space-y-1">
            <p className="text-[#8A8A8A]">Prayer & Faith</p>
            <p className="text-xl font-mono font-bold text-[#16C784]">{faithScore}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

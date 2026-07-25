'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Settings, Database, Shield, Download, Upload, RotateCcw, UserCheck, Layers } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { resetToDefaults } = useApp();

  const handleExport = () => {
    try {
      const data = localStorage.getItem('fx_life_os_state_v1');
      const blob = new Blob([data || '{}'], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fx-life-os-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 space-y-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#4F8CFF]">
            <Settings className="w-3.5 h-3.5" />
            <span>SYSTEM CONFIGURATION & ARCHITECTURE</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Settings, Local Backup & Multi-User Architecture
          </h2>
          <p className="text-xs text-[#8A8A8A]">
            Single-user local operational state with ready-to-scale enterprise database schema preview.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Local Data Operations */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 space-y-4">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Local Data Backup & State Management
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Export OS State (JSON)</p>
                <p className="text-[#8A8A8A] text-[11px]">
                  Download complete backup of tasks, roadmaps, finance, and fitness logs.
                </p>
              </div>
              <button
                onClick={handleExport}
                className="px-3.5 py-1.5 bg-[#4F8CFF] hover:bg-[#3B7BFF] text-white text-xs font-semibold rounded-[8px] flex items-center space-x-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>

            <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Reset to Seed Defaults</p>
                <p className="text-[#8A8A8A] text-[11px]">
                  Restore initial curated sample data for SAT, Programming, Security, and Fitness.
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Reset FX Life OS to default seed state?')) {
                    resetToDefaults();
                  }
                }}
                className="px-3.5 py-1.5 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] text-xs font-semibold rounded-[8px] flex items-center space-x-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise Architecture Ready */}
        <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 space-y-4">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
            Multi-Tenant Backend Architecture Preview
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] space-y-2">
              <div className="flex items-center space-x-2 text-[#16C784]">
                <Database className="w-4 h-4" />
                <span className="font-bold">Supabase & PostgreSQL Prisma Ready</span>
              </div>
              <p className="text-[#8A8A8A] leading-relaxed">
                The state structure maps 1:1 to Prisma relational models (`User`, `Milestone`, `RoadmapTopic`, `Project`, `WorkoutSession`, `Transaction`, `AIReview`).
              </p>
            </div>

            <div className="p-4 bg-[#090909] border border-[#232323] rounded-[8px] space-y-2">
              <div className="flex items-center space-x-2 text-[#4F8CFF]">
                <Shield className="w-4 h-4" />
                <span className="font-bold">NextAuth.js & JWT Authentication</span>
              </div>
              <p className="text-[#8A8A8A] leading-relaxed">
                Designed to activate multi-user authentication with OAuth (GitHub, Google) and Row-Level Security (RLS) policies without changing component code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

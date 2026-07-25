'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Award, Download, RotateCcw, CheckCircle2, ChevronRight } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { profile, resetToDefaults, setCurrentView, t } = useApp();

  const xpProgressPct = Math.round((profile.xp / profile.nextLevelXp) * 100);

  const handleExport = () => {
    try {
      const data = localStorage.getItem('project_25_state_v2');
      const blob = new Blob([data || '{}'], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `project-25-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto space-y-3 pb-16">
      {/* Profile Hero Card */}
      <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-4 space-y-3 text-center">
        <div className="w-14 h-14 rounded-full bg-[#4F8CFF] text-[#090909] font-black text-lg flex items-center justify-center mx-auto shadow-sm">
          FX
        </div>

        <div>
          <h2 className="text-base font-bold text-white tracking-tight">F.X. User</h2>
          <p className="text-xs text-[#4F8CFF] font-mono font-semibold mt-0.5">{t('levelTitle')}</p>
        </div>

        {/* Level & XP Progress Bar */}
        <div className="bg-[#090909] border border-[#222222] rounded-[14px] p-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#8B8B8B] font-bold">{t('level')} {profile.level}</span>
            <span className="text-white font-bold">
              {profile.xp} / {profile.nextLevelXp} XP
            </span>
          </div>

          <div className="w-full bg-[#111111] h-2 rounded-full overflow-hidden border border-[#222222]">
            <div
              className="bg-[#4F8CFF] h-full transition-all duration-180"
              style={{ width: `${xpProgressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements Badge Shelf */}
      <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {t('achievementsTitle')}
            </h3>
          </div>
          <span className="text-[9px] font-mono text-[#8B8B8B]">
            {profile.achievements.filter((a) => a.unlocked).length} / {profile.achievements.length}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {profile.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-2.5 rounded-[12px] border space-y-0.5 text-left transition-all ${
                ach.unlocked
                  ? 'bg-[#090909] border-[#222222]'
                  : 'bg-[#090909]/40 border-[#222222] opacity-40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono text-[#4F8CFF]">{ach.category}</span>
                {ach.unlocked && <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />}
              </div>
              <p className="text-[11px] font-bold text-white leading-tight">{ach.title}</p>
              <p className="text-[9px] text-[#8B8B8B] leading-snug">{ach.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Links */}
      <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-1.5 divide-y divide-[#222222]">
        {[
          { label: 'Fitness & Physical Recovery', view: 'fitness' },
          { label: 'Islam & Prayer Operations', view: 'islam' },
          { label: 'Sovereign Finance & Net Worth', view: 'finance' },
          { label: 'Books & Knowledge Archive', view: 'books' },
          { label: 'Analytics & Quantified Self', view: 'analytics' },
        ].map((item) => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view as any)}
            className="w-full p-2.5 flex items-center justify-between text-xs text-[#8B8B8B] hover:text-white transition-colors"
          >
            <span className="font-semibold text-white">{item.label}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#525252]" />
          </button>
        ))}
      </div>

      {/* Data Backup & Reset */}
      <div className="bg-[#111111] border border-[#222222] rounded-[18px] p-3.5 space-y-2.5">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          {t('settingsTitle')}
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={handleExport}
            className="py-2 bg-[#090909] hover:bg-[#181818] border border-[#222222] text-white font-semibold rounded-[10px] flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('exportJson')}</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset Project 25 state to defaults?')) {
                resetToDefaults();
              }
            }}
            className="py-2 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] font-semibold rounded-[10px] flex items-center justify-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('resetState')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

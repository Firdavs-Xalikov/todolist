'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Moon, BookOpen, Heart, Sparkles, CheckCircle2, Plus } from 'lucide-react';

export const IslamView: React.FC = () => {
  const { islam, togglePrayer, addJournalEntry } = useApp();
  const [journalText, setJournalText] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'prayers' | 'quran' | 'duas' | 'journal'>('prayers');

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalText.trim()) return;
    addJournalEntry(journalText);
    setJournalText('');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#16C784]">
            <Moon className="w-3.5 h-3.5" />
            <span>SPIRITUAL FOUNDATION • DAILY OPERATIONS</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Islam, Prayer Discipline & Reflection
          </h2>
          <p className="text-xs text-[#8A8A8A]">
            The spiritual anchor of life. 5 daily prayers, Quran memorization tracking, Duas, and daily reflection.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-[#090909] border border-[#232323] p-3.5 rounded-[12px]">
          <div className="text-right font-mono">
            <p className="text-[10px] text-[#8A8A8A]">Prayer Streak</p>
            <p className="text-base font-bold text-[#16C784]">{islam.prayersToday.streakDays} Days</p>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 space-y-6">
        <div className="flex items-center space-x-2 border-b border-[#232323] pb-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('prayers')}
            className={`px-4 py-2 rounded-[8px] text-xs font-semibold flex items-center space-x-2 transition-colors ${
              activeSubTab === 'prayers'
                ? 'bg-[#181818] text-white border border-[#232323]'
                : 'text-[#8A8A8A] hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-[#16C784]" />
            <span>Prayer Tracker & Wudu</span>
          </button>

          <button
            onClick={() => setActiveSubTab('quran')}
            className={`px-4 py-2 rounded-[8px] text-xs font-semibold flex items-center space-x-2 transition-colors ${
              activeSubTab === 'quran'
                ? 'bg-[#181818] text-white border border-[#232323]'
                : 'text-[#8A8A8A] hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#4F8CFF]" />
            <span>Quran Progress ({islam.quranProgressPercentage}%)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('duas')}
            className={`px-4 py-2 rounded-[8px] text-xs font-semibold flex items-center space-x-2 transition-colors ${
              activeSubTab === 'duas'
                ? 'bg-[#181818] text-white border border-[#232323]'
                : 'text-[#8A8A8A] hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Duas Library</span>
          </button>

          <button
            onClick={() => setActiveSubTab('journal')}
            className={`px-4 py-2 rounded-[8px] text-xs font-semibold flex items-center space-x-2 transition-colors ${
              activeSubTab === 'journal'
                ? 'bg-[#181818] text-white border border-[#232323]'
                : 'text-[#8A8A8A] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16C784]" />
            <span>Reflection Journal</span>
          </button>
        </div>

        {/* Tab 1: Prayer Tracker */}
        {activeSubTab === 'prayers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const).map((p) => {
                const isCompleted = islam.prayersToday[p];
                return (
                  <div
                    key={p}
                    onClick={() => togglePrayer(p)}
                    className={`p-4 rounded-[12px] border cursor-pointer transition-all duration-200 text-center ${
                      isCompleted
                        ? 'bg-[#16C784]/10 border-[#16C784]/30 text-[#16C784]'
                        : 'bg-[#090909] border-[#232323] text-[#8A8A8A] hover:border-[#333333]'
                    }`}
                  >
                    <p className="text-xs uppercase font-mono font-bold">{p}</p>
                    <p className="text-lg font-mono font-bold mt-2">
                      {isCompleted ? 'COMPLETED' : 'PENDING'}
                    </p>
                    <p className="text-[10px] text-[#8A8A8A] mt-1">Click to toggle</p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-[#090909] border border-[#232323] rounded-[12px] flex items-center justify-between text-xs">
              <span className="text-[#8A8A8A]">
                Wudu Maintenance Status: <strong className="text-white">Active</strong>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181818] text-[#8A8A8A]">
                Future API Integration: Automated Adhan Notifications
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Quran Progress */}
        {activeSubTab === 'quran' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                Quran Memorization & Reading Status
              </h3>
              <span className="text-xs font-mono text-[#4F8CFF]">
                Juz Completed: {islam.juzCompleted} / 30
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {islam.surahs.map((surah) => (
                <div
                  key={surah.number}
                  className="p-4 bg-[#090909] border border-[#232323] rounded-[12px] flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-[#4F8CFF]">#{surah.number}</span>
                      <h4 className="font-bold text-white text-sm">{surah.name}</h4>
                      <span className="text-[#8A8A8A]">({surah.englishTitle})</span>
                    </div>
                    <p className="text-[10px] text-[#8A8A8A] font-mono">
                      Ayahs: {surah.memorizedAyahs} / {surah.totalAyahs}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                      surah.status === 'memorized'
                        ? 'bg-[#16C784]/10 text-[#16C784] border-[#16C784]/20'
                        : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20'
                    }`}
                  >
                    {surah.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Duas Library */}
        {activeSubTab === 'duas' && (
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Essential Daily Duas & Supplications
            </h3>

            <div className="space-y-3">
              {islam.duas.map((dua) => (
                <div
                  key={dua.id}
                  className="p-5 bg-[#090909] border border-[#232323] rounded-[12px] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#F59E0B]">{dua.category}</span>
                    <span className="text-xs font-mono text-white">{dua.transliteration}</span>
                  </div>
                  <p className="text-xl text-right font-serif text-white py-2 leading-loose">
                    {dua.arabic}
                  </p>
                  <p className="text-xs text-[#8A8A8A] italic">{dua.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Reflection Journal */}
        {activeSubTab === 'journal' && (
          <div className="space-y-4">
            <form onSubmit={handleSaveJournal} className="space-y-3">
              <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                New Daily Reflection & Gratitude Log
              </label>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Write reflection on today's discipline, faith, mindset, and challenges..."
                className="w-full bg-[#090909] border border-[#232323] rounded-[12px] p-3 text-xs text-white placeholder-[#525252] outline-none focus:border-[#16C784] h-24"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#16C784] text-black font-semibold text-xs rounded-[8px] hover:bg-[#13b074] transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </form>

            <div className="space-y-3 pt-3 border-t border-[#232323]">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Previous Reflection Entries
              </h4>
              {islam.reflectionJournal.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 bg-[#090909] border border-[#232323] rounded-[12px] space-y-1.5 text-xs"
                >
                  <span className="text-[10px] font-mono text-[#16C784]">{entry.date}</span>
                  <p className="text-white leading-relaxed">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

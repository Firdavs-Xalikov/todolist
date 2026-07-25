'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Play, Pause, RotateCcw, CheckCircle2, X, Flame } from 'lucide-react';

export const FocusTimerModal: React.FC = () => {
  const { isFocusTimerOpen, setIsFocusTimerOpen, tasks } = useApp();
  const [targetMinutes, setTargetMinutes] = useState(45);
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');

  useEffect(() => {
    setSecondsLeft(targetMinutes * 60);
    setIsRunning(false);
  }, [targetMinutes]);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  if (!isFocusTimerOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = Math.round(
    ((targetMinutes * 60 - secondsLeft) / (targetMinutes * 60)) * 100
  );

  const formatTime = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={() => setIsFocusTimerOpen(false)}
    >
      <div
        className="bg-[#111111] border border-[#232323] rounded-[12px] w-full max-w-md p-6 space-y-6 shadow-2xl animate-scale-in text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#232323] pb-3 text-xs">
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-[#4F8CFF]" />
            <span className="font-semibold text-white">Deep Work Focus Block</span>
          </div>
          <button
            onClick={() => setIsFocusTimerOpen(false)}
            className="text-[#8A8A8A] hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-4 gap-2">
          {[25, 45, 60, 90].map((mins) => (
            <button
              key={mins}
              onClick={() => setTargetMinutes(mins)}
              className={`py-2 rounded-[8px] text-xs font-mono transition-all duration-200 ${
                targetMinutes === mins
                  ? 'bg-[#4F8CFF] text-white font-semibold'
                  : 'bg-[#090909] text-[#8A8A8A] border border-[#232323] hover:text-white'
              }`}
            >
              {mins} min
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="py-6 bg-[#090909] border border-[#232323] rounded-[12px] space-y-2">
          <div className="text-5xl font-mono font-bold tracking-tight text-white">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
          <p className="text-xs text-[#8A8A8A] font-medium">
            {isRunning ? 'Focus in progress... Single task focus.' : 'Ready for deep work block.'}
          </p>

          {/* Progress Bar */}
          <div className="w-3/4 mx-auto bg-[#181818] h-1.5 rounded-full overflow-hidden mt-4 border border-[#232323]">
            <div
              className="bg-[#4F8CFF] h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Task Attachment */}
        <div className="text-left">
          <label className="block text-[11px] text-[#8A8A8A] mb-1 font-medium">
            Link to Active Task (Optional)
          </label>
          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-full bg-[#090909] border border-[#232323] rounded-[8px] p-2 text-xs text-white outline-none"
          >
            <option value="">-- Unassigned Focus Session --</option>
            {tasks
              .filter((t) => t.status !== 'completed')
              .map((t) => (
                <option key={t.id} value={t.id}>
                  [{t.priority.toUpperCase()}] {t.title}
                </option>
              ))}
          </select>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-3 pt-2">
          <button
            onClick={() => setSecondsLeft(targetMinutes * 60)}
            className="p-3 bg-[#090909] border border-[#232323] text-[#8A8A8A] hover:text-white rounded-[8px] transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-3 font-semibold text-xs rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
              isRunning
                ? 'bg-[#F59E0B] text-black hover:bg-[#D97706]'
                : 'bg-[#4F8CFF] text-white hover:bg-[#3B7BFF]'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause Session</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Start Session</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setIsFocusTimerOpen(false);
            }}
            className="p-3 bg-[#090909] border border-[#232323] text-[#16C784] hover:bg-[#16C784]/10 rounded-[8px] transition-colors"
            title="Mark Session Completed"
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { RoadmapTopic } from '@/types';
import {
  BookOpen,
  Code2,
  ShieldAlert,
  GraduationCap,
  DollarSign,
  Moon,
  MessageSquare,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';

export const LearningView: React.FC = () => {
  const { roadmaps, toggleLesson } = useApp();
  const [activeCategory, setActiveCategory] = useState<
    'All' | 'Programming' | 'Cybersecurity' | 'SAT' | 'Finance' | 'Islam' | 'Soft Skills'
  >('All');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(roadmaps[0]?.id || null);

  const categories = [
    { name: 'All', icon: BookOpen },
    { name: 'Programming', icon: Code2 },
    { name: 'Cybersecurity', icon: ShieldAlert },
    { name: 'SAT', icon: GraduationCap },
    { name: 'Finance', icon: DollarSign },
    { name: 'Islam', icon: Moon },
    { name: 'Soft Skills', icon: MessageSquare },
  ] as const;

  const filteredRoadmaps =
    activeCategory === 'All'
      ? roadmaps
      : roadmaps.filter((r) => r.category === activeCategory);

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4 pb-20">
      {/* Category Pills Slider */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name as any)}
              className={`px-3 py-2 rounded-[12px] text-xs font-semibold flex items-center space-x-1.5 transition-all duration-180 whitespace-nowrap ${
                isActive
                  ? 'bg-[#181818] text-white border border-[#4F8CFF]'
                  : 'bg-[#111111] text-[#8B8B8B] border border-[#222222] hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4F8CFF]' : 'text-[#8B8B8B]'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Roadmaps List */}
      <div className="space-y-3">
        {filteredRoadmaps.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          const hoursRemaining = topic.lessons
            .filter((l) => !l.completed)
            .reduce((acc, l) => acc + l.estimatedHours, 0);

          return (
            <div
              key={topic.id}
              className="bg-[#111111] border border-[#222222] rounded-[18px] overflow-hidden transition-all duration-180"
            >
              <div
                onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#161616] transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-[12px] bg-[#090909] border border-[#222222] flex items-center justify-center text-white font-mono font-bold text-xs">
                    {topic.completionPercentage}%
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#181818] border border-[#222222] text-[#4F8CFF] rounded-[6px]">
                        {topic.category}
                      </span>
                      <span className="text-[9px] font-mono text-[#8B8B8B]">
                        {hoursRemaining}h left
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-white mt-1">{topic.title}</h3>
                  </div>
                </div>

                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#8B8B8B]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#8B8B8B]" />
                )}
              </div>

              {isExpanded && (
                <div className="border-t border-[#222222] p-4 bg-[#090909] space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Lessons & Modules ({topic.lessons.filter((l) => l.completed).length} /{' '}
                      {topic.lessons.length})
                    </h4>

                    {topic.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => toggleLesson(topic.id, lesson.id)}
                        className="p-3 bg-[#111111] hover:bg-[#161616] border border-[#222222] rounded-[12px] flex items-center justify-between text-xs cursor-pointer"
                      >
                        <div className="flex items-center space-x-2.5">
                          <input
                            type="checkbox"
                            checked={lesson.completed}
                            onChange={() => {}}
                            className="accent-[#22C55E] w-4 h-4 rounded cursor-pointer"
                          />
                          <span
                            className={`font-semibold ${
                              lesson.completed
                                ? 'line-through text-[#525252]'
                                : 'text-white'
                            }`}
                          >
                            {lesson.title}
                          </span>
                        </div>

                        <span className="text-[9px] font-mono text-[#8B8B8B]">
                          {lesson.estimatedHours}h
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

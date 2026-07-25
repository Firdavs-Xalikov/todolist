'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FolderGit2, ExternalLink, Github, Activity, Layers, CheckCircle2, Clock } from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'p1');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Project Tabs */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-4 flex items-center space-x-2 overflow-x-auto no-scrollbar">
        {projects.map((proj) => {
          const isActive = proj.id === selectedProjectId;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-4 py-2 rounded-[8px] text-xs font-semibold flex items-center space-x-2 transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-[#181818] text-white border border-[#232323]'
                  : 'text-[#8A8A8A] hover:text-white hover:bg-[#161616]'
              }`}
            >
              <FolderGit2 className={`w-3.5 h-3.5 ${isActive ? 'text-[#4F8CFF]' : 'text-[#8A8A8A]'}`} />
              <span>{proj.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#090909] text-[#8A8A8A]">
                {proj.progress}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Project Full Architecture Card */}
      <div className="bg-[#111111] border border-[#232323] rounded-[12px] p-6 space-y-6">
        {/* Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232323] pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-white tracking-tight">{selectedProject.name}</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16C784]/10 text-[#16C784] border border-[#16C784]/20 uppercase">
                {selectedProject.status}
              </span>
            </div>
            <p className="text-xs text-[#8A8A8A] font-medium">{selectedProject.tagline}</p>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {selectedProject.repoUrl && (
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#090909] hover:bg-[#181818] border border-[#232323] text-white rounded-[8px] flex items-center space-x-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
            {selectedProject.deployUrl && (
              <a
                href={selectedProject.deployUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-[#4F8CFF] hover:bg-[#3B7BFF] text-white font-medium rounded-[8px] flex items-center space-x-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Vercel Deployment</span>
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
          <span className="text-[10px] font-mono text-[#8A8A8A] uppercase font-semibold">
            Tech Stack:
          </span>
          {selectedProject.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 bg-[#090909] border border-[#232323] text-[11px] font-mono text-[#4F8CFF] rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 2-Column Overview & Roadmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overview & Design Specs */}
          <div className="space-y-4">
            <div className="bg-[#090909] border border-[#232323] rounded-[12px] p-4 space-y-2">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                System Overview
              </h4>
              <p className="text-xs text-[#8A8A8A] leading-relaxed">
                {selectedProject.overview}
              </p>
            </div>

            <div className="bg-[#090909] border border-[#232323] rounded-[12px] p-4 space-y-2">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Design & Architecture Notes
              </h4>
              <p className="text-xs text-[#8A8A8A] leading-relaxed">
                {selectedProject.notes}
              </p>
            </div>

            {/* Vercel Style Deployment Analytics Status */}
            <div className="bg-[#090909] border border-[#232323] rounded-[12px] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  Deployment Analytics Status
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16C784]/10 text-[#16C784] border border-[#16C784]/20">
                  Vercel Edge Network: Healthy
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-[#111111] border border-[#232323] rounded-[8px]">
                  <p className="text-[10px] text-[#8A8A8A]">TTFB</p>
                  <p className="font-mono text-white font-semibold">18ms</p>
                </div>
                <div className="p-2 bg-[#111111] border border-[#232323] rounded-[8px]">
                  <p className="text-[10px] text-[#8A8A8A]">Lighthouse Score</p>
                  <p className="font-mono text-[#16C784] font-semibold">99 / 100</p>
                </div>
                <div className="p-2 bg-[#111111] border border-[#232323] rounded-[8px]">
                  <p className="text-[10px] text-[#8A8A8A]">Build Time</p>
                  <p className="font-mono text-white font-semibold">32s</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Roadmap & Action Tasks */}
          <div className="space-y-4">
            <div className="bg-[#090909] border border-[#232323] rounded-[12px] p-4 space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Release Roadmap
              </h4>
              <div className="space-y-2">
                {selectedProject.roadmap.map((phase, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#111111] border border-[#232323] rounded-[8px] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-[#181818] border border-[#232323] text-[#4F8CFF] rounded">
                        {phase.phase}
                      </span>
                      <span className="text-white font-medium">{phase.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#16C784] capitalize">
                      {phase.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Tasks */}
            <div className="bg-[#090909] border border-[#232323] rounded-[12px] p-4 space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Active Project Tasks ({selectedProject.tasks.length})
              </h4>
              {selectedProject.tasks.length > 0 ? (
                <div className="space-y-2">
                  {selectedProject.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 bg-[#111111] border border-[#232323] rounded-[8px] flex items-center justify-between text-xs"
                    >
                      <span className="text-white font-medium">{task.title}</span>
                      <span className="text-[10px] font-mono text-[#F59E0B]">
                        {task.estimatedMinutes}m • {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#8A8A8A]">No pending tasks for this repository.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

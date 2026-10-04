import React, { useEffect } from 'react';
import { X, CheckCircle, Radio, Satellite, Volume2, Monitor, ArrowRight, ExternalLink } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';

export default function ProjectModal({ project, isOpen, onClose, theme = 'dark' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 dark:bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="w-full max-w-5xl bg-white dark:bg-[#090d18] border border-slate-200 dark:border-cyan-500/40 rounded-2xl shadow-2xl dark:shadow-[0_0_80px_rgba(0,240,255,0.2)] overflow-hidden my-auto relative transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="bg-slate-100 dark:bg-[#0e1424] px-6 py-4 border-b border-slate-200 dark:border-cyan-500/20 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 font-mono text-xs font-bold">
              {project.badge || "CASE STUDY"}
            </span>
            <span className="text-slate-500 dark:text-slate-400 font-mono text-xs hidden sm:inline">
              // {project.institution}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800/80 hover:bg-red-100 dark:hover:bg-red-950/80 text-slate-700 dark:text-slate-300 hover:text-red-700 dark:hover:text-red-300 border border-slate-300 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500/40 transition-colors"
            title="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[82vh] overflow-y-auto">
          {/* Main Title & Subtitle */}
          <div>
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2 font-bold">
              ACADEMIC ENGINEERING CASE STUDY
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-cyan-700 dark:text-cyan-300/90 font-mono mt-2 font-semibold">
              {project.subtitle}
            </p>
            <p className="text-slate-700 dark:text-slate-300 mt-4 leading-relaxed max-w-3xl font-sans">
              {project.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/20 text-xs font-mono text-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Embedded Interactive Architecture Diagram */}
          <div>
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-3 font-bold">
              SYSTEM ARCHITECTURE & REAL-TIME SCHEMATIC
            </div>
            <ArchitectureDiagram theme={theme} />
          </div>

          {/* 5-Step Deep Dive Engineering Breakdown */}
          {caseStudy && (
            <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-cyan-500/20">
              <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-bold">
                DETAILED ENGINEERING IMPLEMENTATION (01 TO 05)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 01 - Problem */}
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400 transition-colors shadow-sm">
                  <div className="flex items-center space-x-2 text-xs font-mono text-red-600 dark:text-red-400 mb-2">
                    <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-500/30 font-bold">
                      {caseStudy.problem.step} — PROBLEM
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {caseStudy.problem.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {caseStudy.problem.content}
                  </p>
                </div>

                {/* 02 - Concept */}
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400 transition-colors shadow-sm">
                  <div className="flex items-center space-x-2 text-xs font-mono text-sky-600 dark:text-sky-400 mb-2">
                    <span className="px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-500/30 font-bold">
                      {caseStudy.concept.step} — CONCEPT
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {caseStudy.concept.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {caseStudy.concept.content}
                  </p>
                </div>

                {/* 03 - Detection */}
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400 transition-colors shadow-sm">
                  <div className="flex items-center space-x-2 text-xs font-mono text-teal-600 dark:text-teal-400 mb-2">
                    <span className="px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-500/30 font-bold">
                      {caseStudy.detection.step} — DETECTION
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {caseStudy.detection.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {caseStudy.detection.content}
                  </p>
                </div>

                {/* 04 - Feedback */}
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400 transition-colors shadow-sm">
                  <div className="flex items-center space-x-2 text-xs font-mono text-amber-600 dark:text-amber-400 mb-2">
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/30 font-bold">
                      {caseStudy.feedback.step} — FEEDBACK
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {caseStudy.feedback.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {caseStudy.feedback.content}
                  </p>
                </div>

                {/* 05 - Connectivity */}
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400 transition-colors md:col-span-2 shadow-sm">
                  <div className="flex items-center space-x-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 font-bold">
                      {caseStudy.connectivity.step} — CONNECTIVITY
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {caseStudy.connectivity.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {caseStudy.connectivity.content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Bar inside modal */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Department of Electronics and Communication Engineering • TCE Madurai
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-colors shadow-md dark:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

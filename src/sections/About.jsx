import React, { useState } from 'react';
import { triPillars, personalInfo } from '../data/portfolio';
import { Cpu, Terminal, Sparkles, Check, ArrowRight, Layers } from 'lucide-react';
import { playClickSound } from '../utils/sound';

export default function About({ theme = 'dark' }) {
  const [activePillarId, setActivePillarId] = useState('hardware');

  const handleSelectPillar = (id) => {
    playClickSound();
    setActivePillarId(id);
  };

  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 relative bg-slate-50/50 dark:bg-[#07090e] border-t border-slate-200 dark:border-cyan-500/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-2">
            // EDITORIAL ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Engineer by curiosity.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-sans">
            As an Electronics and Communication Engineering student at Thiagarajar College of Engineering, my core drive is understanding systems in their entirety — starting from physical electron transport in semiconductor crystals, moving through bare-metal firmware, up to decentralized IoT telemetry and edge intelligence.
          </p>
        </div>

        {/* The Tri-Pillar Architecture: Hardware + Software + Intelligence in Double-Bezel Enclosures */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {triPillars.map((pillar) => {
            const isSelected = activePillarId === pillar.id;
            return (
              <div
                key={pillar.id}
                onClick={() => handleSelectPillar(pillar.id)}
                className={`doppelrand-shell cursor-pointer transition-all ${
                  isSelected ? 'scale-[1.02] shadow-xl' : 'hover:scale-[1.01]'
                }`}
              >
                <div className={`doppelrand-core p-6 sm:p-8 h-full flex flex-col justify-between relative overflow-hidden ${
                  isSelected ? 'border-cyan-500/50 dark:border-cyan-400' : ''
                }`}>
                  {/* Top glow line */}
                  <div
                    className="h-1 w-full absolute top-0 left-0 transition-opacity"
                    style={{
                      backgroundColor: pillar.accent,
                      opacity: isSelected ? 1 : 0.25,
                    }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-slate-700 font-bold">
                        {pillar.badge}
                      </span>
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: pillar.accent }}
                      />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white mb-1">
                      {pillar.name}
                    </h3>
                    <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-3 font-semibold">
                      {pillar.tagline}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-sans">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Sub items */}
                  <div className="space-y-2 border-t border-slate-200 dark:border-slate-800/80 pt-4">
                    {pillar.items.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300 font-mono">
                        <span className="text-cyan-500 mt-0.5">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Holistic Tri-Layer Nexus Banner in Double-Bezel */}
        <div className="doppelrand-shell">
          <div className="doppelrand-core p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-400/30">
                <Layers className="w-8 h-8 text-cyan-500" />
              </div>
              <div>
                <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 tracking-wider">
                  CORE PHILOSOPHY & CONVERGENCE
                </div>
                <h4 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white mt-0.5">
                  Hardware + Software + Intelligence
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-sans">
                  True engineering breakthroughs emerge when low-level physical limits and high-level algorithmic logic are designed concurrently.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono text-slate-700 dark:text-cyan-300 bg-slate-100 dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-cyan-500/30 whitespace-nowrap shadow-sm">
              <span>TCE ECE '28</span>
              <span className="text-slate-400">|</span>
              <span className="font-bold">CGPA: {personalInfo.cgpa}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

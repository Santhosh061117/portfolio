import React from 'react';
import { mainProject, verifiedRepos, personalInfo } from '../data/portfolio';
import { Radio, ArrowUpRight, ExternalLink, Cpu, Compass, Layers, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '../components/Icons';

export default function Projects({ onOpenCaseStudy }) {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#07090e] border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
              // ENGINEERING CASE STUDIES & TOOLING
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Featured Engineering Work
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Real systems developed at the intersection of embedded hardware, radio frequency networks, and semiconductor device modeling.
            </p>
          </div>
          <div className="text-xs font-mono text-cyan-300 bg-slate-900 px-3.5 py-1.5 rounded-lg border border-cyan-500/30">
            FLAGSHIP CASE STUDY & OPEN REPOSITORIES
          </div>
        </div>

        {/* Flagship Project Hero Card: LoRa-Enabled Smart Bus Shelter */}
        <div
          data-cursor="project"
          onClick={() => onOpenCaseStudy(mainProject)}
          className="w-full bg-[#080d1a] border-2 border-cyan-500/40 hover:border-cyan-400 rounded-3xl p-6 sm:p-10 relative overflow-hidden transition-all duration-300 shadow-[0_0_50px_rgba(0,240,255,0.12)] hover:shadow-[0_0_70px_rgba(0,240,255,0.25)] group cursor-pointer"
        >
          {/* Background Ambient Glow & Blueprint Grid */}
          <div className="absolute inset-0 bg-circuit-grid opacity-40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Project Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500 text-black font-mono text-xs font-bold tracking-wider">
                  FLAGSHIP CASE STUDY
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 font-mono text-xs text-cyan-300">
                  {mainProject.institution}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug group-hover:text-cyan-200 transition-colors">
                  {mainProject.title}
                </h3>
                <p className="text-sm sm:text-base font-mono text-cyan-400 mt-2">
                  {mainProject.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                {mainProject.summary}
              </p>

              {/* Engineering Feature Bullets */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>LoRa Sub-GHz RF</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>GPS 1Hz Telemetry</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Voice Synthesis</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Visual Screen Matrix</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Haversine Engine</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 rounded bg-slate-900/80 border border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Mobile Internet Sync</span>
                </div>
              </div>

              {/* Click to open badge */}
              <div className="pt-2 flex items-center space-x-2 text-cyan-400 font-mono text-xs font-bold group-hover:translate-x-1 transition-transform">
                <span>VIEW COMPLETE 5-STAGE CASE STUDY & SCHEMATIC</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Visual Schematic Preview Graphic on Right */}
            <div className="lg:col-span-5 bg-[#050811] border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-[10px] font-mono text-cyan-400 uppercase">
                  TELEMETRY PIPELINE SNAPSHOT
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="py-6 space-y-3 font-mono text-xs">
                <div className="p-2.5 rounded bg-slate-900/90 border border-cyan-500/20 text-slate-300 flex items-center justify-between">
                  <span>BUS [GPS + LoRa TX]</span>
                  <span className="text-cyan-400">868 MHz</span>
                </div>
                <div className="text-center text-cyan-500 font-bold text-xs">↓ RF PROPAGATION ↓</div>
                <div className="p-2.5 rounded bg-slate-900/90 border border-cyan-500/20 text-slate-300 flex items-center justify-between">
                  <span>SHELTER [LoRa RX]</span>
                  <span className="text-emerald-400">PROXIMITY: ACTIVE</span>
                </div>
                <div className="text-center text-cyan-500 font-bold text-xs">↓ TRIGGER ↓</div>
                <div className="p-2.5 rounded bg-cyan-950/60 border border-cyan-400 text-cyan-200 flex items-center justify-between">
                  <span>VOICE ALERT + SCREEN</span>
                  <span className="text-xs bg-cyan-500 text-black font-bold px-1.5 py-0.5 rounded">
                    GUIDANCE
                  </span>
                </div>
              </div>

              <div className="text-center pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                Click anywhere to launch interactive simulation
              </div>
            </div>
          </div>
        </div>

        {/* Verified Additional Repositories & Tools from Santhosh061117 */}
        <div>
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-4">
            // VERIFIED OPEN RESEARCH & TOOLING REPOSITORIES
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verifiedRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-[#080d1a] border border-cyan-500/20 hover:border-cyan-400 transition-all group flex flex-col justify-between hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      {repo.language}
                    </span>
                    <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold font-mono text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{repo.name}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {repo.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

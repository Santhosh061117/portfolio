import React from 'react';
import { ArrowDown, ExternalLink, Terminal, Cpu, Sparkles, Radio, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { personalInfo } from '../data/portfolio';
import SiliconCanvas from '../components/SiliconCanvas';
import { playClickSound } from '../utils/sound';

export default function Hero({ onOpenTerminal, theme = 'dark' }) {
  const scrollToProjects = () => {
    playClickSound();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    playClickSound();
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isDark = theme === 'dark';

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-circuit-grid">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Big Typography, Bio, CTA */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Engineering Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/90 border border-slate-300 dark:border-cyan-500/30 text-xs font-mono text-slate-800 dark:text-cyan-300 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide">B.E. ECE • THIAGARAJAR COLLEGE OF ENGINEERING</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 dark:text-slate-400">2024–2028</span>
          </div>

          {/* Large Hero Display Heading - Maximum 2-3 lines across wide container */}
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 tracking-widest uppercase">
              // HARDWARE + SOFTWARE + INTELLIGENCE
            </div>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              SANTHOSH R
            </h1>
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-sky-600 to-slate-800 dark:from-cyan-300 dark:via-sky-200 dark:to-slate-300 leading-snug max-w-3xl">
              Building at the intersection of Silicon, Software & Intelligence.
            </h2>
          </div>

          {/* Supporting Text strictly adhering to resume */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-sans font-normal">
            B.E. Electronics and Communication Engineering student exploring embedded systems, semiconductor design, FPGA, IoT, software and Edge AI.
          </p>

          {/* Button-in-Button Interactive CTA Buttons */}
          <div className="pt-2 flex flex-wrap gap-3.5 items-center">
            {/* Primary Action Button */}
            <button
              onClick={scrollToProjects}
              className="group relative inline-flex items-center pl-6 pr-2 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm font-mono tracking-wide transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] active:scale-95"
            >
              <span className="mr-3">EXPLORE MY WORK</span>
              <span className="w-8 h-8 rounded-full bg-black/15 flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
                <ArrowDown className="w-4 h-4 text-black" />
              </span>
            </button>

            {/* Secondary GitHub Button */}
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClickSound()}
              className="group relative inline-flex items-center pl-6 pr-2 py-2 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-medium text-sm font-mono tracking-wide border border-slate-300 dark:border-cyan-500/30 hover:border-cyan-400 transition-all shadow-sm active:scale-95"
            >
              <span className="mr-3">GITHUB PROFILE</span>
              <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <GithubIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </span>
            </a>

            {/* Terminal Quick Button */}
            <button
              onClick={() => {
                playClickSound();
                onOpenTerminal();
              }}
              className="group relative inline-flex items-center pl-5 pr-2 py-2 rounded-full bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-cyan-300 text-xs font-mono border border-slate-300 dark:border-slate-800 hover:border-cyan-400 transition-all"
              title="Launch interactive diagnostics terminal"
            >
              <span className="mr-2">TERMINAL</span>
              <span className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:animate-pulse" />
              </span>
            </button>
          </div>

          {/* Live Quick Hardware Telemetry Badges */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="px-2.5 py-1 rounded bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              ⚡ Sentaurus TCAD
            </span>
            <span className="px-2.5 py-1 rounded bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              🛰️ LoRa 868MHz
            </span>
            <span className="px-2.5 py-1 rounded bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              📱 Flutter
            </span>
            <span className="px-2.5 py-1 rounded bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
              ⚙️ C / C++ / Python
            </span>
            <span className="px-2.5 py-1 rounded bg-cyan-500/10 dark:bg-cyan-950/40 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-bold shadow-sm">
              CGPA: {personalInfo.cgpa}
            </span>
          </div>
        </div>

        {/* Right Column: High-Tech Semiconductor HUD + Undistorted Profile Photo in Double-Bezel Enclosure */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full max-w-md doppelrand-shell">
            <div className="doppelrand-core p-3 sm:p-4 relative">
              {/* Silicon Canvas Inside HUD */}
              <div className="w-full h-80 sm:h-96 relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#080d19] border border-slate-200 dark:border-cyan-500/30 shadow-inner">
                <SiliconCanvas className="w-full h-full" theme={theme} />

                {/* Floating Profile Badge (Undistorted Photograph from Resume) */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-md border border-slate-200 dark:border-cyan-500/40 rounded-xl p-3 flex items-center space-x-3.5 shadow-2xl">
                  {/* Photo frame with optical alignment ticks */}
                  <div className="relative w-16 h-18 rounded-lg overflow-hidden border-2 border-cyan-500 dark:border-cyan-400 flex-shrink-0 bg-white shadow-md">
                    <img
                      src={personalInfo.avatarUrl}
                      alt="Santhosh R — Electronics and Communication Engineering Student"
                      className="w-full h-full object-cover object-top"
                      style={{ aspectRatio: '3 / 4' }}
                    />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-bl" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-tr" />
                  </div>

                  {/* Profile Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white truncate">
                        SANTHOSH R
                      </h3>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <p className="text-[11px] font-mono text-cyan-600 dark:text-cyan-300 truncate">
                      B.E. Electronics & Communication
                    </p>
                    <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1">
                      <img
                        src={personalInfo.tceLogoUrl}
                        alt="TCE Logo"
                        className="w-3.5 h-3.5 object-contain"
                      />
                      <span className="truncate">TCE Madurai • CGPA: 8.62</span>
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-950/80 px-2 py-1 rounded border border-cyan-500/30 uppercase block font-bold">
                      ONLINE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 flex flex-col items-center space-y-1 transition-colors group cursor-pointer"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase group-hover:text-cyan-500 dark:group-hover:text-cyan-300">
          SCROLL TO EXPLORE
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-cyan-500" />
      </button>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { signalStack } from '../data/portfolio';
import { Activity, Cpu, Layers, Radio, Sparkles, ChevronRight, Play, Pause } from 'lucide-react';
import { playClickSound, playTelemetrySound } from '../utils/sound';

export default function StackFlow({ theme = 'dark' }) {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const canvasRef = useRef(null);

  // Auto-advance signal through stack
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveLayerIndex((prev) => {
        const next = (prev + 1) % signalStack.length;
        playTelemetrySound();
        return next;
      });
    }, 3400);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeLayer = signalStack[activeLayerIndex];
  const isDark = theme === 'dark';

  // Dynamic Oscilloscope Waveform Renderer for the active layer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let t = 0;

    const renderWave = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Grid background
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 22) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 16) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Centerline
      ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.25)' : 'rgba(2, 132, 199, 0.35)';
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();

      // Signal Trace based on active layer
      ctx.beginPath();
      const traceColor = isDark ? '#00f0ff' : '#0284c7';
      ctx.strokeStyle = traceColor;
      ctx.lineWidth = 2.4;
      ctx.shadowColor = traceColor;
      ctx.shadowBlur = isDark ? 8 : 2;

      for (let x = 0; x < w; x++) {
        let y = cy;
        const normX = x / w;

        if (activeLayerIndex === 0 || activeLayerIndex === 1) {
          y = cy - Math.tanh(Math.sin(normX * 8 + t)) * 26 + Math.sin(normX * 20 + t * 2) * 3;
        } else if (activeLayerIndex === 2 || activeLayerIndex === 3) {
          const sq = Math.sin(normX * 16 + t * 4) > 0 ? 1 : -1;
          y = cy - sq * 22;
        } else if (activeLayerIndex === 4) {
          const bit = Math.floor((normX * 32 + t * 6) % 8);
          const val = (bit === 0 || bit === 3 || bit === 5) ? 1 : -1;
          y = cy - val * 22;
        } else if (activeLayerIndex === 5) {
          const chirpFreq = (normX * 12 + t * 2) % 4;
          y = cy - Math.sin(normX * (chirpFreq * 18 + 5)) * 24;
        } else if (activeLayerIndex === 6) {
          const burst = Math.sin(normX * 6 + t * 2) > 0.5 ? Math.sin(normX * 40 + t * 8) * 24 : 0;
          y = cy - burst;
        } else if (activeLayerIndex === 7) {
          const peak = Math.exp(-Math.pow((normX - ((t * 0.2) % 1)) * 12, 2)) * 30;
          y = cy - peak + Math.sin(normX * 15) * 3;
        } else {
          y = cy - Math.sin(normX * 6 + t * 1.5) * 16 - Math.cos(normX * 12 + t * 2) * 8;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [activeLayerIndex, isDark]);

  const handleSelectLayer = (idx) => {
    playClickSound();
    setActiveLayerIndex(idx);
    setIsAutoPlaying(false);
  };

  return (
    <div className="w-full doppelrand-shell">
      <div className="doppelrand-core p-6 sm:p-8 relative overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-cyan-500/20 dark:border-cyan-500/20 light:border-slate-200 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-500 dark:text-cyan-400 mb-1.5">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>THE 9-LAYER CONTINUUM // SILICON TO APPLICATION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Signal Flow Spectrum
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Tracing the unbroken journey of information from quantum charge transport in semiconductor crystal lattices up to human-facing applications.
            </p>
          </div>

          {/* Playback Controls & Waveform Monitor */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 dark:bg-[#04070e] p-2 rounded-xl border border-slate-300 dark:border-cyan-500/30 flex items-center space-x-3 shadow-inner">
              <div className="w-36 sm:w-44 h-12 relative overflow-hidden rounded bg-white dark:bg-black border border-slate-200 dark:border-slate-800">
                <canvas
                  ref={canvasRef}
                  width={176}
                  height={48}
                  className="w-full h-full block"
                  title="Live Waveform Telemetry"
                />
                <span className="absolute top-1 left-1.5 text-[8px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">
                  CH1 • {activeLayer.title.slice(0, 8)}
                </span>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setIsAutoPlaying(!isAutoPlaying);
                }}
                className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 transition-colors"
                title={isAutoPlaying ? "Pause Auto Flow" : "Resume Auto Flow"}
              >
                {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Main Spectrum Grid: Interactive Rail on Left, Deep Dive on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: The 9 Stack Steps */}
          <div className="lg:col-span-5 space-y-1.5">
            {signalStack.map((item, idx) => {
              const isActive = idx === activeLayerIndex;
              return (
                <button
                  key={item.layer}
                  onClick={() => handleSelectLayer(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-cyan-500/15 dark:bg-cyan-950/60 border-cyan-400 text-slate-900 dark:text-white shadow-[0_0_20px_rgba(0,240,255,0.2)] translate-x-1'
                      : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-cyan-400/50 hover:bg-slate-100 dark:hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-cyan-500 text-black' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-300'
                    }`}>
                      0{item.layer}
                    </span>
                    <div>
                      <div className={`text-xs font-bold font-mono tracking-wider ${
                        isActive ? 'text-cyan-600 dark:text-cyan-300' : 'text-slate-800 dark:text-slate-300 group-hover:text-black dark:group-hover:text-white'
                      }`}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                        {item.domain}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-cyan-500 dark:text-cyan-300 translate-x-0.5' : 'text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Layer Technical Deep-Dive Card */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-[#050811] border border-slate-200 dark:border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-5 dark:opacity-10">
              <Cpu className="w-48 h-48 text-cyan-500" />
            </div>

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-cyan-500/20">
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 dark:bg-cyan-950/80 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-bold">
                    LAYER 0{activeLayer.layer} OF 09
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700 dark:text-slate-300">{activeLayer.domain}</span>
                </div>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />
                  STAGE VERIFIED
                </span>
              </div>

              <div className="mt-6">
                <h4 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                  {activeLayer.title}
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {activeLayer.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    PHYSICAL SIGNAL / REPRESENTATION
                  </div>
                  <div className="text-xs font-mono text-cyan-700 dark:text-cyan-300 font-semibold">
                    {activeLayer.signalType}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    TOOLS & ENGINEERING STACK
                  </div>
                  <div className="text-xs font-mono text-sky-700 dark:text-sky-300 font-semibold">
                    {activeLayer.tools}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Interactive Step Progress */}
            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                {signalStack.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectLayer(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeLayerIndex
                        ? 'w-8 bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                        : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                    }`}
                    title={`Go to Layer ${i + 1}`}
                  />
                ))}
              </div>

              <span className="text-xs font-mono text-slate-500">
                Interactive Continuum Inspection
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { skillCategories } from '../data/portfolio';
import { Cpu, Code2, Smartphone, Microchip, Layers, Sparkles, Network } from 'lucide-react';

export default function SkillMatrix() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [activeSkill, setActiveSkill] = useState(null);

  // Flattened skill list with relations
  const allSkills = [
    // Programming
    { name: "C", category: "PROGRAMMING", level: "Core Foundations", badge: "SYSTEMS", related: ["Embedded Systems", "Linux Systems", "C++"], note: "Pointers, memory layout, bare-metal hardware registers, bitwise manipulation." },
    { name: "C++", category: "PROGRAMMING", level: "Core Algorithmic", badge: "HIGH PERF", related: ["C", "Digital Circuit Design", "FPGA-Based Systems"], note: "OOP paradigms, memory architecture, real-time deterministic execution." },
    { name: "Python", category: "PROGRAMMING", level: "Proficient", badge: "DATA & AI", related: ["Machine Learning", "Edge AI", "Synopsys Sentaurus TCAD"], note: "Automation, numerical computation, model prototyping, and EDA tooling scripts." },
    { name: "Java", category: "PROGRAMMING", level: "Foundational", badge: "OOP", related: ["C++", "Application Development"], note: "Object-oriented software principles, robust multi-threading, design patterns." },

    // App Dev
    { name: "Flutter", category: "APP DEV", level: "Active Builder", badge: "CROSS-PLATFORM", related: ["IoT", "Networking", "Cloud Systems"], note: "Single-codebase mobile UI, reactive states, real-time telemetry dashboards." },

    // Semiconductor
    { name: "Synopsys Sentaurus TCAD", category: "SEMICONDUCTOR", level: "Specialized Simulation", badge: "SILICON TCAD", related: ["Transistor Design", "Digital Circuit Design"], note: "SDE Scheme scripting, boundary meshing, SDevice transport models, I-V/C-V simulation." },

    // Engineering Interests
    { name: "Transistor Design", category: "INTERESTS", level: "Active Exploration", badge: "DEVICE PHYSICS", related: ["Synopsys Sentaurus TCAD", "Digital Circuit Design"], note: "Sub-nanometer architectures, GAA nanosheets, FinFET, and Forksheet CMOS." },
    { name: "FPGA-Based Systems", category: "INTERESTS", level: "Active Exploration", badge: "RTL SYNTHESIS", related: ["Digital Circuit Design", "C++"], note: "Hardware description, RTL logic synthesis, lookup tables, and timing closure." },
    { name: "Embedded Systems", category: "INTERESTS", level: "Hands-on Projects", badge: "FIRMWARE", related: ["C", "IoT", "Linux Systems"], note: "Microcontroller architecture, peripheral buses (SPI/I2C/UART), interrupt vectors." },
    { name: "IoT", category: "INTERESTS", level: "Project Proven", badge: "WIRELESS SENSORS", related: ["LoRa", "Embedded Systems", "Flutter", "Networking"], note: "Autonomous sub-GHz radio links, GPS tracking, low-power remote sensors." },
    { name: "Digital Circuit Design", category: "INTERESTS", level: "Academic Core", badge: "CIRCUITS", related: ["FPGA-Based Systems", "Transistor Design"], note: "Boolean logic minimization, sequential circuits, flip-flops, state machines." },
    { name: "Linux Systems", category: "INTERESTS", level: "Daily Driver", badge: "POSIX OS", related: ["C", "Embedded Systems", "Networking"], note: "Shell scripting, GCC/GDB cross-compilation, process pipes, hardware drivers." },
    { name: "Networking", category: "INTERESTS", level: "Exploration", badge: "TELEMETRY", related: ["IoT", "Cloud Systems", "Linux Systems"], note: "OSI stack layers, radio propagation, TCP/IP sockets, packet telemetry." },
    { name: "Edge AI", category: "INTERESTS", level: "Active Exploration", badge: "TINYML", related: ["Machine Learning", "Python", "Embedded Systems"], note: "Quantized neural networks running directly on microcontrollers with zero cloud dependency." },
    { name: "Machine Learning", category: "INTERESTS", level: "Active Exploration", badge: "INTELLIGENCE", related: ["Edge AI", "Python"], note: "Pattern classification, regression, sensor signal processing, scikit-learn models." },
    { name: "Cloud Systems", category: "INTERESTS", level: "Exploration", badge: "TELEMETRY CLOUD", related: ["IoT", "Networking", "Flutter"], note: "Time-series telemetry endpoints, API integrations, remote telemetry sync." }
  ];

  const filterOptions = [
    { id: 'ALL', label: 'All Technologies' },
    { id: 'PROGRAMMING', label: 'Programming' },
    { id: 'SEMICONDUCTOR', label: 'Semiconductor / TCAD' },
    { id: 'APP DEV', label: 'App Development' },
    { id: 'INTERESTS', label: 'Engineering Interests' },
  ];

  const filteredSkills = selectedFilter === 'ALL'
    ? allSkills
    : allSkills.filter(s => s.category === selectedFilter);

  // Check if a skill is related to the hovered skill
  const isRelated = (skillName) => {
    if (!activeSkill) return false;
    if (activeSkill.name === skillName) return true;
    return activeSkill.related?.includes(skillName);
  };

  return (
    <div className="w-full bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-cyan-500/25 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-colors duration-300">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Controls & Category Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-cyan-500/20">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-1">
            <Network className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>INTERACTIVE TECHNICAL TOPOLOGY // SKILL CONSTELLATION</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Technical Constellation & Engineering Stack
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Hover or select any technology to observe interconnected hardware, firmware, and intelligence domains.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-300 dark:border-cyan-500/30">
          {filterOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedFilter === f.id
                  ? 'bg-cyan-500 text-black font-bold shadow-md dark:shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredSkills.map((skill) => {
          const highlighted = isRelated(skill.name);
          const isCurrent = activeSkill?.name === skill.name;

          return (
            <div
              key={skill.name}
              onMouseEnter={() => setActiveSkill(skill)}
              onClick={() => setActiveSkill(skill)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                isCurrent
                  ? 'bg-cyan-50 dark:bg-cyan-950/70 border-cyan-500 dark:border-cyan-400 shadow-md dark:shadow-[0_0_25px_rgba(0,240,255,0.3)] scale-[1.02] z-10'
                  : highlighted
                  ? 'bg-cyan-50/50 dark:bg-slate-900/90 border-cyan-400/80 dark:border-cyan-500/60 shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                  : 'bg-slate-50/80 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/80 hover:border-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900/80'
              }`}
            >
              {/* Subtle top indicator bar */}
              <div className={`h-1 w-full absolute top-0 left-0 transition-colors ${
                isCurrent ? 'bg-cyan-500' : highlighted ? 'bg-cyan-400/60' : 'bg-transparent'
              }`} />

              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isCurrent
                    ? 'bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border-cyan-400/40'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                }`}>
                  {skill.badge}
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  {skill.level}
                </span>
              </div>

              <h4 className={`text-base font-bold font-mono transition-colors ${
                isCurrent
                  ? 'text-slate-900 dark:text-white'
                  : highlighted
                  ? 'text-cyan-700 dark:text-cyan-300'
                  : 'text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white'
              }`}>
                {skill.name}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {skill.note}
              </p>

              {/* Connected node badges */}
              {isCurrent && skill.related && skill.related.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-cyan-500/20">
                  <div className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400 uppercase mb-1 font-bold">
                    INTERCONNECTED WITH:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {skill.related.map((rel) => (
                      <span key={rel} className="text-[10px] font-mono bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-300 dark:border-cyan-500/30">
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic Skill Inspection Bar */}
      {activeSkill && (
        <div className="mt-8 p-4 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-300 dark:border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-600 dark:text-cyan-400">
                <span>ACTIVE INSPECTION: {activeSkill.name}</span>
                <span>•</span>
                <span className="text-slate-500 dark:text-slate-400">{activeSkill.category}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-0.5">
                {activeSkill.note}
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap bg-white dark:bg-black/40 px-3 py-1.5 rounded border border-slate-300 dark:border-cyan-500/20">
            Proficiency: <strong className="text-cyan-700 dark:text-cyan-300">{activeSkill.level}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

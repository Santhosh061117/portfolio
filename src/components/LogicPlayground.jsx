import React, { useState } from 'react';
import { Cpu, Zap, Play, CheckCircle2, Sliders, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';
import { playSwitchSound, playClickSound } from '../utils/sound';

export default function LogicPlayground({ theme = 'dark' }) {
  const [selectedGate, setSelectedGate] = useState('NAND');
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(1);

  // Gates definitions with truth tables and CMOS transistor topologies
  const gates = {
    AND: {
      name: "AND Gate",
      equation: "Q = A · B",
      transistors: "6 Transistors (NAND + Inverter)",
      propagation: "t_pd ≈ 18 ps (45nm CMOS)",
      cmosPUN: "2 PMOS in parallel with inverter buffer",
      cmosPDN: "2 NMOS in series with inverter buffer",
      evaluate: (a, b) => (a && b ? 1 : 0),
      explanation: "Output is HIGH only when both Input A and Input B are simultaneously at Logic 1.",
    },
    NAND: {
      name: "NAND Gate (Universal)",
      equation: "Q = (A · B)'",
      transistors: "4 Transistors (2 PMOS + 2 NMOS)",
      propagation: "t_pd ≈ 12 ps (Fastest Native CMOS)",
      cmosPUN: "2 PMOS in parallel to VDD (Either input LOW pulls Q to VDD)",
      cmosPDN: "2 NMOS in series to GND (Both inputs HIGH pull Q to GND)",
      evaluate: (a, b) => (!(a && b) ? 1 : 0),
      explanation: "Natural fundamental CMOS logic building block. Inverts the logical product of inputs.",
    },
    OR: {
      name: "OR Gate",
      equation: "Q = A + B",
      transistors: "6 Transistors (NOR + Inverter)",
      propagation: "t_pd ≈ 20 ps (45nm CMOS)",
      cmosPUN: "2 PMOS in series with inverter buffer",
      cmosPDN: "2 NMOS in parallel with inverter buffer",
      evaluate: (a, b) => (a || b ? 1 : 0),
      explanation: "Output is HIGH if at least one input is Logic 1. Output is LOW only when both are 0.",
    },
    NOR: {
      name: "NOR Gate (Universal)",
      equation: "Q = (A + B)'",
      transistors: "4 Transistors (2 PMOS + 2 NMOS)",
      propagation: "t_pd ≈ 15 ps (Native CMOS)",
      cmosPUN: "2 PMOS in series to VDD (Both inputs must be 0 to pull up)",
      cmosPDN: "2 NMOS in parallel to GND (Either input 1 pulls down)",
      evaluate: (a, b) => (!(a || b) ? 1 : 0),
      explanation: "Universal logic gate. Output is HIGH only when all inputs are simultaneously Logic 0.",
    },
    XOR: {
      name: "XOR Gate (Exclusive OR)",
      equation: "Q = A ⊕ B = A'B + AB'",
      transistors: "8 to 12 Transistors (Transmission Gate)",
      propagation: "t_pd ≈ 24 ps (Arithmetic Core)",
      cmosPUN: "Complementary transmission pass-gate network",
      cmosPDN: "Dual-rail steer logic with cross-coupled inverters",
      evaluate: (a, b) => (a !== b ? 1 : 0),
      explanation: "Modulo-2 addition. Fundamental component of Full Adders, parity checkers, and ALUs.",
    },
    XNOR: {
      name: "XNOR Gate (Equivalence)",
      equation: "Q = (A ⊕ B)' = AB + A'B'",
      transistors: "8 to 12 Transistors",
      propagation: "t_pd ≈ 24 ps (Comparator Core)",
      cmosPUN: "Complementary transmission network",
      cmosPDN: "Dual-rail steer logic",
      evaluate: (a, b) => (a === b ? 1 : 0),
      explanation: "Digital equality comparator. Output is HIGH whenever both inputs share the identical logic state.",
    },
  };

  const currentGate = gates[selectedGate];
  const outputQ = currentGate.evaluate(inputA, inputB);

  const toggleInputA = () => {
    playSwitchSound(inputA === 0 ? 'up' : 'down');
    setInputA(inputA === 0 ? 1 : 0);
  };

  const toggleInputB = () => {
    playSwitchSound(inputB === 0 ? 'up' : 'down');
    setInputB(inputB === 0 ? 1 : 0);
  };

  const handleSelectGate = (gateKey) => {
    playClickSound();
    setSelectedGate(gateKey);
  };

  const truthTableCombinations = [
    { a: 0, b: 0 },
    { a: 0, b: 1 },
    { a: 1, b: 0 },
    { a: 1, b: 1 },
  ];

  return (
    <div className="w-full doppelrand-shell">
      <div className="doppelrand-core p-6 sm:p-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-cyan-500/20 dark:border-cyan-500/20 light:border-slate-200 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-500 dark:text-cyan-400 mb-1">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>DIGITAL CIRCUIT DESIGN // CMOS TRANSISTOR SANDBOX</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Interactive Logic Gate & Silicon Physics
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Toggle input bits A and B to observe the real-time CMOS transistor conduction states, gate delays, and truth tables.
            </p>
          </div>

          {/* Gate Selector Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-900/90 rounded-xl border border-slate-300 dark:border-cyan-500/30">
            {Object.keys(gates).map((g) => (
              <button
                key={g}
                onClick={() => handleSelectGate(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  selectedGate === g
                    ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Interactive Schematic on Left, Truth Table & Physics on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Circuit Schematic & Toggle Switches */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#050811] border border-slate-200 dark:border-slate-800 relative">
              {/* Dynamic SVG Schematic */}
              <div className="w-full h-48 sm:h-56 relative flex items-center justify-center">
                <svg viewBox="0 0 400 180" className="w-full h-full max-w-md select-none">
                  {/* Input A Line */}
                  <line
                    x1="40"
                    y1="60"
                    x2="160"
                    y2="60"
                    stroke={inputA ? '#00f0ff' : '#64748b'}
                    strokeWidth={inputA ? '3' : '2'}
                    className="transition-colors duration-200"
                  />
                  {inputA === 1 && (
                    <circle cx="100" cy="60" r="3" fill="#00f0ff" className="animate-ping" />
                  )}

                  {/* Input B Line */}
                  <line
                    x1="40"
                    y1="120"
                    x2="160"
                    y2="120"
                    stroke={inputB ? '#00f0ff' : '#64748b'}
                    strokeWidth={inputB ? '3' : '2'}
                    className="transition-colors duration-200"
                  />
                  {inputB === 1 && (
                    <circle cx="100" cy="120" r="3" fill="#00f0ff" className="animate-ping" />
                  )}

                  {/* Gate Body based on Type */}
                  {selectedGate === 'AND' || selectedGate === 'NAND' ? (
                    // AND / NAND shape
                    <path
                      d="M160 40 L210 40 A50 50 0 0 1 210 140 L160 140 Z"
                      fill={theme === 'dark' ? '#0b101e' : '#e2e8f0'}
                      stroke={outputQ ? '#00f0ff' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                  ) : selectedGate === 'OR' || selectedGate === 'NOR' ? (
                    // OR / NOR shape
                    <path
                      d="M150 40 Q190 90 150 140 Q215 140 250 90 Q215 40 150 40 Z"
                      fill={theme === 'dark' ? '#0b101e' : '#e2e8f0'}
                      stroke={outputQ ? '#00f0ff' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                  ) : (
                    // XOR / XNOR shape
                    <g>
                      <path
                        d="M140 40 Q180 90 140 140"
                        fill="none"
                        stroke={outputQ ? '#00f0ff' : '#94a3b8'}
                        strokeWidth="2.5"
                      />
                      <path
                        d="M152 40 Q192 90 152 140 Q217 140 252 90 Q217 40 152 40 Z"
                        fill={theme === 'dark' ? '#0b101e' : '#e2e8f0'}
                        stroke={outputQ ? '#00f0ff' : '#94a3b8'}
                        strokeWidth="2.5"
                      />
                    </g>
                  )}

                  {/* Inverter Bubble for NAND, NOR, XNOR */}
                  {(selectedGate === 'NAND' || selectedGate === 'NOR' || selectedGate === 'XNOR') && (
                    <circle
                      cx={selectedGate === 'NAND' ? '265' : '255'}
                      cy="90"
                      r="5"
                      fill={theme === 'dark' ? '#050811' : '#f8fafc'}
                      stroke={outputQ ? '#00f0ff' : '#94a3b8'}
                      strokeWidth="2.5"
                    />
                  )}

                  {/* Output Line Q */}
                  <line
                    x1={
                      selectedGate === 'NAND'
                        ? '270'
                        : selectedGate === 'NOR' || selectedGate === 'XNOR'
                        ? '260'
                        : selectedGate === 'AND'
                        ? '260'
                        : '250'
                    }
                    y1="90"
                    x2="350"
                    y2="90"
                    stroke={outputQ ? '#00f0ff' : '#64748b'}
                    strokeWidth={outputQ ? '3.5' : '2'}
                    className="transition-colors duration-200"
                  />
                  {outputQ === 1 && (
                    <circle cx="310" cy="90" r="3.5" fill="#00f0ff" className="animate-ping" />
                  )}

                  {/* Labels on Diagram */}
                  <text x="15" y="65" fill={inputA ? '#00f0ff' : '#64748b'} fontSize="14" fontFamily="monospace" fontWeight="bold">
                    A={inputA}
                  </text>
                  <text x="15" y="125" fill={inputB ? '#00f0ff' : '#64748b'} fontSize="14" fontFamily="monospace" fontWeight="bold">
                    B={inputB}
                  </text>
                  <text x="360" y="95" fill={outputQ ? '#00f0ff' : '#64748b'} fontSize="16" fontFamily="monospace" fontWeight="bold">
                    Q={outputQ}
                  </text>
                </svg>
              </div>

              {/* Interactive Input Toggle Controls */}
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={toggleInputA}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    inputA === 1
                      ? 'bg-cyan-500/10 border-cyan-400 text-cyan-600 dark:text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="text-left font-mono">
                    <span className="text-[10px] text-slate-400 uppercase block">TOGGLE PIN</span>
                    <span className="font-bold text-sm">INPUT A</span>
                  </div>
                  <span className={`text-sm font-mono font-extrabold px-2.5 py-1 rounded ${
                    inputA === 1 ? 'bg-cyan-500 text-black' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    LOGIC {inputA}
                  </span>
                </button>

                <button
                  onClick={toggleInputB}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    inputB === 1
                      ? 'bg-cyan-500/10 border-cyan-400 text-cyan-600 dark:text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="text-left font-mono">
                    <span className="text-[10px] text-slate-400 uppercase block">TOGGLE PIN</span>
                    <span className="font-bold text-sm">INPUT B</span>
                  </div>
                  <span className={`text-sm font-mono font-extrabold px-2.5 py-1 rounded ${
                    inputB === 1 ? 'bg-cyan-500 text-black' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    LOGIC {inputB}
                  </span>
                </button>
              </div>
            </div>

            {/* Explanation Quote */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              <strong className="text-slate-900 dark:text-white font-semibold">Circuit Behavior: </strong>
              {currentGate.explanation}
            </p>
          </div>

          {/* Right: Real-Time Truth Table & Silicon Physical Specs */}
          <div className="lg:col-span-5 space-y-4">
            {/* Truth Table */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#050811] border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
                <span className="text-cyan-500 dark:text-cyan-400 font-bold">{currentGate.name} TRUTH TABLE</span>
                <span className="text-slate-500">{currentGate.equation}</span>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <div className="grid grid-cols-3 text-slate-400 font-semibold px-3 py-1 bg-slate-200/50 dark:bg-slate-900/80 rounded">
                  <span>INPUT A</span>
                  <span>INPUT B</span>
                  <span className="text-right">OUTPUT Q</span>
                </div>

                {truthTableCombinations.map((row, idx) => {
                  const isActive = row.a === inputA && row.b === inputB;
                  const res = currentGate.evaluate(row.a, row.b);
                  return (
                    <div
                      key={idx}
                      className={`grid grid-cols-3 px-3 py-1.5 rounded transition-all ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-bold border border-cyan-400/40 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850'
                      }`}
                    >
                      <span>{row.a}</span>
                      <span>{row.b}</span>
                      <span className="text-right font-bold">{res}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CMOS Silicon Device Topologies */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#050811] border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">CMOS COMPLEXITY & DELAY</div>
                <div className="text-slate-900 dark:text-white font-semibold mt-0.5">{currentGate.transistors}</div>
                <div className="text-cyan-600 dark:text-cyan-400 text-[11px] mt-0.5">{currentGate.propagation}</div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
                <div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">PULL-UP NETWORK (PMOS): </span>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">{currentGate.cmosPUN}</span>
                </div>
                <div>
                  <span className="text-sky-600 dark:text-sky-400 font-bold text-[11px]">PULL-DOWN NETWORK (NMOS): </span>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px]">{currentGate.cmosPDN}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

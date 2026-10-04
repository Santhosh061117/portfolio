import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Cpu, CornerDownLeft, Sun, Moon } from 'lucide-react';
import { personalInfo, signalStack, mainProject } from '../data/portfolio';
import { playClickSound, playSwitchSound, isAudioEnabled, setAudioEnabled } from '../utils/sound';

export default function EasterEggTerminal({ isOpen, onClose, theme = 'dark', onToggleTheme }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: 'santhosh@silicon-lab:~$ sysinfo --init' },
    { type: 'output', text: '>> INITIALIZING SILICON & EMBEDDED STACK...' },
    { type: 'success', text: '[✓] Device Physics: Synopsys Sentaurus TCAD Active' },
    { type: 'success', text: '[✓] Hardware Logic: FPGA & Digital Circuit Design Active' },
    { type: 'success', text: '[✓] Firmware: C / C++ / Linux Toolchains Ready' },
    { type: 'success', text: '[✓] Wireless Telemetry: LoRa 868MHz + GPS Link Synchronized' },
    { type: 'success', text: '[✓] Edge AI: TinyML Quantized Inference Online' },
    { type: 'highlight', text: '>> CORE STATUS: ONLINE | CURIOSITY: UNLIMITED' },
    { type: 'muted', text: "Type 'help' for available system commands or 'exit' to close." },
  ]);

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      playClickSound();
      const cmd = inputVal.trim().toLowerCase();
      if (!cmd) return;

      const newHistory = [...history, { type: 'prompt', text: `santhosh@silicon-lab:~$ ${inputVal}` }];
      setCommandHistory((prev) => [...prev, inputVal]);
      setHistoryIndex(-1);

      switch (cmd) {
        case 'help':
          newHistory.push({
            type: 'output',
            text: `Available system commands:
  • status    - Display academic standing, CGPA & institution
  • stack     - Print the 9-layer Silicon-to-Application continuum
  • project   - Inspect LoRa Smart Bus Shelter architecture
  • skills    - Display primary programming & TCAD simulation tools
  • theme     - Toggle between Dark and Light mode
  • audio     - Toggle sound feedback (on/off)
  • contact   - View verified direct communication channels
  • clear     - Clear terminal buffer
  • exit      - Close this terminal panel`,
          });
          break;

        case 'theme':
          if (onToggleTheme) onToggleTheme();
          playSwitchSound();
          newHistory.push({
            type: 'highlight',
            text: `>> THEME SWITCHED: Current theme is now ${theme === 'dark' ? 'LIGHT' : 'DARK'}`,
          });
          break;

        case 'audio':
          const currentAudio = isAudioEnabled();
          setAudioEnabled(!currentAudio);
          newHistory.push({
            type: 'highlight',
            text: `>> AUDIO FEEDBACK: ${!currentAudio ? 'ENABLED' : 'MUTED'}`,
          });
          break;

        case 'status':
          newHistory.push({
            type: 'success',
            text: `ENGINEERING IDENTITY:
  Student: ${personalInfo.name}
  Degree: ${personalInfo.degree}
  Institution: ${personalInfo.college}, ${personalInfo.collegeLocation}
  Period: ${personalInfo.academicPeriod}
  Current CGPA: ${personalInfo.cgpa}
  Focus: Electronics + Embedded Systems + Semiconductor + Software + AI`,
          });
          break;

        case 'stack':
          newHistory.push({
            type: 'output',
            text: `SIGNAL FLOW CONTINUUM:
` + signalStack.map((s) => `  [L${s.layer}] ${s.title.padEnd(16)} -> ${s.domain} (${s.tools})`).join('\n'),
          });
          break;

        case 'project':
          newHistory.push({
            type: 'highlight',
            text: `FLAGSHIP PROJECT:
  Name: ${mainProject.title}
  Architecture: Bus (GPS + LoRa) -> Smart Shelter -> Distance Engine -> Voice & Display Guidance
  Zero Cellular Dependency: Peer-to-peer Sub-GHz telemetry
  Verified Status: Full Case Study Loaded.`,
          });
          break;

        case 'skills':
          newHistory.push({
            type: 'output',
            text: `SKILL SUMMARY:
  • Programming: C, C++, Python, Java
  • Mobile Apps: Flutter
  • Simulation: Synopsys Sentaurus TCAD
  • Exploring: FPGA, Embedded Systems, IoT, Edge AI, Linux, Digital Circuits`,
          });
          break;

        case 'contact':
          newHistory.push({
            type: 'success',
            text: `COMMUNICATION CHANNELS:
  • Email:    ${personalInfo.email}
  • Phone:    ${personalInfo.phone}
  • GitHub:   ${personalInfo.githubUrl}
  • LinkedIn: ${personalInfo.linkedinUrl}`,
          });
          break;

        case 'clear':
          setHistory([]);
          setInputVal('');
          return;

        case 'exit':
        case 'quit':
          onClose();
          return;

        default:
          newHistory.push({
            type: 'error',
            text: `Command not recognized: '${inputVal}'. Type 'help' for system manual.`,
          });
          break;
      }

      setHistory(newHistory);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#090d16] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col max-h-[85vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="bg-[#0f172a] px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <button 
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center transition-colors"
                title="Close"
              />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-3 w-[1px] bg-slate-700 mx-2" />
            <div className="flex items-center text-xs font-mono text-cyan-300">
              <Cpu className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              <span>santhosh@silicon-lab: ~ (v2.0)</span>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline text-emerald-400 text-[11px] bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              ● REPL_ONLINE
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-0.5">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 font-mono text-xs sm:text-sm text-slate-300 space-y-1.5 bg-circuit-grid-dense bg-[#07090e]">
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {item.type === 'prompt' && (
                <span className="text-cyan-300 font-semibold">{item.text}</span>
              )}
              {item.type === 'sys' && (
                <span className="text-slate-400">{item.text}</span>
              )}
              {item.type === 'output' && (
                <span className="text-slate-300">{item.text}</span>
              )}
              {item.type === 'success' && (
                <span className="text-emerald-400">{item.text}</span>
              )}
              {item.type === 'highlight' && (
                <span className="text-cyan-400 font-bold bg-cyan-950/40 px-1 py-0.5 rounded border border-cyan-500/30">
                  {item.text}
                </span>
              )}
              {item.type === 'muted' && (
                <span className="text-slate-500 italic">{item.text}</span>
              )}
              {item.type === 'error' && (
                <span className="text-red-400">{item.text}</span>
              )}
            </div>
          ))}

          {/* Prompt line */}
          <div className="flex items-center pt-2 text-cyan-300">
            <span className="font-semibold mr-2 select-none">santhosh@silicon-lab:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent outline-none border-none text-white font-mono text-xs sm:text-sm caret-cyan-400 p-0"
              autoFocus
              spellCheck="false"
              placeholder="type 'help' or command..."
            />
            <CornerDownLeft className="w-3.5 h-3.5 text-cyan-500/50 ml-1" />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Terminal Footer Quick Bar */}
        <div className="bg-[#0b101d] px-4 py-2.5 border-t border-cyan-500/20 text-[11px] font-mono text-slate-400 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5">
            <span className="text-slate-500">Quick:</span>
            {['status', 'stack', 'project', 'skills', 'theme', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInputVal(cmd);
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
                className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
          <span className="text-slate-500 hidden sm:inline">ESC or 'exit' to return</span>
        </div>
      </div>
    </div>
  );
}

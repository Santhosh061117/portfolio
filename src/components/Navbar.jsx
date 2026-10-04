import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Cpu, Mail, ExternalLink, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolio';
import { playClickSound, playSwitchSound, isAudioEnabled, setAudioEnabled } from '../utils/sound';

export default function Navbar({ onOpenTerminal, activeSection, theme, onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(true);

  useEffect(() => {
    setAudioActive(isAudioEnabled());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'spectrum', label: 'SPECTRUM' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'leadership', label: 'LEADERSHIP' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollTo = (id) => {
    playClickSound();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const next = !audioActive;
    setAudioActive(next);
    setAudioEnabled(next);
    if (next) playSwitchSound('up');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
          isScrolled ? 'pt-3' : 'pt-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Engineering Monogram Pill */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-[#0b101d]/90 backdrop-blur-md border border-slate-200 dark:border-cyan-500/30 shadow-md group text-left transition-all hover:scale-105 active:scale-95"
          >
            <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-cyan-500/50 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
              <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-display font-bold text-xs tracking-wider text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                SANTHOSH R
              </span>
              <span className="block text-[8px] font-mono text-cyan-600 dark:text-cyan-400 tracking-widest uppercase">
                B.E. ECE • TCE
              </span>
            </div>
          </button>

          {/* Desktop Floating Navigation Links Island */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 dark:border-cyan-500/25 shadow-lg">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all relative ${
                    isActive
                      ? 'text-cyan-700 dark:text-cyan-300 font-bold bg-cyan-500/15 dark:bg-cyan-950/80 border border-cyan-400/40 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-cyan-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar: Theme Switcher + Sound Toggle + Terminal + GitHub */}
          <div className="hidden sm:flex items-center space-x-2">
            {/* Audio Feedback Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-cyan-500 border border-slate-200 dark:border-cyan-500/30 transition-all shadow-sm"
              title={audioActive ? "Audio Cues: Enabled" : "Audio Cues: Muted"}
            >
              {audioActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-500" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:text-cyan-500 border border-slate-200 dark:border-cyan-500/30 transition-all shadow-sm group"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Terminal Easter Egg Trigger */}
            <button
              onClick={() => {
                playClickSound();
                onOpenTerminal();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 text-cyan-700 dark:text-cyan-300 text-xs font-mono border border-slate-200 dark:border-cyan-500/30 hover:border-cyan-400 transition-all shadow-sm group"
              title="Launch Engineering Terminal (Easter Egg)"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-500 group-hover:animate-pulse" />
              <span>TERMINAL</span>
              <span className="text-[10px] text-slate-400 ml-0.5">~</span>
            </button>

            {/* GitHub Profile Button */}
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white border border-slate-200 dark:border-slate-800 hover:border-cyan-400 transition-colors shadow-sm"
              title="Visit Santhosh061117 GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex sm:hidden items-center space-x-1.5">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
            </button>
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30"
              title="Open Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-cyan-500" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-3">
              // NAVIGATION DIRECTORY
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`w-full text-left py-3 px-4 rounded-xl font-display font-medium text-lg flex items-center justify-between transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-400/40 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-cyan-600/50 dark:text-cyan-500/50">#0{navLinks.indexOf(link) + 1}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className="pt-6 border-t border-slate-200 dark:border-cyan-500/20">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
              <span>SANTHOSH R • TCE ECE</span>
              <span className="text-emerald-500 font-bold">● LIVE</span>
            </div>
            <div className="flex space-x-3">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-center font-mono text-xs text-slate-800 dark:text-slate-300 hover:text-black dark:hover:text-white flex items-center justify-center space-x-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-center font-mono text-xs text-slate-800 dark:text-slate-300 hover:text-black dark:hover:text-white flex items-center justify-center space-x-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

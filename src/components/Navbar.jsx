import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Cpu, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolio';

export default function Navbar({ onOpenTerminal, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
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
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[#07090e]/85 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Engineering Monogram */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center space-x-2.5 group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0b101d] border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
              <Cpu className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                SANTHOSH R
              </span>
              <span className="block text-[9px] font-mono text-cyan-400 tracking-widest uppercase">
                B.E. ECE • TCE MADURAI
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-cyan-500/20">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all relative ${
                    isActive
                      ? 'text-cyan-300 font-bold bg-cyan-950/80 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar (Terminal Easter Egg Trigger + GitHub) */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenTerminal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-cyan-950/80 text-cyan-300 text-xs font-mono border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)] group"
              title="Launch Engineering Terminal (Easter Egg)"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:animate-pulse" />
              <span>TERMINAL</span>
              <span className="text-[10px] text-slate-500 group-hover:text-cyan-400 ml-1">~</span>
            </button>

            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/40 transition-colors"
              title="Visit Santhosh061117 GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg bg-cyan-950/60 text-cyan-400 border border-cyan-500/40"
              title="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#07090e]/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">
              // NAVIGATION DIRECTORY
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`w-full text-left py-3 px-4 rounded-xl font-display font-medium text-lg flex items-center justify-between transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-cyan-500/50">#0{navLinks.indexOf(link) + 1}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className="pt-6 border-t border-cyan-500/20">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
              <span>SANTHOSH R • TCE ECE</span>
              <span className="text-emerald-400">● LIVE</span>
            </div>
            <div className="flex space-x-3">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono text-xs text-slate-300 hover:text-white flex items-center justify-center space-x-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB</span>
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono text-xs text-slate-300 hover:text-white flex items-center justify-center space-x-1.5"
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

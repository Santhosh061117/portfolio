import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, MapPin, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in IST (Asia/Kolkata)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#05070c] border-t border-cyan-500/20 pt-16 pb-12 relative overflow-hidden text-slate-400">
      {/* Subtle background ambient circuit line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80">
          {/* Identity Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-slate-900 border border-cyan-500/40 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wider">
                SANTHOSH R
              </span>
            </div>

            <p className="text-sm text-cyan-300 font-mono">
              Electronics & Communication Engineering
            </p>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-sans">
              "Building at the intersection of hardware, software and intelligence."
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Thiagarajar College of Engineering • Madurai, India</span>
            </div>
          </div>

          {/* Quick Telemetry & Local Time Column */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              TELEMETRY & STATUS
            </div>
            <div className="text-xs font-mono text-slate-300 space-y-1">
              <div>LOCATION: Madurai (UTC +5:30)</div>
              <div>LOCAL TIME: <span className="text-cyan-300 font-bold">{currentTime || '08:45 PM IST'}</span></div>
              <div className="flex items-center text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                SYSTEMS OPERATIONAL
              </div>
            </div>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              VERIFIED CHANNELS
            </div>
            <div className="flex flex-col space-y-2 text-xs font-mono">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors flex items-center space-x-2"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>github.com/Santhosh061117</span>
              </a>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors flex items-center space-x-2"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>linkedin.com/in/santhosh-r</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-cyan-300 transition-colors flex items-center space-x-2"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Santhosh R. Electronics & Communication Engineering.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors"
            title="Scroll to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, Send, MapPin, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { personalInfo } from '../data/portfolio';

export default function Contact({ theme = 'dark' }) {
  const [copiedType, setCopiedType] = useState(null);
  const [formMsg, setFormMsg] = useState({ name: '', email: '', message: '' });

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formMsg.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hello Santhosh,\n\n${formMsg.message}\n\nFrom: ${formMsg.name} (${formMsg.email})`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50 dark:bg-[#07090e] border-t border-slate-200 dark:border-cyan-500/15 overflow-hidden transition-colors duration-300">
      {/* Background Circuit Grid & Atmospheric Glow */}
      <div className="absolute inset-0 bg-circuit-grid opacity-20 dark:opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-2 font-bold">
            // COMMUNICATION PORT & INQUIRIES
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's build something.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed font-sans">
            Whether discussing semiconductor device simulation, embedded firmware architectures, LoRa telemetry, or collaborative projects — I welcome technical inquiries from recruiters, researchers, and builders.
          </p>
        </div>

        {/* 3 Primary Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center">
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-sm tracking-wider transition-all shadow-md dark:shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] flex items-center space-x-2.5 active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>EMAIL ME</span>
          </a>

          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-sm tracking-wider border border-slate-300 dark:border-cyan-500/40 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all flex items-center space-x-2.5 active:scale-95 shadow-sm"
          >
            <GithubIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>GITHUB</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>

          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-sm tracking-wider border border-slate-300 dark:border-cyan-500/40 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all flex items-center space-x-2.5 active:scale-95 shadow-sm"
          >
            <LinkedinIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Grid: Direct Contact Channels & Quick Message Dispatcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Communication Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2 font-bold">
              VERIFIED CHANNELS
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-cyan-500/25 hover:border-cyan-400 transition-colors flex items-center justify-between group shadow-sm">
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">COLLEGE EMAIL</div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm font-mono text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 font-semibold transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(personalInfo.email, 'email')}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-cyan-950 text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-700 transition-colors"
                title="Copy Email"
              >
                {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-cyan-500/25 hover:border-cyan-400 transition-colors flex items-center justify-between group shadow-sm">
              <div className="flex items-center space-x-3.5">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">DIRECT PHONE</div>
                  <a
                    href={`tel:${personalInfo.phoneRaw}`}
                    className="text-sm font-mono text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-300 font-semibold transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(personalInfo.phoneRaw, 'phone')}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-emerald-950 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200 dark:border-slate-700 transition-colors"
                title="Copy Phone Number"
              >
                {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location & Institution Card */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-slate-800 flex items-center space-x-3.5 shadow-sm">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                <div className="text-slate-900 dark:text-slate-200 font-bold">Madurai, Tamil Nadu, India</div>
                <div>Thiagarajar College of Engineering • Dept. of ECE</div>
              </div>
            </div>
          </div>

          {/* Quick Pre-filled Direct Mail Dispatcher */}
          <div className="lg:col-span-7 bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-cyan-500/25 rounded-2xl p-6 sm:p-8 shadow-xl dark:shadow-none">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-bold">
                TRANSMIT MESSAGE VIA EMAIL CLIENT
              </div>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30 font-bold">
                ● READY
              </span>
            </div>

            <form onSubmit={handleSendMail} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1 font-semibold">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={formMsg.name}
                    onChange={(e) => setFormMsg({ ...formMsg, name: e.target.value })}
                    placeholder="e.g. Dr. K. Ramesh / Recruiter"
                    className="w-full bg-slate-50 dark:bg-[#050811] border border-slate-300 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1 font-semibold">YOUR EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formMsg.email}
                    onChange={(e) => setFormMsg({ ...formMsg, email: e.target.value })}
                    placeholder="e.g. contact@company.com"
                    className="w-full bg-slate-50 dark:bg-[#050811] border border-slate-300 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1 font-semibold">TRANSMISSION MESSAGE</label>
                <textarea
                  rows={4}
                  required
                  value={formMsg.message}
                  onChange={(e) => setFormMsg({ ...formMsg, message: e.target.value })}
                  placeholder="I'd like to discuss an opportunity, embedded project, or research collaboration..."
                  className="w-full bg-slate-50 dark:bg-[#050811] border border-slate-300 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 rounded-xl p-4 text-sm font-mono text-slate-900 dark:text-white outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-sm tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md dark:shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>OPEN PREFILLED EMAIL TO SANTHOSH</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

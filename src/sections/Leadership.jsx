import React from 'react';
import { leadershipList } from '../data/portfolio';
import { Users, Briefcase, Award, Shield, ArrowRight } from 'lucide-react';

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#07090e] border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
            // DEPARTMENTAL INITIATIVES & ROLES
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Beyond the Circuit
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Active departmental leadership roles within the Department of Electronics and Communication Engineering at Thiagarajar College of Engineering.
          </p>
        </div>

        {/* Leadership Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadershipList.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#080d1a] border border-cyan-500/25 hover:border-cyan-400/80 transition-all duration-300 relative overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.15)] flex flex-col justify-between"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider font-bold">
                    {item.period}
                  </span>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                    {idx === 0 ? <Briefcase className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                  </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {item.role}
                </h3>
                <div className="text-xs font-mono text-cyan-400 mt-1 font-semibold">
                  {item.organization}
                </div>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  {item.institution}
                </div>

                <div className="my-4 text-xs font-mono text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  {item.tagline}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Verified Departmental Appointment</span>
                <span className="text-cyan-400 font-bold">TCE ECE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { educationList, personalInfo } from '../data/portfolio';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#07090e] border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-2">
            // ACADEMIC FOUNDATIONS & TRAJECTORY
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Academic Timeline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Consistent scholastic distinction across engineering, physical sciences, and mathematics.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-cyan-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {educationList.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node Bullet */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#080d1a] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Education Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#080d1a] border border-cyan-500/20 hover:border-cyan-400/70 transition-all duration-300 relative overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-200 transition-colors">
                      {item.degree}
                    </h3>

                    <div className="flex items-center space-x-2 text-sm font-mono text-slate-300">
                      {idx === 0 && (
                        <img
                          src={personalInfo.tceLogoUrl}
                          alt="TCE Logo"
                          className="w-4 h-4 object-contain inline-block"
                        />
                      )}
                      <span>{item.institution}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Score & Distinction Badge */}
                  <div className="flex flex-col items-start md:items-end">
                    <div className="px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-base sm:text-lg shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                      {item.score}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 mt-1">
                      {item.highlight}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 mt-4 pt-4 border-t border-slate-800/80 leading-relaxed font-sans">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

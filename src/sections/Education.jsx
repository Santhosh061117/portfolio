import React from 'react';
import { educationList, personalInfo } from '../data/portfolio';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Education({ theme = 'dark' }) {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50 dark:bg-[#07090e] border-t border-slate-200 dark:border-cyan-500/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-2 font-bold">
            // ACADEMIC FOUNDATIONS & TRAJECTORY
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Academic Timeline
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 font-sans">
            Consistent scholastic distinction across engineering, physical sciences, and mathematics.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-cyan-500/30 dark:border-cyan-500/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {educationList.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node Bullet */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white dark:bg-[#080d1a] border-2 border-cyan-500 dark:border-cyan-400 flex items-center justify-center shadow-md dark:shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
              </div>

              {/* Education Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden shadow-md dark:shadow-lg hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors">
                      {item.degree}
                    </h3>

                    <div className="flex items-center space-x-2 text-sm font-mono text-slate-700 dark:text-slate-300">
                      {idx === 0 && (
                        <img
                          src={personalInfo.tceLogoUrl}
                          alt="TCE Logo"
                          className="w-4 h-4 object-contain inline-block"
                        />
                      )}
                      <span>{item.institution}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-slate-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Score & Distinction Badge */}
                  <div className="flex flex-col items-start md:items-end">
                    <div className="px-4 py-2 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/40 text-cyan-800 dark:text-cyan-300 font-mono font-bold text-base sm:text-lg shadow-sm dark:shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                      {item.score}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                      {item.highlight}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 leading-relaxed font-sans">
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

import React, { useState, useEffect } from 'react';
import { ExternalLink, GitBranch, Code2, Star, Eye, Terminal } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { personalInfo, verifiedRepos } from '../data/portfolio';

export default function GitHubSection({ theme = 'dark' }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchGithub = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${personalInfo.githubUsername}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setProfileData(data);
        }
      } catch (err) {
        // Fallback remains active
      }
    };
    fetchGithub();
    return () => { isMounted = false; };
  }, []);

  const languageDistribution = [
    { name: "C / C++", pct: "34%", color: "bg-cyan-500" },
    { name: "Python", pct: "28%", color: "bg-sky-500" },
    { name: "JavaScript / HTML", pct: "22%", color: "bg-amber-500" },
    { name: "TCAD / Scheme", pct: "16%", color: "bg-emerald-500" },
  ];

  return (
    <section id="github" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50 dark:bg-[#07090e] border-t border-slate-200 dark:border-cyan-500/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 tracking-widest uppercase mb-2 font-bold">
              // OPEN SOURCE CODEBASE & TELEMETRY
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              Code & Engineering Repositories
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 font-sans">
              Public scripts, semiconductor tools, and hardware projects on GitHub.
            </p>
          </div>

          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-mono text-xs border border-slate-300 dark:border-cyan-500/30 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all flex items-center space-x-2 shadow-sm"
          >
            <GithubIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>@{personalInfo.githubUsername}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* GitHub Metrics & Language Spectrum Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-cyan-500/25 relative overflow-hidden shadow-xl dark:shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Profile Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-cyan-500/40 flex items-center justify-center">
                  <GithubIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    {personalInfo.githubUsername}
                  </h4>
                  <p className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                    GitHub Verified Developer
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Focused on open-source semiconductor tool generators, student chapter web applications, and embedded firmware experiments.
              </p>

              <div className="pt-2">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-bold transition-colors"
                >
                  <span>EXPLORE ALL REPOSITORIES</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right: Technical Language Spectrum */}
            <div className="lg:col-span-8 space-y-5 bg-slate-50 dark:bg-[#050811] p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold">ESTIMATED LANGUAGE DISTRIBUTION</span>
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">HARDWARE & SYSTEM FOCUS</span>
              </div>

              {/* Multi-segment Progress Bar */}
              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-900 overflow-hidden flex">
                <div className="w-[34%] bg-cyan-500 shadow-[0_0_10px_#00f0ff]" title="C / C++ (34%)" />
                <div className="w-[28%] bg-sky-500" title="Python (28%)" />
                <div className="w-[22%] bg-amber-500" title="JavaScript / HTML (22%)" />
                <div className="w-[16%] bg-emerald-500" title="TCAD Scheme (16%)" />
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                {languageDistribution.map((lang) => (
                  <div key={lang.name} className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{lang.name}</span>
                    <span className="text-slate-500 dark:text-slate-500">{lang.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verifiedRepos.map((repo, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#080d1a] border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400 transition-all flex flex-col justify-between group shadow-md dark:shadow-none hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-3 font-semibold">
                  <span className="flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>PUBLIC REPO</span>
                  </span>
                  <span className="text-slate-500">{repo.stars}</span>
                </div>

                <h4 className="text-base font-bold font-mono text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {repo.name}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-700 dark:text-cyan-400 font-semibold">{repo.language}</span>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center space-x-1 font-semibold"
                >
                  <span>SOURCE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

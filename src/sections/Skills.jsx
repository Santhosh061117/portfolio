import React from 'react';
import SkillMatrix from '../components/SkillMatrix';
import { Cpu } from 'lucide-react';

export default function Skills({ theme = 'dark' }) {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-slate-50 dark:bg-[#07090e] border-t border-slate-200 dark:border-cyan-500/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        <SkillMatrix theme={theme} />
      </div>
    </section>
  );
}


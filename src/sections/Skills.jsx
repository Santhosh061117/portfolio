import React from 'react';
import SkillMatrix from '../components/SkillMatrix';
import { Cpu } from 'lucide-react';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#07090e] border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto space-y-6">
        <SkillMatrix />
      </div>
    </section>
  );
}

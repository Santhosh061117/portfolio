import React from 'react';
import StackFlow from '../components/StackFlow';
import LogicPlayground from '../components/LogicPlayground';
import { Activity } from 'lucide-react';

export default function SignalSpectrum({ theme = 'dark' }) {
  return (
    <section id="spectrum" className="py-28 px-4 sm:px-6 lg:px-8 relative bg-slate-50/30 dark:bg-[#07090e] border-t border-slate-200 dark:border-cyan-500/15 space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* 9-Layer Signal Flow Continuum */}
        <StackFlow theme={theme} />

        {/* Interactive CMOS Logic Gate & Circuit Simulator */}
        <LogicPlayground theme={theme} />
      </div>
    </section>
  );
}

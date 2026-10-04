import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import EasterEggTerminal from './components/EasterEggTerminal';

import Hero from './sections/Hero';
import About from './sections/About';
import SignalSpectrum from './sections/SignalSpectrum';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Leadership from './sections/Leadership';
import Education from './sections/Education';
import GitHubSection from './sections/GitHubSection';
import Contact from './sections/Contact';

import useScrollSpy from './hooks/useScrollSpy';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('santhosh_portfolio_theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('santhosh_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const sectionIds = [
    'home',
    'about',
    'spectrum',
    'skills',
    'projects',
    'leadership',
    'education',
    'github',
    'contact'
  ];

  const activeSection = useScrollSpy(sectionIds, 200);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-800 dark:text-[#e2e8f0] selection:bg-cyan-500/20 selection:text-cyan-700 dark:selection:text-cyan-300 font-sans transition-colors duration-300">
      {/* Custom Desktop Cursor */}
      <Cursor theme={theme} />

      {/* Sticky Glassmorphic Navigation */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Sections Hierarchy */}
      <main>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} theme={theme} />
        <About theme={theme} />
        <SignalSpectrum theme={theme} />
        <Skills theme={theme} />
        <Projects onOpenCaseStudy={(proj) => setSelectedProject(proj)} theme={theme} />
        <Leadership theme={theme} />
        <Education theme={theme} />
        <GitHubSection theme={theme} />
        <Contact theme={theme} />
      </main>

      {/* Minimal Footer */}
      <Footer theme={theme} />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        theme={theme}
      />

      <EasterEggTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}

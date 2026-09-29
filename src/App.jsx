import React, { useState } from 'react';
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
    <div className="relative min-h-screen bg-[#07090e] text-[#e2e8f0] selection:bg-cyan-500/20 selection:text-cyan-300 font-sans">
      {/* Custom Desktop Cursor */}
      <Cursor />

      {/* Sticky Glassmorphic Navigation */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Sections Hierarchy */}
      <main>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <About />
        <SignalSpectrum />
        <Skills />
        <Projects onOpenCaseStudy={(proj) => setSelectedProject(proj)} />
        <Leadership />
        <Education />
        <GitHubSection />
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <EasterEggTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

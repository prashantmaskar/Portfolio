import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { SpaceshipGameModal } from './components/SpaceshipGameModal';
import { TechStackSection } from './components/TechStackSection';
import { AIAssistantTerminal } from './components/AIAssistantTerminal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Project } from './types/portfolio';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [performanceMode, setPerformanceMode] = useState<'high' | 'eco'>('high');

  const handleToggleAudio = () => {
    const isNowPlaying = audioEngine.toggleAmbient();
    setIsAudioPlaying(isNowPlaying);
  };

  const handleTogglePerformance = () => {
    audioEngine.playClickTone(520);
    setPerformanceMode((prev) => (prev === 'high' ? 'eco' : 'high'));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-blue-600/30 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        performanceMode={performanceMode}
        onTogglePerformance={handleTogglePerformance}
        onOpenArcade={() => setIsArcadeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          performanceMode={performanceMode}
          onOpenArcade={() => setIsArcadeOpen(true)}
        />

        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />

        <TechStackSection />

        <AIAssistantTerminal />

        <AboutSection />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Case Study Drawer Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Spaceship Arcade Mini-Game Modal */}
      <SpaceshipGameModal
        isOpen={isArcadeOpen}
        onClose={() => setIsArcadeOpen(false)}
      />
    </div>
  );
}

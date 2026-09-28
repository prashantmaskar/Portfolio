import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThreeHeroCanvas } from './ThreeHeroCanvas';
import { ArrowDown, Gamepad2, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { audioEngine, speechController } from '../utils/audioEngine';

interface HeroProps {
  performanceMode: 'high' | 'eco';
  onOpenArcade: () => void;
}

export const Hero: React.FC<HeroProps> = ({ performanceMode, onOpenArcade }) => {
  const [isSpeakingBio, setIsSpeakingBio] = useState(false);

  const handleReadAloudBio = () => {
    if (isSpeakingBio) {
      speechController.stop();
      setIsSpeakingBio(false);
    } else {
      setIsSpeakingBio(true);
      const text = `${PERSONAL_INFO.name}. Lead creative developer and systems architect based in ${PERSONAL_INFO.location}. ${PERSONAL_INFO.shortBio} ${PERSONAL_INFO.philosophy}`;
      speechController.speak(text, () => setIsSpeakingBio(false));
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-73px)] flex items-center justify-center border-b border-zinc-800/80 overflow-hidden bg-grid-subtle">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Typographic Powerhouse (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Unboxed Metadata Trust Bar */}
          <div className="flex items-center flex-wrap gap-2 text-xs font-mono text-zinc-400 mb-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Senior Software Engineer · Serrala COE
            </span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Pune, India</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <a 
              href="https://prashantmaskar.tech" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              prashantmaskar.tech
            </a>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] text-balance">
            Engineering scalable, <span className="font-serif italic font-normal text-blue-300">high-performance</span> web applications.
          </h1>

          {/* Subtitle / Bio Overview */}
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-8">
            Seasoned Frontend Developer with 9 years of professional experience in designing, architecting, and developing scalable web applications. Proficient in modern JavaScript ecosystems including React and Angular, Single-SPA micro-frontends, and responsive design systems.
          </p>

          {/* Interactive CTAs & Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="#work"
              onClick={() => audioEngine.playClickTone(500)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-zinc-950 font-medium text-sm rounded-xl hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                audioEngine.playClickTone(620);
                onOpenArcade();
              }}
              className="flex items-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <Gamepad2 className="w-4 h-4 text-blue-400" />
              <span>Launch Arcade Easter Egg</span>
            </button>

            <button
              onClick={handleReadAloudBio}
              className={`flex items-center gap-1.5 px-4 py-3 rounded-xl border text-xs font-mono transition-colors ${
                isSpeakingBio 
                  ? 'bg-blue-600/20 text-blue-400 border-blue-500/50 animate-pulse'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
              title="Voice narration of introductory statement"
            >
              {isSpeakingBio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeakingBio ? 'Pause Voice' : 'Read Aloud'}</span>
            </button>
          </div>

          {/* Proof Metrics (Claim-to-proof adjacency from CV) */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-800/80 max-w-xl">
            <div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-white tabular-nums">
                9 Yrs
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                Frontend Experience
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-white">
                Single-SPA
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                Micro-frontend Systems
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl sm:text-3xl text-white tabular-nums">
                100%
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                Cross-Device Resilience
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Sculpture Viewport (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full bg-zinc-950/60 border border-zinc-800/80 rounded-3xl p-2 relative shadow-2xl overflow-hidden">
            {/* Top Bar for Viewport */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/60 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>Interactive Spatial Node</span>
              </span>
              <span>Rotate / Drag / Click</span>
            </div>

            {/* Three.js Canvas */}
            <ThreeHeroCanvas performanceMode={performanceMode} />
          </div>
        </div>
      </div>
    </section>
  );
};

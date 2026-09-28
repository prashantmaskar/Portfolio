import React from 'react';
import { audioEngine } from '../utils/audioEngine';
import { Volume2, VolumeX, Gamepad2, Zap } from 'lucide-react';

interface NavbarProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  performanceMode: 'high' | 'eco';
  onTogglePerformance: () => void;
  onOpenArcade: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isAudioPlaying,
  onToggleAudio,
  performanceMode,
  onTogglePerformance,
  onOpenArcade,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-6 py-4 flex items-center justify-between">
      {/* Zone 1: Single text element wordmark */}
      <a 
        href="#"
        onClick={() => audioEngine.playClickTone(440)}
        className="text-lg font-bold tracking-tight text-white font-display hover:text-blue-400 transition-colors whitespace-nowrap"
      >
        Prashant Maskar
      </a>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
        <a 
          href="#work" 
          onClick={() => audioEngine.playClickTone(480)}
          className="hover:text-white transition-colors hover:underline underline-offset-8"
        >
          Work
        </a>
        <a 
          href="#about" 
          onClick={() => audioEngine.playClickTone(520)}
          className="hover:text-white transition-colors hover:underline underline-offset-8"
        >
          About
        </a>
        <a 
          href="#stack" 
          onClick={() => audioEngine.playClickTone(560)}
          className="hover:text-white transition-colors hover:underline underline-offset-8"
        >
          Stack
        </a>
        <a 
          href="#terminal" 
          onClick={() => audioEngine.playClickTone(600)}
          className="hover:text-white transition-colors hover:underline underline-offset-8"
        >
          Terminal
        </a>
        <button 
          onClick={() => {
            audioEngine.playClickTone(640);
            onOpenArcade();
          }}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-blue-400 transition-colors cursor-pointer"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Arcade</span>
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        {/* Performance Mode Switcher */}
        <button
          onClick={onTogglePerformance}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors whitespace-nowrap"
          title={`Switch to ${performanceMode === 'high' ? 'Eco' : 'High'} graphics performance mode`}
        >
          <Zap className={`w-3.5 h-3.5 ${performanceMode === 'high' ? 'text-amber-400' : 'text-zinc-500'}`} />
          <span className="capitalize">{performanceMode}</span>
        </button>

        {/* Ambient Soundscape Toggle */}
        <button
          onClick={onToggleAudio}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
            isAudioPlaying
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
          title="Toggle ambient generative audio synthesizer"
        >
          {isAudioPlaying ? (
            <div className="flex items-center gap-1">
              <span className="w-1 h-3 bg-blue-400 animate-pulse rounded-full" />
              <span className="w-1 h-2 bg-blue-400 animate-ping rounded-full" />
              <span className="w-1 h-3.5 bg-blue-400 animate-pulse rounded-full" />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
          <span>{isAudioPlaying ? 'Sound On' : 'Sound Off'}</span>
        </button>

        {/* Quick Contact CTA */}
        <a
          href="#contact"
          onClick={() => audioEngine.playClickTone(700)}
          className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap"
        >
          Contact
        </a>
      </div>
    </header>
  );
};

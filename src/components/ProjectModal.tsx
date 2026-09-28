import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { X, ExternalLink, Volume2, VolumeX, CheckCircle, Code2, Layers, Cpu } from 'lucide-react';
import { speechController, audioEngine } from '../utils/audioEngine';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'code'>('overview');
  const [isReading, setIsReading] = useState(false);

  if (!project) return null;

  const handleToggleReadAloud = () => {
    if (isReading) {
      speechController.stop();
      setIsReading(false);
    } else {
      setIsReading(true);
      const narrationText = `${project.title}. Client: ${project.client}. ${project.description} In this project, the core challenge was: ${project.challenge}. Our architectural solution: ${project.solution}.`;
      speechController.speak(narrationText, () => setIsReading(false));
    }
  };

  const handleClose = () => {
    if (isReading) speechController.stop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/60 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-lg text-white">
              {project.title}
            </span>
            <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
              {project.client} · {project.year}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Read Aloud button */}
            <button
              onClick={handleToggleReadAloud}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                isReading 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 animate-pulse' 
                  : 'bg-zinc-800/80 text-zinc-300 hover:text-white border border-zinc-700/60'
              }`}
              title="Listen to project breakdown"
            >
              {isReading ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isReading ? 'Stop Narration' : 'Read Aloud'}</span>
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              title="Close (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Hero Banner / Graphic Framing */}
          <div 
            className="w-full h-56 sm:h-72 rounded-xl relative overflow-hidden flex flex-col justify-end p-6 border border-zinc-800/80"
            style={{
              background: `radial-gradient(circle at top right, ${project.accentColor}25, transparent 70%), linear-gradient(to bottom, #18181b, #09090b)`
            }}
          >
            {/* Visual architectural grid lines */}
            <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-2">
                <span>{project.categoryLabel}</span>
                <span>·</span>
                <span>{project.role}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {project.subtitle}
              </h2>
            </div>
          </div>

          {/* Navigation Tabs (Overview, Architecture, Code) */}
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <button
              onClick={() => {
                setActiveTab('overview');
                audioEngine.playClickTone(500);
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Executive Overview</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('architecture');
                audioEngine.playClickTone(560);
              }}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'architecture'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Engineering Architecture</span>
            </button>
            {project.codeSnippet && (
              <button
                onClick={() => {
                  setActiveTab('code');
                  audioEngine.playClickTone(620);
                }}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === 'code'
                    ? 'bg-zinc-800 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Implementation Snippet</span>
              </button>
            )}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
                  The Brief & Scope
                </h4>
                <p className="text-zinc-300 text-base leading-relaxed">
                  {project.fullOverview}
                </p>
              </div>

              {/* Quantified Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
                {project.metrics.map((metric, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/70"
                  >
                    <div className="font-display font-bold text-2xl text-white tracking-tight tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                  Core Innovations Shipped
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feat, fIdx) => (
                    <div 
                      key={fIdx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/50 text-sm text-zinc-300"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                    01. Engineering Challenge
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2">
                    02. Technical Resolution
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Tech Stack Matrix (Clean unboxed text metadata) */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
                  Production Stack
                </h4>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-300 font-mono">
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="flex items-center gap-3">
                      <span>{tech}</span>
                      {tIdx < project.techStack.length - 1 && (
                        <span className="text-zinc-600" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Code Snippet */}
          {activeTab === 'code' && project.codeSnippet && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-xs font-mono text-zinc-400">
                Core Architectural Implementation Pattern
              </div>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs sm:text-sm text-blue-200 overflow-x-auto leading-relaxed">
                <pre>{project.codeSnippet}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-zinc-900/60 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span>Role:</span>
            <span className="text-zinc-200">{project.role}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>Live Archive</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

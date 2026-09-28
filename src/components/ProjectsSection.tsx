import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { ArrowUpRight, Award, Sparkles, Filter } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'enterprise-payments', label: 'Enterprise Payments' },
    { id: 'microfrontends', label: 'Micro-frontends' },
    { id: 'automation', label: 'Automation & QA' },
    { id: 'web-platforms', label: 'Web Platforms & Hybrid' },
  ];

  return (
    <section id="work" className="py-24 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
            <span>01. Selected Works</span>
            <span>·</span>
            <span>Enterprise & Web Archive</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Production Implementations
          </h2>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-x-auto max-w-full">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setActiveFilter(f.id);
                audioEngine.playClickTone(520);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === f.id
                  ? 'bg-zinc-800 text-white shadow-xs font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              audioEngine.playClickTone(480);
              onSelectProject(project);
            }}
            className="group relative bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-blue-500/5"
          >
            {/* Visual Accent Glow Header */}
            <div 
              className="absolute top-0 right-0 w-36 h-36 blur-3xl opacity-15 transition-opacity group-hover:opacity-30 pointer-events-none"
              style={{ background: project.accentColor }}
            />

            <div>
              {/* Card Header & Unboxed Metadata */}
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-500 mb-4">
                <div className="flex items-center gap-2">
                  <span>{project.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400 group-hover:text-blue-400 transition-colors">
                  <span className="text-[11px] font-sans">Inspect Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-blue-200 transition-colors mb-2 tracking-tight">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            {/* Architectural Visual Container / Diagram Preview */}
            <div 
              className="w-full h-44 rounded-xl border border-zinc-800/80 relative overflow-hidden mb-6 flex flex-col justify-between p-4"
              style={{
                background: `radial-gradient(ellipse at 80% 20%, ${project.accentColor}20, transparent 70%), linear-gradient(135deg, #131316, #09090b)`
              }}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 z-10">
                <span>{project.categoryLabel}</span>
                {project.awards && project.awards.length > 0 && (
                  <span className="flex items-center gap-1 text-blue-300">
                    <Award className="w-3 h-3" />
                    <span>{project.awards[0]}</span>
                  </span>
                )}
              </div>

              {/* Graphic Wireframe Motifs */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                {project.id === 'alevate-payments' && (
                  <div className="w-full max-w-[210px] border border-blue-500/30 rounded p-2 flex flex-col gap-1.5 font-mono text-[10px] text-blue-300 bg-blue-950/20">
                    <div className="flex justify-between border-b border-blue-500/20 pb-1">
                      <span>ARCHITECTURE:</span>
                      <span>Single-SPA Micro-frontends</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>SCHEMAS:</span>
                      <span className="text-blue-400 font-bold">SEPA-CT / DTAZV / DD</span>
                    </div>
                  </div>
                )}
                {project.id === 'wtaf-automation' && (
                  <div className="w-full max-w-[210px] border border-emerald-500/30 rounded p-2 flex flex-col gap-1.5 font-mono text-[10px] text-emerald-300 bg-emerald-950/20">
                    <div className="flex justify-between border-b border-emerald-500/20 pb-1">
                      <span>FRAMEWORK:</span>
                      <span>Angular SPA Test Engine</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>OPERATIONAL LIFT:</span>
                      <span className="text-emerald-400 font-bold">+65% Efficiency</span>
                    </div>
                  </div>
                )}
                {project.id === 'austrax-modernization' && (
                  <div className="w-full max-w-[210px] border border-amber-500/30 rounded p-2 flex flex-col gap-1.5 font-mono text-[10px] text-amber-300 bg-amber-950/20">
                    <div className="flex justify-between border-b border-amber-500/20 pb-1">
                      <span>TECH STACK:</span>
                      <span>Modern JavaScript ES6+</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>DISTRIBUTION:</span>
                      <span className="text-amber-400 font-bold">Amazon CloudFront</span>
                    </div>
                  </div>
                )}
                {project.id === 'ionic-hybrid-mobile' && (
                  <div className="w-full max-w-[210px] border border-purple-500/30 rounded p-2 flex flex-col gap-1.5 font-mono text-[10px] text-purple-300 bg-purple-950/20">
                    <div className="flex justify-between border-b border-purple-500/20 pb-1">
                      <span>MOBILE STACK:</span>
                      <span>Angular + Ionic</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>PLATFORMS:</span>
                      <span className="text-purple-400 font-bold">Unified iOS &amp; Android</span>
                    </div>
                  </div>
                )}
                {project.id === 'softinfology-web' && (
                  <div className="w-full max-w-[210px] border border-cyan-500/30 rounded p-2 flex flex-col gap-1.5 font-mono text-[10px] text-cyan-300 bg-cyan-950/20">
                    <div className="flex justify-between border-b border-cyan-500/20 pb-1">
                      <span>CORE STACK:</span>
                      <span>Vanilla HTML/CSS/JS + PHP</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>VISIBILITY:</span>
                      <span className="text-cyan-400 font-bold">Technical SEO Best Practice</span>
                    </div>
                  </div>
                )}
                {project.id === 'financial-form-engine' && (
                  <div className="w-full max-w-[210px] border border-pink-500/30 rounded p-2 flex flex-col gap-1.5 font-mono text-[10px] text-pink-300 bg-pink-950/20">
                    <div className="flex justify-between border-b border-pink-500/20 pb-1">
                      <span>ANGULAR BUILDS:</span>
                      <span>v17 through v21</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>UI LIBRARIES:</span>
                      <span className="text-pink-400 font-bold">Syncfusion &amp; Material</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-[10px] font-mono text-zinc-500 text-right z-10">
                Click to inspect architecture →
              </div>
            </div>

            {/* Unboxed Tech Stack Separators (Zero-pill discipline) */}
            <div className="flex items-center flex-wrap gap-x-2.5 gap-y-1 text-xs text-zinc-400 font-mono pt-3 border-t border-zinc-800/80">
              {project.techStack.slice(0, 4).map((tech, tIdx) => (
                <span key={tIdx} className="flex items-center gap-2">
                  <span>{tech}</span>
                  {tIdx < Math.min(project.techStack.length - 1, 3) && (
                    <span className="text-zinc-600" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

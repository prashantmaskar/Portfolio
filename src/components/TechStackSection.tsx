import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Terminal, Code, Cpu, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const TechStackSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level: number;
    experience: string;
    details: string;
  }>(SKILL_CATEGORIES[0].skills[0]);

  return (
    <section id="stack" className="py-24 max-w-7xl mx-auto px-6 border-t border-zinc-800/80">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
            <span>02. Technical Arsenal</span>
            <span>·</span>
            <span>Capabilities & Paradigms</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Systems Architecture
          </h2>
        </div>
        <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
          Fine-tuned across 9 years of architecting scalable Single-SPA micro-frontends, high-volume enterprise payment processing systems, and modern Angular/React SPAs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skill Categories & Interactive List (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <div 
              key={catIdx}
              className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80"
            >
              <h3 className="font-display text-lg font-bold text-white mb-1">
                {category.title}
              </h3>
              <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                {category.description}
              </p>

              <div className="space-y-3">
                {category.skills.map((skill, sIdx) => {
                  const isSelected = selectedSkill.name === skill.name;
                  return (
                    <div
                      key={sIdx}
                      onClick={() => {
                        setSelectedSkill(skill);
                        audioEngine.playClickTone(540 + sIdx * 30);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-zinc-800/90 border-blue-500/60 shadow-lg shadow-blue-500/5'
                          : 'bg-zinc-950/60 border-zinc-800/60 hover:border-zinc-700/80 hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-400' : 'bg-zinc-600'}`} />
                        <span className="font-mono text-sm text-zinc-200 font-medium">
                          {skill.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                        <span>{skill.experience}</span>
                        <span className="tabular-nums font-bold text-zinc-300">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Live Inspector Pane (5 cols) */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>Capabilities Inspector</span>
              </span>
              <span>Live Diagnostic</span>
            </div>

            <div>
              <span className="text-xs font-mono text-zinc-500">Selected Technology</span>
              <h4 className="font-display text-2xl font-bold text-white mt-1">
                {selectedSkill.name}
              </h4>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  Technical Depth & Philosophy
                </span>
                <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
                  {selectedSkill.details}
                </p>
              </div>

              {/* Visual Mastery Bar with tabular numerals */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Production Mastery Index</span>
                  <span className="text-blue-400 font-bold tabular-nums">{selectedSkill.level} / 100</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${selectedSkill.level}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 text-xs font-mono text-zinc-400 space-y-2">
                <div className="text-zinc-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Production Engineering Standards</span>
                </div>
                <ul className="space-y-1.5 text-zinc-400 pl-1 list-disc list-inside">
                  <li>Single-SPA Micro-frontend modular isolation</li>
                  <li>Multi-format financial transaction layout integrity</li>
                  <li>Systematic upgrades through Angular v17 to v21</li>
                  <li>Strict cross-device and digital accessibility compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

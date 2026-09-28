import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, WORK_EXPERIENCE, EDUCATION, LANGUAGES_INTERESTS } from '../data/portfolioData';
import { Clock, Volume2, VolumeX, MapPin, Briefcase, GraduationCap, Globe2, Phone, Mail, Award, Heart } from 'lucide-react';
import { speechController } from '../utils/audioEngine';

export const AboutSection: React.FC = () => {
  const [indiaTime, setIndiaTime] = useState<string>('');
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Asia/Kolkata (IST)
      const timeStr = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setIndiaTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleVoice = () => {
    if (isReading) {
      speechController.stop();
      setIsReading(false);
    } else {
      setIsReading(true);
      const text = `${PERSONAL_INFO.name}. ${PERSONAL_INFO.title} based in ${PERSONAL_INFO.location}. ${PERSONAL_INFO.extendedBio}`;
      speechController.speak(text, () => setIsReading(false));
    }
  };

  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 border-t border-zinc-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Profile Card, Contact Details, Education & Ethos (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
            <span>04. Background & Credentials</span>
            <span>·</span>
            <span>Professional Profile</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance">
            Seasoned Frontend Developer &amp; Architect.
          </h2>

          {/* Minimalist Graphic Frame / Location & Profile Card */}
          <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden p-6 aspect-[4/3] flex flex-col justify-between">
            <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 z-10">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Pune, India ({PERSONAL_INFO.coordinates})</span>
              </span>
              <span className="flex items-center gap-1.5 tabular-nums text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{indiaTime} IST</span>
              </span>
            </div>

            {/* Geometric signature emblem for Prashant Maskar */}
            <div className="my-auto text-center z-10 py-4">
              <div className="w-16 h-16 mx-auto rounded-2xl border border-blue-500/40 bg-blue-950/20 flex items-center justify-center font-display font-bold text-2xl text-blue-400 mb-3 shadow-lg shadow-blue-500/10">
                PM
              </div>
              <div className="font-display font-bold text-xl text-white">
                Prashant Maskar
              </div>
              <div className="text-xs font-mono text-blue-400 mt-1">
                Senior Software Engineer · Serrala Center Of Excellence
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                9 Years Experience · Single-SPA Micro-frontends &amp; Modern SPAs
              </div>
            </div>

            {/* Live Contact Quick Links */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-mono text-zinc-400 z-10">
              <a 
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <button
                onClick={handleToggleVoice}
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
              >
                {isReading ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isReading ? 'Stop' : 'Listen to Summary'}</span>
              </button>
            </div>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed">
            {PERSONAL_INFO.extendedBio}
          </p>

          {/* Education Block (Direct from CV) */}
          <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </div>
            <div className="space-y-3 pt-1">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                  <div>
                    <div className="font-medium text-white">{edu.degree}</div>
                    <div className="text-zinc-400 font-mono">{edu.institution} · {edu.field}</div>
                  </div>
                  <span className="font-mono text-zinc-500 tabular-nums shrink-0">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Interests (Direct from CV) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/70 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Languages</span>
              </div>
              <div className="text-xs text-white font-medium">
                {LANGUAGES_INTERESTS.languages.join(' · ')}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/70 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                <Heart className="w-3.5 h-3.5 text-pink-400" />
                <span>Interests</span>
              </div>
              <div className="text-xs text-zinc-300 leading-snug">
                Tech Learning &amp; Culinary Arts
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Career Trajectory Timeline (7 cols, Direct from CV) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>Professional Experience (9 Years)</span>
            </span>
            <span className="text-zinc-500">2015 — 2026</span>
          </div>

          <div className="space-y-6">
            {WORK_EXPERIENCE.map((exp, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700/80 transition-all space-y-3.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {exp.role}
                    </h3>
                    <div className="text-xs font-mono text-blue-400 mt-0.5">
                      {exp.company} · {exp.location}
                    </div>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 tabular-nums">
                    {exp.period}
                  </span>
                </div>

                {exp.project && (
                  <div className="text-xs font-mono text-emerald-400/90 bg-emerald-950/20 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                    <span className="text-zinc-400">Project:</span> {exp.project}
                  </div>
                )}

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2 pt-1 border-t border-zinc-800/60">
                  {exp.highlights.map((item, hIdx) => (
                    <div 
                      key={hIdx}
                      className="text-xs text-zinc-400 flex items-start gap-2"
                    >
                      <span className="text-blue-400 mt-0.5 shrink-0" aria-hidden="true">▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

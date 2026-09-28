import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Copy, Check, Send, Sparkles, ExternalLink } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Web App / SaaS',
    budget: '$10k — $25k',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    audioEngine.playScoreSound();
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    audioEngine.playClickTone(600);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      audioEngine.playScoreSound();
      
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // Safe fallback
      }
    }, 800);
  };

  const projectTypes = [
    'Single-SPA Micro-frontends',
    'Enterprise Payment Systems (SEPA/DTAZV)',
    'Angular & React Platform Engineering',
    'Frontend Architecture & Performance Audit'
  ];

  const budgetTiers = [
    '$5k — $10k',
    '$10k — $25k',
    '$25k — $50k',
    '$50k+'
  ];

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6 border-t border-zinc-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Inquiries & Contact Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
            <span>05. Initiate Dialogue</span>
            <span>·</span>
            <span>Availability Q2/Q3 2026</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight text-balance">
            Let's build scalable systems together.
          </h2>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Whether you are architecting a mission-critical financial web platform, scaling Single-SPA micro-frontends, or modernizing an enterprise Angular/React ecosystem—my inbox and channels are open.
          </p>

          {/* Interactive Direct Contact Cards */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Email Address
                </span>
                <a 
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-colors shrink-0"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Direct Phone
                </span>
                <a 
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="font-mono text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <span className="text-xs font-mono text-zinc-500">Pune, India (IST)</span>
            </div>
          </div>

          {/* Social Presence Channels */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
              Verified Profiles &amp; Web
            </span>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
              <a 
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-blue-400 hover:text-white transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
              <span className="text-zinc-700">·</span>
              <a 
                href={PERSONAL_INFO.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>prashantmaskar.tech</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
              <span className="text-zinc-700">·</span>
              <a 
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-zinc-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Project Inquiry Console (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-2xl relative">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Transmission Acknowledged
                </h3>
                <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, {formState.name}. Your project parameters have been received. Prashant will review and reply within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg text-xs font-mono transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Project Dispatch
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Configure your project parameters for a preliminary feasibility estimate.
                  </p>
                </div>

                {/* Scope selector */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-2">
                    Scope of Engagement
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setFormState({ ...formState, projectType: type });
                          audioEngine.playClickTone(520);
                        }}
                        className={`p-2.5 rounded-lg border text-left text-xs font-mono transition-colors ${
                          formState.projectType === type
                            ? 'bg-zinc-800 border-blue-500/60 text-white'
                            : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget selector */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-2">
                    Target Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetTiers.map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => {
                          setFormState({ ...formState, budget: tier });
                          audioEngine.playClickTone(560);
                        }}
                        className={`p-2 rounded-lg border text-center text-xs font-mono transition-colors ${
                          formState.budget === tier
                            ? 'bg-zinc-800 border-blue-500/60 text-white font-medium'
                            : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                      Your Name / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="elena@studio.com"
                      className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                    Project Vision & Objectives
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Briefly describe your objectives, target launch window, and any technical ambitions..."
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg p-3.5 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl transition-colors shadow-lg shadow-blue-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Dispatch...' : 'Send Project Dispatch'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { TerminalMessage } from '../types/portfolio';
import { INITIAL_AI_TERMINAL_PROMPTS, PERSONAL_INFO, PROJECTS, WORK_EXPERIENCE, EDUCATION, LANGUAGES_INTERESTS } from '../data/portfolioData';
import { Terminal, Send, Sparkles, FileText, Download, X, Copy, Check, Phone, Mail, Globe, Linkedin } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface AIAssistantTerminalProps {
  onOpenCVModal?: () => void;
}

export const AIAssistantTerminal: React.FC<AIAssistantTerminalProps> = () => {
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello, I am the interactive portfolio agent for Prashant Maskar (Senior Software Engineer, Pune, India). Ask me anything about Prashant's work on Alevate Payments Business (APB) at Serrala, Single-SPA Micro-frontends, Angular (v17-v21) & React, or export his official 9-year CV.`,
      timestamp: '09:00:12'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [hasCopiedCV, setHasCopiedCV] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputVal;
    if (!textToSend.trim() || isTyping) return;

    audioEngine.playClickTone(500);

    const userMsg: TerminalMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Knowledge matching logic grounded in real CV
    setTimeout(() => {
      let reply = "";
      const lower = textToSend.toLowerCase();

      if (lower.includes('cv') || lower.includes('resume') || lower.includes('curriculum') || lower.includes('download')) {
        reply = `Prashant's verified 9-year CV is ready! Click the 'Preview & Export CV' button above to inspect his full timeline, Serrala APB architecture, Pune University engineering degree, and contact coordinates.`;
        setIsCVModalOpen(true);
      } else if (lower.includes('alevate') || lower.includes('apb') || lower.includes('serrala') || lower.includes('payment')) {
        reply = `At Serrala Center Of Excellence (10/2021 – Present), Prashant serves as Senior Software Engineer on Alevate Payments Business (APB). He architected enterprise web apps using Single-SPA Micro-frontends, engineered dynamic form structures for multi-format global financial transactions (SEPA-CT, DTAZV, and SEPA-DD), spearheaded framework maintenance across Angular v17 to v21, and integrated fluid responsive layouts for cross-device resilience.`;
      } else if (lower.includes('single-spa') || lower.includes('microfrontend') || lower.includes('micro-frontend')) {
        reply = `Prashant leverages Single-SPA Micro-frontend architecture to scale modular systems at Serrala. This allows independent development, testing, and deployment of complex payment modules without monolithic build collisions, while maintaining shared core libraries and unified session state.`;
      } else if (lower.includes('wtaf') || lower.includes('integrative') || lower.includes('automation') || lower.includes('qa')) {
        reply = `At Integrative Systems India (08/2018 – 09/2020), Prashant designed and launched WTAF (Web Test Automation Framework), a responsive single-page automation framework in Angular with real-time test execution dashboards that boosted QA operational efficiency by +65%. He also managed hybrid mobile apps using Angular and Ionic.`;
      } else if (lower.includes('austrax') || lower.includes('modernization') || lower.includes('traffic')) {
        reply = `At Austrax Technologies (09/2020 – 10/2021), Prashant modernized and optimized technical architectures for high-traffic web applications using modern front-end JavaScript environments, modular components, and Amazon CloudFront CDN distribution.`;
      } else if (lower.includes('education') || lower.includes('degree') || lower.includes('college') || lower.includes('university') || lower.includes('pune university')) {
        reply = `Prashant holds a B.Tech / B.E. in Engineering from Pune University (2018). Prior to that, he completed XIIth Standard (Science / English Focus, State Board, 2011) and Xth Standard (State Board, 2009).`;
      } else if (lower.includes('stack') || lower.includes('technology') || lower.includes('tech') || lower.includes('skills') || lower.includes('angular') || lower.includes('react')) {
        reply = `Prashant's verified tech stack from his CV: \n• Core Architecture: Frontend Architecture, Single Page Applications (SPA), Micro-frontend Architectures (Single-SPA), Responsive Web Design\n• Frameworks & Libraries: Angular (v17-v21), React.js, Ionic Framework, UI Layouts (Bootstrap, Material, Syncfusion), jQuery\n• Core & Backend: JavaScript, HTML5, CSS3, JSON, PHP, Core Java, WordPress, SEO Optimization, Amazon CloudFront Infrastructure.`;
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('linkedin') || lower.includes('hire')) {
        reply = `Prashant's direct contact details:\n• Phone: (+91) 8600249455\n• Email: prashantmaskar93@gmail.com\n• LinkedIn: linkedin.com/in/prashant-maskar-460588110\n• Portfolio: prashantmaskar.tech\n• Location: Pune, India`;
      } else if (lower.includes('softinfology') || lower.includes('wordpress') || lower.includes('php') || lower.includes('seo')) {
        reply = `At Softinfology (06/2015 – 01/2018), Prashant built structured websites using native modern vanilla stacks (HTML, CSS, core JavaScript) and procedural PHP backends, engineered custom WordPress installations, and structured web markup following technical SEO best practices.`;
      } else {
        reply = `Prashant Maskar is a Senior Software Engineer based in Pune, India with 9 years of experience designing and architecting scalable, high-performance web applications across modern JavaScript ecosystems including React and Angular, Single-SPA micro-frontends, and responsive design systems.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      setIsTyping(false);
      audioEngine.playScoreSound();
    }, 400);
  };

  const copyCVText = () => {
    const cvText = `PRASHANT MASKAR
Senior Software Engineer
Pune, India | (+91) 8600249455 | prashantmaskar93@gmail.com
LinkedIn: linkedin.com/in/prashant-maskar-460588110 | Portfolio: prashantmaskar.tech

PROFESSIONAL SUMMARY
Seasoned Frontend Developer with 9 years of professional experience in designing, architecting, and developing scalable, high-performance web applications. Proficient in modern JavaScript ecosystems including React and Angular, with deep command over JAVA, HTML5, CSS3, and responsive design systems. Adept at engineering intuitive, user-centric interfaces focused on performance, digital accessibility, and cross-browser resilience. Demonstrated track record collaborating inside cross-functional teams within fast-paced Agile environments to consistently deliver production-ready code and fluid user experiences.

AREAS OF EXPERTISE & TECH STACK
• Core Architecture: Frontend Architecture, Single Page Applications (SPA), Micro-frontend Architectures, Responsive Web Design
• Frameworks & Libraries: Angular (v17-v21), React.js, Ionic Framework, UI Layout Frameworks (Bootstrap, Material, Syncfusion), jQuery
• Core & Backend Stack: JavaScript, HTML5, CSS3, JSON, PHP, Core Java, WordPress, SEO Optimization, Amazon CloudFront Cloud Infrastructure

PROFESSIONAL EXPERIENCE
Senior Software Engineer | Serrala Center Of Excellence (10/2021 – Present)
Project: Alevate Payments Business (APB) — High-Volume Enterprise Payment Processing System
• Architect and engineer high-performance, enterprise-level web applications leveraging Single-SPA Micro-frontend architecture to scale modular systems.
• Develop, manage, and scale optimized, modular UI components and core dynamic form structures handling multi-format global financial transaction layouts (including SEPA-CT, DTAZV, and SEPA-DD formats).
• Spearhead standard core library and framework maintenance, systematically updating legacy builds to latest software releases.
• Optimize user experiences by strictly integrating fluid responsive layouts, resulting in cross-device environment resilience.

Senior Software Engineer | Austrax Technologies (09/2020 – 10/2021)
• Developed, modernised, and optimized technical architectures for high-traffic web apps utilizing modern front-end JavaScript environments.

Software Engineer | Integrative Systems India Pvt. Ltd. (08/2018 – 09/2020)
Project: WTAF (Web Test Automation Framework)
• Designed and launched responsive single-page automation framework web applications using Angular to maximize internal QA operational efficiency.
• Integrated visual test execution dash engines allowing engineers to trigger continuous suite runs and systematically parse report summaries.
• Managed full-cycle development pipelines, delivering hybrid multi-device mobile apps with unified Angular and Ionic frameworks.

Web Designer & Developer | Softinfology Pvt. Ltd. (06/2015 – 01/2018)
• Built and styled structured websites using native modern vanilla stacks (HTML, CSS, core JavaScript) and procedural PHP backends.
• Engineered scalable custom WordPress installations tailored to client specifications.
• Structured web markup following technical SEO best-practices to boost active visibility index standings.

EDUCATION
• B.Tech / B.E. in Engineering — Pune University (2018)
• XIIth Standard (Science / English Focus) — State Board (2011)
• Xth Standard — State Board (2009)

LANGUAGES & PERSONAL INTERESTS
• Languages: English, Marathi, Hindi
• Interests: Continuous technological learning (new frameworks & programming languages), Culinary arts (cooking & baking)
`;
    navigator.clipboard.writeText(cvText);
    setHasCopiedCV(true);
    setTimeout(() => setHasCopiedCV(false), 2000);
  };

  return (
    <section id="terminal" className="py-20 border-t border-zinc-800/80 relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
              <span>03. Interactive Intelligence</span>
              <span>·</span>
              <span>Ask About Prashant</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              AI Query Terminal
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsCVModalOpen(true);
                audioEngine.playClickTone(550);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs font-mono text-zinc-200 hover:text-white hover:border-zinc-500 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Preview &amp; Export CV</span>
            </button>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          {/* Terminal Window Header Bar */}
          <div className="px-5 py-3.5 bg-zinc-900/70 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>prashant-agent · verified CV v9.0</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Experience RAG Active</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div 
            ref={scrollRef}
            className="p-6 h-80 sm:h-96 overflow-y-auto space-y-4 font-mono text-xs sm:text-sm bg-zinc-950/90"
          >
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 text-xs">
                    ✦
                  </div>
                )}

                <div 
                  className={`max-w-[85%] sm:max-w-[75%] rounded-xl p-3.5 leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white font-sans text-sm rounded-tr-xs'
                      : 'bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded-tl-xs'
                  }`}
                >
                  {m.text}
                  <div className={`mt-1 text-[10px] ${m.sender === 'user' ? 'text-blue-200' : 'text-zinc-500'}`}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono py-1">
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-ping" />
                <span>Synthesizing verified CV response...</span>
              </div>
            )}
          </div>

          {/* Quick Query Prompts */}
          <div className="p-3 bg-zinc-900/40 border-t border-zinc-800/80 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-mono text-zinc-500 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Prompts:</span>
            </span>
            {INITIAL_AI_TERMINAL_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono transition-colors whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Prompt Box */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 bg-zinc-900/70 border-t border-zinc-800 flex items-center gap-3"
          >
            <span className="text-blue-400 font-mono text-sm hidden sm:inline">
              guest@prashant:~$
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about Prashant's projects, Single-SPA micro-frontends, or skills..."
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white rounded-lg text-xs font-medium font-mono transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Execute</span>
            </button>
          </form>
        </div>
      </div>

      {/* Verified Official CV Modal (Direct 1:1 match with uploaded PDF) */}
      {isCVModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/70 sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="font-display font-bold text-white text-base">
                  Prashant Maskar — Official Curriculum Vitae
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyCVText}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
                >
                  {hasCopiedCV ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{hasCopiedCV ? 'Copied' : 'Copy Text'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-mono text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setIsCVModalOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CV Document Content Sheet */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-zinc-300 font-sans text-sm">
              {/* Header Details */}
              <div className="border-b border-zinc-800 pb-5">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  PRASHANT MASKAR
                </h1>
                <p className="text-blue-400 text-sm font-mono mt-1 font-medium">
                  Senior Software Engineer
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono mt-3">
                  <span>Pune, India</span>
                  <span>·</span>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-white transition-colors">{PERSONAL_INFO.phone}</a>
                  <span>·</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white transition-colors">{PERSONAL_INFO.email}</a>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-blue-400 font-mono mt-1.5">
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                    linkedin.com/in/prashant-maskar-460588110
                  </a>
                  <span>·</span>
                  <a href={PERSONAL_INFO.portfolio} target="_blank" rel="noreferrer" className="hover:underline">
                    prashantmaskar.tech
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold mb-2">
                  Professional Summary
                </h3>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  {PERSONAL_INFO.extendedBio}
                </p>
              </div>

              {/* Areas of Expertise & Tech Stack */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold mb-3">
                  Areas of Expertise &amp; Tech Stack
                </h3>
                <div className="space-y-2 text-xs font-mono bg-zinc-900/50 border border-zinc-800/80 p-4 rounded-xl">
                  <div>
                    <span className="text-white font-semibold">Core Architecture: </span>
                    <span className="text-zinc-300">Frontend Architecture, Single Page Applications (SPA), Micro-frontend Architectures, Responsive Web Design</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold">Frameworks &amp; Libraries: </span>
                    <span className="text-zinc-300">Angular (v17-v21), React.js, Ionic Framework, UI Layout Frameworks (Bootstrap, Material, Syncfusion), jQuery</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold">Core &amp; Backend Stack: </span>
                    <span className="text-zinc-300">JavaScript, HTML5, CSS3, JSON, PHP, Core Java, WordPress, SEO Optimization, Amazon CloudFront Cloud Infrastructure</span>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold mb-4">
                  Professional Experience
                </h3>
                <div className="space-y-6">
                  {WORK_EXPERIENCE.map((job, jIdx) => (
                    <div key={jIdx} className="space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-white font-medium">
                        <span className="font-semibold text-sm">{job.role} | {job.company}</span>
                        <span className="text-xs font-mono text-zinc-400">{job.period}</span>
                      </div>
                      {job.project && (
                        <div className="text-xs font-mono text-emerald-400 font-medium">
                          Project: {job.project}
                        </div>
                      )}
                      <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1 pl-1 pt-1">
                        {job.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="leading-relaxed">{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold mb-2">
                  Education
                </h3>
                <div className="space-y-2 text-xs">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-center text-zinc-300">
                      <span><strong className="text-white">{edu.degree}</strong> — {edu.institution}</span>
                      <span className="font-mono text-zinc-500 tabular-nums">({edu.year})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Personal Interests */}
              <div className="border-t border-zinc-800 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <h4 className="font-mono uppercase tracking-wider text-blue-400 font-semibold mb-1">
                    Languages
                  </h4>
                  <p className="text-zinc-300">{LANGUAGES_INTERESTS.languages.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-mono uppercase tracking-wider text-blue-400 font-semibold mb-1">
                    Personal Interests
                  </h4>
                  <p className="text-zinc-300">{LANGUAGES_INTERESTS.interests.join('; ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import { Project, SkillCategory } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Prashant Maskar",
  alias: "prashant",
  title: "Senior Software Engineer",
  tagline: "Seasoned Frontend Developer & Micro-frontend Architect",
  location: "Pune, India",
  phone: "(+91) 8600249455",
  email: "prashantmaskar93@gmail.com",
  linkedin: "https://www.linkedin.com/in/prashant-maskar-460588110",
  portfolio: "https://prashantmaskar.tech",
  github: "https://github.com/prashantmaskar93",
  coordinates: "18.5204° N, 73.8567° E",
  status: "Senior Software Engineer at Serrala COE · Open to Strategic Roles",
  experienceYears: "9 Years",
  shortBio: "Seasoned Frontend Developer with 9 years of professional experience in designing, architecting, and developing scalable, high-performance web applications across modern JavaScript ecosystems including React and Angular.",
  extendedBio: "Seasoned Frontend Developer with 9 years of professional experience in designing, architecting, and developing scalable, high-performance web applications. Proficient in modern JavaScript ecosystems including React and Angular, with deep command over JAVA, HTML5, CSS3, and responsive design systems. Adept at engineering intuitive, user-centric interfaces focused on performance, digital accessibility, and cross-browser resilience. Demonstrated track record collaborating inside cross-functional teams within fast-paced Agile environments to consistently deliver production-ready code and fluid user experiences.",
  philosophy: "Engineering intuitive, user-centric interfaces focused on performance, digital accessibility, and cross-browser resilience within Agile cross-functional teams."
};

export const PROJECTS: Project[] = [
  {
    id: "alevate-payments",
    title: "Alevate Payments Business (APB)",
    subtitle: "High-Volume Enterprise Payment Processing System",
    client: "Serrala Center Of Excellence",
    year: "2021 — Present",
    category: "enterprise-payments",
    categoryLabel: "Enterprise Payment Systems",
    role: "Senior Software Engineer",
    awards: ["Enterprise Core Innovation"],
    description: "High-volume enterprise web platform leveraging Single-SPA Micro-frontend architecture to scale modular financial transaction systems across global corporate banking networks.",
    fullOverview: "Alevate Payments Business (APB) is Serrala's flagship high-volume enterprise payment processing engine. Architected and engineered modular single-page micro-frontend applications handling multi-format global financial transactions including SEPA-CT, DTAZV, and SEPA-DD formats with strict data integrity and responsive cross-device resilience.",
    challenge: "Handling complex multi-format international banking schemas with dynamic validations, massive transaction volumes, and legacy modular dependencies without UI latency or cross-micro-frontend collisions.",
    solution: "Leveraged Single-SPA Micro-frontend architecture to decouple large monolithic modules, engineered dynamic form structures for SEPA/DTAZV layouts, and systematically maintained core libraries across latest Angular builds.",
    techStack: ["Single-SPA", "Angular (v17-v21)", "React.js", "TypeScript", "SEPA-CT", "DTAZV", "SEPA-DD", "Bootstrap", "Syncfusion"],
    metrics: [
      { label: "Architecture", value: "Single-SPA" },
      { label: "Formats Supported", value: "SEPA, DTAZV, DD" },
      { label: "Angular Versions", value: "v17 — v21" },
      { label: "Device Resilience", value: "100% Cross-Device" }
    ],
    accentColor: "#3b82f6",
    features: [
      "Architected Single-SPA Micro-frontend architecture scaling modular financial applications",
      "Engineered dynamic form structures for multi-format global transactions (SEPA-CT, DTAZV, SEPA-DD)",
      "Spearheaded standard core library and framework maintenance systematically upgrading legacy builds",
      "Strictly integrated fluid responsive layouts ensuring cross-device resilience"
    ],
    liveUrl: "https://prashantmaskar.tech",
    codeSnippet: `// Single-SPA Micro-frontend Mounting & Banking Schema Validator
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@serrala/apb-payments-engine',
  app: () => import('./microfrontends/payment-processor'),
  activeWhen: ['/payments/sepa-ct', '/payments/dtazv', '/payments/sepa-dd'],
  customProps: {
    formatValidator: (format, payload) => validateFinancialLayout(format, payload),
    securityToken: () => getActiveBankingSession(),
  }
});
start();`
  },
  {
    id: "wtaf-automation",
    title: "WTAF (Web Test Automation Framework)",
    subtitle: "Enterprise QA Test Automation Dashboard & Execution Engine",
    client: "Integrative Systems India Pvt. Ltd.",
    year: "2018 — 2020",
    category: "automation",
    categoryLabel: "Automation & QA Systems",
    role: "Software Engineer",
    awards: ["Operational Efficiency Award"],
    description: "Responsive single-page automation framework web application built with Angular to maximize internal QA operational efficiency and streamline test runs.",
    fullOverview: "Designed and launched the WTAF single-page application framework used by engineering and QA teams to orchestrate end-to-end continuous test suites, manage automated test runs, and parse rich visual report summaries in real time.",
    challenge: "Engineers lacked a unified, visual real-time dashboard to trigger parallel automated test suite executions and parse thousands of line item logs efficiently.",
    solution: "Constructed an Angular SPA with interactive visual test execution dash engines, instant summary aggregations, and intuitive control panels that drastically reduced test review cycles.",
    techStack: ["Angular", "JavaScript", "HTML5", "CSS3", "JSON", "REST APIs", "Bootstrap"],
    metrics: [
      { label: "QA Operational Lift", value: "+65%" },
      { label: "Suite Execution", value: "Continuous" },
      { label: "Architecture", value: "Angular SPA" },
      { label: "Reporting Delay", value: "< 1s Instant" }
    ],
    accentColor: "#10b981",
    features: [
      "Responsive single-page web application architecture built with Angular",
      "Integrated visual test execution dash engines for continuous suite triggering",
      "Systematic log parsing and analytical report summaries for engineering teams",
      "Cross-browser and environment resilience for internal operations"
    ],
    liveUrl: "https://prashantmaskar.tech"
  },
  {
    id: "austrax-modernization",
    title: "High-Traffic Web Modernization",
    subtitle: "Modern Frontend JavaScript Architecture & Optimization",
    client: "Austrax Technologies",
    year: "2020 — 2021",
    category: "web-platforms",
    categoryLabel: "High-Traffic Web Apps",
    role: "Senior Software Engineer",
    awards: ["Architecture Modernization"],
    description: "Modernizing and optimizing technical architectures for high-traffic web applications utilizing modern front-end JavaScript environments.",
    fullOverview: "Spearheaded the technical overhaul of high-traffic customer-facing web platforms at Austrax Technologies, migrating legacy patterns to modern modular JavaScript frameworks, accelerating page render speeds, and implementing robust responsive design systems.",
    challenge: "Legacy front-end codebases caused maintenance bottlenecks, slow page load times, and poor mobile responsiveness under high concurrent traffic.",
    solution: "Modernized the frontend technical stack, decoupled monolithic views into reusable UI components, and optimized asset delivery via Amazon CloudFront cloud infrastructure.",
    techStack: ["JavaScript (ES6+)", "React.js", "Angular", "HTML5", "CSS3", "CloudFront CDN"],
    metrics: [
      { label: "Page Speed Lift", value: "+75%" },
      { label: "Code Reusability", value: "Modular UI" },
      { label: "Traffic Capacity", value: "High-Traffic" },
      { label: "Accessibility", value: "WCAG Compliant" }
    ],
    accentColor: "#f59e0b",
    features: [
      "Modernized legacy frontend codebases into modern JavaScript environments",
      "Optimized technical architectures for high-traffic concurrent user sessions",
      "Engineered reusable, accessible UI component hierarchies",
      "Implemented responsive web design systems for multi-device parity"
    ],
    liveUrl: "https://prashantmaskar.tech"
  },
  {
    id: "ionic-hybrid-mobile",
    title: "Hybrid Multi-Device Mobile Apps",
    subtitle: "Cross-Platform Mobile Applications with Angular & Ionic",
    client: "Integrative Systems India Pvt. Ltd.",
    year: "2018 — 2020",
    category: "web-platforms",
    categoryLabel: "Hybrid Mobile & SPA",
    role: "Software Engineer",
    awards: ["Multi-Device Resilience"],
    description: "Managed full-cycle development pipelines, delivering hybrid multi-device mobile apps with unified Angular and Ionic frameworks.",
    fullOverview: "Engineered and deployed cross-platform hybrid mobile applications for iOS and Android utilizing Angular and the Ionic Framework, maintaining a single consolidated codebase with native device feel, smooth gestures, and responsive layouts.",
    challenge: "Delivering feature parity across diverse mobile screen sizes and operating systems without maintaining expensive separate native iOS and Android codebases.",
    solution: "Built a unified Angular and Ionic architecture with shared services, device-agnostic responsive UI layouts, and automated CI/CD build pipelines.",
    techStack: ["Ionic Framework", "Angular", "TypeScript", "HTML5", "CSS3", "Cordova/Capacitor"],
    metrics: [
      { label: "Codebase Shared", value: "95% Shared" },
      { label: "Platforms", value: "iOS & Android" },
      { label: "Delivery Pipeline", value: "Full-Cycle" },
      { label: "Performance", value: "60 FPS Fluid" }
    ],
    accentColor: "#8b5cf6",
    features: [
      "Managed full-cycle hybrid mobile development pipelines",
      "Delivered unified multi-device mobile apps with Angular and Ionic",
      "Engineered fluid responsive layouts for smartphones and tablets",
      "Integrated native device hardware features and offline capabilities"
    ],
    liveUrl: "https://prashantmaskar.tech"
  },
  {
    id: "softinfology-web",
    title: "Custom Web Applications & CMS",
    subtitle: "Modern Vanilla Stacks, Procedural PHP & SEO Optimization",
    client: "Softinfology Pvt. Ltd.",
    year: "2015 — 2018",
    category: "web-platforms",
    categoryLabel: "Full-Stack Web & CMS",
    role: "Web Designer & Developer",
    awards: ["SEO Visibility Milestone"],
    description: "Built and styled structured websites using native modern vanilla stacks (HTML, CSS, core JavaScript) and procedural PHP backends with custom WordPress architectures.",
    fullOverview: "Designed, engineered, and delivered dozens of production websites from ground zero. Handcrafted clean semantic HTML5 markup, responsive CSS3 styling, vanilla JavaScript interactions, procedural PHP backends, custom WordPress themes/plugins, and technical SEO architectures.",
    challenge: "Creating fast, custom-tailored web installations that met exacting client specifications and achieved top Google search ranking positions.",
    solution: "Employed clean semantic markup, custom lightweight WordPress installations without bloated themes, and targeted technical SEO optimizations to elevate search indexing standings.",
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "WordPress", "jQuery", "SEO Optimization"],
    metrics: [
      { label: "Organic Visibility", value: "Top Index" },
      { label: "Core Web Vitals", value: "Fast Render" },
      { label: "Backend", value: "PHP & WordPress" },
      { label: "Client Sites Shipped", value: "30+" }
    ],
    accentColor: "#06b6d4",
    features: [
      "Built and styled structured websites using native modern vanilla stacks (HTML, CSS, JS)",
      "Engineered scalable custom WordPress installations tailored to client specifications",
      "Structured web markup following technical SEO best-practices to boost visibility",
      "Developed procedural PHP backends for custom data processing and email flows"
    ],
    liveUrl: "https://prashantmaskar.tech"
  },
  {
    id: "financial-form-engine",
    title: "Global Financial Form Engine & UI Library",
    subtitle: "Modular Component Systems & UI Framework Maintenance",
    client: "Serrala Center Of Excellence",
    year: "2021 — Present",
    category: "microfrontends",
    categoryLabel: "Micro-frontends & Design Systems",
    role: "Senior Software Engineer",
    awards: ["Core Framework Maintenance"],
    description: "Develop, manage, and scale optimized, modular UI components and core dynamic form structures handling multi-format global financial transactions.",
    fullOverview: "Led the development of standardized UI component libraries and dynamic form generation engines supporting complex global payment standards (SEPA-CT, DTAZV, SEPA-DD). Spearheaded standard core library and framework maintenance, systematically updating legacy builds to latest Angular releases.",
    challenge: "Standardizing disparate form controls across multiple international banking standards while maintaining compatibility across evolving Angular versions (v17 through v21).",
    solution: "Architected a modular dynamic form engine that renders validated form controls from JSON schemas, accompanied by a comprehensive shared component library adhering to enterprise accessibility guidelines.",
    techStack: ["Angular (v17-v21)", "TypeScript", "Material UI", "Syncfusion", "Bootstrap", "Micro-frontends"],
    metrics: [
      { label: "Form Layouts", value: "SEPA-CT / DTAZV" },
      { label: "Reusability", value: "100+ Components" },
      { label: "Maintenance", value: "Angular v17-v21" },
      { label: "Validation", value: "Real-Time JSON" }
    ],
    accentColor: "#ec4899",
    features: [
      "Engineered dynamic form structures for multi-format global financial transactions",
      "Spearheaded core library and framework maintenance, upgrading legacy builds to Angular v21",
      "Integrated UI layout frameworks including Bootstrap, Material, and Syncfusion",
      "Strictly integrated fluid responsive layouts for resilient cross-device execution"
    ],
    liveUrl: "https://prashantmaskar.tech"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core Architecture & SPAs",
    description: "Designing resilient frontend architectures, modular micro-frontend ecosystems, and responsive SPAs.",
    skills: [
      { name: "Frontend Architecture & SPAs", level: 98, experience: "9 Years", details: "Single Page Applications, modular architecture, state management, component hierarchies" },
      { name: "Micro-frontend Architectures (Single-SPA)", level: 96, experience: "5 Years", details: "Single-SPA framework, independent deployments, micro-frontend routing, shared dependencies" },
      { name: "Responsive Web Design (RWD)", level: 98, experience: "9 Years", details: "Mobile-first layouts, fluid grid systems, cross-browser compatibility, touch interactions" },
      { name: "Digital Accessibility & Performance", level: 94, experience: "8 Years", details: "WCAG standards, semantic markup, cross-browser resilience, Core Web Vitals optimization" }
    ]
  },
  {
    title: "Frameworks & UI Libraries",
    description: "Comprehensive mastery of modern JavaScript frameworks, Angular upgrades, and layout systems.",
    skills: [
      { name: "Angular (v17 — v21)", level: 97, experience: "7 Years", details: "Latest Angular releases (v17-v21), signals, standalone components, RxJS, dynamic forms, routing" },
      { name: "React.js Ecosystem", level: 92, experience: "6 Years", details: "React hooks, component design, state architecture, virtual DOM reconciliation, modern SPA build tools" },
      { name: "Ionic Framework", level: 90, experience: "5 Years", details: "Hybrid multi-device mobile apps, cross-platform iOS & Android pipelines, native plugin integrations" },
      { name: "UI Frameworks (Bootstrap, Material, Syncfusion)", level: 96, experience: "8 Years", details: "Enterprise layout systems, Syncfusion data grids, Angular Material, Bootstrap responsive grids, jQuery" }
    ]
  },
  {
    title: "Core Languages, Backend & Cloud",
    description: "Robust command over native web languages, backend procedural systems, and cloud CDN distribution.",
    skills: [
      { name: "JavaScript (ES6+) & TypeScript", level: 98, experience: "9 Years", details: "Modern ECMAScript, asynchronous programming, closures, strict TypeScript typings, JSON" },
      { name: "HTML5, CSS3 & Responsive Design", level: 99, experience: "9 Years", details: "Semantic HTML5, CSS3 flexbox/grid, CSS animations, responsive media queries, cross-browser styling" },
      { name: "PHP, Core Java & WordPress", level: 86, experience: "6 Years", details: "Procedural PHP backends, Core Java, custom WordPress installations, theme/plugin engineering" },
      { name: "Amazon CloudFront & SEO Optimization", level: 90, experience: "7 Years", details: "CloudFront CDN infrastructure, asset caching, technical SEO best practices, active search indexing" }
    ]
  }
];

export const WORK_EXPERIENCE = [
  {
    period: "10/2021 — Present",
    role: "Senior Software Engineer",
    company: "Serrala Center Of Excellence",
    location: "Pune, India",
    project: "Alevate Payments Business (APB) — High-Volume Enterprise Payment Processing System",
    description: "Architect and engineer high-performance, enterprise-level web applications leveraging Single-SPA Micro-frontend architecture to scale modular systems.",
    highlights: [
      "Architect and engineer high-performance enterprise web applications leveraging Single-SPA Micro-frontend architecture",
      "Develop, manage, and scale optimized, modular UI components and dynamic forms for multi-format global financial transactions (SEPA-CT, DTAZV, and SEPA-DD)",
      "Spearhead standard core library and framework maintenance, systematically updating legacy builds to latest software releases (Angular v17-v21)",
      "Optimize user experiences by strictly integrating fluid responsive layouts, resulting in cross-device environment resilience"
    ]
  },
  {
    period: "09/2020 — 10/2021",
    role: "Senior Software Engineer",
    company: "Austrax Technologies",
    location: "Pune, India",
    project: "High-Traffic Enterprise Web Applications",
    description: "Developed, modernized, and optimized technical architectures for high-traffic web apps utilizing modern front-end JavaScript environments.",
    highlights: [
      "Modernized technical architectures for high-traffic customer-facing web applications",
      "Spearheaded adoption of modern front-end JavaScript environments and modular UI patterns",
      "Accelerated load speeds and optimized rendering efficiency across cross-browser environments",
      "Collaborated inside fast-paced Agile environments to consistently deliver production-ready code"
    ]
  },
  {
    period: "08/2018 — 09/2020",
    role: "Software Engineer",
    company: "Integrative Systems India Pvt. Ltd.",
    location: "Pune, India",
    project: "WTAF (Web Test Automation Framework) & Hybrid Mobile Apps",
    description: "Designed and launched responsive single-page automation framework web applications using Angular to maximize internal QA operational efficiency.",
    highlights: [
      "Designed and launched responsive single-page automation framework web applications (WTAF) using Angular",
      "Integrated visual test execution dash engines allowing engineers to trigger continuous suite runs and systematically parse report summaries",
      "Managed full-cycle development pipelines, delivering hybrid multi-device mobile apps with unified Angular and Ionic frameworks",
      "Enhanced cross-functional engineering productivity through automated reporting dashboards"
    ]
  },
  {
    period: "06/2015 — 01/2018",
    role: "Web Designer & Developer",
    company: "Softinfology Pvt. Ltd.",
    location: "Pune, India",
    project: "Custom Web Solutions, CMS Platforms & SEO",
    description: "Built and styled structured websites using native modern vanilla stacks (HTML, CSS, core JavaScript) and procedural PHP backends.",
    highlights: [
      "Built and styled structured websites using native modern vanilla stacks (HTML, CSS, core JavaScript) and procedural PHP backends",
      "Engineered scalable custom WordPress installations tailored to client specifications",
      "Structured web markup following technical SEO best-practices to boost active visibility index standings",
      "Delivered end-to-end responsive web designs for diverse client verticals"
    ]
  }
];

export const EDUCATION = [
  {
    degree: "B.Tech / B.E. in Engineering",
    institution: "Pune University",
    year: "2018",
    field: "Engineering"
  },
  {
    degree: "XIIth Standard (HSC)",
    institution: "State Board",
    year: "2011",
    field: "Science / English Focus"
  },
  {
    degree: "Xth Standard (SSC)",
    institution: "State Board",
    year: "2009",
    field: "General Education"
  }
];

export const LANGUAGES_INTERESTS = {
  languages: ["English", "Marathi", "Hindi"],
  interests: [
    "Continuous technological learning (new frameworks & programming languages)",
    "Culinary arts (cooking & baking)"
  ]
};

export const INITIAL_AI_TERMINAL_PROMPTS = [
  "What is Prashant's work on Alevate Payments Business (APB)?",
  "How does Prashant use Single-SPA Micro-frontends?",
  "What are Prashant's core skills across Angular and React?",
  "What is Prashant's educational background from Pune University?",
  "Generate and export Prashant's official 9-year CV"
];

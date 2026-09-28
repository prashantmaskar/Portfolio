export interface Project {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  category: 'enterprise-payments' | 'microfrontends' | 'automation' | 'web-platforms';
  categoryLabel: string;
  role: string;
  awards?: string[];
  description: string;
  fullOverview: string;
  challenge: string;
  solution: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  features: string[];
  liveUrl?: string;
  codeSnippet?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: number; // 1-100
    experience: string;
    details: string;
  }[];
}

export interface TerminalMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
}

export interface AudioState {
  isPlaying: boolean;
  volume: number;
  mode: 'ambient' | 'synthwave' | 'minimal';
}

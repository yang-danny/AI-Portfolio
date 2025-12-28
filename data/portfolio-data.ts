// Portfolio Data Structure

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  category: string;
}

export interface TimelineEntry {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  technologies: string[];
  color: string;
  position: { x: number; y: number };
  icon?: string;
}

// Projects Data
export const projects: Project[] = [
  {
    id: '1',
    title: 'AI HireFlow',
    description: 'AI-HireFlow is a comprehensive platform that leverages artificial intelligence to streamline your job application process.',
    image: '/projects/genai-marketing.jpg',
    technologies: ['React', 'Node.js', 'Fastify', 'MongoDB', 'Gemini', 'Redis', 'Claude', 'Docker', 'GitHub Actions', 'E2E'],  
    link: '#',
    category: 'AI/Fullstack',
  },
  {
    id: '2',
    title: 'AI Curation',
    description: 'AI-Curation is an intelligent, autonomous content curation and publication system that leverages multiple specialized AI agents...',
    image: '/projects/trading-bot.jpg',
    technologies: ['Python', 'AI Agents', 'Multi-Agent', 'Google ADK', 'LLM', 'Google Search'],
    link: '#',
    category: 'AI/Media',
  },
  {
    id: '3',
    title: 'Fishing Club',
    description: 'A local Fishing Club website built with Next.js and Tailwind CSS contain E-commerce, event booking, member management, and payment processing functions.',
    image: '/projects/computer-vision.jpg',
    technologies: ['Next.js', 'Tailwind CSS', 'Clerk', 'Stripe', 'zustand',  'MongoDB'],
    link: '#',
    category: 'Fullstack/E-commerce',
  },
   {
    id: '4',
    title: 'Grad Flow',
    description: 'Grad Flow is a comprehensive platform that leverages job searching and career development for graduates.',
    image: '/projects/genai-marketing.jpg',
    technologies: ['React', 'Node.js', 'SASS', 'Graphql', 'Apollo', 'MongoDB'],  
    link: '#',
    category: 'Fullstack/Graphql',
  },
  {
    id: '5',
    title: 'Side By Side Advocacy',
    description: 'Side By Side Advocacy is a local advocacy firm official website built with React.js, SASS and Firebase...',
    image: '/projects/trading-bot.jpg',
    technologies: ['React', 'SASS', 'Typescript', 'CMS', 'Firebase'],
    link: '#',
    category: 'React/CMS',
  },
  {
    id: '6',
    title: 'Hiper',
    description: 'Hiper is a B2C E-commerce platform served global custuomers built with React.js, SASS and Firebase...',
    image: '/projects/trading-bot.jpg',
    technologies: ['React', 'SASS', 'Redux', 'Stripe', 'Firebase'],
    link: '#',
    category: 'React/E-commerce',
  },
];

// Timeline Data
export const timeline: TimelineEntry[] = [
   {
    id: '1',
    type: 'work',
    title: 'Web Developer & IT Support',
    organization: 'Side By Side Advocacy',
    startDate: '2021',
    endDate: 'Present',
    description: 'Web Developer & IT Support at Side By Side Advocacy...',
  },
  {
    id: '2',
    type: 'work',
    title: 'Full Stack Developer',
    organization: 'Hiper Pty Ltd',
    startDate: '2014',
    endDate: '2022',
    description: 'Full Stack Developer at Hiper Pty Ltd...',
  },
    {
    id: '3',
    type: 'work',
    title: 'System Administrator',
    organization: 'Enovo Pty Ltd',
    startDate: '2011',
    endDate: '2014',
    description: 'System Administrator at Enovo Pty Ltd...',
  },
  {
    id: '4',
    type: 'education',
    title: 'Master of Information Technology',
    organization: ' University of Technology Sydney',
    startDate: '2009',
    endDate: '2010',
    description: 'Master of Information Technology, University of Technology Sydney. Studied software programming and algorithms.',
  },
  {
    id: '5',
    type: 'education',
    title: 'Bachelor of Information Technology',
    organization: 'University of Newcastle',
    startDate: '2006',
    endDate: '2008',
    description: 'Bachelor of Information Technology, University of Newcastle. Studied software developing and business analysis.',
  },
];

// Skills Data
export const skills: SkillCategory[] = [
  {
    id: '1',
    name: 'AI',
    technologies: ['MCP', 'RAG', 'LLMs' , 'AI Agents', 'Vibe Coding'],
    color: '#a855f7',
    position: { x: 200, y: 150 },
    icon: '/AI.png',
  },
  {
    id: '2',
    name: 'Full Stack',
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL'],
    color: '#3b82f6',
    position: { x: 500, y: 200 },
    icon: '/FullStack.png',
  },
  {
    id: '3',
    name: 'Cloud & DevOps',
    technologies: ['AWS', 'Azure', 'CI/CD', 'Docker', 'Kubernetes'],
    color: '#00d9ff',
    position: { x: 800, y: 150 },
    icon: '/DevOps.png',
  },
];

// Contact Info
export const contactInfo = {
  email: 'yang_danny@hotmail.com',
  linkedin: 'https://www.linkedin.com/in/danny-yang7/',
  github: 'hhttps://github.com/yang-danny',
  portfolio: 'https://yang-danny.netlify.app/',
};

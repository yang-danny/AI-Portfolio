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
}

// Projects Data
export const projects: Project[] = [
  {
    id: '1',
    title: 'GenAI Marketing Platform',
    description: 'GenAI Marketing Platform integrated ad creation, campaign visualization, valuation, viola...',
    image: '/projects/genai-marketing.jpg',
    technologies: ['React', 'Node.js', 'OpenAI', 'TensorFlow'],
    link: '#',
    category: 'AI/ML',
  },
  {
    id: '2',
    title: 'Neural Network Trading Bot',
    description: 'Neural network Trading Bot analyzes financial data, predicts stock, analyzes intermarket...',
    image: '/projects/trading-bot.jpg',
    technologies: ['Python', 'PyTorch', 'FastAPI', 'PostgreSQL'],
    link: '#',
    category: 'AI/ML',
  },
  {
    id: '3',
    title: 'Computer Vision Analytics',
    description: 'Computer Vision project for real-time object detection, classification, and image segmentation',
    image: '/projects/computer-vision.jpg',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'React'],
    link: '#',
    category: 'AI/ML',
  },
];

// Timeline Data
export const timeline: TimelineEntry[] = [
  {
    id: '1',
    type: 'work',
    title: 'Full Stack Developer',
    organization: 'Tech University',
    startDate: '2023',
    endDate: 'Present',
    description: 'Full Stack Developer at DataFlow Solutions is instrumental in digital engagement projects, with the marketconservment...',
  },
  {
    id: '2',
    type: 'work',
    title: 'Junior AI Researcher',
    organization: 'Full Stack Developer at DataFlow Solutions',
    startDate: '2020',
    endDate: '2023',
    description: 'Full Stack Developer at LuxurFlow Solutions is awestomed panel an eniangement project, with the marketconservment...',
  },
  {
    id: '3',
    type: 'education',
    title: 'Master of Computer Science',
    organization: 'Tech University',
    startDate: '2018',
    endDate: '2020',
    description: 'Master of Computer Science, Tech University. Studied advanced AI and machine learning algorithms.',
  },
  {
    id: '4',
    type: 'education',
    title: 'Master of Computer Science',
    organization: 'Tech University',
    startDate: '2018',
    endDate: '2018',
    description: 'Master of Computer Science, Tech University',
  },
];

// Skills Data
export const skills: SkillCategory[] = [
  {
    id: '1',
    name: 'AI/ML',
    technologies: ['PyTorch', 'TensorFlow', 'Langchain'],
    color: '#00d9ff',
    position: { x: 200, y: 150 },
  },
  {
    id: '2',
    name: 'Full Stack',
    technologies: ['React', 'Node.js', 'Python'],
    color: '#3b82f6',
    position: { x: 500, y: 200 },
  },
  {
    id: '3',
    name: 'Cloud & DevOps',
    technologies: ['AWS', 'Docker', 'Kubernetes'],
    color: '#a855f7',
    position: { x: 800, y: 150 },
  },
];

// Contact Info
export const contactInfo = {
  email: 'contact.info@lionsthese.com',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com',
  twitter: 'https://twitter.com',
};

// AI Chatbot Responses
export const aiResponses = {
  greeting: "AI ASSISTANT: I see you're interested in vector databases. The GenAI Marketing Platform project is a great example. Shall I take you there?",
  projects: "I have worked on several exciting projects including GenAI Marketing Platform, Neural Network Trading Bot, and Computer Vision Analytics. Which one would you like to know more about?",
  skills: "My expertise spans AI/ML (PyTorch, TensorFlow, Langchain), Full Stack Development (React, Node.js, Python), and Cloud & DevOps (AWS, Docker, Kubernetes).",
  experience: "I'm currently working as a Full Stack Developer at Tech University. Previously, I was a Junior AI Researcher at DataFlow Solutions.",
  default: "Thank you for your interest! Feel free to explore my portfolio or ask me anything about my projects and experience.",
};

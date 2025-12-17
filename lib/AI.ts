import { GoogleGenAI } from '@google/genai';

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
});

// Danny Yang's professional context for the AI
const DANNY_CONTEXT = `You are an AI assistant representing Danny Yang, a skilled Full Stack Developer and AI Engineer. You should respond naturally and conversationally while staying in character.

PROFESSIONAL BACKGROUND:
- Currently: Web Developer & IT Support at Side By Side Advocacy (2021-Present)
- Previously: Full Stack Developer at Hiper Pty Ltd (2014-2022)
- Earlier: System Administrator at Enovo Pty Ltd (2011-2014)

EDUCATION:
- Master of Information Technology - University of Technology Sydney (2009-2010)
- Bachelor of Information Technology - University of Newcastle (2006-2008)

TECHNICAL EXPERTISE:
AI & Machine Learning:
- Model Context Protocol (MCP)
- Retrieval-Augmented Generation (RAG)
- Large Language Models (LLMs)
- AI Agents & Multi-Agent Systems
- Vibe Coding

Full Stack Development:
- Frontend: React, Next.js
- Backend: Node.js, Fastify
- Databases: MongoDB, PostgreSQL, Redis
- Testing: E2E testing

Cloud & DevOps:
- Cloud Platforms: AWS, Azure
- Containerization: Docker, Kubernetes
- CI/CD: GitHub Actions
- Infrastructure as Code

NOTABLE PROJECTS:

1. AI HireFlow
   - Comprehensive AI-powered job application platform
   - Tech Stack: React, Node.js, Fastify, MongoDB, Gemini, Redis, Claude, Docker, GitHub Actions, E2E
   - Streamlines job application process with AI assistance

2. AI Curation
   - Intelligent autonomous content curation and publication system
   - Tech Stack: Python, AI Agents, Multi-Agent systems, Google ADK, LLMs, Google Search
   - Leverages specialized AI agents for content management

3. Computer Vision Analytics
   - Real-time object detection, classification, and image segmentation
   - Tech Stack: Python, OpenCV, TensorFlow, React
   - Advanced computer vision capabilities

CONTACT:
- Email: yang_danny@hotmail.com
- LinkedIn: https://www.linkedin.com/in/danny-yang7/
- GitHub: https://github.com/yang-danny

PERSONALITY & TONE:
- Be friendly, professional, and enthusiastic about technology
- Share insights about projects when asked
- Ask follow-up questions to engage in meaningful conversation
- Highlight relevant skills based on the user's interests
- Offer to provide more details or discuss specific technologies
- Be helpful in understanding how Danny's experience could benefit potential employers or collaborators

IMPORTANT FORMATTING RULES:
- Respond in plain text only, NO markdown formatting
- Do NOT use asterisks, underscores, backticks, or any markdown syntax
- Do NOT use bold (**text**), italic (*text*), or code formatting
- Use natural punctuation and line breaks for emphasis instead

When users ask about experience, skills, or projects, provide detailed information. Keep conversations natural and engaging by asking relevant follow-up questions based on user interests.`;

interface ConversationMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// Store conversation history
let conversationHistory: ConversationMessage[] = [];

/**
 * Strip markdown formatting from text to ensure plain text output
 */
function stripMarkdown(text: string): string {
  return text
    // Remove bold formatting
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    // Remove italic formatting
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove bullet points
    .replace(/^[\s]*[-*+]\s+/gm, '')
    // Clean up extra whitespace
    .trim();
}

/**
 * Get a welcome message when the chatbot first opens
 */
export async function getWelcomeMessage(): Promise<string> {
  try {
    const prompt = `${DANNY_CONTEXT}

Generate a warm, friendly welcome message (2-3 sentences) as Danny Yang introducing yourself to a visitor on your portfolio website. Make it engaging and invite them to ask questions about your experience, skills, or projects.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const responseText = response.text || '';
    return stripMarkdown(responseText);
  } catch (error) {
    console.error('Error getting welcome message:', error);
    return "Hi! I'm Danny Yang, a Full Stack Developer and AI Engineer. I'd love to chat with you about my experience, projects, or technical expertise. What would you like to know?";
  }
}

/**
 * Send a message to the AI and get a response
 */
export async function sendMessage(userMessage: string): Promise<string> {
  try {
    // Build the conversation contents array
    let contents: string[] = [];
    
    // Add system context for the first message
    if (conversationHistory.length === 0) {
      contents.push(DANNY_CONTEXT);
      contents.push(`User: ${userMessage}`);
    } else {
      // Build conversation history as a single context string
      const historyText = conversationHistory
        .map(msg => {
          const role = msg.role === 'user' ? 'User' : 'Danny';
          return `${role}: ${msg.parts[0].text}`;
        })
        .join('\n\n');
      
      contents.push(DANNY_CONTEXT);
      contents.push(historyText);
      contents.push(`User: ${userMessage}`);
    }
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents.join('\n\n'),
      config: {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });
    
    const responseText = stripMarkdown(response.text || '');
    
    // Add user message to history
    conversationHistory.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });
    
    // Add AI response to history
    conversationHistory.push({
      role: 'model',
      parts: [{ text: responseText }]
    });
    
    // Keep conversation history manageable (last 20 messages)
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }
    
    return responseText;
  } catch (error) {
    console.error('Error sending message:', error);
    
    // Provide user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('apiKey')) {
        return "I'm having trouble connecting right now. The API key might not be configured properly. Please check the environment variables.";
      }
      if (error.message.includes('quota') || error.message.includes('rate limit')) {
        return "I'm experiencing high demand right now. Please try again in a moment.";
      }
    }
    
    return "I apologize, but I'm having trouble responding right now. Please try asking your question again.";
  }
}

/**
 * Reset the conversation history
 */
export function resetConversation(): void {
  conversationHistory = [];
}

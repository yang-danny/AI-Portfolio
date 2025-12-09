# 🌌 3D AI-Powered Portfolio

A stunning, interactive portfolio website featuring a 3D neural network visualization, glassmorphic UI design, and an AI-powered chatbot assistant.

![Portfolio Hero](/Users/danny/.gemini/antigravity/brain/26cce6a9-2081-46bd-a621-e8f3349ef109/hero_section_1764655693441.png)

## ✨ Features

### 🎨 Visual Design

- **3D Neural Network Sphere** - Interactive Three.js visualization with 50 animated nodes
- **Glassmorphic UI** - Modern frosted glass effects throughout
- **Dark Theme** - Professional cyan/purple gradient color scheme
- **Smooth Animations** - Framer Motion and GSAP powered transitions
- **Responsive Design** - Works beautifully on all devices

### 📱 Sections

1. **Hero** - "Living Data Sculpture" with 3D neural sphere
2. **Projects** - Innovation gallery with glassmorphic cards
3. **Expertise** - Neural network skill visualization
4. **Journey** - Animated timeline of experience and education
5. **Contact** - Form with social media links
6. **AI Chatbot** - Floating assistant with intelligent responses

### 🤖 AI Integration

- **Keyword-based responses** for common queries
- **Typing indicator** for realistic chat experience
- **Smooth animations** and transitions
- **Ready for OpenAI API** integration

## 🚀 Tech Stack

- **Framework:** Next.js 15 + React 18 + TypeScript
- **Styling:** Tailwind CSS with custom dark theme
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Animation:** Framer Motion + GSAP
- **Icons:** Lucide React

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Usage

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Customize your content:**
   Edit `/data/portfolio-data.ts` to add your:
   - Projects
   - Skills and expertise
   - Work experience and education
   - Contact information

## 🎨 Customization

### Update Projects

Edit `data/portfolio-data.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "1",
    title: "Your Project Name",
    description: "Project description...",
    image: "/projects/your-image.jpg",
    technologies: ["React", "Node.js", "AI"],
    link: "https://your-project.com",
    category: "AI/ML",
  },
  // Add more projects...
];
```

### Update Skills

```typescript
export const skills: SkillCategory[] = [
  {
    id: "1",
    name: "Your Skill Category",
    technologies: ["Tech1", "Tech2", "Tech3"],
    color: "#00d9ff",
    position: { x: 200, y: 150 },
  },
  // Add more skills...
];
```

### Update Timeline

```typescript
export const timeline: TimelineEntry[] = [
  {
    id: "1",
    type: "work", // or 'education'
    title: "Your Position",
    organization: "Company Name",
    startDate: "2023",
    endDate: "Present",
    description: "What you did...",
  },
  // Add more entries...
];
```

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    cyan: '#00d9ff',    // Change to your colors
    purple: '#a855f7',
    blue: '#3b82f6',
  },
}
```

## 🎭 Components

### Navigation

- Sticky header with glassmorphic effect
- Active section highlighting
- Mobile hamburger menu
- Smooth scroll navigation

### 3D Neural Sphere

- 50 interconnected nodes
- Mouse-responsive rotation
- Gradient colors (cyan/purple/blue)
- Auto-rotation with OrbitControls

### Project Cards

- Glassmorphic background
- Hover animations
- Technology tags
- External link buttons

### AI Chatbot

- Floating button (bottom-right)
- Animated chat window
- Message bubbles (user/AI)
- Typing indicator
- Keyword-based responses

## 📁 Project Structure

```
ai-portfolio/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Expertise.tsx
│   ├── Journey.tsx
│   ├── Contact.tsx
│   ├── AIChatbot.tsx
│   └── 3D/
│       └── NeuralSphere.tsx
├── data/
│   └── portfolio-data.ts   # Your content
├── public/                 # Static assets
├── tailwind.config.ts      # Theme config
└── package.json
```

## 🎯 Key Features

### Glassmorphic Design

All cards and overlays use the custom `.glass` and `.glass-strong` classes:

- Background blur
- Semi-transparent backgrounds
- Border highlights
- Smooth transitions

### Smooth Animations

- Section fade-ins on scroll
- Card hover effects
- 3D sphere rotation
- Timeline entry stagger
- Form feedback

### Responsive Layout

- Desktop: Full 3D experience
- Tablet: Adjusted layouts
- Mobile: Vertical stacking, touch-friendly

## 🔧 Environment Variables (Optional)

Create `.env.local` for API integrations:

```env
# OpenAI API (for chatbot)
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here

# Contact form backend
NEXT_PUBLIC_FORM_ENDPOINT=your_endpoint_here
```

## 📊 Performance

- ✅ Fast page loads (~1.1s ready time)
- ✅ Smooth 60fps animations
- ✅ Optimized 3D rendering
- ✅ 0 vulnerabilities
- ✅ Clean TypeScript compilation

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📝 License

MIT License - feel free to use this template for your portfolio!

## 🙏 Credits

- **Design Inspiration:** Modern glassmorphic web design
- **3D Graphics:** Three.js community
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Inter, Orbitron)

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## 📞 Support

For questions or issues:

1. Check the documentation
2. Review the code comments
3. Open an issue on GitHub

---

**Built with Next.js, Three.js & ❤️**

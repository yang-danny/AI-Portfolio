import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Expertise from '@/components/Expertise';
import Journey from '@/components/Journey';
import Contact from '@/components/Contact';
import AIChatbot from '@/components/AIChatbot';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-900">
      <Navigation />
      <Hero />
      <Projects />
      <Expertise />
      <Journey />
      <Contact />
      <AIChatbot />
      
      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-700 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} D.Y ❤️
          </p>
        </div>
      </footer>
    </main>
  );
}

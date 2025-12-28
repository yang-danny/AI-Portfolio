import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Expertise from '@/components/Expertise';
import Journey from '@/components/Journey';
import Contact from '@/components/Contact';
import AIChatbot from '@/components/AIChatbot';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-800">
      <Navigation />
      <Hero />
      <Projects />
      <Expertise />
      <Journey />
      <Contact />
      <AIChatbot />
      <Footer />
    </main>
  );
}

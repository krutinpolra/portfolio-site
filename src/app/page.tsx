import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import About from '@/components/About';
import ProjectSection from '@/components/ProjectSection';
import Experience from '@/components/Experience';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <TechStack />
      <ProjectSection />
    </>
  );
}

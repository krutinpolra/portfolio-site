import TechStack from '@/components/TechStack';
import About from '@/components/About';
import ProjectSection from '@/components/ProjectSection';
import Experience from '@/components/Experience';
import GitHubContributions from '@/components/GitHubContributions';

export default function HomePage() {
  return (
    <>
      <About />
      <GitHubContributions />
      <Experience />
      <TechStack />
      <ProjectSection />
    </>
  );
}

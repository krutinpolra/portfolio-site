import TechStack from '@/components/TechStack';
import About from '@/components/About';
import ProjectSection from '@/components/ProjectSection';
import Experience from '@/components/Experience';
import GitHubContributions from '@/components/GitHubContributions';
import {
  getPortfolioContactLinks,
  getPortfolioExperiences,
  getPortfolioProfile,
  getPortfolioProjects,
  getPortfolioSkillGroups,
} from '@/lib/supabasePortfolio';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [projects, experiences, skillGroups, profile, contactLinks] =
    await Promise.all([
      getPortfolioProjects(),
      getPortfolioExperiences(),
      getPortfolioSkillGroups(),
      getPortfolioProfile(),
      getPortfolioContactLinks(),
    ]);

  return (
    <>
      <About profile={profile} contactLinks={contactLinks} />
      <GitHubContributions />
      <Experience experiences={experiences} />
      <TechStack skillGroups={skillGroups} />
      <ProjectSection projects={projects} />
    </>
  );
}

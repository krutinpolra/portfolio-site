import { notFound } from 'next/navigation';
import ProjectDetailView from '@/components/ProjectDetailView';
import { getPortfolioProjectDetail } from '@/lib/supabasePortfolio';

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getPortfolioProjectDetail(slug);

  if (!project) notFound();

  return <ProjectDetailView project={project} />;
}

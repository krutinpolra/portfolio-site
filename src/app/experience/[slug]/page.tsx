import { notFound } from 'next/navigation';
import ExperienceDetailView from '@/components/ExperienceDetailView';
import { getPortfolioExperienceDetail } from '@/lib/supabasePortfolio';

type ExperienceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ExperienceDetailPage({
  params,
}: ExperienceDetailPageProps) {
  const { slug } = await params;
  const experience = await getPortfolioExperienceDetail(slug);

  if (!experience) return notFound();

  return <ExperienceDetailView experience={experience} />;
}

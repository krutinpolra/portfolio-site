import type { ProjectDetail } from '@/model/projectDetail.model';
import type { ExperienceDetail } from '@/model/Experience.data';
import type { Project } from '@/model/projectModel/project.model';

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description: string | null;
  primary_image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  docs_url: string | null;
  video_demo_url: string | null;
  hue_a: number | null;
  hue_b: number | null;
  display_order: number | null;
};

type ProjectImageRow = {
  project_id: string;
  image_url: string;
  display_order: number | null;
};

type ProjectFeatureRow = {
  project_id: string;
  feature_text: string;
  display_order: number | null;
};

type ProjectTechnologyRow = {
  project_id: string;
  display_order: number | null;
  technologies?: { name?: string } | null;
};

type ProjectCategoryRow = {
  project_id: string;
  categories?: { name?: string } | null;
};

type ExperienceRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  role: string;
  organization: string;
  location: string;
  period: string;
  category: string;
  summary: string;
  live_url: string | null;
  repo_url: string | null;
  published_date: string | null;
  updated_date: string | null;
  display_order: number | null;
};

type ExperienceHighlightRow = {
  experience_id: string;
  highlight_text: string;
  display_order: number | null;
};

type ExperienceMetricRow = {
  experience_id: string;
  value: string;
  label: string;
  display_order: number | null;
};

type ExperienceSectionRow = {
  experience_id: string;
  title: string;
  body: string[] | null;
  quote: string | null;
  bullets: string[] | null;
  display_order: number | null;
};

type ExperienceTechnologyRow = {
  experience_id: string;
  display_order: number | null;
  technologies?: { name?: string } | null;
};

export type PortfolioSkillGroup = {
  name: string;
  skills: string[];
};

type SkillGroupRow = {
  id: string;
  name: string;
  display_order: number | null;
};

type SkillRow = {
  skill_group_id: string;
  name: string;
  display_order: number | null;
};

export type PortfolioContactLink = {
  label: string;
  url: string;
  kind: string;
  isPrimary: boolean;
};

type ContactLinkRow = {
  label: string;
  url: string;
  kind: string;
  is_primary: boolean;
  display_order: number | null;
};

export type PortfolioProfile = {
  fullName: string;
  headline: string;
  summary: string;
  location: string;
  education: string;
  gpa: string;
  websiteUrl: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
};

type ProfileRow = {
  full_name: string;
  headline: string;
  summary: string;
  location: string;
  education: string;
  gpa: string;
  website_url: string;
  resume_url: string;
  github_url: string;
  linkedin_url: string;
  instagram_url: string;
};

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Supabase environment variables are not configured.');
  }

  return { url, key };
}

export async function supabaseRest<T>(path: string) {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

function sortByDisplayOrder<T extends { display_order: number | null }>(
  items: T[]
) {
  return [...items].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
  );
}

function groupRows<T extends { project_id: string }>(rows: T[]) {
  return rows.reduce<Record<string, T[]>>((groups, row) => {
    groups[row.project_id] ??= [];
    groups[row.project_id].push(row);
    return groups;
  }, {});
}

function groupExperienceRows<T extends { experience_id: string }>(rows: T[]) {
  return rows.reduce<Record<string, T[]>>((groups, row) => {
    groups[row.experience_id] ??= [];
    groups[row.experience_id].push(row);
    return groups;
  }, {});
}

async function getSupabaseProjectRows() {
  const [
    projectRows,
    imageRows,
    featureRows,
    technologyRows,
    categoryRows,
  ] = await Promise.all([
    supabaseRest<ProjectRow[]>(
      'projects?select=*&status=eq.published&order=display_order.asc'
    ),
    supabaseRest<ProjectImageRow[]>(
      'project_images?select=project_id,image_url,display_order&order=display_order.asc'
    ),
    supabaseRest<ProjectFeatureRow[]>(
      'project_features?select=project_id,feature_text,display_order&order=display_order.asc'
    ),
    supabaseRest<ProjectTechnologyRow[]>(
      'project_technologies?select=project_id,display_order,technologies(name)&order=display_order.asc'
    ),
    supabaseRest<ProjectCategoryRow[]>(
      'project_categories?select=project_id,categories(name)'
    ),
  ]);

  return {
    projectRows,
    imagesByProject: groupRows(imageRows),
    featuresByProject: groupRows(featureRows),
    technologiesByProject: groupRows(technologyRows),
    categoriesByProject: groupRows(categoryRows),
  };
}

async function getSupabaseExperienceRows() {
  const [
    experienceRows,
    highlightRows,
    metricRows,
    sectionRows,
    technologyRows,
  ] = await Promise.all([
    supabaseRest<ExperienceRow[]>(
      'experiences?select=*&order=display_order.asc'
    ),
    supabaseRest<ExperienceHighlightRow[]>(
      'experience_highlights?select=experience_id,highlight_text,display_order&order=display_order.asc'
    ),
    supabaseRest<ExperienceMetricRow[]>(
      'experience_metrics?select=experience_id,value,label,display_order&order=display_order.asc'
    ),
    supabaseRest<ExperienceSectionRow[]>(
      'experience_sections?select=experience_id,title,body,quote,bullets,display_order&order=display_order.asc'
    ),
    supabaseRest<ExperienceTechnologyRow[]>(
      'experience_technologies?select=experience_id,display_order,technologies(name)&order=display_order.asc'
    ),
  ]);

  return {
    experienceRows,
    highlightsByExperience: groupExperienceRows(highlightRows),
    metricsByExperience: groupExperienceRows(metricRows),
    sectionsByExperience: groupExperienceRows(sectionRows),
    technologiesByExperience: groupExperienceRows(technologyRows),
  };
}

function mapProject(
  project: ProjectRow,
  imagesByProject: Record<string, ProjectImageRow[]>,
  technologiesByProject: Record<string, ProjectTechnologyRow[]>,
  categoriesByProject: Record<string, ProjectCategoryRow[]>
): Project {
  const images = sortByDisplayOrder(imagesByProject[project.id] ?? []);
  const technologies = sortByDisplayOrder(
    technologiesByProject[project.id] ?? []
  )
    .map(row => row.technologies?.name)
    .filter((name): name is string => Boolean(name));
  const categories = (categoriesByProject[project.id] ?? [])
    .map(row => row.categories?.name)
    .filter((name): name is string => Boolean(name));

  return {
    title: project.title,
    description: project.description,
    image: project.primary_image_url ?? images[0]?.image_url ?? '',
    techStack: technologies,
    hueA: project.hue_a ?? 240,
    hueB: project.hue_b ?? 270,
    slug: project.slug,
    Category: categories,
  };
}

function mapProjectDetail(
  project: ProjectRow,
  imagesByProject: Record<string, ProjectImageRow[]>,
  featuresByProject: Record<string, ProjectFeatureRow[]>,
  technologiesByProject: Record<string, ProjectTechnologyRow[]>
): ProjectDetail {
  const images = sortByDisplayOrder(imagesByProject[project.id] ?? []).map(
    row => row.image_url
  );
  const features = sortByDisplayOrder(featuresByProject[project.id] ?? []).map(
    row => row.feature_text
  );
  const technologies = sortByDisplayOrder(
    technologiesByProject[project.id] ?? []
  )
    .map(row => row.technologies?.name)
    .filter((name): name is string => Boolean(name));

  return {
    slug: project.slug,
    title: project.title,
    description: project.long_description ?? project.description,
    features,
    techStack: technologies,
    images: images.length > 0 ? images : [project.primary_image_url ?? ''],
    github: project.github_url ?? '',
    live: project.live_url ?? undefined,
    videoDemo: project.video_demo_url ?? undefined,
    docsLink: project.docs_url ?? undefined,
    hueA: project.hue_a ?? 240,
    hueB: project.hue_b ?? 270,
  };
}

function mapExperienceDetail(
  experience: ExperienceRow,
  highlightsByExperience: Record<string, ExperienceHighlightRow[]>,
  metricsByExperience: Record<string, ExperienceMetricRow[]>,
  sectionsByExperience: Record<string, ExperienceSectionRow[]>,
  technologiesByExperience: Record<string, ExperienceTechnologyRow[]>
): ExperienceDetail {
  const tech = sortByDisplayOrder(
    technologiesByExperience[experience.id] ?? []
  )
    .map(row => row.technologies?.name)
    .filter((name): name is string => Boolean(name));

  return {
    slug: experience.slug,
    title: experience.title,
    subtitle: experience.subtitle ?? '',
    type: experience.category,
    role: experience.role,
    organization: experience.organization,
    location: experience.location,
    period: experience.period,
    category: experience.category,
    tech,
    published: experience.published_date ?? '',
    updated: experience.updated_date ?? '',
    urlLabel: experience.live_url ? 'Live platform' : undefined,
    live: experience.live_url ?? undefined,
    repo: experience.repo_url ?? undefined,
    summary: experience.summary,
    metrics: sortByDisplayOrder(metricsByExperience[experience.id] ?? []).map(
      row => ({ value: row.value, label: row.label })
    ),
    highlights: sortByDisplayOrder(
      highlightsByExperience[experience.id] ?? []
    ).map(row => row.highlight_text),
    sections: sortByDisplayOrder(
      sectionsByExperience[experience.id] ?? []
    ).map(row => ({
      title: row.title,
      body: row.body ?? undefined,
      quote: row.quote ?? undefined,
      bullets: row.bullets ?? undefined,
    })),
  };
}

export async function getPortfolioProjects(): Promise<Project[]> {
  const {
    projectRows,
    imagesByProject,
    technologiesByProject,
    categoriesByProject,
  } = await getSupabaseProjectRows();

  return projectRows.map(project =>
    mapProject(
      project,
      imagesByProject,
      technologiesByProject,
      categoriesByProject
    )
  );
}

export async function getPortfolioProjectDetail(slug: string) {
  const {
    projectRows,
    imagesByProject,
    featuresByProject,
    technologiesByProject,
  } = await getSupabaseProjectRows();
  const project = projectRows.find(row => row.slug === slug);

  if (!project) return undefined;

  return mapProjectDetail(
    project,
    imagesByProject,
    featuresByProject,
    technologiesByProject
  );
}

export async function getPortfolioExperiences(): Promise<ExperienceDetail[]> {
  const {
    experienceRows,
    highlightsByExperience,
    metricsByExperience,
    sectionsByExperience,
    technologiesByExperience,
  } = await getSupabaseExperienceRows();

  return experienceRows.map(experience =>
    mapExperienceDetail(
      experience,
      highlightsByExperience,
      metricsByExperience,
      sectionsByExperience,
      technologiesByExperience
    )
  );
}

export async function getPortfolioExperienceDetail(slug: string) {
  const experiences = await getPortfolioExperiences();
  return experiences.find(experience => experience.slug === slug);
}

export async function getPortfolioSkillGroups(): Promise<PortfolioSkillGroup[]> {
  const [groupRows, skillRows] = await Promise.all([
    supabaseRest<SkillGroupRow[]>(
      'skill_groups?select=id,name,display_order&order=display_order.asc'
    ),
    supabaseRest<SkillRow[]>(
      'skills?select=skill_group_id,name,display_order&order=display_order.asc'
    ),
  ]);

  return groupRows.map(group => ({
    name: group.name,
    skills: sortByDisplayOrder(
      skillRows.filter(skill => skill.skill_group_id === group.id)
    ).map(skill => skill.name),
  }));
}

export async function getPortfolioContactLinks(): Promise<
  PortfolioContactLink[]
> {
  const rows = await supabaseRest<ContactLinkRow[]>(
    'contact_links?select=label,url,kind,is_primary,display_order&order=display_order.asc'
  );

  return rows.map(row => ({
    label: row.label,
    url: row.url,
    kind: row.kind,
    isPrimary: row.is_primary,
  }));
}

export async function getPortfolioProfile(): Promise<PortfolioProfile | null> {
  const rows = await supabaseRest<ProfileRow[]>(
    'portfolio_profiles?select=full_name,headline,summary,location,education,gpa,website_url,resume_url,github_url,linkedin_url,instagram_url&slug=eq.krutin-polra&limit=1'
  );
  const profile = rows[0];

  if (!profile) return null;

  return {
    fullName: profile.full_name,
    headline: profile.headline,
    summary: profile.summary,
    location: profile.location,
    education: profile.education,
    gpa: profile.gpa,
    websiteUrl: profile.website_url,
    resumeUrl: profile.resume_url,
    githubUrl: profile.github_url,
    linkedinUrl: profile.linkedin_url,
    instagramUrl: profile.instagram_url,
  };
}

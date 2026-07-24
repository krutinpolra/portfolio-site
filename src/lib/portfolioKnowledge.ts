import { supabaseRest } from '@/lib/supabasePortfolio';

const KNOWLEDGE_FILES = [
  'chatbot-guidelines.md',
  'about.md',
  'experience.md',
  'projects.md',
  'projects/personal_finance_agent.md',
  'projects/ai_tool_suite.md',
  'projects/hamdel.md',
  'projects/fragments.md',
  'projects/hotel_reservation.md',
  'projects/culinary.md',
  'projects/met.md',
  'projects/portfolio.md',
  'skills.md',
  'contact.md',
] as const;
const CORE_KNOWLEDGE_FILES = [
  'about.md',
  'experience.md',
  'projects.md',
  'skills.md',
  'contact.md',
] as const;
const PROJECT_QUERY_CORE_FILES = [
  'projects.md',
] as const;
const MAX_KNOWLEDGE_CHARS = 80_000;
const MAX_PROJECT_FILE_CHARS = 12_000;

const PROJECT_KNOWLEDGE_FILES = [
  {
    fileName: 'projects/personal_finance_agent.md',
    keywords: [
      'finance agent',
      'personal finance',
      'budget',
      'budgeting',
      'categorize',
      'categorization',
      'bank statement',
      'transactions',
      'streamlit',
    ],
  },
  {
    fileName: 'projects/ai_tool_suite.md',
    keywords: [
      'ai job',
      'job search',
      'career',
      'resume gap',
      'openrouter',
      'tavily',
      'ai tool',
      'ai-tool-suite',
    ],
  },
  {
    fileName: 'projects/hamdel.md',
    keywords: [
      'hamdel',
      'care platform',
      'care receiver',
      'care giver',
      'caregiver',
      'care-service',
      'srs',
    ],
  },
  {
    fileName: 'projects/fragments.md',
    keywords: [
      'fragments',
      'fragment',
      'microservice',
      'aws',
      'dynamodb',
      's3',
      'cognito',
      'sharp',
    ],
  },
  {
    fileName: 'projects/hotel_reservation.md',
    keywords: [
      'hotel',
      'reservation',
      'booking system',
      'javafx',
      'sqlite',
      'desktop',
    ],
  },
  {
    fileName: 'projects/culinary.md',
    keywords: [
      'culinary',
      'parcel',
      'meal kit',
      'ejs',
      'express',
      'sessions',
    ],
  },
  {
    fileName: 'projects/met.md',
    keywords: [
      'met',
      'museum',
      'artwork',
      'jotai',
      'metropolitan',
      'favorites',
    ],
  },
  {
    fileName: 'projects/portfolio.md',
    keywords: [
      'portfolio',
      'krutin.dev',
      'chatbot',
      'framer',
      'particles',
      'next.js',
    ],
  },
] as const;

const cachedKnowledge = new Map<string, string>();
let cachedDocuments: KnowledgeDocumentRow[] | null = null;

type KnowledgeDocumentRow = {
  source_path: string;
  title: string;
  content: string;
  display_order: number | null;
};

function normalizeMarkdown(content: string) {
  return content.replace(/\r\n/g, '\n').trim();
}

function getMatchingProjectFiles(query = '') {
  const normalizedQuery = query.toLowerCase();
  if (!normalizedQuery) return [];

  return PROJECT_KNOWLEDGE_FILES.filter(project =>
    project.keywords.some(keyword => normalizedQuery.includes(keyword))
  ).map(project => project.fileName);
}

function getCoreKnowledgeFiles(query = '') {
  const normalizedQuery = query.toLowerCase();

  if (/\bprojects?\b/.test(normalizedQuery)) {
    return ['projects.md'] as const;
  }

  if (/\b(contact|linkedin|github|resume|email)\b/.test(normalizedQuery)) {
    return ['contact.md'] as const;
  }

  if (/\b(skill|skills|tech stack|technologies)\b/.test(normalizedQuery)) {
    return ['skills.md', 'projects.md'] as const;
  }

  if (/\b(experience|work|job|internship|company)\b/.test(normalizedQuery)) {
    return ['experience.md', 'skills.md'] as const;
  }

  return CORE_KNOWLEDGE_FILES;
}

function shouldLimitProjectFile(fileName: string) {
  return PROJECT_KNOWLEDGE_FILES.some(project => project.fileName === fileName);
}

async function getSupabaseKnowledgeDocuments() {
  if (process.env.NODE_ENV === 'production' && cachedDocuments) {
    return cachedDocuments;
  }

  const documents = await supabaseRest<KnowledgeDocumentRow[]>(
    'knowledge_documents?select=source_path,title,content,display_order&order=display_order.asc'
  );

  cachedDocuments = documents;
  return documents;
}

function formatKnowledgeDocument(document: KnowledgeDocumentRow) {
  const normalizedContent = normalizeMarkdown(document.content);
  const safeContent = shouldLimitProjectFile(document.source_path)
    ? normalizedContent.slice(0, MAX_PROJECT_FILE_CHARS)
    : normalizedContent;

  return `# Source: ${document.source_path}\n# Title: ${document.title}\n\n${safeContent}`;
}

async function getSupabaseKnowledge(query = '') {
  const documents = await getSupabaseKnowledgeDocuments();
  const matchingProjectFiles = getMatchingProjectFiles(query);
  const selectedFiles =
    matchingProjectFiles.length > 0
      ? [...PROJECT_QUERY_CORE_FILES, ...matchingProjectFiles]
      : [...getCoreKnowledgeFiles(query)];
  const selectedSet = new Set<string>(selectedFiles);
  const selectedDocuments = documents.filter(document =>
    selectedSet.has(document.source_path)
  );

  if (selectedDocuments.length === 0) {
    throw new Error('No matching Supabase knowledge documents found.');
  }

  return selectedDocuments
    .map(formatKnowledgeDocument)
    .join('\n\n---\n\n')
    .slice(0, MAX_KNOWLEDGE_CHARS);
}

export async function getPortfolioKnowledge(query = '') {
  const matchingProjectFiles = getMatchingProjectFiles(query);
  const selectedFiles =
    matchingProjectFiles.length > 0
      ? [...PROJECT_QUERY_CORE_FILES, ...matchingProjectFiles]
      : [...getCoreKnowledgeFiles(query)];
  const uniqueFiles = [...new Set(selectedFiles)];
  const cacheKey = uniqueFiles.join('|');

  if (process.env.NODE_ENV === 'production' && cachedKnowledge.has(cacheKey)) {
    return cachedKnowledge.get(cacheKey) as string;
  }

  const knowledge = await getSupabaseKnowledge(query);

  cachedKnowledge.set(cacheKey, knowledge);
  return knowledge;
}

export function getKnowledgeFileList() {
  return [...KNOWLEDGE_FILES];
}

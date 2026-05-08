import { readFile } from 'node:fs/promises';
import path from 'node:path';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'portfolio-knowledge');
const KNOWLEDGE_FILES = [
  'chatbot-guidelines.md',
  'about.md',
  'experience.md',
  'projects.md',
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
const MAX_KNOWLEDGE_CHARS = 160_000;

let cachedKnowledge: string | null = null;

function normalizeMarkdown(content: string) {
  return content.replace(/\r\n/g, '\n').trim();
}

export async function getPortfolioKnowledge() {
  if (cachedKnowledge && process.env.NODE_ENV === 'production') {
    return cachedKnowledge;
  }

  const sections = await Promise.all(
    KNOWLEDGE_FILES.map(async fileName => {
      const filePath = path.join(KNOWLEDGE_DIR, fileName);
      const content = await readFile(filePath, 'utf8');

      return `# Source: ${fileName}\n\n${normalizeMarkdown(content)}`;
    })
  );

  cachedKnowledge = sections.join('\n\n---\n\n').slice(0, MAX_KNOWLEDGE_CHARS);
  return cachedKnowledge;
}

export function getKnowledgeFileList() {
  return [...KNOWLEDGE_FILES];
}

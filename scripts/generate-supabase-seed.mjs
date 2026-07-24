import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const outFile = path.join(rootDir, 'supabase', 'seed.sql');

const profile = {
  slug: 'krutin-polra',
  fullName: 'Krutin Polra',
  headline:
    'Full-stack developer focused on secure, accessible, cloud-ready, and AI-powered applications.',
  location: 'Toronto, ON',
  education:
    'Computer Programming and Analysis, Advanced Diploma, Seneca Polytechnic',
  gpa: '3.2',
  websiteUrl: 'https://www.krutinpolra.com',
  resumeUrl: 'https://www.krutinpolra.com/resume.pdf',
  githubUrl: 'https://github.com/krutinpolra',
  linkedinUrl: 'https://www.linkedin.com/in/krutinpolra1444/',
  instagramUrl: 'https://www.instagram.com/k_p_1444/',
};

const projects = [
  {
    slug: 'personal-finance-agent',
    title: 'Personal Finance Agent',
    description:
      'An AI agent that reads bank and credit-card statements in any format, categorizes every transaction with a self-correcting tool-calling loop, and hands off to a second agent that reviews spending and gives budget advice.',
    longDescription:
      'A hand-built multi-agent personal finance system: an extraction agent reads statements (CSV, PDF, image, or DOCX) into structured transactions, a categorizer agent uses a deterministic merchant lookup with LLM fallback and flags its own low-confidence guesses, a self-correction pass re-checks those flagged rows with a stricter prompt, and a Budget Advisor agent reviews the categorized totals against spending benchmarks to write plain-English recommendations. Built without an agent framework (no LangChain/CrewAI) specifically to learn how agent loops and multi-agent handoffs work under the hood.',
    projectType: 'AI-powered personal finance categorization and budgeting agent',
    primaryImageUrl: '/images/finance-agent-1.png',
    githubUrl: 'https://github.com/krutinpolra/finance-agent',
    liveUrl: 'https://finance-agent-xt7dfaw8bw6sgyjptd9drr.streamlit.app',
    docsUrl: 'https://github.com/krutinpolra/finance-agent#readme',
    hueA: 95,
    hueB: 150,
    featured: true,
    displayOrder: 1,
    technologies: [
      'Python',
      'Streamlit',
      'Anthropic Claude API',
      'pandas',
      'python-docx',
      'Multi-Agent Systems',
      'Tool Calling',
    ],
    categories: ['AI', 'Python', 'full-stack'],
    images: ['/images/finance-agent-1.png', '/images/finance-agent-2.png'],
    features: [
      'Accepts one or more statements per upload in CSV, PDF, PNG/JPG, or DOCX format and merges them into a single transaction table',
      'Categorizes every transaction with a tool-calling agent that checks a deterministic known-merchant lookup first and only falls back to model judgment when needed',
      'Self-corrects by re-running anything the agent itself flags as low confidence through a stricter, reasoning-required second pass',
      'Hands the categorized summary to a second agent, a Budget Advisor, which checks category spend against budgeting benchmarks via its own tool and writes a plain-English recommendation',
      'Uses Claude native PDF/image input for extraction and python-docx for Word document text extraction',
      'Includes a hand-labeled evaluation set and script that measures categorization accuracy end-to-end',
      'Hand-rolled agent loop reused across four specialized agents instead of relying on an agent framework',
      'Deployed as a live demo on Streamlit Community Cloud',
    ],
  },
  {
    slug: 'portfolio-krutin-dev',
    title: 'Personal Portfolio',
    description:
      'A full-stack React-based portfolio showcasing my projects, skills, and design capabilities with interactive UI components and animations.',
    longDescription:
      'A modern personal portfolio built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, tsParticles, dynamic project pages, a contact workflow, and an AI-powered portfolio chatbot.',
    projectType: 'Personal portfolio website',
    primaryImageUrl: '/images/portfolio-2.png',
    githubUrl: 'https://github.com/krutinpolra/portfolio-site',
    liveUrl: 'https://krutin.dev',
    docsUrl: 'https://github.com/krutinpolra/portfolio-site#readme',
    hueA: 260,
    hueB: 320,
    featured: true,
    displayOrder: 2,
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vercel',
      'tsParticles',
    ],
    categories: ['React', 'Framer-motion', 'next.js', 'full-stack'],
    images: [
      '/images/portfolio-1.png',
      '/images/portfolio-2.png',
      '/images/portfolio-3.png',
      '/images/portfolio-4.png',
    ],
    features: [
      'Smooth section transitions and entrance animations using Framer Motion',
      'Interactive project filtering and tab navigation powered by React state and shared layout animation',
      'Theme and layout designed with Tailwind CSS for custom styling and responsiveness',
      'Particle animation backgrounds implemented using tsParticles',
      'Optimized routing and layout with Next.js App Router and dynamic routes',
      'Lazy-loading images and content for performance using Next.js Image',
      'Deployed on Vercel with custom domain, HTTPS, and automatic CI/CD',
      'Responsive design using Tailwind mobile-first utility classes',
      'SEO-friendly metadata and semantic HTML structure',
    ],
  },
  {
    slug: 'ai-tool-suite',
    title: 'AI Job Search Assistant',
    description:
      'An AI-powered career intelligence CLI that analyzes job postings, compares them against a resume, identifies skill gaps, and generates targeted application reports.',
    longDescription:
      'An end-to-end AI job search assistant that processes job posting PDFs, extracts structured role data, compares postings against a resume, researches companies, scores fit, and generates market, gap, application advisor, and evaluation reports.',
    projectType: 'AI-powered career intelligence and job application assistant',
    primaryImageUrl: '/images/AI-tool-suite-1.png',
    githubUrl: 'https://github.com/krutinpolra/AIP444',
    docsUrl: 'https://github.com/krutinpolra/AIP444#readme',
    hueA: 235,
    hueB: 290,
    featured: true,
    displayOrder: 3,
    technologies: [
      'TypeScript',
      'Node.js',
      'OpenRouter',
      'OpenAI SDK',
      'Tavily',
      'Zod',
      'PDF Processing',
      'Markdown',
      'HTML Reports',
      'CLI Development',
    ],
    categories: ['AI / Computer Vision', 'AI', 'React', 'full-stack'],
    images: [
      '/images/AI-tool-suite-1.png',
      '/images/AI-tool-suite-2.png',
      '/images/AI-tool-suite-3.png',
      '/images/AI-tool-suite-4.png',
      '/images/AI-tool-suite-5.png',
      '/images/AI-tool-suite-6.png',
    ],
    features: [
      'Processes multiple job posting PDFs and extracts structured role data such as skills, seniority, salary signals, and remote-work expectations',
      'Uses LLM-based analysis with Zod validation to produce reliable, reusable JSON and report artifacts',
      'Researches target companies with Tavily to add business context, interview angles, and application strategy',
      'Compares resume content against market demand to identify strengths, missing skills, ATS keyword gaps, and improvement priorities',
      'Generates targeted application advisor reports with fit scores, matched requirements, missing requirements, resume edits, and cover letter guidance',
      'Creates self-contained Markdown and HTML reports for market analysis, resume gap analysis, targeted applications, and evaluation results',
      'Tracks usage, supports verbose diagnostics, and gracefully handles API or research failures during CLI workflows',
      'Includes an evaluation workflow for extraction consistency, skill recall, and candidate-job fit scoring quality',
    ],
  },
  {
    slug: 'hamdel-care-platform',
    title: 'Hamdel Care Platform',
    description:
      'A full-stack care-service platform for care receivers, caregivers, and admins, covering care requests, bookings, profiles, payments, chat, support, and operational management.',
    longDescription:
      'A full-stack care-service platform designed from a detailed SRS for matching care receivers with caregivers, managing bookings, handling payments, enabling chat and support workflows, and giving admins operational control across users, orders, finance, compliance, and content.',
    projectType: 'Full-stack care-service and admin management platform',
    primaryImageUrl: '/images/hamdel-1.png',
    hueA: 195,
    hueB: 155,
    featured: true,
    displayOrder: 4,
    technologies: [
      'Full-Stack',
      'React',
      'Node.js',
      'Database Design',
      'Role-Based Access Control',
      'Admin Dashboard',
      'Booking System',
      'Payment Workflows',
      'Chat System',
      'SRS Analysis',
    ],
    categories: ['full-stack', 'React'],
    images: Array.from({ length: 13 }, (_, index) => `/images/hamdel-${index + 1}.png`),
    features: [
      'Separate Care Receiver and Care Giver experiences with profile, booking, availability, review, settings, and support flows',
      'Care request and booking workflows with recipient selection, medical information, preferences, active history, completed invoices, and caregiver matching',
      'In-app chat model for active bookings, browsable completed chat history, support tickets, and flagged-message moderation',
      'Address book and loved-one management with residence details, safety plans, emergency contacts, accessibility needs, and care preferences',
      'Wallet, payment, invoice, payout, refund, promo-code, campaign, and finance-management requirements for end-to-end service operations',
      'Role-based admin panel covering super admin, operations, customer support, finance, CMS, marketing, compliance, and technical administration',
      'Admin modules for order management, caregiver management, care receiver management, complaints, tickets, reports, audit logs, and technical tools',
      'AI-enabled FAQ and help-centre support requirements for both care receivers and caregivers',
    ],
  },
  {
    slug: 'fragments-Microservice',
    title: 'Fragments Microservice',
    description:
      'A robust cloud-native microservice built for text/image storage, format conversion, and secure user isolation using AWS services and modern DevOps practices.',
    longDescription:
      'A file storage and conversion API supporting text, JSON, Markdown, HTML, CSV, and image fragments, with authenticated ownership, metadata/content separation, AWS integrations, Docker, CI/CD, and automated testing.',
    projectType: 'Cloud-native backend API',
    primaryImageUrl: '/images/fragment-microservice-1.png',
    githubUrl: 'https://github.com/krutinpolra/fragments',
    docsUrl: 'https://github.com/krutinpolra/fragments#readme',
    hueA: 230,
    hueB: 270,
    featured: true,
    displayOrder: 5,
    technologies: [
      'Node.js',
      'Express',
      'AWS ECS',
      'DynamoDB',
      'S3',
      'Cognito',
      'Docker',
      'GitHub Actions',
      'Markdown-it',
      'Sharp',
    ],
    categories: ['full-stack', 'cloud'],
    images: [
      '/images/fragment-microservice-1.png',
      '/images/fragment-microservice-2.png',
    ],
    features: [
      'CRUD API for text, JSON, Markdown, HTML, CSV, and image formats',
      'Convert between formats such as Markdown to HTML and PNG to JPEG',
      'User authentication with AWS Cognito',
      'DynamoDB and S3 for persistent storage',
      'Dockerized with CI/CD workflows via GitHub Actions',
      'Integration and unit testing with strong coverage goals',
      'Cloud-ready deployment architecture with AWS ECS, load balancing, and logs',
    ],
  },
  {
    slug: 'hotel-reservation-system',
    title: 'Hotel Reservation System',
    description:
      'A full-stack Java-based hotel management platform with booking, cancellation, and staff assignment modules.',
    longDescription:
      'A desktop hotel reservation system where guests can book rooms and administrators can manage rooms, bookings, cancellations, checkout, billing, and guest search through a JavaFX and SQLite application.',
    projectType: 'Desktop application',
    primaryImageUrl: '/images/hotel-reservation-1.png',
    githubUrl:
      'https://github.com/krutinpolra/Application-Development-Workshops/tree/main/final%20project/HotelReservation',
    docsUrl:
      'https://github.com/krutinpolra/Application-Development-Workshops/tree/main/final%20project/HotelReservation#readme',
    videoDemoUrl:
      'https://github.com/krutinpolra/Application-Development-Workshops/tree/main/final%20project/video%20and%20reflaction',
    hueA: 280,
    hueB: 320,
    displayOrder: 6,
    technologies: [
      'Java',
      'JavaFX',
      'SQLite',
      'JDBC',
      'MVC Architecture',
      'CSS',
      'SceneBuilder',
    ],
    categories: ['Java'],
    images: [
      '/images/hotel-reservation-1.png',
      '/images/hotel-reservation-2.png',
      '/images/hotel-reservation-3.png',
    ],
    features: [
      'Room search, availability check, and booking flow using JavaFX scene transitions',
      'Real-time guest check-in/check-out tracking with persistent storage via SQLite',
      'Reservation editing, cancellation, and validation logic using Java collections and event handlers',
      'Clean MVC architecture with controller, view, and model layers',
      'Guest, booking, and room data managed via DAO pattern using JDBC',
      'Admin dashboard to manage rooms, guests, and reservations',
      'Custom JavaFX CSS for modern UI states and accessibility improvements',
      'Parameterized SQL queries to reduce SQL injection risk',
      'Exported as a standalone runnable JAR for deployment and testing',
    ],
  },
  {
    slug: 'culinary-parcel',
    title: 'Culinary Parcel',
    description:
      'A reward-based sustainability tracker that promotes eco-friendly habits through gamification and habit tracking.',
    longDescription:
      'A full-stack culinary subscription platform offering dynamic meal kit listings, secure login, session-based authenticated user flows, MongoDB persistence, EJS pages, Bootstrap, Tailwind CSS, and custom layouts.',
    projectType: 'Full-stack web application',
    primaryImageUrl: '/images/culinary-parcel-1.png',
    githubUrl: 'https://github.com/krutinpolra/WEB322-kbpolra',
    liveUrl: 'https://web-322-kbpolra.vercel.app',
    docsUrl: 'https://github.com/krutinpolra/WEB322-kbpolra#readme',
    hueA: 160,
    hueB: 200,
    displayOrder: 7,
    technologies: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'EJS',
      'Bootstrap',
      'Tailwind CSS',
      'Sessions',
    ],
    categories: ['full-stack'],
    images: [
      '/images/culinary-parcel-1.png',
      '/images/culinary-parcel-2.png',
      '/images/culinary-parcel-3.png',
    ],
    features: [
      'Secure user authentication and login system using session-based Express middleware',
      'Dynamic listing of curated meal kits using MongoDB',
      'Personalized user dashboard with options to browse, view, and order kits',
      'Responsive UI design with Tailwind CSS, Bootstrap, and custom EJS layouts',
      'Modular file structure separating routes, views, controllers, and public assets',
      'RESTful routes for kit listing, order processing, and user interaction',
      'Order history and user data handled through session-based tracking',
    ],
  },
  {
    slug: 'met-museum-explorer',
    title: 'Met Museum Explorer',
    description:
      'An interactive artwork browser that lets users explore, search, and save pieces from the Met Collection. Features real-time filtering, favorites, and JWT-secured user sessions with MongoDB.',
    longDescription:
      'An API-driven artwork exploration app powered by the Metropolitan Museum of Art Collection API, with search, filtering, artwork details, favorites, recently viewed history, JWT authentication, MongoDB-backed APIs, and Jotai state management.',
    projectType: 'API-driven web application',
    primaryImageUrl: '/images/met-1.png',
    githubUrl: 'https://github.com/krutinpolra/met-museum',
    liveUrl: 'https://met-museum-wine.vercel.app',
    docsUrl: 'https://github.com/krutinpolra/met-museum#readme',
    hueA: 180,
    hueB: 210,
    displayOrder: 8,
    technologies: [
      'Next.js',
      'React',
      'Jotai',
      'MongoDB',
      'JWT',
      'Bootstrap',
      'Met Museum API',
    ],
    categories: ['full-stack', 'API Integration', 'React'],
    images: ['/images/met-1.png', '/images/met-2.png', '/images/met-3.png'],
    features: [
      'Fetches and displays artwork using the Met Museum Collection API',
      'Search and filter results with query parameters',
      'Favorites functionality using Jotai atoms and persisted state',
      'Recently viewed history tracking for navigation',
      'Clean dynamic routing using Next.js App Router',
      'Global state management with Jotai',
      'JWT-based authentication with MongoDB backend',
      'RESTful API endpoints for favorites and history',
      'Responsive design styled with Bootstrap and custom CSS',
    ],
  },
];

const experiences = [
  {
    slug: 'my-benefits-platform',
    title: 'My Benefits Platform',
    subtitle:
      'A public-sector benefits platform focused on secure, accessible, and maintainable digital service delivery.',
    role: 'Software Developer Co-op',
    organization: 'Ontario Ministry (MPBSDP)',
    location: 'Toronto, ON',
    period: 'May 2025 - Dec 2025',
    category: 'Public Sector',
    liveUrl: 'https://mybenefits.mcss.gov.on.ca/auth/login',
    publishedDate: '2025-05-01',
    updatedDate: '2025-12-01',
    displayOrder: 1,
    summary:
      'Built and improved My Benefits, a large-scale Angular application serving Ontario residents with secure and accessible digital services.',
    technologies: ['Angular', 'TypeScript', 'REST APIs', 'Azure DevOps', 'WCAG'],
    metrics: [
      { value: '80%', label: 'Test coverage lift' },
      { value: '25%', label: 'Maintainability gain' },
      { value: '20%', label: 'Vulnerability reduction' },
    ],
    highlights: [
      'Contributed to secure UI components and API integrations for a public-sector web platform.',
      'Resolved SonarQube issues and strengthened code quality across production workflows.',
      'Supported OWASP ZAP testing, CI/CD delivery, and accessibility-focused design review.',
    ],
    sections: [
      {
        title: 'Why This Work Mattered',
        body: [
          'Public-sector applications have to be reliable, accessible, and predictable for people who depend on them.',
          'The work gave me production experience with enterprise workflows, accessibility expectations, security testing, and CI/CD practices in Azure DevOps.',
        ],
      },
      {
        title: 'How It Worked',
        body: [
          'The platform used Angular, TypeScript, HTML, CSS, REST APIs, and enterprise delivery workflows.',
          'I contributed to user-facing components, API-connected screens, quality improvements, and accessibility-aligned implementation work.',
        ],
      },
      {
        title: 'Key Decisions',
        bullets: [
          'Prioritized maintainable TypeScript and Angular patterns.',
          'Treated accessibility as part of implementation.',
          'Used SonarQube feedback and test coverage improvements as production-readiness signals.',
          'Supported security review through OWASP ZAP testing.',
        ],
      },
      {
        title: 'Challenges',
        quote:
          'The main challenge was working in a high-trust environment where quality, security, accessibility, and consistency all mattered at the same time.',
        bullets: [
          'Balancing delivery speed with accessibility and security expectations.',
          'Understanding existing enterprise code paths before making changes.',
          'Keeping UI implementation aligned with detailed designs and requirements.',
        ],
      },
    ],
  },
];

const skillGroups = [
  {
    name: 'Frontend Development',
    skills: [
      'React.js',
      'Next.js',
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'SASS',
      'Bootstrap',
      'Framer Motion',
      'Figma',
    ],
  },
  {
    name: 'Backend Development',
    skills: [
      'Node.js',
      'Express.js',
      'Java',
      'Python',
      'C',
      'C++',
      'REST API Design',
      'Postman',
      'Thunder Client',
    ],
  },
  {
    name: 'Databases And Data Systems',
    skills: [
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'Supabase',
      'SQLite',
      'DynamoDB',
      'Data Modeling',
      'ER Diagram Design',
    ],
  },
  {
    name: 'Cloud And Deployment',
    skills: [
      'AWS EC2',
      'AWS S3',
      'AWS DynamoDB',
      'AWS Cognito',
      'Microsoft Azure',
      'Docker',
      'GitHub Actions',
      'Azure DevOps',
      'Vercel',
      'Netlify',
      'Git',
      'GitHub',
      'GitLab',
    ],
  },
  {
    name: 'AI And Applied Intelligence',
    skills: [
      'OpenAI API',
      'LangChain',
      'RAG Concepts',
      'Embeddings',
      'Semantic Search',
      'AI Agents',
      'Tool Calling',
      'Structured Outputs',
      'Zod',
      'TensorFlow',
      'PyTorch',
      'scikit-learn',
      'OpenCV',
    ],
  },
  {
    name: 'Testing, Security And Quality',
    skills: [
      'Selenium',
      'SonarQube',
      'OWASP ZAP',
      'WCAG',
      'Secure API Practices',
      'Input Validation',
      'CI/CD',
    ],
  },
];

const contactLinks = [
  {
    label: 'Portfolio',
    url: 'https://www.krutinpolra.com',
    kind: 'website',
    isPrimary: true,
  },
  {
    label: 'Portfolio Contact Form',
    url: 'https://www.krutinpolra.com/#contact',
    kind: 'contact',
    isPrimary: true,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/krutinpolra1444/',
    kind: 'linkedin',
    isPrimary: true,
  },
  {
    label: 'GitHub',
    url: 'https://github.com/krutinpolra',
    kind: 'github',
    isPrimary: false,
  },
  {
    label: 'Resume',
    url: 'https://www.krutinpolra.com/resume.pdf',
    kind: 'resume',
    isPrimary: false,
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/k_p_1444/',
    kind: 'instagram',
    isPrimary: false,
  },
];

const knowledgeFiles = [
  { sourcePath: 'about.md', title: 'About Krutin Polra', projectSlug: null },
  { sourcePath: 'experience.md', title: 'Work Experience', projectSlug: null },
  { sourcePath: 'skills.md', title: 'Skills', projectSlug: null },
  { sourcePath: 'contact.md', title: 'Contact And Public Profiles', projectSlug: null },
  { sourcePath: 'projects.md', title: 'Projects Overview', projectSlug: null },
  {
    sourcePath: 'projects/personal_finance_agent.md',
    title: 'Personal Finance Agent Knowledge Base',
    projectSlug: 'personal-finance-agent',
  },
  {
    sourcePath: 'projects/portfolio.md',
    title: 'Personal Portfolio Knowledge Base',
    projectSlug: 'portfolio-krutin-dev',
  },
  {
    sourcePath: 'projects/ai_tool_suite.md',
    title: 'AI Job Search Assistant Knowledge Base',
    projectSlug: 'ai-tool-suite',
  },
  {
    sourcePath: 'projects/hamdel.md',
    title: 'Hamdel Care Platform Knowledge Base',
    projectSlug: 'hamdel-care-platform',
  },
  {
    sourcePath: 'projects/fragments.md',
    title: 'Fragments Project Knowledge Base',
    projectSlug: 'fragments-Microservice',
  },
  {
    sourcePath: 'projects/hotel_reservation.md',
    title: 'Hotel Reservation Project Knowledge Base',
    projectSlug: 'hotel-reservation-system',
  },
  {
    sourcePath: 'projects/culinary.md',
    title: 'Culinary Parcel Knowledge Base',
    projectSlug: 'culinary-parcel',
  },
  {
    sourcePath: 'projects/met.md',
    title: 'Met Museum Explorer Knowledge Base',
    projectSlug: 'met-museum-explorer',
  },
];

function sql(value) {
  if (value === null || value === undefined || value === '') return 'null';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return `'${String(value).replaceAll("'", "''")}'`;
}

function sqlArray(values) {
  if (!values?.length) return 'null';
  return `array[${values.map(sql).join(', ')}]::text[]`;
}

function statement(strings, ...values) {
  return strings
    .map((part, index) => `${part}${values[index] ?? ''}`)
    .join('')
    .trim();
}

async function readKnowledgeContent(sourcePath) {
  return readFile(path.join(rootDir, 'portfolio-knowledge', sourcePath), 'utf8');
}

const lines = [
  '-- Generated portfolio seed data. Safe to run multiple times.',
  'begin;',
  '',
];

lines.push(statement`
insert into public.portfolio_profiles (
  slug, full_name, headline, summary, location, education, gpa,
  website_url, resume_url, github_url, linkedin_url, instagram_url
) values (
  ${sql(profile.slug)}, ${sql(profile.fullName)}, ${sql(profile.headline)},
  ${sql('Full-stack developer with production experience, strong project work, and growing applied AI engineering focus.')},
  ${sql(profile.location)}, ${sql(profile.education)}, ${sql(profile.gpa)},
  ${sql(profile.websiteUrl)}, ${sql(profile.resumeUrl)}, ${sql(profile.githubUrl)},
  ${sql(profile.linkedinUrl)}, ${sql(profile.instagramUrl)}
)
on conflict (slug) do update set
  full_name = excluded.full_name,
  headline = excluded.headline,
  summary = excluded.summary,
  location = excluded.location,
  education = excluded.education,
  gpa = excluded.gpa,
  website_url = excluded.website_url,
  resume_url = excluded.resume_url,
  github_url = excluded.github_url,
  linkedin_url = excluded.linkedin_url,
  instagram_url = excluded.instagram_url;
`);

for (const [projectIndex, project] of projects.entries()) {
  lines.push(statement`
insert into public.projects (
  slug, title, description, long_description, project_type, primary_image_url,
  github_url, live_url, docs_url, video_demo_url, hue_a, hue_b, featured,
  display_order, status
) values (
  ${sql(project.slug)}, ${sql(project.title)}, ${sql(project.description)},
  ${sql(project.longDescription)}, ${sql(project.projectType)}, ${sql(project.primaryImageUrl)},
  ${sql(project.githubUrl)}, ${sql(project.liveUrl)}, ${sql(project.docsUrl)},
  ${sql(project.videoDemoUrl)}, ${sql(project.hueA)}, ${sql(project.hueB)},
  ${sql(Boolean(project.featured))}, ${sql(project.displayOrder ?? projectIndex + 1)}, 'published'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  long_description = excluded.long_description,
  project_type = excluded.project_type,
  primary_image_url = excluded.primary_image_url,
  github_url = excluded.github_url,
  live_url = excluded.live_url,
  docs_url = excluded.docs_url,
  video_demo_url = excluded.video_demo_url,
  hue_a = excluded.hue_a,
  hue_b = excluded.hue_b,
  featured = excluded.featured,
  display_order = excluded.display_order,
  status = excluded.status;
`);

  lines.push(`delete from public.project_images where project_id = (select id from public.projects where slug = ${sql(project.slug)});`);
  for (const [index, imageUrl] of project.images.entries()) {
    lines.push(statement`
insert into public.project_images (project_id, image_url, alt_text, display_order)
select id, ${sql(imageUrl)}, ${sql(`${project.title} screenshot ${index + 1}`)}, ${index + 1}
from public.projects where slug = ${sql(project.slug)};
`);
  }

  lines.push(`delete from public.project_features where project_id = (select id from public.projects where slug = ${sql(project.slug)});`);
  for (const [index, feature] of project.features.entries()) {
    lines.push(statement`
insert into public.project_features (project_id, feature_text, display_order)
select id, ${sql(feature)}, ${index + 1}
from public.projects where slug = ${sql(project.slug)};
`);
  }

  for (const tech of project.technologies) {
    lines.push(`insert into public.technologies (name) values (${sql(tech)}) on conflict (name) do nothing;`);
  }

  lines.push(`delete from public.project_technologies where project_id = (select id from public.projects where slug = ${sql(project.slug)});`);
  for (const [index, tech] of project.technologies.entries()) {
    lines.push(statement`
insert into public.project_technologies (project_id, technology_id, display_order)
select p.id, t.id, ${index + 1}
from public.projects p
join public.technologies t on t.name = ${sql(tech)}
where p.slug = ${sql(project.slug)}
on conflict (project_id, technology_id) do update set display_order = excluded.display_order;
`);
  }

  for (const category of project.categories) {
    lines.push(`insert into public.categories (name) values (${sql(category)}) on conflict (name) do nothing;`);
  }

  lines.push(`delete from public.project_categories where project_id = (select id from public.projects where slug = ${sql(project.slug)});`);
  for (const category of project.categories) {
    lines.push(statement`
insert into public.project_categories (project_id, category_id)
select p.id, c.id
from public.projects p
join public.categories c on c.name = ${sql(category)}
where p.slug = ${sql(project.slug)}
on conflict (project_id, category_id) do nothing;
`);
  }
}

for (const [experienceIndex, experience] of experiences.entries()) {
  lines.push(statement`
insert into public.experiences (
  slug, title, subtitle, role, organization, location, period, category,
  summary, live_url, repo_url, published_date, updated_date, display_order
) values (
  ${sql(experience.slug)}, ${sql(experience.title)}, ${sql(experience.subtitle)},
  ${sql(experience.role)}, ${sql(experience.organization)}, ${sql(experience.location)},
  ${sql(experience.period)}, ${sql(experience.category)}, ${sql(experience.summary)},
  ${sql(experience.liveUrl)}, ${sql(experience.repoUrl)}, ${sql(experience.publishedDate)},
  ${sql(experience.updatedDate)}, ${sql(experience.displayOrder ?? experienceIndex + 1)}
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  role = excluded.role,
  organization = excluded.organization,
  location = excluded.location,
  period = excluded.period,
  category = excluded.category,
  summary = excluded.summary,
  live_url = excluded.live_url,
  repo_url = excluded.repo_url,
  published_date = excluded.published_date,
  updated_date = excluded.updated_date,
  display_order = excluded.display_order;
`);

  lines.push(`delete from public.experience_highlights where experience_id = (select id from public.experiences where slug = ${sql(experience.slug)});`);
  for (const [index, highlight] of experience.highlights.entries()) {
    lines.push(statement`
insert into public.experience_highlights (experience_id, highlight_text, display_order)
select id, ${sql(highlight)}, ${index + 1}
from public.experiences where slug = ${sql(experience.slug)};
`);
  }

  lines.push(`delete from public.experience_metrics where experience_id = (select id from public.experiences where slug = ${sql(experience.slug)});`);
  for (const [index, metric] of experience.metrics.entries()) {
    lines.push(statement`
insert into public.experience_metrics (experience_id, value, label, display_order)
select id, ${sql(metric.value)}, ${sql(metric.label)}, ${index + 1}
from public.experiences where slug = ${sql(experience.slug)};
`);
  }

  lines.push(`delete from public.experience_sections where experience_id = (select id from public.experiences where slug = ${sql(experience.slug)});`);
  for (const [index, section] of experience.sections.entries()) {
    lines.push(statement`
insert into public.experience_sections (experience_id, title, body, quote, bullets, display_order)
select id, ${sql(section.title)}, ${sqlArray(section.body)}, ${sql(section.quote)}, ${sqlArray(section.bullets)}, ${index + 1}
from public.experiences where slug = ${sql(experience.slug)};
`);
  }

  for (const tech of experience.technologies) {
    lines.push(`insert into public.technologies (name) values (${sql(tech)}) on conflict (name) do nothing;`);
  }

  lines.push(`delete from public.experience_technologies where experience_id = (select id from public.experiences where slug = ${sql(experience.slug)});`);
  for (const [index, tech] of experience.technologies.entries()) {
    lines.push(statement`
insert into public.experience_technologies (experience_id, technology_id, display_order)
select e.id, t.id, ${index + 1}
from public.experiences e
join public.technologies t on t.name = ${sql(tech)}
where e.slug = ${sql(experience.slug)}
on conflict (experience_id, technology_id) do update set display_order = excluded.display_order;
`);
  }
}

for (const [groupIndex, group] of skillGroups.entries()) {
  lines.push(statement`
insert into public.skill_groups (name, display_order)
values (${sql(group.name)}, ${groupIndex + 1})
on conflict (name) do update set display_order = excluded.display_order;
`);

  for (const [skillIndex, skill] of group.skills.entries()) {
    lines.push(statement`
insert into public.skills (skill_group_id, name, display_order)
select id, ${sql(skill)}, ${skillIndex + 1}
from public.skill_groups where name = ${sql(group.name)}
on conflict (skill_group_id, name) do update set display_order = excluded.display_order;
`);
  }
}

lines.push('delete from public.contact_links;');
for (const [index, link] of contactLinks.entries()) {
  lines.push(statement`
insert into public.contact_links (label, url, kind, is_primary, display_order)
values (${sql(link.label)}, ${sql(link.url)}, ${sql(link.kind)}, ${sql(link.isPrimary)}, ${index + 1});
`);
}

lines.push('delete from public.knowledge_documents;');
for (const [index, doc] of knowledgeFiles.entries()) {
  const content = await readKnowledgeContent(doc.sourcePath);
  lines.push(statement`
insert into public.knowledge_documents (
  project_id, source_path, title, document_type, content, display_order
)
select p.id, ${sql(doc.sourcePath)}, ${sql(doc.title)}, 'markdown', ${sql(content)}, ${index + 1}
from (select ${sql(doc.projectSlug)}::text as slug) input
left join public.projects p on p.slug = input.slug
where input.slug is not null
union all
select null, ${sql(doc.sourcePath)}, ${sql(doc.title)}, 'markdown', ${sql(content)}, ${index + 1}
where ${sql(doc.projectSlug)} is null
on conflict (source_path) do update set
  project_id = excluded.project_id,
  title = excluded.title,
  document_type = excluded.document_type,
  content = excluded.content,
  display_order = excluded.display_order;
`);
}

lines.push('', 'commit;', '');

await mkdir(path.dirname(outFile), { recursive: true });
await writeFile(outFile, `${lines.join('\n\n')}`, 'utf8');

console.log(`Wrote ${path.relative(rootDir, outFile)}`);

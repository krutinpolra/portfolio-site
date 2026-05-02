export interface ExperienceMetric {
  value: string;
  label: string;
}

export interface ExperienceSection {
  title: string;
  body?: string[];
  bullets?: string[];
  quote?: string;
}

export interface ExperienceDetail {
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  category: string;
  tech: string[];
  published: string;
  updated: string;
  urlLabel?: string;
  live?: string;
  repo?: string;
  summary: string;
  metrics: ExperienceMetric[];
  highlights: string[];
  sections: ExperienceSection[];
}

export const experienceDetails: ExperienceDetail[] = [
  {
    slug: 'my-benefits-platform',
    title: 'My Benefits Platform',
    subtitle:
      'A public-sector benefits platform focused on secure, accessible, and maintainable digital service delivery.',
    type: 'Public-sector Web App',
    role: 'Software Developer Co-op',
    organization: 'Ontario Ministry (MPBSDP)',
    location: 'Toronto, ON',
    period: 'May 2025 - Dec 2025',
    category: 'Public Sector',
    tech: ['Angular', 'TypeScript', 'REST APIs', 'Azure DevOps', 'WCAG'],
    published: '2025-05-01',
    updated: '2025-12-01',
    urlLabel: 'My Benefits login',
    live: 'https://mybenefits.mcss.gov.on.ca/auth/login',
    summary:
      'Built and improved My Benefits, a large-scale Angular application serving Ontario residents with secure and accessible digital services.',
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
          'Public-sector applications have to be reliable, accessible, and predictable for people who depend on them. My focus was not only shipping UI changes, but improving the quality and trustworthiness of the platform around those changes.',
          'The work gave me production experience with enterprise workflows, accessibility expectations, security testing, and CI/CD practices in Azure DevOps.',
        ],
      },
      {
        title: 'How It Worked',
        body: [
          'The platform used Angular, TypeScript, HTML, CSS, REST APIs, and enterprise delivery workflows. I contributed to user-facing components, API-connected screens, quality improvements, and accessibility-aligned implementation work.',
          'I worked from detailed UI designs and requirements, then validated the implementation against functional, non-functional, and accessibility expectations.',
        ],
      },
      {
        title: 'Key Decisions',
        bullets: [
          'Prioritized maintainable TypeScript and Angular patterns so future changes could be made safely.',
          'Treated accessibility as part of the implementation, not a final polish task.',
          'Used SonarQube feedback and test coverage improvements as signals for production readiness.',
          'Supported security review through OWASP ZAP testing and vulnerability remediation workflows.',
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
      {
        title: 'What I Learned',
        body: [
          'I learned how much production engineering depends on small quality decisions: test coverage, clean error handling, accessibility, code review, and secure delivery practices all compound.',
          'This experience directly supports my current interest in applied AI engineering because AI-powered tools still need strong product foundations: reliable interfaces, secure APIs, observable workflows, and accessible user experiences.',
        ],
      },
    ],
  },
];

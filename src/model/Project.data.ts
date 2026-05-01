import type { Project } from './projectModel/project.model';

export const projects: Project[] = [
  {
    title: 'Personal Portfolio',
    description:
      'A full-stack React-based portfolio showcasing my projects, skills, and design capabilities with interactive UI components and animations.',
    image: '/images/portfolio-2.png',
    techStack: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    hueA: 270,
    hueB: 310,
    slug: 'portfolio-krutin-dev',
    Category: ['React', 'Framer-motion', 'next.js', 'full-stack'],
  },
  {
    title: 'Fragments API',
    description:
      'A file storage and conversion API supporting Markdown rendering, image transformations, and AWS integrations.',
    image: '/images/fragment-microservice-1.png', // replace with your actual image path
    techStack: ['Node.js', 'Express', 'AWS', 'MongoDB'],
    hueA: 235,
    hueB: 265,
    slug: 'fragments-Microservice',
    Category: ['full-stack', 'cloud'],
  },
  {
    title: 'Hotel Booking System',
    description:
      'A full-stack Java-based hotel management platform with booking, cancellation, and staff assignment modules.',
    image: '/images/hotel-reservation-1.png',
    techStack: ['Java', 'JavaFX', 'SQLite'],
    hueA: 270,
    hueB: 310,
    slug: 'hotel-reservation-system',
    Category: ['Java'],
  },
  {
    title: 'Culinary Parcel',
    description:
      'A reward-based sustainability tracker that promotes eco-friendly habits through gamification and habit tracking.',
    image: '/images/culinary-parcel-1.png',
    techStack: ['Ejs', 'JavaScript', 'MongoDB'],
    hueA: 145,
    hueB: 175,
    slug: 'culinary-parcel',
    Category: ['full-stack'],
  },
  {
    title: 'Met Museum Explorer',
    description:
      'An interactive artwork browser that lets users explore, search, and save pieces from the Met Collection. Features real-time filtering, favorites, and JWT-secured user sessions with MongoDB.',
    image: '/images/met-1.png',
    techStack: ['Next.js', 'Jotai', 'MongoDB', 'JWT', 'Bootstrap'],
    hueA: 180,
    hueB: 210,
    slug: 'met-museum-explorer',
    Category: ['full-stack', 'API Integration', 'React'],
  },
];

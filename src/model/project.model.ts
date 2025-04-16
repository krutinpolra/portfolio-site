export interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  hueA: number;
  hueB: number;
  slug: string;
  github: string;
  live: string;
}

export const projects: Project[] = [
  {
    title: 'Fragments API',
    description:
      'A file storage and conversion API supporting Markdown rendering, image transformations, and AWS integrations.',
    image: '/images/fragments-api.png', // replace with your actual image path
    techStack: ['Node.js', 'Express', 'AWS', 'MongoDB'],
    hueA: 235,
    hueB: 265,
    slug: 'fragments-api',
    github: 'https://github.com/krutinpolra/fragments-api',
    live: 'https://fragments.krutin.dev', // example: replace with actual
  },
  {
    title: 'Plastic Snap',
    description:
      'A reward-based sustainability tracker that promotes eco-friendly habits through gamification and habit tracking.',
    image: '/images/plastic-snap.png',
    techStack: ['React', 'Next.js', 'MongoDB'],
    hueA: 145,
    hueB: 175,
    slug: 'plastic-snap',
    github: 'https://github.com/krutinpolra/plastic-snap',
    live: 'https://plasticsnap.krutin.dev',
  },
  {
    title: 'Hotel Booking System',
    description:
      'A full-stack Java-based hotel management platform with booking, cancellation, and staff assignment modules.',
    image: '/images/hotel-booking.png',
    techStack: ['Java', 'JavaFX', 'SQLite'],
    hueA: 270,
    hueB: 310,
    slug: 'hotel-booking-system',
    github: 'https://github.com/krutinpolra/hotel-booking-system',
    live: 'https://hotel.krutin.dev',
  },
];

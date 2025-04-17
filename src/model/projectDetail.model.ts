export interface ProjectDetail {
  slug: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  images: string[];
  github: string;
  live?: string;
  videoDemo?: string;
  docsLink?: string;
  hueA: number;
  hueB: number;
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'fragments-Microservice',
    title: 'Fragments Microservice',
    description:
      'A robust cloud-native microservice built for text/image storage, format conversion, and secure user isolation using AWS services and modern DevOps practices.',
    features: [
      'CRUD API for text, JSON, Markdown, HTML, CSV, and image formats',
      'Convert between formats (e.g., Markdown → HTML, PNG → JPEG)',
      'User authentication with AWS Cognito (OAuth2)',
      'DynamoDB and S3 for persistent storage',
      'Dockerized with CI/CD workflows via GitHub Actions',
      'Integration and unit testing with 85%+ coverage',
      'Live deployment to AWS ECS with load balancing and logs in CloudWatch',
    ],
    techStack: [
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
    images: [
      '/images/fragment-microservice-1.png',
      '/images/fragment-microservice-2.png',
    ],
    github: 'https://github.com/krutinpolra/fragments',
    docsLink: 'https://github.com/krutinpolra/fragments#readme',
    hueA: 230,
    hueB: 270,
  },
  {
    slug: 'portfolio-krutin-dev',
    title: 'Krutin.dev Portfolio',
    description:
      'A visually modern, fully responsive personal portfolio built with Next.js and Framer Motion to showcase my projects, skills, and design capabilities with interactive UI components and animations.',
    features: [
      '🔁 Smooth section transitions and entrance animations using **Framer Motion**',
      '🎯 Interactive project filtering and tab navigation powered by **React state** and **Framer Motion shared layout**',
      '🎨 Theme and layout designed with **Tailwind CSS** for rapid custom styling and responsiveness',
      '🪄 Particle animation backgrounds implemented using **tsParticles** to add visual depth',
      '🧭 Optimized routing and layout with **Next.js App Router** and **dynamic routes**',
      '⚡ Lazy-loading images and content for performance using **Next.js Image component**',
      '🌐 Deployed on **Vercel** with custom domain, HTTPS, and automatic CI/CD',
      '📱 Fully responsive design using Tailwind’s **mobile-first utility classes**',
      '🔍 SEO-friendly metadata and **semantic HTML5** structure for better indexing and accessibility',
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vercel',
      'tsParticles',
    ],
    images: [
      '/images/portfolio-1.png',
      '/images/portfolio-2.png',
      '/images/portfolio-3.png',
      '/images/portfolio-4.png',
    ],
    github: 'https://github.com/krutinpolra/portfolio-site',
    live: 'https://krutin.dev',
    docsLink: 'https://github.com/krutinpolra/portfolio-site#readme',
    hueA: 260,
    hueB: 320,
  },
  {
    slug: 'hotel-reservation-system',
    title: 'Hotel Reservation System',
    description:
      'A full-featured desktop application to manage hotel bookings, guest check-ins, room allocations, and cancellations. Built with JavaFX and SQLite, it follows the MVC pattern and provides an intuitive admin interface for seamless hotel operations.',
    features: [
      '🔍 Room search, availability check, and booking flow using **JavaFX scene transitions**',
      '🛎️ Real-time guest check-in/check-out tracking with persistent storage via **SQLite**',
      '📝 Reservation editing, cancellation, and validation logic using **Java collections and event handlers**',
      '🏗️ Clean MVC architecture with dedicated **controller**, **view**, and **model** layers',
      '📦 Guest, booking, and room data managed via **DAO pattern** using **JDBC**',
      '🧑‍💼 Admin dashboard to manage rooms, guests, and reservations efficiently',
      '🎨 Custom **JavaFX CSS** for a modern UI with hover effects, focus states, and accessibility enhancements',
      '🛡️ Parameterized **SQL queries** to prevent SQL injection and secure data operations',
      '📦 Exported as a **standalone runnable JAR** file for seamless deployment and testing',
    ],
    techStack: [
      'Java',
      'JavaFX',
      'SQLite',
      'JDBC',
      'MVC Architecture',
      'CSS',
      'SceneBuilder',
    ],
    images: [
      '/images/hotel-reservation-1.png',
      '/images/hotel-reservation-2.png',
      '/images/hotel-reservation-3.png',
    ],
    github:
      'https://github.com/krutinpolra/Application-Development-Workshops/tree/main/final%20project/HotelReservation',
    docsLink:
      'https://github.com/krutinpolra/Application-Development-Workshops/tree/main/final%20project/HotelReservation#readme',
    videoDemo:
      'https://github.com/krutinpolra/Application-Development-Workshops/tree/main/final%20project/video%20and%20reflaction',
    hueA: 280,
    hueB: 320,
  },
  {
    slug: 'culinary-parcel',
    title: 'Culinary Parcel',
    description:
      'A full-stack culinary subscription platform offering dynamic meal kit listings, secure login, and an interactive user experience for food enthusiasts.',
    features: [
      '🔐 Secure user authentication and login system using **session-based Express middleware**',
      '📦 Dynamic listing of curated meal kits using **MongoDB** for real-time updates and scalability',
      '🧑‍🍳 Personalized user dashboard with options to browse, view, and order kits built using **EJS and Bootstrap**',
      '📸 Responsive UI design with appealing visuals and smooth interactions using **Tailwind CSS** and **custom EJS layouts**',
      '📁 Modular file structure separating routes, views, controllers, and public assets',
      '🛠️ RESTful routes for kit listing, order processing, and user interaction using **Express.js**',
      '🧾 Order history and user data securely handled and displayed through **session-based tracking**',
    ],
    techStack: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'EJS',
      'Bootstrap',
      'Tailwind CSS',
      'Sessions',
    ],
    images: [
      '/images/culinary-parcel-1.png',
      '/images/culinary-parcel-2.png',
      '/images/culinary-parcel-3.png',
    ],
    github: 'https://github.com/krutinpolra/WEB322-kbpolra',
    live: 'https://web-322-kbpolra.vercel.app',
    docsLink: 'https://github.com/krutinpolra/WEB322-kbpolra#readme',
    hueA: 160,
    hueB: 200,
  },
  {
    slug: 'met-museum-explorer',
    title: 'Met Museum Explorer',
    description:
      'An interactive art exploration platform powered by the Metropolitan Museum of Art Collection API. Users can browse, search, and save favorite artworks with real-time filtering and history tracking.',
    features: [
      '🖼️ Fetches and displays over 400,000+ artworks using the **Met Museum Collection API**',
      '🔍 Search and filter results with options for departments, artists, and object types using **query parameters**',
      '❤️ Favorites functionality using **Jotai atoms** and persisted state in local storage',
      '🕘 Recently viewed history tracking for seamless navigation',
      '🌐 Clean and dynamic routing using **Next.js App Router**',
      '🧠 Global state management using **Jotai** and modular architecture',
      '🔐 JWT-based authentication with **MongoDB** backend (Assignment 6)',
      '📦 RESTful API endpoints for favorites/history with **Next.js API Routes** and **MongoDB Atlas**',
      '🎨 Responsive design styled with **Bootstrap** and custom CSS utilities',
    ],
    techStack: [
      'Next.js',
      'React',
      'Jotai',
      'MongoDB',
      'JWT',
      'Bootstrap',
      'Met Museum API',
    ],
    images: ['/images/met-1.png', '/images/met-2.png', '/images/met-3.png'],
    github: 'https://github.com/krutinpolra/met-museum',
    live: 'https://met-museum-wine.vercel.app',
    docsLink: 'https://github.com/krutinpolra/met-museum#readme',
    hueA: 180,
    hueB: 210,
  },
];

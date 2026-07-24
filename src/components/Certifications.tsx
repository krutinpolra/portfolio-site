'use client';

import { useRef, type MouseEvent } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import dynamic from 'next/dynamic';
import type { IconType } from 'react-icons';
import {
  FaAward,
  FaCertificate,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaHandsHelping,
  FaLightbulb,
  FaTrophy,
} from 'react-icons/fa';

const ParticleSnow = dynamic(
  () => import('@/assets/animatedComponent/ParticlesSnow'),
  { ssr: false }
);

type CertificationCategory =
  | 'Academic Honor'
  | 'Volunteering'
  | 'Workshop'
  | 'Certification';

type Certification = {
  slug: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: CertificationCategory;
  verifyUrl?: string;
};

// Add new certificates here as you earn them - the shelf and styling pick
// them up automatically, no other wiring needed.
const CERTIFICATIONS: Certification[] = [
  {
    slug: 'presidents-honour-list-winter-2025',
    title: "President's Honour List",
    issuer: 'Seneca Polytechnic',
    date: 'Winter 2025',
    description:
      "Named to the President's Honour List for outstanding academic achievement (4.0 GPA) in Computer Programming and Analysis.",
    category: 'Academic Honor',
  },
  {
    slug: 'seneca-engineering-competition-volunteer-2024',
    title: 'Certificate of Appreciation',
    issuer: "Seneca Engineering Students' Society",
    date: 'November 16, 2024',
    description:
      'Recognized for volunteering at the Seneca Engineering Competition, contributing to the smooth organization and execution of the event.',
    category: 'Volunteering',
  },
  {
    slug: 'microsoft-design-jam-2025',
    title: 'Microsoft Design Jam',
    issuer: 'Seneca Polytechnic & Amity University Dubai',
    date: 'March 10, 2025',
    description:
      'Completed the Microsoft Design Jam, a collaborative design-thinking workshop hosted by Seneca Polytechnic and Amity University Dubai.',
    category: 'Workshop',
  },
  {
    slug: 'freecodecamp-responsive-web-design',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'December 9, 2024',
    description:
      'Legacy Responsive Web Design V8 developer certification, representing approximately 300 hours of coursework.',
    category: 'Certification',
    verifyUrl:
      'https://freecodecamp.org/certification/krutin_polra/responsive-web-design',
  },
];

const CATEGORY_ICON: Record<CertificationCategory, IconType> = {
  'Academic Honor': FaAward,
  Volunteering: FaHandsHelping,
  Workshop: FaLightbulb,
  Certification: FaCertificate,
};

const CATEGORY_STYLE: Record<CertificationCategory, string> = {
  'Academic Honor': 'border-amber-400/50 text-amber-300',
  Volunteering: 'border-emerald-400/50 text-emerald-300',
  Workshop: 'border-fuchsia-400/50 text-fuchsia-300',
  Certification: 'border-indigo-400/50 text-indigo-300',
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function TrophyCard({ cert }: { cert: Certification }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const shineX = useTransform(springY, [-14, 14], ['-10%', '110%']);

  const Icon = CATEGORY_ICON[cert.category];
  const categoryStyle = CATEGORY_STYLE[cert.category];

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 14);
    rotateX.set(py * -14);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      style={{ perspective: 1000 }}
      className="snap-center shrink-0 w-[290px] md:w-[330px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-2xl p-6 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

        <motion.div
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
          style={{ left: shineX }}
        />

        <div
          className={`relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-[#11111a] shadow-[0_0_20px_rgba(99,102,241,0.35)] ${categoryStyle}`}
          style={{ transform: 'translateZ(36px)' }}
        >
          <Icon className="text-2xl" />
        </div>

        <div
          className="relative text-center"
          style={{ transform: 'translateZ(24px)' }}
        >
          <span
            className={`inline-block mb-3 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${categoryStyle}`}
          >
            {cert.category}
          </span>
          <h3 className="text-lg font-bold text-white leading-snug">
            {cert.title}
          </h3>
          <p className="mt-1 text-sm text-indigo-200">{cert.issuer}</p>
          <p className="mt-1 text-xs text-gray-400">{cert.date}</p>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            {cert.description}
          </p>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-white transition-colors"
            >
              Verify certificate <FaExternalLinkAlt className="text-[10px]" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByAmount(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  }

  return (
    <section
      id="certifications"
      className="relative overflow-hidden py-24 px-6 text-white bg-gradient-to-b from-black via-[#0b0b1d] to-black"
    >
      <ParticleSnow id="tsparticles-certifications" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-6 relative z-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <FaTrophy className="text-indigo-400 text-4xl" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400">
            Certifications
          </span>
          <motion.span
            className="absolute top-full left-0 w-full h-[2px] bg-indigo-500"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
          />
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-center text-gray-300 text-base md:text-lg leading-relaxed mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Academic honors, community contributions, and self-driven
          coursework, collected along the way.
        </motion.p>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByAmount(-360)}
            aria-label="Scroll certifications left"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-colors"
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(360)}
            aria-label="Scroll certifications right"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-colors"
          >
            <FaChevronRight />
          </button>

          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-1"
            style={{ scrollbarWidth: 'thin' }}
          >
            {CERTIFICATIONS.map(cert => (
              <TrophyCard key={cert.slug} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

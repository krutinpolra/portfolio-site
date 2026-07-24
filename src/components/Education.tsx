'use client';

import { motion, type Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaGraduationCap } from 'react-icons/fa';

const ParticleSnow = dynamic(
  () => import('@/assets/animatedComponent/ParticlesSnow'),
  { ssr: false }
);

type EducationEntry = {
  slug: string;
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  period: string;
  description: string;
};

const EDUCATION: EducationEntry[] = [
  {
    slug: 'seneca-advanced-diploma',
    degree: 'Advanced Diploma, Computer Programming and Analysis',
    institution: 'Seneca Polytechnic',
    location: 'Toronto, ON',
    start: '2023-05-01',
    end: '2026-05-01',
    period: 'May 2023 - May 2026',
    description:
      'A three-year advanced diploma covering full-stack development, databases, cloud, and software engineering fundamentals, completed with a 3.2 GPA out of 4.',
  },
  {
    slug: 'manipal-bachelor-computer-applications',
    degree: 'Bachelor of Computer Applications',
    institution: 'Manipal University Jaipur',
    location: 'Jaipur, India',
    start: '2026-07-01',
    end: '2029-07-01',
    period: 'July 2026 - July 2029',
    description:
      'Continuing education building on the advanced diploma, with further coursework in computer applications and software development.',
  },
];

const CONFETTI_COLORS = ['#818cf8', '#c084fc', '#f0abfc', '#facc15', '#34d399'];
const CONFETTI_COUNT = 14;

const confettiVariants: Variants = {
  hidden: { opacity: 0, scale: 0, x: 0, y: 0 },
  visible: (i: number) => {
    const angle = (i / CONFETTI_COUNT) * Math.PI * 2;
    const distance = 42 + (i % 3) * 8;
    return {
      opacity: [1, 1, 0],
      scale: [0, 1, 0.5],
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      transition: { duration: 0.9, delay: 0.2 + i * 0.02, ease: 'easeOut' },
    };
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

function getProgressPercent(start: Date, end: Date, now: Date) {
  const total = end.getTime() - start.getTime();
  if (total <= 0) return 100;
  const ratio = (now.getTime() - start.getTime()) / total;
  return Math.round(Math.min(Math.max(ratio, 0), 1) * 100);
}

function CelebrationBurst() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.6 }}
    >
      {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={confettiVariants}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          }}
        />
      ))}
    </motion.div>
  );
}

export default function Education() {
  const now = new Date();

  return (
    <section
      id="education"
      className="relative overflow-hidden py-24 px-6 text-white bg-gradient-to-b from-black via-[#0b0b1d] to-black"
    >
      <ParticleSnow id="tsparticles-education" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-6 relative z-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <FaGraduationCap className="text-indigo-400 text-4xl" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400">
            Education
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
          The academic foundation and ongoing coursework behind the engineering
          work above.
        </motion.p>

        <div className="grid gap-10">
          {EDUCATION.map((entry, index) => {
            const start = new Date(entry.start);
            const end = new Date(entry.end);
            const isCompleted = now >= end;
            const progress = isCompleted
              ? 100
              : getProgressPercent(start, end, now);

            return (
              <motion.article
                key={entry.slug}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: '0 0 30px rgba(99, 102, 241, 0.25)',
                }}
                className="relative md:ml-16 overflow-visible"
              >
                <div className="hidden md:block absolute -left-16 top-2 bottom-2 w-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full rounded-full ${
                      isCompleted
                        ? 'bg-gradient-to-t from-emerald-500 via-emerald-400 to-teal-300'
                        : 'bg-gradient-to-t from-indigo-500 via-purple-500 to-fuchsia-400'
                    }`}
                    initial={{ height: '0%' }}
                    whileInView={{ height: `${progress}%` }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 1.3, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>

                <div className="hidden md:block absolute -left-[3.25rem] top-2">
                  <motion.div
                    initial={{ scale: 0, rotate: -30, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      type: 'spring',
                      stiffness: 260,
                      damping: 16,
                    }}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border shadow-[0_0_18px_rgba(99,102,241,0.45)] bg-[#11111a] ${
                      isCompleted
                        ? 'border-emerald-400/50 text-emerald-300'
                        : 'border-indigo-400/40 text-indigo-300'
                    }`}
                  >
                    <FaGraduationCap className="text-lg" />
                    {isCompleted && <CelebrationBurst />}
                  </motion.div>
                </div>

                <div className="group block bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-6 md:p-8 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-semibold tracking-wide text-indigo-300">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <span className="h-px w-8 bg-indigo-400/40" />
                        <span>{isCompleted ? 'Completed' : 'In Progress'}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {entry.degree}
                      </h3>
                      <p className="mt-2 text-indigo-200">
                        {entry.institution} - {entry.location}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="w-fit rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-sm text-gray-300">
                        {entry.period}
                      </span>
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.4,
                          type: 'spring',
                          stiffness: 300,
                          damping: 14,
                        }}
                        className={`w-fit rounded-full px-4 py-1.5 text-xs font-semibold border ${
                          isCompleted
                            ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                            : 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300'
                        }`}
                      >
                        {isCompleted ? '🎓 Graduated' : `${progress}% complete`}
                      </motion.span>
                    </div>
                  </div>

                  <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

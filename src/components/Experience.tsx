'use client';

import { motion, type Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaShieldAlt, FaUsers } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { MdOutlineWorkOutline } from 'react-icons/md';
import Link from 'next/link';
import { experienceDetails } from '@/model/Experience.data';

const ParticleSnow = dynamic(
  () => import('@/assets/animatedComponent/ParticlesSnow'),
  { ssr: false }
);

const iconBySlug: Record<string, IconType> = {
  'my-benefits-platform': FaShieldAlt,
  'seneca-developer-club': FaUsers,
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-24 px-6 text-white bg-gradient-to-b from-black via-[#0b0b1d] to-black"
    >
      <ParticleSnow id="tsparticles-experience" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-6 relative z-10 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <MdOutlineWorkOutline className="text-indigo-400 text-4xl" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400">
            Work Experience
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
          Production engineering experience across public-sector delivery,
          accessibility, security testing, and developer education.
        </motion.p>

        <div className="relative grid gap-8">
          <motion.div
            className="hidden md:block absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-indigo-400/60 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            viewport={{ once: true }}
            style={{ originY: 0 }}
          />

          {experienceDetails.map((experience, index) => {
            const Icon = iconBySlug[experience.slug] ?? FaShieldAlt;

            return (
              <motion.article
                key={experience.slug}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{
                  scale: 1.015,
                  boxShadow: '0 0 30px rgba(99, 102, 241, 0.25)',
                }}
                className="relative md:ml-16 overflow-visible"
              >
                <motion.div
                  className="hidden md:flex absolute -left-[3.25rem] top-8 h-10 w-10 items-center justify-center rounded-full border border-indigo-400/40 bg-[#11111a] text-indigo-300 shadow-[0_0_18px_rgba(99,102,241,0.45)]"
                  initial={{ scale: 0, rotate: -30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Icon className="text-lg" />
                </motion.div>

                <Link
                  href={`/experience/${experience.slug}`}
                  className="group block bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-6 md:p-8 overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-semibold tracking-wide text-indigo-300">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <span className="h-px w-8 bg-indigo-400/40" />
                        <span>{experience.category}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {experience.role}
                      </h3>
                      <p className="mt-2 text-indigo-200">
                        {experience.organization} - {experience.location}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-sm text-gray-300">
                      {experience.period}
                    </span>
                  </div>

                  <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed">
                    {experience.summary}
                  </p>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {experience.metrics.map(metric => (
                      <motion.div
                        key={metric.label}
                        whileHover={{ scale: 1.04 }}
                        className="rounded-lg border border-white/10 bg-[#11111a]/70 px-4 py-4 text-center"
                      >
                        <div className="text-2xl font-bold text-indigo-300">
                          {metric.value}
                        </div>
                        <div className="mt-1 text-xs uppercase tracking-wide text-gray-400">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <ul className="mt-6 grid gap-3 text-sm md:text-base text-gray-300 leading-relaxed">
                    {experience.highlights.map(highlight => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.div
                    className="mt-6 flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.06 }}
                  >
                    {experience.tech.map(tag => (
                      <motion.span
                        key={tag}
                        variants={chipVariants}
                        whileHover={{
                          scale: 1.08,
                          boxShadow: '0 0 10px rgba(129,140,248,0.6)',
                        }}
                        className="text-[11px] px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full backdrop-blur-sm transition-all"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  <div className="mt-6 text-sm font-medium text-indigo-300 group-hover:text-white transition-colors">
                    View experience details
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

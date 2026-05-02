'use client';

import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { experienceDetails } from '@/model/Experience.data';

const ParticleSnow = dynamic(
  () => import('@/assets/animatedComponent/ParticlesSnow'),
  { ssr: false }
);

export default function ExperienceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const experience = experienceDetails.find(item => item.slug === slug);

  if (!experience) return notFound();

  const metaItems = [
    ['Type', experience.type],
    ['Role', experience.role],
    ['Organization', experience.organization],
    ['Location', experience.location],
    ['Tech', experience.tech.join(', ')],
    ['Published', experience.published],
    ['Updated', experience.updated],
    ['URL', experience.urlLabel],
  ].filter(([, value]) => Boolean(value));

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-28 text-white bg-gradient-to-b from-black via-[#101024] to-[#141428]">
      <ParticleSnow id="tsparticles-experience-detail" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <Link
          href="/#experience"
          className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-white transition"
        >
          <FaArrowLeft />
          Back to experience
        </Link>

        <motion.header
          className="mt-10"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400">
            {experience.title}
          </h1>

          <blockquote className="mt-6 border-l-2 border-indigo-400 pl-5 text-lg md:text-xl leading-relaxed text-gray-300">
            {experience.subtitle}
          </blockquote>

          <div className="mt-8 grid gap-3 rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
            {metaItems.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 border-b border-white/10 pb-3 text-sm last:border-b-0 last:pb-0 md:grid-cols-[120px_1fr]"
              >
                <span className="font-semibold text-indigo-300">{label}:</span>
                <span className="text-gray-300">{value}</span>
              </div>
            ))}
          </div>

          {(experience.repo || experience.live || experience.urlLabel) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {experience.repo && (
                <a
                  href={experience.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-400 px-5 py-2 text-indigo-300 hover:bg-indigo-500 hover:text-white transition"
                >
                  <FaGithub />
                  Repository
                </a>
              )}
              {experience.live ? (
                <a
                  href={experience.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-gray-300 hover:bg-white/20 hover:text-white transition"
                >
                  <FaExternalLinkAlt />
                  {experience.urlLabel}
                </a>
              ) : (
                experience.urlLabel && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-gray-300">
                    <FaExternalLinkAlt />
                    {experience.urlLabel}
                  </span>
                )
              )}
            </div>
          )}
        </motion.header>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-indigo-300">Highlights</h2>
          <ul className="mt-5 grid gap-3 text-gray-300">
            {experience.highlights.map(highlight => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 grid gap-3 md:grid-cols-3">
          {experience.metrics.map(metric => (
            <motion.div
              key={metric.label}
              whileHover={{ scale: 1.04 }}
              className="rounded-xl border border-white/10 bg-white/10 p-5 text-center backdrop-blur-md"
            >
              <div className="text-3xl font-bold text-indigo-300">
                {metric.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-wide text-gray-400">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </section>

        <div className="my-14 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

        <div className="grid gap-12">
          {experience.sections.map(section => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-xl border border-white/10 bg-white/[0.06] p-6 md:p-8 backdrop-blur-md"
            >
              <h2 className="text-2xl font-bold text-white">{section.title}</h2>

              {section.quote && (
                <blockquote className="mt-5 border-l-2 border-purple-400 pl-5 text-gray-300 italic">
                  {section.quote}
                </blockquote>
              )}

              {section.body && (
                <div className="mt-5 grid gap-4 text-gray-300 leading-relaxed">
                  {section.body.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="mt-5 grid gap-3 text-gray-300">
                  {section.bullets.map(bullet => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-300" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-2">
          {experience.tech.map(tech => (
            <span
              key={tech}
              className="text-[11px] px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

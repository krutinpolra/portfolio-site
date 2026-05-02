'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'motion/react';
import Image from 'next/image';
import type { Project } from '@/model/projectModel/project.model';
import Link from 'next/link';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { openPortfolioChat } from './PortfolioChatbot';

const cardVariants: Variants = {
  offscreen: {
    y: 200,
  },
  onscreen: {
    y: 0,
    rotate: -10,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export default function ProjectCard({
  title,
  description,
  image,
  techStack,
  hueA,
  hueB,
  slug,
}: Project) {
  return (
    <div className="relative flex flex-col items-center">
      <Link href={`/projects/${slug}`} className="group relative block w-full">
        <motion.div
          className="project-card-container"
          initial="offscreen"
          whileHover="onscreen"
          viewport={{ amount: 0.8, once: true }}
          transition={{ type: 'spring', stiffness: 220 }}
        >
          <div
            className="project-splash"
            style={
              {
                '--hue-a': `hsl(${hueA}, 100%, 50%)`,
                '--hue-b': `hsl(${hueB}, 100%, 50%)`,
              } as React.CSSProperties
            }
          />

          <motion.div className="project-card" variants={cardVariants}>
            <div className="relative w-full h-60 overflow-visible rounded-t-xl group">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            </div>

            <div className="px-6 py-5 text-center bg-[#11111a] rounded-b-xl">
              <h3 className="text-xl font-semibold text-indigo-400 mb-3 tracking-wide">
                {title}
              </h3>

            <p className="text-sm text-gray-400 mb-4 leading-relaxed transition-opacity duration-300 group-hover:opacity-100 line-clamp-3">
              {description}
            </p>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {techStack.map(tech => (
                  <span
                    key={tech}
                    className="text-[11px] px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full backdrop-blur-sm hover:shadow-[0_0_12px_rgba(129,140,248,0.6)] transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Link>

      <motion.button
        type="button"
        onClick={() => openPortfolioChat(title)}
        className="relative z-20 -mt-2 flex items-center justify-center gap-2 rounded-full border border-indigo-400/30 bg-[#11111a]/90 px-4 py-2 text-xs font-semibold text-indigo-100 shadow-[0_0_18px_rgba(99,102,241,0.28)] backdrop-blur-md transition hover:border-indigo-300 hover:bg-indigo-500/30 hover:text-white hover:shadow-[0_0_16px_rgba(129,140,248,0.45)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <FaWandMagicSparkles />
        Explain Project
      </motion.button>
    </div>
  );
}

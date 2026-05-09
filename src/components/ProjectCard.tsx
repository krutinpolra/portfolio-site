'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'motion/react';
import Image from 'next/image';
import type { Project } from '@/model/projectModel/project.model';
import Link from 'next/link';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { openPortfolioChat } from './PortfolioChatbot';

const cardVariants: Variants = {
  offscreen: {
    y: 68,
    rotate: 0,
  },
  onscreen: {
    y: -18,
    rotate: -10,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

function useScrollTriggeredCards() {
  const [isScrollTriggered, setIsScrollTriggered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const updateInputMode = () => setIsScrollTriggered(mediaQuery.matches);

    updateInputMode();
    mediaQuery.addEventListener('change', updateInputMode);

    return () => mediaQuery.removeEventListener('change', updateInputMode);
  }, []);

  return isScrollTriggered;
}

type ProjectCardProps = Project & {
  isMobileActive?: boolean;
};

export default function ProjectCard({
  title,
  image,
  hueA,
  hueB,
  slug,
  isMobileActive = false,
}: ProjectCardProps) {
  const isScrollTriggered = useScrollTriggeredCards();

  return (
    <div className="relative flex flex-col items-center">
      <Link href={`/projects/${slug}`} className="group relative block w-full">
        <motion.div
          className="project-card-container"
          initial="offscreen"
          animate={
            isScrollTriggered
              ? isMobileActive
                ? 'onscreen'
                : 'offscreen'
              : undefined
          }
          whileHover={isScrollTriggered ? undefined : 'onscreen'}
          transition={{ type: 'spring', stiffness: 220 }}
        >
          <div
            className="project-folder-back"
            style={
              {
                '--hue-a': `hsl(${hueA}, 100%, 50%)`,
                '--hue-b': `hsl(${hueB}, 100%, 50%)`,
              } as React.CSSProperties
            }
          />

          <div className="project-card-stage">
            <motion.div className="project-card" variants={cardVariants}>
              <div className="project-card-image">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="project-card-image-shade" />
              </div>
            </motion.div>
          </div>

          <div
            className="project-folder-front"
            style={
              {
                '--hue-a': `hsl(${hueA}, 100%, 50%)`,
                '--hue-b': `hsl(${hueB}, 100%, 50%)`,
              } as React.CSSProperties
            }
          >
            <h3>{title}</h3>
          </div>
        </motion.div>
      </Link>

      <motion.button
        type="button"
        onClick={() => openPortfolioChat(title)}
        className="relative z-20 flex items-center justify-center gap-2 rounded-full border border-indigo-400/30 bg-[#11111a]/90 px-4 py-2 text-xs font-semibold text-indigo-100 shadow-[0_0_18px_rgba(99,102,241,0.28)] backdrop-blur-md transition hover:border-indigo-300 hover:bg-indigo-500/30 hover:text-white hover:shadow-[0_0_16px_rgba(129,140,248,0.45)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
      >
        <FaWandMagicSparkles />
        Explain Project
      </motion.button>
    </div>
  );
}

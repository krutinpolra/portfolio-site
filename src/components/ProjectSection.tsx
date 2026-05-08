'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from '@/model/Project.data';
import dynamic from 'next/dynamic';
const ParticleSnow = dynamic(
  () => import('@/assets/animatedComponent/ParticlesSnow'),
  { ssr: false }
);

const allCategories = [
  'All',
  'Full-Stack',
  'Java',
  'Cloud',
  'React',
  'Python',
  'AI / Computer Vision',
];

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

export default function ProjectSection() {
  const [selected, setSelected] = useState('All');
  const [activeMobileProject, setActiveMobileProject] = useState<string | null>(
    null
  );
  const projectRefs = useRef(new Map<string, HTMLDivElement>());
  const isScrollTriggered = useScrollTriggeredCards();

  const filteredProjects = useMemo(
    () =>
      selected === 'All'
        ? projects
        : projects.filter(p =>
            p.Category.some(stack =>
              stack.toLowerCase().includes(selected.toLowerCase())
            )
          ),
    [selected]
  );

  useEffect(() => {
    if (!isScrollTriggered) {
      setActiveMobileProject(null);
      return;
    }

    let frameId: number | null = null;

    const updateActiveProject = () => {
      const viewportCenter = window.innerHeight * 0.52;
      let nextActiveProject: string | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      filteredProjects.forEach(project => {
        const element = projectRefs.current.get(project.slug);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, window.innerHeight);

        if (visibleBottom <= visibleTop) return;

        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextActiveProject = project.slug;
        }
      });

      setActiveMobileProject(current =>
        current === nextActiveProject ? current : nextActiveProject
      );
    };

    const scheduleUpdate = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateActiveProject();
      });
    };

    updateActiveProject();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [filteredProjects, isScrollTriggered]);

  return (
    <section
      id="projectsection"
      className="relative overflow-hidden pb-20 min-h-screen py-24 px-6 text-white bg-gradient-to-b from-black via-[#0b0b1d] to-black"
    >
      <ParticleSnow id="tsparticles-projects" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400 mb-12 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          Projects
          <motion.span
            className="absolute top-full left-0 w-full h-[2px] bg-indigo-500"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ originX: 0 }}
          />
        </motion.h2>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allCategories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelected(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                selected === category
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white/10 text-indigo-200 hover:bg-white/20'
              }`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              layout
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <motion.div
        className="project-container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10"
        layout
        transition={{ layout: { duration: 0.6, ease: 'easeInOut' } }}
      >
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project.slug}
              ref={element => {
                if (element) {
                  projectRefs.current.set(project.slug, element);
                } else {
                  projectRefs.current.delete(project.slug);
                }
              }}
              layout
            >
              <ProjectCard
                {...project}
                isMobileActive={activeMobileProject === project.slug}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

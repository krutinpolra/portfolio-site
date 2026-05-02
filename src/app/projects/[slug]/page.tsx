'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { projectDetails } from '@/model/projectDetail.model';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const ParticleSnow = dynamic(
  () => import('@/assets/animatedComponent/ParticlesSnow'),
  { ssr: false }
);

import { motion, AnimatePresence } from 'framer-motion';
import { notFound } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params?.slug as string;

  const [index, setIndex] = useState(0);

  const project = projectDetails.find(p => p.slug === slug);
  if (!project) return notFound();

  const hueA = project.hueA || 240;
  const hueB = project.hueB || 270;

  const images = project.images; // fallback to single image

  const nextImage = () => setIndex(prev => (prev + 1) % images.length);
  const prevImage = () =>
    setIndex(prev => (prev - 1 + images.length) % images.length);

  const imageVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  const externalLinks = [
    { label: 'Live Demo →', href: project.live },
    { label: 'Video Walkthrough →', href: project.videoDemo },
    { label: 'Documentation →', href: project.docsLink },
  ];

  return (
    <section
      id="projectDetail"
      className="min-h-screen px-6 pb-24 pt-36 lg:pt-40 flex flex-col-reverse lg:flex-row items-center justify-center gap-12 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, hsl(${hueA}, 60%, 15%), hsl(${hueB}, 70%, 20%))`,
      }}
    >
      <ParticleSnow id="tsparticles-projectdetails" />

      {/* Animated Image Carousel */}
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl group z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <Image
              priority
              src={images[index]}
              alt={`${project.title} screenshot ${index + 1}`}
              width={800}
              height={500}
              className="w-full object-cover rounded-2xl border border-white/10"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white px-2 py-1 rounded-full z-10"
          aria-label="Show previous project screenshot"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white px-2 py-1 rounded-full z-10"
          aria-label="Show next project screenshot"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'} transition`}
            />
          ))}
        </div>
      </div>

      {/* Project Content */}
      <div className="text-white w-full max-w-2xl z-10">
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-4xl font-bold text-white">{project.title}</h1>
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-white hover:text-indigo-400"
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>
          )}
        </div>
        <p className="text-lg text-gray-300 mb-6">{project.description}</p>
        <motion.h3
          whileHover={{
            scale: 1.2,
            textShadow: '0px 0px 12px rgba(99, 102, 241, 0.9)', // Indigo glow
            color: '#ffffff',
          }}
          className="text-xl font-semibold mb-2 text-indigo-300 text-center"
        >
          Key Features
        </motion.h3>
        <ul className="list-inside space-y-2 mb-6 text-gray-300 text-sm">
          {project.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 mb-6">
          {project.techStack.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.05,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#c084fc', // soft purple glow
                boxShadow: '0 0 10px #c084fc88',
              }}
              style={{
                color: 'rgb(255, 255, 255)',
                boxShadow: '0px 0px 0px rgba(0,0,0,0)',
              }}
              className="px-3 py-1 text-sm bg-white/10 text-white rounded-full border border-white/20 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 text-sm font-medium">
          {externalLinks.map(
            (link, index) =>
              link.href && (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{
                    scale: 1.1,
                    color: 'white',
                    textShadow: '0 0 6px rgba(192, 132, 252, 0.6)',
                  }}
                  className="text-indigo-300 hover:underline"
                >
                  {link.label}
                </motion.a>
              )
          )}
        </div>
      </div>

      {/* Background Glow */}
      <div
        className="absolute -bottom-10 -left-10 w-[600px] h-[600px] rounded-full blur-3xl z-[-1]"
        style={{
          background: `radial-gradient(circle, hsl(${hueA}, 70%, 50%), transparent 70%)`,
        }}
      />
    </section>
  );
}

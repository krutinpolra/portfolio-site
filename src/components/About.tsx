'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import CollaborationAnimation from '../assets/Animated-Icons/Collaboration.json';
import BrainStorming from '../assets/Animated-Icons/BrainStorming.json';
import Communication from '../assets/Animated-Icons/Communication.json';
import AttensionToDetails from '../assets/Animated-Icons/AttensionToDetails.json';
import Growth from '../assets/Animated-Icons/Growth.json';
import profilePic from '@/assets/images/profilepic2.jpg';
import profilePicAlt from '@/assets/images/profilepic.jpeg';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});
const ParticleSnow = dynamic(
  () => import('@/assets/animatedComponent/ParticlesSnow'),
  { ssr: false }
);

const values = [
  {
    icon: CollaborationAnimation,
    label: 'Collaboration',
    text: [
      'Thrives in team environments and cross-functional collaboration.',
      'Actively contributes ideas in group discussions and sprint reviews.',
      'Coordinates effectively across roles to meet shared goals.',
      'Open to feedback and encourages peer growth.',
      'Believes in mutual respect and learning through teamwork.',
    ],
  },
  {
    icon: BrainStorming,
    label: 'Adaptability',
    text: [
      'Quickly adjusts to new tools, workflows, or environments.',
      'Successfully juggles academic projects and real-world applications.',
      'Eager to take on new challenges and learn on the go.',
      'Manages shifting priorities with a calm mindset.',
      'Embraces change as an opportunity to grow.',
    ],
  },
  {
    icon: Communication,
    label: 'Communication',
    text: [
      'Delivers clear, concise updates during meetings.',
      'Explains complex ideas to non-technical teammates.',
      'Writes well-documented, understandable code.',
      'Ensures open and respectful dialogue in teams.',
      'Proactively asks questions and seeks clarity.',
    ],
  },
  {
    icon: AttensionToDetails,
    label: 'Attention to Detail',
    text: [
      'Double-checks code and UI for small inconsistencies.',
      'Maintains clean code structure and formatting.',
      'Pays attention to design guidelines and accessibility.',
      'Reviews peer code with a critical but supportive eye.',
      'Believes small details create big impacts.',
    ],
  },
  {
    icon: Growth,
    label: 'Growth Mindset',
    text: [
      'Open to feedback and committed to self-improvement.',
      'Constantly explores emerging technologies.',
      'Sets personal goals for learning and development.',
      'Participates in workshops, hackathons, and bootcamps.',
      'Believes in lifelong learning as a developer.',
    ],
  },
];

const carouselImages = [
  { src: profilePic, alt: 'Krutin Polra profile portrait', title: 'I Code' },
  {
    src: profilePicAlt,
    alt: 'Krutin Polra professional portrait',
    title: 'I explore virtual worlds',
  },
  {
    src: profilePic,
    alt: 'Krutin Polra developer portrait',
    title: 'I Travel',
  },
];

export default function About() {
  const [active, setActive] = useState(values[0]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage(current => (current + 1) % carouselImages.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="relative overflow-hidden pb-20 min-h-screen py-24 px-6 text-white bg-gradient-to-b from-black via-[#0b0b1d] to-black"
    >
      <ParticleSnow id="tsparticles-about" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <motion.span
            className="inline-block origin-[70%_70%] mr-2"
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            Hi
          </motion.span>
          About Me
        </motion.h2>

        <motion.div
          className="flex flex-col lg:flex-row items-center gap-16 justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-[560px] shrink-0">
            <div className="relative h-[430px] w-full overflow-hidden [perspective:1200px]">
              {carouselImages.map((image, index) => {
                const position =
                  (index - activeImage + carouselImages.length) %
                  carouselImages.length;
                const isActive = position === 0;
                const isNext = position === 1;

                return (
                  <motion.div
                    key={`${image.alt}-${index}`}
                    className="absolute left-1/2 top-1/2 aspect-[4/5] w-[250px] sm:w-[310px]"
                    animate={{
                      x: isActive ? '-50%' : isNext ? '6%' : '-106%',
                      y: '-50%',
                      rotateY: isActive ? 0 : isNext ? -16 : 16,
                      rotateZ: isActive ? 0 : isNext ? -6 : 6,
                      scale: isActive ? 1 : 0.84,
                      opacity: isActive ? 1 : 0.62,
                      zIndex: isActive ? 3 : 1,
                      filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)',
                    }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 250px, 310px"
                      className="object-cover rounded-[1.35rem] shadow-[0_28px_60px_rgba(0,0,0,0.55)]"
                    />
                    <div className="absolute inset-0 rounded-[1.35rem] bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-2 flex justify-center gap-2">
              {carouselImages.map((image, index) => (
                <button
                  key={`${image.alt}-dot-${index}`}
                  type="button"
                  aria-label={`Show profile image ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                  className={`h-2 rounded-full transition-all ${
                    activeImage === index
                      ? 'w-8 bg-indigo-400'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={carouselImages[activeImage].title}
                className="mt-6 text-center text-2xl font-medium text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                {carouselImages[activeImage].title}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="max-w-xl text-gray-300 text-lg leading-relaxed text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-300 mb-4">
              More about me
            </p>
            <p>
              Hi, I&apos;m{' '}
              <span className="text-indigo-400 font-semibold">Krutin</span>, a
              full-stack developer with production experience building secure,
              accessible, and scalable web applications.
            </p>
            <p className="mt-4">
              I enjoy turning complex workflows into clean digital products
              using{' '}
              <span className="text-purple-400">
                TypeScript, React, Angular, REST APIs, and cloud tools
              </span>
              . Recently, I&apos;ve been especially interested in applied AI
              engineering: AI-powered developer tools, semantic search, agents,
              and grounded LLM experiences.
            </p>
            <p className="mt-4">
              I&apos;m friendly, detail-oriented, and comfortable working across
              product, design, and engineering conversations. My goal is simple:
              build useful software that feels thoughtful to use and reliable to
              maintain.
            </p>

            <motion.div
              className="flex justify-center lg:justify-start gap-6 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://github.com/krutinpolra"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-indigo-500/20 p-4 rounded-full text-indigo-400 hover:text-white text-3xl shadow-md hover:shadow-indigo-500 transition-all"
              >
                <FaGithub />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/krutinpolra1444/"
                target="_blank"
                rel="noopener noreferrer"
                title="View on LinkedIn"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-indigo-500/20 p-4 rounded-full text-indigo-400 hover:text-white text-3xl shadow-md hover:shadow-indigo-500 transition-all"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/k_p_1444/"
                target="_blank"
                rel="noopener noreferrer"
                title="View on Instagram"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-indigo-500/20 p-4 rounded-full text-indigo-400 hover:text-white text-3xl shadow-md hover:shadow-indigo-500 transition-all"
              >
                <FaInstagram />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-24 flex flex-col items-center justify-center">
          <nav className="flex flex-wrap justify-center gap-6 mb-12">
            {values.map(item => (
              <motion.button
                key={item.label}
                onClick={() => setActive(item)}
                className={`relative px-5 py-2 text-[1.05rem] font-semibold transition-all duration-300 rounded-md ${
                  active.label === item.label
                    ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)] scale-105'
                    : 'text-white/70 hover:text-indigo-400 hover:drop-shadow-md'
                }`}
              >
                {item.label}
                {active.label === item.label && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl bg-white/10 backdrop-blur-md px-10 py-10 rounded-2xl shadow-2xl text-left flex flex-col items-center"
            >
              <div className="w-24 h-24 mb-4">
                <Lottie animationData={active.icon} loop={true} />
              </div>
              <h4 className="text-2xl font-bold text-indigo-300 mb-4">
                {active.label}
              </h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300 text-[15px] leading-relaxed w-full sm:px-6 md:px-8">
                {active.text.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-full transition"
          >
            View My Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

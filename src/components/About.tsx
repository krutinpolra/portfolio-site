'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Lottie from 'lottie-react';
import CollaborationAnimation from '../assets/Animated-Icons/Collaboration.json';
import BrainStorming from '../assets/Animated-Icons/BrainStorming.json';
import Communication from '../assets/Animated-Icons/Communication.json';
import AttensionToDetails from '../assets/Animated-Icons/AttensionToDetails.json';
import Growth from '../assets/Animated-Icons/Growth.json';

import profilePic from '@/assets/images/profilepic2.jpg';
import ParticlesSnow from '@/assets/animatedComponent/ParticlesSnow';

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

export default function About() {
  const [active, setActive] = useState(values[0]);

  return (
    <section
      id="about"
      className="relative pb-20 min-h-screen py-24 px-6 text-white bg-gradient-to-b from-black via-[#0b0b1d] to-[#141428] overflow-hidden"
    >
      <ParticlesSnow />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Heading with waving hand */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <motion.span
            key={Math.random()}
            className="inline-block origin-[70%_70%] mr-2"
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            👋
          </motion.span>
          About Me
        </motion.h2>

        {/* Profile */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-10 justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src={profilePic}
            alt="Profile picture"
            width={450}
            height={350}
            className="w-[450px] h-[350px] object-cover rounded-[2rem] border-4 border-indigo-500 shadow-2xl"
          />

          <div className="max-w-xl text-gray-300 text-lg leading-relaxed">
            <p>
              Hi, I’m{' '}
              <span className="text-indigo-400 font-semibold">Krutin</span>,
              have a solid foundation in web development and cloud technology
              and a passion for creating full stack web applications. I have
              experience in building and deploying applications using modern
              frameworks and tools. I am proficient in JavaScript, TypeScript,
              React, Node.js, and MongoDB. I also have experience with cloud
              platforms like AWS and Azure.
            </p>
            <p className="mt-4">
              I love building accessible, scalable, and visually rich
              applications using{' '}
              <span className="text-purple-400">React, Node.js, MongoDB</span>,
              and cloud tools.
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        {/* Tabs */}
        <div className="mt-24 flex flex-col items-center justify-center">
          <nav className="flex flex-wrap justify-center gap-6 mb-12">
            {values.map(item => (
              <motion.button
                key={item.label}
                onClick={() => setActive(item)}
                className={`relative px-5 py-2 text-[1.05rem] font-semibold transition-all duration-300 rounded-md
          ${
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

        {/* CTA */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="/resume"
            className="inline-block px-6 py-3 border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-full transition"
          >
            View My Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

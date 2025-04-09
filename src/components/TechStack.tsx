'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaJava,
  FaPython, FaAws,
} from 'react-icons/fa';
import {
  SiTailwindcss, SiMongodb, SiNextdotjs, SiTypescript,
  SiMysql, SiFigma, SiJirasoftware, SiBootstrap, SiCplusplus,
  SiC, SiPostman, SiNetlify, SiVercel, SiSass, SiExpress,
} from 'react-icons/si';

const categories = ['Frontend', 'Backend', 'Deployment', 'Database', 'Cloud'];

const tech = [
  // Frontend
  { name: 'React', icon: FaReact, color: '#61DBFB', category: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8', category: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', category: 'Frontend' },
  { name: 'JavaScript', icon: FaJs, color: '#f0db4f', category: 'Frontend' },
  { name: 'HTML5', icon: FaHtml5, color: '#e34c26', category: 'Frontend' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#264de4', category: 'Frontend' },
  { name: 'SASS', icon: SiSass, color: '#cd6799', category: 'Frontend' },
  { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3', category: 'Frontend' },
  { name: 'Figma', icon: SiFigma, color: '#A259FF', category: 'Frontend' },

  // Backend
  { name: 'Node.js', icon: FaNodeJs, color: '#68a063', category: 'Backend' },
  { name: 'Express.js', icon: SiExpress, color: '#888', category: 'Backend' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'Backend' },
  { name: 'Java', icon: FaJava, color: '#007396', category: 'Backend' },
  { name: 'Python', icon: FaPython, color: '#3776AB', category: 'Backend' },
  { name: 'C', icon: SiC, color: '#00599C', category: 'Backend' },
  { name: 'C++', icon: SiCplusplus, color: '#004482', category: 'Backend' },
  { name: 'Jira', icon: SiJirasoftware, color: '#2684FF', category: 'Backend' },

  // Database
  { name: 'MongoDB', icon: SiMongodb, color: '#4DB33D', category: 'Database' },
  { name: 'MySQL', icon: SiMysql, color: '#00758F', category: 'Database' },

  // Cloud
  { name: 'AWS', icon: FaAws, color: '#FF9900', category: 'Cloud' },

  // Deployment
  { name: 'Git', icon: FaGitAlt, color: '#f14e32', category: 'Deployment' },
  { name: 'Netlify', icon: SiNetlify, color: '#00C7B7', category: 'Deployment' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff', category: 'Deployment' },
];

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState('Frontend');
  const filteredTech = tech.filter((item) => item.category === selectedCategory);

  return (
    <section id="techstack" className="py-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto text-center">
            <motion.h2
            className="text-4xl font-bold mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            >
            ⚙️ Tech Stack
            </motion.h2>

            {/* Category Buttons with pop animation */}
            <motion.div
                className="flex flex-wrap justify-center gap-3 mb-12"
                initial="hidden"
                whileInView="visible"
                variants={{
                    hidden: {},
                    visible: {
                    transition: {
                        staggerChildren: 0.07,
                    },
                    },
                }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                                selectedCategory === category
                                ? 'bg-indigo-500 text-white'
                                : 'bg-white/10 hover:bg-white/20'
                            }`}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ type: 'spring', stiffness: 120 }}
                            >
                            {category}
                        </motion.button>
                    ))}
            </motion.div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    layout 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
                >
                    {filteredTech.map(({ name, icon: Icon, color }) => (
                    <motion.div
                        key={name}
                        layout
                        whileHover={{
                        scale: 1.08,
                        boxShadow: `0 0 20px ${color}, 0 0 40px ${color}55`,
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                        className="flex flex-col items-center p-4 bg-white/10 rounded-xl shadow-md backdrop-blur-md"
                    >
                        <Icon className="text-4xl mb-2" style={{ color }} />
                        <span className="text-sm font-medium">{name}</span>
                    </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    </section>
  );
}

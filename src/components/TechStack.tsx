'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaJava,
  FaPython,
  FaAws,
  FaCode,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiMongodb,
  SiNextdotjs,
  SiTypescript,
  SiMysql,
  SiFigma,
  SiJirasoftware,
  SiBootstrap,
  SiCplusplus,
  SiC,
  SiPostman,
  SiNetlify,
  SiVercel,
  SiSass,
  SiExpress,
  SiSupabase,
  SiLangchain,
  SiOpenai,
  SiOpencv,
  SiPytorch,
  SiScikitlearn,
  SiTensorflow,
} from 'react-icons/si';
import dynamic from 'next/dynamic';
import type { IconType } from 'react-icons';
import type { PortfolioSkillGroup } from '@/lib/supabasePortfolio';
const ParticleSnow = dynamic(
  () => import('@/assets/animatedComponent/ParticlesSnow'),
  { ssr: false }
);

type TechMeta = {
  icon: IconType;
  color: string;
};

const iconBySkill: Record<string, TechMeta> = {
  // Frontend
  React: { icon: FaReact, color: '#61DBFB' },
  'React.js': { icon: FaReact, color: '#61DBFB' },
  'Next.js': { icon: SiNextdotjs, color: '#ffffff' },
  Angular: { icon: FaCode, color: '#dd0031' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#38bdf8' },
  TypeScript: { icon: SiTypescript, color: '#3178c6' },
  JavaScript: { icon: FaJs, color: '#f0db4f' },
  HTML5: { icon: FaHtml5, color: '#e34c26' },
  CSS3: { icon: FaCss3Alt, color: '#264de4' },
  SASS: { icon: SiSass, color: '#cd6799' },
  Bootstrap: { icon: SiBootstrap, color: '#7952B3' },
  Figma: { icon: SiFigma, color: '#A259FF' },
  'Framer Motion': { icon: FaCode, color: '#a78bfa' },

  // Backend
  'Node.js': { icon: FaNodeJs, color: '#68a063' },
  'Express.js': { icon: SiExpress, color: '#888' },
  Postman: { icon: SiPostman, color: '#FF6C37' },
  'Thunder Client': { icon: SiPostman, color: '#7c3aed' },
  Java: { icon: FaJava, color: '#007396' },
  Python: { icon: FaPython, color: '#3776AB' },
  C: { icon: SiC, color: '#00599C' },
  'C++': { icon: SiCplusplus, color: '#004482' },
  Jira: { icon: SiJirasoftware, color: '#2684FF' },
  'REST API Design': { icon: SiPostman, color: '#FF6C37' },

  // Database
  MongoDB: { icon: SiMongodb, color: '#4DB33D' },
  MySQL: { icon: SiMysql, color: '#00758F' },
  PostgreSQL: { icon: SiSupabase, color: '#3ECF8E' },
  Supabase: { icon: SiSupabase, color: '#3ECF8E' },
  SQLite: { icon: FaCode, color: '#7dd3fc' },
  DynamoDB: { icon: FaAws, color: '#FF9900' },
  'Data Modeling': { icon: FaCode, color: '#93c5fd' },
  'ER Diagram Design': { icon: FaCode, color: '#c4b5fd' },

  // Cloud
  AWS: { icon: FaAws, color: '#FF9900' },
  'AWS EC2': { icon: FaAws, color: '#FF9900' },
  'AWS S3': { icon: FaAws, color: '#FF9900' },
  'AWS DynamoDB': { icon: FaAws, color: '#FF9900' },
  'AWS Cognito': { icon: FaAws, color: '#FF9900' },
  'Microsoft Azure': { icon: FaCode, color: '#60a5fa' },
  Docker: { icon: FaCode, color: '#2496ed' },
  'GitHub Actions': { icon: FaGitAlt, color: '#ffffff' },
  'Azure DevOps': { icon: FaCode, color: '#60a5fa' },
  Git: { icon: FaGitAlt, color: '#f14e32' },
  GitHub: { icon: FaGitAlt, color: '#ffffff' },
  GitLab: { icon: FaGitAlt, color: '#fca326' },
  Netlify: { icon: SiNetlify, color: '#00C7B7' },
  Vercel: { icon: SiVercel, color: '#ffffff' },

  // AI / ML
  OpenAI: { icon: SiOpenai, color: '#ffffff' },
  'OpenAI API': { icon: SiOpenai, color: '#ffffff' },
  LangChain: { icon: SiLangchain, color: '#1c3c3c' },
  'RAG Concepts': { icon: SiOpenai, color: '#ffffff' },
  Embeddings: { icon: SiOpenai, color: '#ffffff' },
  'Semantic Search': { icon: SiOpenai, color: '#ffffff' },
  'AI Agents': { icon: SiOpenai, color: '#ffffff' },
  'Tool Calling': { icon: SiOpenai, color: '#ffffff' },
  'Structured Outputs': { icon: SiOpenai, color: '#ffffff' },
  Zod: { icon: FaCode, color: '#38bdf8' },
  TensorFlow: { icon: SiTensorflow, color: '#FF6F00' },
  PyTorch: { icon: SiPytorch, color: '#EE4C2C' },
  OpenCV: { icon: SiOpencv, color: '#5C3EE8' },
  'scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },

  // Testing and quality
  Selenium: { icon: FaCode, color: '#43b02a' },
  SonarQube: { icon: FaCode, color: '#4e9bcd' },
  'OWASP ZAP': { icon: FaCode, color: '#f97316' },
  WCAG: { icon: FaCode, color: '#a78bfa' },
  'Secure API Practices': { icon: FaCode, color: '#34d399' },
  'Input Validation': { icon: FaCode, color: '#fbbf24' },
  'CI/CD': { icon: FaGitAlt, color: '#f14e32' },
};

const fallbackMeta = { icon: FaCode, color: '#a78bfa' };

type TechStackProps = {
  skillGroups: PortfolioSkillGroup[];
};

function getSkillGroupLabel(name: string) {
  const labels: Record<string, string> = {
    'Frontend Development': 'Frontend',
    'Backend Development': 'Backend',
    'Databases And Data Systems': 'Data Base Systems',
    'Cloud And Deployment': 'Cloud & Deployment',
    'AI And Applied Intelligence': 'AI & ML',
    'Testing, Security And Quality': 'Testing',
  };

  return labels[name] ?? name;
}

export default function TechStack({ skillGroups }: TechStackProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    skillGroups[0]?.name ?? ''
  );
  const selectedGroup =
    skillGroups.find(group => group.name === selectedCategory) ??
    skillGroups[0];

  useEffect(() => {
    if (!selectedGroup && skillGroups[0]) {
      setSelectedCategory(skillGroups[0].name);
    }
  }, [selectedGroup, skillGroups]);

  return (
    <section
      id="techstack"
      className="relative overflow-hidden pb-20 py-24 px-6 text-white bg-gradient-to-b from-black via-[#0b0b1d] to-black"
    >
      <ParticleSnow id="tsparticles-techStack" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl font-bold mb-10 relative inline-block text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: false }}
        >
          ⚙️ Tech Stack
          {/* Underline animation */}
          <motion.span
            className="absolute top-full left-0 w-full h-[2px] bg-indigo-500"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: false }}
            style={{ originX: 0 }}
          />
        </motion.h2>

        {/* Category Buttons with pop animation */}
        <motion.div
          className="mx-auto mb-12 flex w-full max-w-5xl flex-nowrap justify-start gap-3 overflow-x-auto sm:justify-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
          {skillGroups.map(category => (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              title={category.name}
              className={`shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition md:px-6 ${
                selectedGroup?.name === category.name
                  ? 'bg-indigo-500 text-white shadow-[0_0_18px_rgba(99,102,241,0.35)]'
                  : 'bg-white/10 text-indigo-100 hover:bg-white/15 hover:text-white'
              }`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              {getSkillGroupLabel(category.name)}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGroup?.name ?? 'empty-skills'}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
          >
            {(selectedGroup?.skills ?? []).map(name => {
              const { icon: Icon, color } = iconBySkill[name] ?? fallbackMeta;

              return (
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
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

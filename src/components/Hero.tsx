'use client';

import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-center items-center h-[100vh] text-center px-6 overflow-hidden mt-0 pt-0">
      <ParticlesBackground />
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 opacity-90 -z-10" />
      <div className="absolute w-[60vw] h-[60vw] bg-indigo-600 blur-[120px] rounded-full opacity-30 top-10 left-10 -z-10" />
      <div className="absolute w-[40vw] h-[40vw] bg-purple-500 blur-[100px] rounded-full opacity-20 bottom-0 right-0 -z-10" />

      <div className="z-10 flex flex-col justify-center items-center">
        <TypeAnimation
          sequence={[
            'I craft interactive & scalable web experiences',
            2000,
            'I build immersive & performant interfaces',
            2000,
          ]}
          wrapper="h1"
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-4xl"
          speed={60}
          repeat={Infinity}
        />

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Hello 👋 I’m <span className="font-semibold text-white">Krutin</span>, a full stack developer passionate about transforming ideas into functional products.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
          >
            Let’s Connect
          </a>
          <a
            href="/resume"
            className="px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
          >
            View Resume
          </a>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          className="absolute bottom-6 flex flex-col items-center text-white text-sm opacity-80"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="mb-1">scroll</span>
          <span className="text-2xl">↓</span>
        </motion.div>

      </div>
    </section>
  );
}

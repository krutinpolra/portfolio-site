'use client';

import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: '#0b0c10',
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
            resize: true
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            }
          }
        },        
        fpsLimit: 60,
        particles: {
          number: {
            value: 60,
          },
          color: {
            value: '#ffffff',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 1, max: 3 },
          },
          links: {
            enable: true,
            distance: 120,
            color: '#9f7aea',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 z-0"
    />
  );
}

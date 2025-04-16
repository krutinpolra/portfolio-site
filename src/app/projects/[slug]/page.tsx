'use client';

import { projects } from '@/model/project.model';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find(p => p.slug === params.slug);
  if (!project) return notFound();

  const hueA = project.hueA || 260;
  const hueB = project.hueB || 290;

  return (
    <main
      className="min-h-screen px-6 py-24 flex flex-col lg:flex-row gap-12 items-center justify-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, hsl(${hueA}, 70%, 30%), hsl(${hueB}, 70%, 10%))`,
      }}
    >
      {/* Left Content */}
      <div className="bg-black/20 p-8 rounded-3xl shadow-xl backdrop-blur-md max-w-2xl w-full z-10">
        <h1 className="text-4xl font-bold text-white mb-6">{project.title}</h1>
        <p className="text-lg text-gray-300 mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-3 mb-6">
          {project.techStack.map(tech => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-white/10 text-white rounded-full border border-white/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-6">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              className="text-indigo-300 hover:underline font-medium"
            >
              GitHub →
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              className="text-indigo-300 hover:underline font-medium"
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>

      {/* Right Image */}
      <div className="relative w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={400}
          className="object-cover rounded-2xl border border-white/10"
        />
      </div>

      {/* Background blur glow */}
      <div
        className="absolute -top-10 -left-10 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl"
        style={{
          background: `radial-gradient(circle, hsl(${hueA}, 70%, 60%), transparent 70%)`,
        }}
      />
    </main>
  );
}

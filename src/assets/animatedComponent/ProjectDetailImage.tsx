'use client';

import { useRef, useEffect } from 'react';
import { animate } from 'animejs';
import Image from 'next/image';

interface ProjectImageProps {
  image: string;
  title: string;
}

export default function ProjectDetailImage({
  image,
  title,
}: ProjectImageProps) {
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      const animation = animate(imageRef.current, {
        translateY: [0, -10],
        alternate: true,
        loop: true,
        ease: 'inOutSine',
        duration: 3000,
      });

      return () => {
        animation.pause();
      };
    }
  }, []);

  return (
    <div
      ref={imageRef}
      className="relative w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
    >
      <Image
        src={image}
        alt={title}
        width={800}
        height={400}
        className="object-cover rounded-2xl border border-white/10"
      />
    </div>
  );
}

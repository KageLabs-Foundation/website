import React, { useEffect, useRef } from 'react';
import { InteractionState } from '../types';

interface HeroProps {
  setInteractionState: (state: InteractionState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setInteractionState }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const scrolled = window.scrollY;
        titleRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
        titleRef.current.style.opacity = `${1 - scrolled / 700}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="manifesto" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden border-b border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-[#050505] pt-32 pb-20 md:pb-64 transition-colors duration-300">
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-zinc-400 dark:border-zinc-700 rounded-full pointer-events-none animate-scale-in"
        style={{ '--target-opacity': 0.4 } as React.CSSProperties}
      ></div>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-zinc-400 dark:border-zinc-700 rounded-full pointer-events-none animate-scale-in"
        style={{ '--target-opacity': 0.6, animationDelay: '0.1s' } as React.CSSProperties}
      ></div>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-orange-500/20 dark:border-orange-900/20 rounded-full pointer-events-none animate-scale-in"
        style={{ '--target-opacity': 0.6, animationDelay: '0.2s' } as React.CSSProperties}
      ></div>

      <div className="z-10 text-center px-4" ref={titleRef}>
        <p className="text-zinc-600 dark:text-zinc-500 uppercase tracking-[0.3em] mb-4 text-sm animate-fade-in-up">
          The Digital Laboratory
        </p>
        <h1 
          className="text-6xl md:text-9xl font-bold leading-tight mb-6 text-zinc-900 dark:text-white"
          onMouseEnter={() => setInteractionState(InteractionState.HOVER_TEXT)}
          onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
        >
          KAGE <br />
          <span className="text-outline">LABS</span>
        </h1>
        <p className="max-w-md mx-auto text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
          Crafting digital experiences from the shadows. 
          We build robust backends, immersive frontends, and intelligent systems.
        </p>
      </div>
    </section>
  );
};
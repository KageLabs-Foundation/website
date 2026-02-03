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
        <div className="inline-flex items-center gap-3 px-4 py-2 border border-orange-500/30 bg-orange-500/10 text-orange-500 text-xs font-mono uppercase tracking-widest mb-6 animate-fade-in-up">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          Coming Soon
        </div>
        <h1 
          className="text-6xl md:text-9xl font-bold leading-tight mb-6 text-zinc-900 dark:text-white"
          onMouseEnter={() => setInteractionState(InteractionState.HOVER_TEXT)}
          onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
        >
          KAGE <br />
          <span className="text-outline">LABS</span>
        </h1>
        <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-xl leading-relaxed mb-8">
          AI-powered SaaS tools for developers, students, and entrepreneurs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://discord.gg/kagelabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors"
            onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
            onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join Discord Community
          </a>
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold hover:border-orange-500 hover:text-orange-500 transition-all"
            onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
            onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
          >
            Explore Products
          </a>
        </div>
      </div>
    </section>
  );
};
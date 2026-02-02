import React from 'react';
import { InteractionState } from '../types';

interface AboutProps {
  setInteractionState: (state: InteractionState) => void;
}

const values = [
  {
    number: "01",
    title: "Innovation First",
    description: "Pushing boundaries with cutting-edge AI research and breakthrough solutions that reshape industries."
  },
  {
    number: "02",
    title: "Human-Centric",
    description: "Creating technology that bridges the gap between human creativity and machine intelligence."
  },
  {
    number: "03",
    title: "Future-Ready",
    description: "Building platforms and tools that empower the next generation of creators and innovators."
  }
];

export const About: React.FC<AboutProps> = ({ setInteractionState }) => {
  return (
    <section id="about" className="py-32 px-6 bg-white dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white">ABOUT KAGELABS</h2>
          <div className="h-px w-24 bg-orange-500"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group relative"
                  onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                  onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                >
                    <div className="absolute -left-4 -top-4 w-12 h-12 border-l border-t border-zinc-200 dark:border-zinc-800 group-hover:border-orange-500 transition-colors duration-500"></div>
                    
                    <div className="text-7xl font-bold text-zinc-200 dark:text-zinc-900 mb-8 group-hover:text-zinc-300 dark:group-hover:text-zinc-800 transition-colors duration-500 font-['Space_Grotesk']">
                        {item.number}
                    </div>
                    
                    <h3 className="text-2xl font-medium mb-4 text-zinc-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-500 transition-colors duration-300">
                        {item.title}
                    </h3>
                    
                    <p className="text-zinc-600 dark:text-zinc-500 leading-relaxed text-sm tracking-wide">
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
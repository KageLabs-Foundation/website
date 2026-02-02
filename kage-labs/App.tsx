import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { InteractionState } from './types';

const App: React.FC = () => {
  const [interactionState, setInteractionState] = useState<InteractionState>(InteractionState.IDLE);
  

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });


  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };


  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }

  }, [isDarkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-zinc-50 dark:bg-[#050505] min-h-screen w-full relative selection:bg-orange-500 selection:text-white transition-colors duration-300">
      <CustomCursor interactionState={interactionState} />
      <Navbar setInteractionState={setInteractionState} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <Hero setInteractionState={setInteractionState} />
      
      <div className="py-4 border-y border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black overflow-hidden flex transition-colors duration-300">
        <div className="whitespace-nowrap animate-marquee text-zinc-400 dark:text-zinc-700 font-mono text-sm tracking-[1em]">
           KAGE LABS • DIGITAL EXCELLENCE • WEB & MOBILE • CLOUD ARCHITECTURE • 
        </div>
        <div className="whitespace-nowrap animate-marquee text-zinc-400 dark:text-zinc-700 font-mono text-sm tracking-[1em]" aria-hidden="true">
           KAGE LABS • DIGITAL EXCELLENCE • WEB & MOBILE • CLOUD ARCHITECTURE • 
        </div>
      </div>

      <About setInteractionState={setInteractionState} />

      <div className="h-32 w-full bg-zinc-50 dark:bg-[#050505] transition-colors duration-300"></div>

      <Features setInteractionState={setInteractionState} />
      
      <div className="py-32 flex justify-center items-center bg-zinc-50 dark:bg-[#050505] border-y border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
         <div className="text-center px-6">
            <h3 className="text-2xl md:text-3xl font-light mb-6 text-zinc-600 dark:text-zinc-300">
               "We build the digital infrastructure of tomorrow."
            </h3>
         </div>
      </div>

      <FAQ setInteractionState={setInteractionState} />
      <Contact setInteractionState={setInteractionState} />
      <Footer setInteractionState={setInteractionState} />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes scaleInCenter {
          0% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: var(--target-opacity); }
        }
        .animate-scale-in {
          animation: scaleInCenter 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; /* Start invisible before animation kicks in */
        }
      `}</style>
    </main>
  );
};

export default App;
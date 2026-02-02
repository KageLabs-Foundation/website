import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Features } from '../components/Features';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { InteractionState } from '../types';

interface LandingPageProps {
  setInteractionState: (state: InteractionState) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setInteractionState }) => {
  return (
    <>
      <Hero setInteractionState={setInteractionState} />

      <div className="py-4 border-y border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black overflow-hidden flex transition-colors duration-300">
        <div className="whitespace-nowrap animate-marquee text-zinc-400 dark:text-zinc-700 font-mono text-sm tracking-[1em]">
          KAGE LABS • DIGITAL EXCELLENCE • WEB &amp; MOBILE • CLOUD ARCHITECTURE •
        </div>
        <div
          className="whitespace-nowrap animate-marquee text-zinc-400 dark:text-zinc-700 font-mono text-sm tracking-[1em]"
          aria-hidden="true"
        >
          KAGE LABS • DIGITAL EXCELLENCE • WEB &amp; MOBILE • CLOUD ARCHITECTURE •
        </div>
      </div>

      <About setInteractionState={setInteractionState} />

      <div className="h-32 w-full bg-zinc-50 dark:bg-[#050505] transition-colors duration-300" />

      <Features setInteractionState={setInteractionState} />

      <div className="py-32 flex justify-center items-center bg-zinc-50 dark:bg-[#050505] border-y border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        <div className="text-center px-6">
          <h3 className="text-2xl md:text-3xl font-light mb-6 text-zinc-600 dark:text-zinc-300">
            &quot;We build the digital infrastructure of tomorrow.&quot;
          </h3>
        </div>
      </div>

      <FAQ setInteractionState={setInteractionState} />
      <Contact setInteractionState={setInteractionState} />
      <Footer setInteractionState={setInteractionState} />
    </>
  );
};


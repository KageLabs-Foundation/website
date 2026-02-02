import React from 'react';
import { InteractionState } from '../types';

interface ServicePageProps {
  setInteractionState: (state: InteractionState) => void;
}

export const KageComicsPage: React.FC<ServicePageProps> = ({ setInteractionState }) => {
  return (
    <section className="pt-32 pb-24 px-6 min-h-screen bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-600 mb-4">
            Service / Creative Systems
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white"
            onMouseEnter={() => setInteractionState(InteractionState.HOVER_TEXT)}
            onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
          >
            KageComics
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            AI-powered storytelling tools that turn ideas into visual narratives, storyboards, and comics.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">Narratives from prompts</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We build flows where writers, studios, and solo creators can iterate on characters, scenes, and arcs
                with AI support, while keeping creative control firmly in human hands.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">Tooling we ship</h2>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <li>• Story and script generators tuned to your tone and universe.</li>
                <li>• Layout and panel suggestions for visual pacing.</li>
                <li>• Asset management for characters, locations, and lore.</li>
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="p-5 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#080808]">
              <h3 className="text-sm font-semibold mb-2 text-zinc-900 dark:text-white uppercase tracking-wide">
                Ideal for
              </h3>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>• Comic and manga creators</li>
                <li>• Storytelling platforms</li>
                <li>• Media and entertainment teams</li>
              </ul>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold bg-orange-500 text-black hover:bg-orange-400 transition-colors"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              Plan a KageComics experience
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};


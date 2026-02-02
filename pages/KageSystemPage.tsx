import React from 'react';
import { InteractionState } from '../types';

interface ServicePageProps {
  setInteractionState: (state: InteractionState) => void;
}

export const KageSystemPage: React.FC<ServicePageProps> = ({ setInteractionState }) => {
  return (
    <section className="pt-32 pb-24 px-6 min-h-screen bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-600 mb-4">
            Service / Systems
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white"
            onMouseEnter={() => setInteractionState(InteractionState.HOVER_TEXT)}
            onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
          >
            KageSystem
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A system inspired by Solo Leveling&apos;s mechanics, reimagined as real-world progression tooling for users
            and teams.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">Gamified progression</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We help you design quests, stats, levels, and rewards that encourage consistent progress in real life:
                fitness, learning, productivity, or habit systems.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">Components we build</h2>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <li>• Progression engines (XP, levels, streaks).</li>
                <li>• Quest and task systems.</li>
                <li>• Dashboards that visualize progress over time.</li>
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="p-5 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#080808]">
              <h3 className="text-sm font-semibold mb-2 text-zinc-900 dark:text-white uppercase tracking-wide">
                Ideal for
              </h3>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>• Habit and productivity apps</li>
                <li>• Fitness and wellness products</li>
                <li>• Systems thinking &amp; self-improvement tools</li>
              </ul>
            </div>

            <a
              href="https://system.kage.wulabs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold bg-orange-500 text-black hover:bg-orange-400 transition-colors"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              Visit existing KageSystem
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};


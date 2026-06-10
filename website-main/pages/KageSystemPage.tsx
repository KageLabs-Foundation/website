import React from 'react';
import { Footer } from '../components/Footer';
import { InteractionState } from '../types';

interface ServicePageProps {
  setInteractionState: (state: InteractionState) => void;
}

export const KageSystemPage: React.FC<ServicePageProps> = ({ setInteractionState }) => {
  return (
    <>
      <section className="pt-32 pb-24 px-6 min-h-screen bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <header className="mb-16">
            <div className="inline-flex items-center gap-3 px-3 py-1 border border-orange-500/30 bg-orange-500/10 text-orange-500 text-xs font-mono uppercase tracking-widest mb-4">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
              In Development
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_TEXT)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              KageSystem
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Gamified progression framework inspired by Solo Leveling for real-world growth.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">What is KageSystem?</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  KageSystem is a SaaS platform that turns your habits, goals, and daily tasks into an RPG-style progression system. 
                  Track stats (strength, focus, creativity), level up through consistent action, and unlock achievements as you build 
                  a better version of yourself.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">Core Features</h2>
                <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <li>• Character stats tied to real-world habits (exercise, reading, work)</li>
                  <li>• Quests and daily missions with XP and rewards</li>
                  <li>• Streak tracking and progress visualization</li>
                  <li>• Achievement system with unlockable milestones</li>
                  <li>• Mobile apps with push notifications for quest reminders</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">Who It's For</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Anyone who wants to build better habits, stay consistent with goals, or turn self-improvement into a game. 
                  Perfect for fitness enthusiasts, productivity nerds, and fans of progression systems.
                </p>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="p-5 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#080808]">
                <h3 className="text-sm font-semibold mb-3 text-zinc-900 dark:text-white uppercase tracking-wide">
                  Pricing
                </h3>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
                  <li><strong className="text-zinc-900 dark:text-white">Free:</strong> 3 stat categories, basic quests</li>
                  <li><strong className="text-zinc-900 dark:text-white">Pro:</strong> Unlimited stats + custom quests</li>
                  <li><strong className="text-zinc-900 dark:text-white">Teams:</strong> Guild system for group challenges</li>
                </ul>
                <p className="text-xs text-zinc-500 dark:text-zinc-600 mt-4">
                  *Final pricing announced at launch
                </p>
              </div>

              <a
                href="https://discord.gg/kagelabs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold bg-orange-500 text-black hover:bg-orange-400 transition-colors"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                Join Discord for Updates
              </a>
            </aside>
          </div>
        </div>
      </section>
      <Footer setInteractionState={setInteractionState} />
    </>
  );
};

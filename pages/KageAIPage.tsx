import React from 'react';
import { InteractionState } from '../types';

interface ServicePageProps {
  setInteractionState: (state: InteractionState) => void;
}

export const KageAIPage: React.FC<ServicePageProps> = ({ setInteractionState }) => {
  return (
    <section className="pt-32 pb-24 px-6 min-h-screen bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-600 mb-4">
            Service / AI Systems
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white"
            onMouseEnter={() => setInteractionState(InteractionState.HOVER_TEXT)}
            onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
          >
            KageAI
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Advanced artificial intelligence systems for next-generation applications, from intelligent agents to
            automation pipelines tailored to your product.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">What we build</h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                We partner with you to design and deploy AI systems that feel native to your product, not bolted on.
                From conversational interfaces and copilots to recommendation engines and intelligent automation, our
                focus is reliability, latency, and experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">Example capabilities</h2>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <li>• Product-specific AI assistants and copilots.</li>
                <li>• Retrieval-augmented generation (RAG) over your knowledge base.</li>
                <li>• Intelligent automation for support, operations, and internal tools.</li>
                <li>• Evaluation and monitoring pipelines to keep models aligned with your goals.</li>
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="p-5 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#080808]">
              <h3 className="text-sm font-semibold mb-2 text-zinc-900 dark:text-white uppercase tracking-wide">
                Ideal for
              </h3>
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                <li>• SaaS platforms adding AI-native features</li>
                <li>• Developer tools and infra products</li>
                <li>• Companies modernizing internal workflows</li>
              </ul>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold bg-orange-500 text-black hover:bg-orange-400 transition-colors"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              Discuss a KageAI project
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};


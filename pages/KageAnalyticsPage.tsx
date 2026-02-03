import React from 'react';
import { Footer } from '../components/Footer';
import { InteractionState } from '../types';

interface ServicePageProps {
  setInteractionState: (state: InteractionState) => void;
}

export const KageAnalyticsPage: React.FC<ServicePageProps> = ({ setInteractionState }) => {
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
              KageAnalytics
            </h1>
            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
              ML-powered business intelligence dashboards that surface insights automatically.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">What is KageAnalytics?</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  KageAnalytics is a SaaS business intelligence platform that uses machine learning to automatically detect 
                  patterns, anomalies, and opportunities in your data. Connect your sources, and get actionable insights 
                  without writing SQL or building dashboards from scratch.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">Core Features</h2>
                <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <li>• Automatic anomaly detection and alerting</li>
                  <li>• Natural language queries ("show me churn by segment")</li>
                  <li>• Predictive models for LTV, churn, and revenue forecasting</li>
                  <li>• Pre-built connectors for databases, warehouses, and SaaS tools</li>
                  <li>• Customizable dashboards with AI-generated insights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">Who It's For</h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  SaaS companies, e-commerce businesses, and data-driven teams who want business intelligence 
                  without hiring a full analytics team.
                </p>
              </section>
            </div>

            <aside className="space-y-6">
              <div className="p-5 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#080808]">
                <h3 className="text-sm font-semibold mb-3 text-zinc-900 dark:text-white uppercase tracking-wide">
                  Pricing
                </h3>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
                  <li><strong className="text-zinc-900 dark:text-white">Free:</strong> 1 data source, basic dashboards</li>
                  <li><strong className="text-zinc-900 dark:text-white">Pro:</strong> Unlimited sources + ML models</li>
                  <li><strong className="text-zinc-900 dark:text-white">Enterprise:</strong> White-label + custom models</li>
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

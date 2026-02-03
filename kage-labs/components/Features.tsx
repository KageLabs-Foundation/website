import React from 'react';
import { Link } from 'react-router-dom';
import { InteractionState } from '../types';
import { Brain, BookOpen, BarChart3, GraduationCap, Zap, ArrowRight, Box } from 'lucide-react';

interface FeaturesProps {
  setInteractionState: (state: InteractionState) => void;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  colSpan: string;
  to: string;
  badge: string;
}

const features: Feature[] = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'KageAI',
    description: 'Intelligent systems and AI copilots for developers building next-gen applications',
    colSpan: 'md:col-span-2',
    to: '/kageai',
    badge: 'In Development'
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'KageComics',
    description: 'AI-powered storytelling tools for comic and manga creators',
    colSpan: 'md:col-span-1',
    to: '/kagecomics',
    badge: 'In Development'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'KageAnalytics',
    description: 'ML-powered business intelligence dashboards that surface insights automatically',
    colSpan: 'md:col-span-1',
    to: '/kageanalytics',
    badge: 'In Development'
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'KageStudy',
    description: 'Adaptive learning platform that personalizes education for every student',
    colSpan: 'md:col-span-1',
    to: '/kagestudy',
    badge: 'In Development'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'KageSystem',
    description: "Gamified progression framework inspired by Solo Leveling for real-world growth",
    colSpan: 'md:col-span-1',
    to: '/kagesystem',
    badge: 'In Development'
  },
];

export const Features: React.FC<FeaturesProps> = ({ setInteractionState }) => {
  return (
    <section id="products" className="py-32 px-6 bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white">OUR PRODUCT SUITE</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6 font-light">Five AI-powered SaaS tools. Free tier available at launch.</p>
          <div className="h-px w-24 bg-orange-500"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative p-8 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-500 flex flex-col justify-between min-h-[300px] ${feature.colSpan}`}
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              <div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-mono text-orange-500 px-2 py-1 border border-orange-500/30 bg-orange-500/10">
                    {feature.badge}
                  </span>
                </div>
                <div className="mb-8 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                </div>
                <h3 className="text-2xl font-medium mb-3 text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-500 leading-relaxed max-w-sm mb-8">
                    {feature.description}
                </p>
              </div>

              <Link
                to={feature.to}
                className="inline-flex items-center text-sm font-bold text-zinc-500 dark:text-zinc-600 group-hover:text-orange-500 transition-all duration-300 group-hover:translate-x-2"
              >
                <span className="mr-2">LEARN MORE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-500 ease-in-out"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
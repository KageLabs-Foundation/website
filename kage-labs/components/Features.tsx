import React from 'react';
import { InteractionState } from '../types';
import { Brain, BookOpen, BarChart3, GraduationCap, Zap, ArrowRight, Box } from 'lucide-react';

interface FeaturesProps {
  setInteractionState: (state: InteractionState) => void;
}

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "KageAI",
    description: "Advanced artificial intelligence solutions for next-generation applications",
    colSpan: "md:col-span-2",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "KageComics",
    description: "AI-powered comic creation and storytelling platform",
    colSpan: "md:col-span-1",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "KageAnalytics",
    description: "Deep learning analytics for business intelligence",
    colSpan: "md:col-span-1",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "KageStudy",
    description: "Interactive learning platform powered by AI",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "KageSystem",
    description: "The System inspired from Solo Leveling's System for improving lives.",
    colSpan: "md:col-span-1",
  },
];

export const Features: React.FC<FeaturesProps> = ({ setInteractionState }) => {
  return (
    <section id="features" className="py-32 px-6 bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white">OUR SERVICES</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6 font-light">Innovative solutions powered by artificial intelligence</p>
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
                <div className="absolute top-4 right-4 text-zinc-400 dark:text-zinc-800 group-hover:text-orange-500 transition-colors duration-300">
                    <Box className="w-5 h-5" />
                </div>
                <div className="mb-8 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                </div>
                <h3 className="text-2xl font-medium mb-3 text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-500 leading-relaxed max-w-sm mb-8">
                    {feature.description}
                </p>
              </div>

              <a href="#contact" className="inline-flex items-center text-sm font-bold text-zinc-500 dark:text-zinc-600 group-hover:text-orange-500 transition-all duration-300 group-hover:translate-x-2">
                  <span className="mr-2">GET STARTED</span>
                  <ArrowRight className="w-4 h-4" />
              </a>
              
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-500 ease-in-out"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
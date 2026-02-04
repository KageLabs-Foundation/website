import React from 'react';
import { InteractionState } from '../types';
import { Target, Heart, Sparkles, Globe } from 'lucide-react';

interface VisionRoadmapProps {
  setInteractionState: (state: InteractionState) => void;
}

export const VisionRoadmap: React.FC<VisionRoadmapProps> = ({ setInteractionState }) => {
  return (
    <section id="vision" className="py-32 px-6 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Vision Section */}
        <div>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white">OUR VISION</h2>
            </div>
            <div className="h-px w-24 bg-orange-500"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-white">
                Leave the World Better Than We Found It
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg mb-6">
                We're all here temporarily. When we leave, we take nothing with us—not the money, 
                not the titles, not the possessions. What remains is the impact we made and the 
                lives we touched.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg mb-6">
                That's why we build. Not for profit alone, but to create tools that genuinely help people—
                students trying to learn, developers trying to create, entrepreneurs trying to build something meaningful. 
                If our work makes even one person's journey a little easier, a little better, it matters.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Kage Labs exists to leave something worthwhile behind. Technology that empowers. 
                Products that serve. A small contribution to a world we won't be in forever.
              </p>
            </div>

            <div className="space-y-6">
              <div 
                className="p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] hover:border-orange-500/30 transition-all duration-300"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-500/10 border border-orange-500/20 text-orange-500">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">Purpose Over Profit</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      We measure success not just in revenue, but in how many people we genuinely help. 
                      Free tiers exist because access matters more than maximizing every dollar.
                    </p>
                  </div>
                </div>
              </div>

              <div 
                className="p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] hover:border-orange-500/30 transition-all duration-300"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-500/10 border border-orange-500/20 text-orange-500">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">Empower Builders</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      The best legacy is enabling others to create their own. We build tools so that 
                      students, developers, and dreamers can build things we never imagined.
                    </p>
                  </div>
                </div>
              </div>

              <div 
                className="p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] hover:border-orange-500/30 transition-all duration-300"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-500/10 border border-orange-500/20 text-orange-500">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">Global Impact</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                      From anywhere in the world, anyone should be able to access powerful AI tools. 
                      Geography shouldn't limit potential. We're building for everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-20 py-12 border-t border-zinc-200 dark:border-zinc-800">
            <blockquote className="text-center">
              <p className="text-2xl md:text-3xl font-light text-zinc-600 dark:text-zinc-300 italic max-w-3xl mx-auto">
                "We don't build to be remembered. We build so that others can do things worth remembering."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

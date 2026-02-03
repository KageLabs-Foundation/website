import React from 'react';
import { InteractionState } from '../types';
import { Target, Route, Sparkles, Zap, Rocket } from 'lucide-react';

interface VisionRoadmapProps {
  setInteractionState: (state: InteractionState) => void;
}

const roadmapItems = [
  {
    phase: "Q1 2026",
    title: "Alpha Launch",
    items: [
      "Private alpha access for KageAI and KageStudy",
      "Discord community launch for early feedback",
      "Core features and API endpoints ready"
    ],
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    phase: "Q2-Q3 2026",
    title: "Public Beta",
    items: [
      "Open beta for all five products with free tiers",
      "Pro subscription plans go live",
      "Mobile apps for KageStudy and KageSystem"
    ],
    icon: <Zap className="w-6 h-6" />
  },
  {
    phase: "Q4 2026",
    title: "General Availability",
    items: [
      "Full v1.0 launch of entire product suite",
      "Enterprise plans with SSO and custom contracts",
      "Open-source SDKs and integration libraries"
    ],
    icon: <Rocket className="w-6 h-6" />
  }
];

export const VisionRoadmap: React.FC<VisionRoadmapProps> = ({ setInteractionState }) => {
  return (
    <section id="vision" className="py-32 px-6 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Vision Section */}
        <div className="mb-32">
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
                AI Tools for Everyone
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg mb-6">
                We're building a suite of AI-powered SaaS products that make advanced technology accessible to developers, 
                students, and entrepreneurs worldwide. No consultants. No custom integrations. Just powerful tools you can use right away.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every product starts with a free tier so anyone can get started. 
                Pro and Enterprise options unlock advanced features for power users and teams who need more.
              </p>
            </div>

            <div className="space-y-6">
              <div 
                className="p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] hover:border-orange-500/30 transition-all duration-300"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                <h4 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-white">Free • Pro • Enterprise</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  All products launch with generous free tiers. Upgrade to Pro for advanced features and higher limits. 
                  Enterprise plans for teams who need dedicated support and custom solutions.
                </p>
              </div>

              <div 
                className="p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] hover:border-orange-500/30 transition-all duration-300"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                <h4 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-white">Built for Developers</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  Every product ships with comprehensive APIs, SDKs, and documentation. 
                  Integrate our tools into your workflow however you want.
                </p>
              </div>

              <div 
                className="p-6 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] hover:border-orange-500/30 transition-all duration-300"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                <h4 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-white">Global from Day One</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  Our fully remote team builds products for a global audience. 
                  Multi-language support, international payment options, and 24/7 uptime.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Section */}
        <div>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Route className="w-8 h-8 text-orange-500" />
              <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white">ROADMAP</h2>
            </div>
            <div className="h-px w-24 bg-orange-500"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800"></div>

            <div className="space-y-12">
              {roadmapItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="relative md:pl-24"
                  onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                  onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-[1.4rem] top-0 w-8 h-8 bg-orange-500 border-4 border-white dark:border-black rounded-full items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  <div className="p-8 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#080808] hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-orange-500/10 border border-orange-500/20 text-orange-500">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-mono text-orange-500 mb-2">{item.phase}</div>
                        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                      </div>
                    </div>
                    
                    <ul className="space-y-2 ml-16">
                      {item.items.map((subItem, subIdx) => (
                        <li key={subIdx} className="text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

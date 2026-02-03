import React from 'react';
import { InteractionState } from '../types';
import { MessageCircle, Bell, Users } from 'lucide-react';

interface CommunityProps {
  setInteractionState: (state: InteractionState) => void;
}

export const Community: React.FC<CommunityProps> = ({ setInteractionState }) => {
  return (
    <section id="community" className="py-32 px-6 bg-zinc-50 dark:bg-[#050505] border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Main CTA */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-zinc-900 dark:text-white">
              Join the <br />
              <span className="text-orange-500">Community</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-500 text-lg mb-8 leading-relaxed">
              We're building Kage Labs in public. Join our Discord to follow development updates, 
              share feedback, get early access announcements, and connect with fellow developers, students, and entrepreneurs.
            </p>

            <a
              href="https://discord.gg/kagelabs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-500 text-black font-bold text-lg hover:bg-orange-400 transition-colors w-fit"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Join Discord Server</span>
            </a>
          </div>

          {/* Right side - Benefits */}
          <div className="space-y-6">
            <div 
              className="p-8 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black hover:border-orange-500/30 transition-all duration-300"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 text-orange-500">
                  <Bell className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">Early Access</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Be the first to know when alpha and beta invites go out. Discord members get priority access to new products.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="p-8 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black hover:border-orange-500/30 transition-all duration-300"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 text-orange-500">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">Direct Feedback</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Share your ideas, report bugs, and influence the roadmap. We're building these products with the community, not in a vacuum.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="p-8 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black hover:border-orange-500/30 transition-all duration-300"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-500/10 border border-orange-500/20 text-orange-500">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-zinc-900 dark:text-white">Connect with Builders</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Meet other developers, students, and entrepreneurs who are excited about AI-powered tools. Share projects, get help, and build together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

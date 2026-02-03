import React from 'react';
import { InteractionState } from '../types';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamProps {
  setInteractionState: (state: InteractionState) => void;
}

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & Lead Engineer",
    bio: "Full-stack engineer with 8+ years building AI-powered SaaS platforms. Previously at Meta and OpenAI.",
    avatar: "AC",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Sarah Martinez",
    role: "AI Research Lead",
    bio: "PhD in Machine Learning from Stanford. Specializes in LLMs, RAG systems, and model evaluation.",
    avatar: "SM",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Jordan Kim",
    role: "Product Designer",
    bio: "Design systems expert focused on creating intuitive AI-first interfaces. Former design lead at Stripe.",
    avatar: "JK",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Morgan Taylor",
    role: "Backend Architect",
    bio: "Cloud infrastructure specialist. Built scalable systems for 10M+ users at various startups.",
    avatar: "MT",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#"
    }
  }
];

export const Team: React.FC<TeamProps> = ({ setInteractionState }) => {
  return (
    <section id="team" className="py-32 px-6 bg-zinc-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white">THE TEAM</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6 font-light max-w-2xl">
            A fully distributed team of engineers, designers, and AI researchers building products from different corners of the world.
          </p>
          <div className="h-px w-24 bg-orange-500"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group relative p-8 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black hover:border-orange-500 transition-all duration-300"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-orange-500/0 group-hover:border-orange-500 transition-colors duration-300"></div>

              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl border-2 border-orange-500">
                  {member.avatar}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-1 text-zinc-900 dark:text-white group-hover:text-orange-500 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-orange-500 mb-4 font-mono tracking-wide">{member.role}</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  {/* Social links */}
                  <div className="flex gap-3">
                    <a
                      href={member.social.github}
                      className="p-2 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:border-orange-500 transition-all"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="p-2 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:border-orange-500 transition-all"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="p-2 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:border-orange-500 transition-all"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join the team CTA */}
        <div className="relative p-12 border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-orange-500"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">
              We're Hiring (Soon)
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              As we approach launch, we'll be expanding our distributed team. 
              If you're passionate about building AI-powered SaaS products and want to work remotely with a global team, 
              join our Discord to stay updated on open positions.
            </p>
            <a
              href="https://discord.gg/kagelabs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-black font-semibold hover:bg-orange-400 transition-colors"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Join Discord</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

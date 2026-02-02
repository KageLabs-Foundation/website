import React from 'react';
import { InteractionState } from '../types';
import { Mail, Github, Twitter, Linkedin, Send } from 'lucide-react';

interface ContactProps {
  setInteractionState: (state: InteractionState) => void;
}

export const Contact: React.FC<ContactProps> = ({ setInteractionState }) => {
  const socialLinks = [
    { Icon: Github, href: "https://github.com/KageLabs-Foundation" },
    { Icon: Twitter, href: "#" },
    { Icon: Linkedin, href: "#" }
  ];

  return (
    <section id="contact" className="py-32 px-6 bg-zinc-50 dark:bg-[#050505] border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-zinc-900 dark:text-white">
              Let's Build <br />
              <span className="text-orange-500">Something Great</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-500 text-lg mb-12 max-w-md leading-relaxed">
              Ready to innovate? Get in touch and let's create the future together.
            </p>

            <div className="mb-12 p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#080808] hover:border-orange-500/30 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Email us at</p>
                  <a href="mailto:contact@kagelabs.helioho.st" 
                     className="text-zinc-700 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-500 transition-colors duration-300 font-mono text-sm"
                     onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                     onMouseLeave={() => setInteractionState(InteractionState.IDLE)}>
                     contact@kagelabs.helioho.st
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            {socialLinks.map(({ Icon, href }, idx) => (
              <a key={idx} href={href} target="_blank" rel="noopener noreferrer"
                 className="p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#080808] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-orange-500 transition-all duration-300 group"
                 onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                 onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        <form className="bg-white dark:bg-[#080808] border border-zinc-200 dark:border-zinc-900 p-8 md:p-10 relative">
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-orange-500/50"></div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-mono">Your Name</label>
              <input 
                type="text" 
                className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 p-4 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors duration-300"
                placeholder="John Doe"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              />
            </div>
            
            <div>
              <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-mono">Your Email</label>
              <input 
                type="email" 
                className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 p-4 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors duration-300"
                placeholder="john@example.com"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              />
            </div>
            
            <div>
              <label className="block text-xs text-zinc-500 uppercase tracking-wider mb-2 font-mono">Your Message</label>
              <textarea 
                rows={4}
                className="w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 p-4 placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors duration-300 resize-none"
                placeholder="Tell us about your project..."
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-orange-500 text-black font-bold p-4 flex items-center justify-center space-x-2 hover:bg-orange-400 transition-colors mt-4"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              <span>SEND MESSAGE</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
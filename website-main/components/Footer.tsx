import React from 'react';
import { Link } from 'react-router-dom';
import { InteractionState } from '../types';

interface FooterProps {
  setInteractionState: (state: InteractionState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setInteractionState }) => {
  return (
    <footer className="py-20 px-6 bg-white dark:bg-[#050505] border-t border-zinc-200 dark:border-zinc-900 text-center transition-colors duration-300">
        <h2 
            className="text-[12vw] leading-none font-bold text-zinc-100 dark:text-zinc-900 hover:text-zinc-200 dark:hover:text-zinc-800 transition-colors duration-500 select-none pointer-events-auto"
            onMouseEnter={() => setInteractionState(InteractionState.HOVER_TEXT)}
            onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
        >
            KAGELABS
        </h2>
        <div className="mt-12 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-zinc-500 dark:text-zinc-600 text-sm tracking-wider uppercase">
            <Link to="/#products" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Products</Link>
            <Link to="/vision" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Vision</Link>
            <Link to="/team" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Team</Link>
            <a href="https://discord.gg/kagelabs" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Discord</a>
        </div>
        <div className="mt-8 text-zinc-400 dark:text-zinc-800 text-xs">
            © {new Date().getFullYear()} KAGE LABS. ALL RIGHTS RESERVED.
        </div>
    </footer>
  );
};
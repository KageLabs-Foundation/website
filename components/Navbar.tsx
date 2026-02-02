import React, { useState } from 'react';
import { NavItem, InteractionState } from '../types';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  setInteractionState: (state: InteractionState) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#features' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ setInteractionState, isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 transition-colors duration-300">
        <div 
          className="text-2xl font-bold tracking-tighter font-['Space_Grotesk'] relative z-50 text-zinc-900 dark:text-white"
          onMouseEnter={() => setInteractionState(InteractionState.HOVER_TEXT)}
          onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
        >
          KAGE LABS<span className="text-orange-500">.</span>
        </div>

        <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-12 text-zinc-900 dark:text-white">
            {navItems.map((item) => (
                <a
                key={item.label}
                href={item.href}
                className="text-sm uppercase tracking-widest hover:text-orange-500 transition-colors duration-300"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                >
                {item.label}
                </a>
            ))}
            </div>
            
            <button
                onClick={toggleTheme}
                className="relative z-50 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                aria-label="Toggle Theme"
            >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button 
            className="md:hidden relative z-50 text-zinc-900 dark:text-white"
            onClick={toggleMenu}
            onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
            onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            aria-label="Toggle Menu"
            >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 bg-zinc-50 dark:bg-[#050505] z-40 flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-8 text-center">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-500 transition-colors duration-300"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
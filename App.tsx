import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { LandingPage } from './pages/LandingPage';
import { VisionPage } from './pages/VisionPage';
import { TeamPage } from './pages/TeamPage';
import { KageAIPage } from './pages/KageAIPage';
import { KageComicsPage } from './pages/KageComicsPage';
import { KageAnalyticsPage } from './pages/KageAnalyticsPage';
import { KageStudyPage } from './pages/KageStudyPage';
import { KageSystemPage } from './pages/KageSystemPage';
import { InteractionState } from './types';

const App: React.FC = () => {
  const [interactionState, setInteractionState] = useState<InteractionState>(InteractionState.IDLE);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <main className="bg-zinc-50 dark:bg-[#050505] min-h-screen w-full relative selection:bg-orange-500 selection:text-white transition-colors duration-300">
        <CustomCursor interactionState={interactionState} />
        <Navbar setInteractionState={setInteractionState} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <Routes>
          <Route path="/" element={<LandingPage setInteractionState={setInteractionState} />} />
          <Route path="/vision" element={<VisionPage setInteractionState={setInteractionState} />} />
          <Route path="/team" element={<TeamPage setInteractionState={setInteractionState} />} />
          <Route path="/kageai" element={<KageAIPage setInteractionState={setInteractionState} />} />
          <Route path="/kagecomics" element={<KageComicsPage setInteractionState={setInteractionState} />} />
          <Route path="/kageanalytics" element={<KageAnalyticsPage setInteractionState={setInteractionState} />} />
          <Route path="/kagestudy" element={<KageStudyPage setInteractionState={setInteractionState} />} />
          <Route path="/kagesystem" element={<KageSystemPage setInteractionState={setInteractionState} />} />
        </Routes>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s ease-out forwards;
          }
          @keyframes scaleInCenter {
            0% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: var(--target-opacity); }
          }
          .animate-scale-in {
            animation: scaleInCenter 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
        `}</style>
      </main>
    </BrowserRouter>
  );
};

export default App;

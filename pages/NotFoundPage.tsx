import React from 'react';
import { Link } from 'react-router-dom';
import { InteractionState } from '../types';
import { Footer } from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  setInteractionState: (state: InteractionState) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ setInteractionState }) => {
  return (
    <>
      <section className="pt-32 pb-24 px-6 min-h-screen bg-zinc-50 dark:bg-[#050505] flex items-center justify-center transition-colors duration-300">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-orange-500/10 flex items-center justify-center">
            <span className="text-4xl font-bold text-orange-500">404</span>
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Page not found</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-black font-semibold rounded hover:bg-orange-400 transition-colors"
            onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
            onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </section>
      <Footer setInteractionState={setInteractionState} />
    </>
  );
};

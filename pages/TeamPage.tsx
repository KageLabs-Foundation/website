import React from 'react';
import { Team } from '../components/Team';
import { Footer } from '../components/Footer';
import { InteractionState } from '../types';

interface TeamPageProps {
  setInteractionState: (state: InteractionState) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ setInteractionState }) => {
  return (
    <>
      <Team setInteractionState={setInteractionState} />
      <Footer setInteractionState={setInteractionState} />
    </>
  );
};

import React from 'react';
import { VisionRoadmap } from '../components/VisionRoadmap';
import { Footer } from '../components/Footer';
import { InteractionState } from '../types';

interface VisionPageProps {
  setInteractionState: (state: InteractionState) => void;
}

export const VisionPage: React.FC<VisionPageProps> = ({ setInteractionState }) => {
  return (
    <>
      <VisionRoadmap setInteractionState={setInteractionState} />
      <Footer setInteractionState={setInteractionState} />
    </>
  );
};

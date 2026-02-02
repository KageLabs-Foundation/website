import React, { useEffect, useState, useRef } from 'react';
import { InteractionState } from '../types';

interface CustomCursorProps {
  interactionState: InteractionState;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ interactionState }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const getSize = () => {
    switch (interactionState) {
      case InteractionState.HOVER_BUTTON:
        return 'w-12 h-12';
      case InteractionState.HOVER_TEXT:
        return 'w-20 h-20';
      default:
        return 'w-3 h-3';
    }
  };

  const getStyle = () => {
    switch (interactionState) {
      case InteractionState.HOVER_BUTTON:
        return 'border border-white bg-transparent mix-blend-difference';
      case InteractionState.HOVER_TEXT:
        return 'bg-white mix-blend-difference';
      default:
        return 'bg-orange-500/80 mix-blend-normal z-[9999]';
    }
  };

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const isHidden = !isVisible;

  return (
    <div
      ref={cursorRef}
      className={`cursor-follower fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center ${getSize()} ${getStyle()} ${isHidden ? 'opacity-0' : 'opacity-100'}`}
    />
  );
};
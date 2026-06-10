import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export enum InteractionState {
  IDLE = 'IDLE',
  HOVER_BUTTON = 'HOVER_BUTTON',
  HOVER_TEXT = 'HOVER_TEXT',
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Chat {
  id: string;
  name: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  isPrivate: boolean;
  isArchived: boolean;
}
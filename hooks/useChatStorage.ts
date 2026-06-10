import { useState, useEffect } from 'react';
import { Chat } from '../types';

const STORAGE_KEY = 'kageai_chats';

export const useChatStorage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load chats from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setChats(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load chats:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save chats to localStorage whenever they change (exclude private chats)
  useEffect(() => {
    if (isLoaded) {
      const nonPrivateChats = chats.filter(chat => !chat.isPrivate);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nonPrivateChats));
    }
  }, [chats, isLoaded]);

  // Generate AI name from first user message (or use fallback)
  const generateChatName = (messages: Chat['messages']): string => {
    const firstUserMessage = messages.find(m => m.role === 'user');
    if (!firstUserMessage) return 'New Chat';
    
    const text = firstUserMessage.content;
    if (text.length > 50) {
      return text.substring(0, 50) + '...';
    }
    return text;
  };

  const createChat = (isPrivate: boolean = false): Chat => {
    const chatId = Date.now().toString();
    const newChat: Chat = {
      id: chatId,
      name: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPrivate,
      isArchived: false,
    };
    setChats([newChat, ...chats]);
    return newChat;
  };

  const updateChat = (chatId: string, updates: Partial<Chat>) => {
    setChats(chats.map(chat =>
      chat.id === chatId
        ? { ...chat, ...updates, updatedAt: Date.now() }
        : chat
    ));
  };

  const renameChat = (chatId: string, newName: string) => {
    updateChat(chatId, { name: newName });
  };

  const updateChatMessages = (chatId: string, messages: Chat['messages']) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat && chat.messages.length === 0 && messages.length > 0) {
      // Auto-name chat on first message
      const autoName = generateChatName(messages);
      updateChat(chatId, { messages, name: autoName });
    } else {
      updateChat(chatId, { messages });
    }
  };

  const archiveChat = (chatId: string) => {
    updateChat(chatId, { isArchived: true });
  };

  const unarchiveChat = (chatId: string) => {
    updateChat(chatId, { isArchived: false });
  };

  const deleteChat = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
  };

  const getChat = (chatId: string): Chat | undefined => {
    return chats.find(c => c.id === chatId);
  };

  const getActiveChats = (): Chat[] => {
    return chats.filter(c => !c.isArchived).sort((a, b) => b.updatedAt - a.updatedAt);
  };

  const getArchivedChats = (): Chat[] => {
    return chats.filter(c => c.isArchived).sort((a, b) => b.updatedAt - a.updatedAt);
  };

  return {
    chats,
    isLoaded,
    createChat,
    updateChat,
    renameChat,
    updateChatMessages,
    archiveChat,
    unarchiveChat,
    deleteChat,
    getChat,
    getActiveChats,
    getArchivedChats,
  };
};

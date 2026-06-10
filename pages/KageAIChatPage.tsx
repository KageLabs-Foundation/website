import React, { useState, useRef, useEffect } from 'react';
import { InteractionState, Chat } from '../types';
import { Send, Bot, User, Loader2, ArrowLeft, Plus, MoreHorizontal, Edit2, Archive, Trash2, Lock, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChatStorage } from '../hooks/useChatStorage';

interface ServicePageProps {
  setInteractionState: (state: InteractionState) => void;
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

const SYSTEM_PROMPT = `You are KageAI, a high-end technology specialist and thought partner developed by KageLabs. You specialize in:
- Deep system architecture and hardware reasoning
- AI/ML concepts, LLMs, and model infrastructure
- Software development, coding, and technical problem-solving
- PCIe bottlenecks, memory bandwidth, and LLM server infrastructure
- Helping developers, students, and entrepreneurs build smarter

Your personality: Direct, knowledgeable, and concise. You don't pad responses with filler. You give real answers. You're a thought partner, not just a search engine. When you don't know something, you say so clearly.

Always identify yourself as KageAI by KageLabs when asked.`;

export const KageAIChatPage: React.FC<ServicePageProps> = ({ setInteractionState }) => {
  const { createChat, getChat, getActiveChats, getArchivedChats, updateChatMessages, renameChat, archiveChat, unarchiveChat, deleteChat, isLoaded } = useChatStorage();
  
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize with first chat on load
  useEffect(() => {
    if (isLoaded && !currentChatId) {
      const activeChats = getActiveChats();
      if (activeChats.length > 0) {
        setCurrentChatId(activeChats[0].id);
      } else {
        const newChat = createChat(false);
        setCurrentChatId(newChat.id);
      }
    }
  }, [isLoaded]);

  const currentChat = currentChatId ? getChat(currentChatId) : null;
  const messages = currentChat?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNewChat = (isPrivate: boolean) => {
    const newChat = createChat(isPrivate);
    setCurrentChatId(newChat.id);
    setShowSidebar(false);
    inputRef.current?.focus();
  };

  const handleRenameChat = (chatId: string) => {
    if (editingName.trim()) {
      renameChat(chatId, editingName.trim());
    }
    setEditingChatId(null);
    setEditingName('');
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId);
    if (currentChatId === chatId) {
      const activeChats = getActiveChats();
      if (activeChats.length > 0) {
        setCurrentChatId(activeChats[0].id);
      } else {
        const newChat = createChat(false);
        setCurrentChatId(newChat.id);
      }
    }
    setOpenMenuId(null);
  };

  const handleArchiveChat = (chatId: string) => {
    archiveChat(chatId);
    if (currentChatId === chatId) {
      const activeChats = getActiveChats().filter(c => c.id !== chatId);
      if (activeChats.length > 0) {
        setCurrentChatId(activeChats[0].id);
      } else {
        const newChat = createChat(false);
        setCurrentChatId(newChat.id);
      }
    }
    setOpenMenuId(null);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !currentChatId) return;
    if (!GROQ_API_KEY) {
      setError('API key not configured. Set VITE_GROQ_API_KEY in your .env file.');
      return;
    }

    const userMessage = { role: 'user' as const, content: input.trim() };
    const newMessages = [...messages, userMessage];
    updateChatMessages(currentChatId, newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...newMessages,
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'API request failed');
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant' as const,
        content: data.choices[0].message.content,
      };
      updateChatMessages(currentChatId, [...newMessages, assistantMessage]);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  if (!isLoaded) return null;

  const activeChats = getActiveChats();
  const archivedChats = getArchivedChats();

  interface ChatItemProps {
    chat: Chat;
    isActive: boolean;
  }

  const ChatItem: React.FC<ChatItemProps> = ({ chat, isActive }) => (
    <div
      className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
        isActive
          ? 'bg-orange-500/20 border border-orange-500/30'
          : 'hover:bg-zinc-100 dark:hover:bg-zinc-900/50 border border-transparent'
      }`}
      onClick={() => {
        setCurrentChatId(chat.id);
        setShowSidebar(false);
      }}
    >
      {editingChatId === chat.id ? (
        <input
          autoFocus
          type="text"
          value={editingName}
          onChange={(e) => setEditingName(e.target.value)}
          onBlur={() => handleRenameChat(chat.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRenameChat(chat.id);
          }}
          className="flex-1 bg-transparent border border-orange-500/50 rounded px-2 py-1 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <>
          <div className="flex-1 min-w-0">
            {chat.isPrivate && (
              <div className="flex items-center gap-1 mb-1">
                <Lock className="w-3 h-3 text-orange-500" />
                <span className="text-xs text-orange-500 font-semibold">PRIVATE</span>
              </div>
            )}
            <p className="text-sm text-zinc-700 dark:text-zinc-300 truncate">{chat.name}</p>
          </div>
          <div className="relative">
            <button
              className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-200 dark:hover:bg-zinc-800"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(openMenuId === chat.id ? null : chat.id);
              }}
            >
              <MoreHorizontal className="w-4 h-4 text-zinc-500" />
            </button>
            {openMenuId === chat.id && (
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 min-w-max">
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingChatId(chat.id);
                    setEditingName(chat.name);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                  Rename
                </button>
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArchiveChat(chat.id);
                  }}
                >
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
                <button
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-zinc-200 dark:border-zinc-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChat(chat.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="h-screen bg-zinc-50 dark:bg-[#050505] flex transition-colors duration-300 overflow-hidden pt-16">
      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-16 left-0 bottom-0 w-64 bg-white dark:bg-[#080808] border-r border-zinc-200 dark:border-zinc-900 flex flex-col z-40 transition-transform h-[calc(100vh-64px)] lg:h-auto ${
          showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
          <h2 className="font-semibold text-zinc-900 dark:text-white">Chats</h2>
          <button
            className="lg:hidden p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded"
            onClick={() => setShowSidebar(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Buttons */}
        <div className="p-3 space-y-2 border-b border-zinc-200 dark:border-zinc-900">
          <button
            onClick={() => handleNewChat(false)}
            className="w-full flex items-center gap-2 px-3 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
          <button
            onClick={() => handleNewChat(true)}
            className="w-full flex items-center gap-2 px-3 py-2 border border-orange-500/30 text-orange-500 rounded-lg hover:bg-orange-500/5 transition-colors text-sm font-medium"
          >
            <Lock className="w-4 h-4" />
            Private Chat
          </button>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {activeChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} isActive={currentChatId === chat.id} />
          ))}
        </div>

        {/* Archived Section */}
        {archivedChats.length > 0 && (
          <div className="border-t border-zinc-200 dark:border-zinc-900 p-3">
            <button
              onClick={() => setShowArchived(!showArchived)}
              className="w-full text-left text-xs font-semibold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400 py-2 transition-colors"
            >
              {showArchived ? '▼' : '▶'} Archived ({archivedChats.length})
            </button>
            {showArchived && (
              <div className="space-y-1 mt-2">
                {archivedChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-900/50 opacity-60"
                    onClick={() => {
                      unarchiveChat(chat.id);
                      setCurrentChatId(chat.id);
                    }}
                  >
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 truncate">{chat.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-zinc-200 dark:border-zinc-900/50 bg-white dark:bg-[#050505]">
          <div className="max-w-4xl mx-auto w-full px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link
                to="/kageai"
                className="p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-orange-500 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900/50"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-sm font-semibold text-zinc-900 dark:text-white">{currentChat?.name || 'KageAI'}</h1>
            </div>
            <button
              onClick={() => {
                if (currentChatId) {
                  handleNewChat(currentChat?.isPrivate || false);
                }
              }}
              className="p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-orange-500 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900/50"
              onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
              onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              title="New chat"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full px-4 py-8 flex flex-col gap-4">
            {/* Empty State */}
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-full flex items-center justify-center mb-8">
                  <Bot className="w-10 h-10 text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                  {currentChat?.isPrivate ? 'Private Chat' : 'Welcome to KageAI'}
                </h2>
                <p className="text-center text-zinc-600 dark:text-zinc-400 max-w-md mb-10 text-sm leading-relaxed">
                  Your high-end tech specialist and thought partner. Ask anything about AI, hardware, system architecture, or software engineering.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                  {[
                    'What GPU for LLM inference?',
                    'Explain PCIe bottlenecks',
                    'How do RAG pipelines work?',
                    'Fine-tune a 7B model?',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="p-4 text-left text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-200"
                      onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                      onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse justify-end' : 'flex-row justify-start'}`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    msg.role === 'assistant'
                      ? 'bg-orange-500 text-black'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-md px-4 py-3 rounded-lg text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'assistant'
                      ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100'
                      : 'bg-orange-500 text-black font-medium'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading State */}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-black" />
                </div>
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                  <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Thinking...</span>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8" />
                <div className="flex-1 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t border-zinc-200 dark:border-zinc-900/50 bg-white dark:bg-[#050505] py-4">
          <div className="max-w-2xl mx-auto w-full px-4">
            <div className="flex gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask KageAI anything..."
                rows={1}
                className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-500 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent resize-none max-h-32 transition-all"
                style={{ fieldSizing: 'content' } as any}
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-10 h-10 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 disabled:opacity-50 text-black rounded-lg flex items-center justify-center transition-colors"
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-600 mt-2 text-center">
              KageAI may make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

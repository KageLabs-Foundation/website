import React, { useState, useRef, useEffect } from 'react';
import { InteractionState, ChatMessage } from '../types';
import { generateCreativeResponse } from '../services/geminiService';
import { Send, Terminal, RefreshCw } from 'lucide-react';

interface DemoProps {
  setInteractionState: (state: InteractionState) => void;
}

export const Demo: React.FC<DemoProps> = ({ setInteractionState }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'KAGE LABS TERMINAL. SYSTEM READY.', timestamp: Date.now() }
  ]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await generateCreativeResponse(input);
    
    setLoading(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: Date.now() }]);
  };

  return (
    <section id="demo" className="py-32 px-6 bg-zinc-50 dark:bg-[#050505] border-t border-zinc-200 dark:border-zinc-900 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
            <div>
                 <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">TERMINAL UPLINK</h2>
                 <p className="text-zinc-600 dark:text-zinc-500">Interact with our systems directly.</p>
            </div>
            <Terminal className="w-10 h-10 text-zinc-700 dark:text-zinc-800" />
        </div>

        <div className="w-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-[#080808] relative overflow-hidden shadow-lg dark:shadow-none">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-800"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-800"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-800"></div>
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-600 font-mono">kage-labs // secure-shell</div>
            </div>

            <div 
              ref={containerRef}
              className="h-[400px] overflow-y-auto p-6 font-mono text-sm space-y-6"
            >
                {messages.map((msg, idx) => (
                    <div key={msg.timestamp + idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 ${msg.role === 'user' ? 'bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-800' : 'text-orange-500'}`}>
                            <span className="opacity-50 text-xs block mb-1 uppercase tracking-wider text-zinc-600 dark:text-zinc-500">
                                {msg.role === 'user' ? 'VISITOR' : 'ROOT'}
                            </span>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                     <div className="flex justify-start">
                        <div className="p-4 text-orange-500 flex items-center space-x-2">
                           <RefreshCw className="w-4 h-4 animate-spin" />
                           <span>Processing request...</span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-950 flex items-center gap-4">
                <span className="text-orange-500 font-bold">{'>'}</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter command..."
                    className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-white font-mono placeholder-zinc-400 dark:placeholder-zinc-700"
                    onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                    onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                    onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
      </div>
    </section>
  );
};
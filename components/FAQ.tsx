import React, { useState } from 'react';
import { InteractionState } from '../types';
import { Plus, Minus } from 'lucide-react';

interface FAQProps {
  setInteractionState: (state: InteractionState) => void;
}

const faqData = [
  {
    question: "What is Kage Labs?",
    answer: "Kage Labs is a premier digital agency specializing in crafting bespoke software solutions. We merge aesthetic excellence with robust engineering."
  },
  {
    question: "How do you handle project pricing?",
    answer: "We offer both fixed-price contracts for well-defined projects and hourly rates for ongoing development support. Contact us for a custom quote."
  },
  {
    question: "What technologies do you use?",
    answer: "Our stack is modern and versatile, primarily focusing on React, TypeScript, Node.js, Python, and cloud services from AWS and Google Cloud."
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes, we offer comprehensive maintenance packages to ensure your digital product remains secure, up-to-date, and performant."
  }
];

export const FAQ: React.FC<FAQProps> = ({ setInteractionState }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-32 px-6 bg-white dark:bg-[#050505] border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white">FAQ</h2>
          <p className="text-zinc-600 dark:text-zinc-500">Common queries about our operations.</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`border bg-zinc-50 dark:bg-[#080808] transition-colors duration-500 ${openIndex === index ? 'border-orange-500' : 'border-zinc-200 dark:border-zinc-900'}`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                onClick={() => toggleFAQ(index)}
                onMouseEnter={() => setInteractionState(InteractionState.HOVER_BUTTON)}
                onMouseLeave={() => setInteractionState(InteractionState.IDLE)}
              >
                <span className={`text-lg font-medium transition-colors duration-300 ${openIndex === index ? 'text-orange-500' : 'text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200'}`}>
                  {item.question}
                </span>
                <div className={`transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400" />
                  )}
                </div>
              </button>
              
              <div 
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div 
                    className={`p-6 pt-0 text-zinc-600 dark:text-zinc-500 leading-relaxed transition-all duration-500 delay-75 ease-out ${
                      openIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    }`}
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
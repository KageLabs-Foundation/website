import React, { useState } from 'react';
import { InteractionState } from '../types';
import { Plus, Minus } from 'lucide-react';

interface FAQProps {
  setInteractionState: (state: InteractionState) => void;
}

const faqData = [
  {
    question: "What is Kage Labs?",
    answer: "Kage Labs is a suite of AI-powered SaaS products designed for developers, students, and entrepreneurs. We're building tools that leverage artificial intelligence to help you work smarter, learn faster, and build better products."
  },
  {
    question: "What products are you building?",
    answer: "We're developing five distinct products: KageAI (intelligent systems and copilots), KageComics (AI storytelling tools), KageAnalytics (ML-powered business intelligence), KageStudy (adaptive learning platforms), and KageSystem (gamified progression frameworks). Each product is a standalone SaaS that addresses specific needs."
  },
  {
    question: "Who is Kage Labs for?",
    answer: "Our products are built for three core audiences: developers looking for AI-powered tools to enhance their workflow, students seeking smarter ways to learn and retain knowledge, and entrepreneurs who want data-driven insights without the complexity."
  },
  {
    question: "How much will it cost?",
    answer: "Each product will offer flexible pricing: a free tier to get started, Pro plans for power users, and Enterprise options for teams. Some features will also be usage-based, so you only pay for what you use. Detailed pricing will be announced at launch."
  },
  {
    question: "When will Kage Labs launch?",
    answer: "We're currently in the build phase. Launch dates for individual products will be announced soon. Follow us on our social channels or join our Discord community to be the first to know."
  },
  {
    question: "Is there a free tier?",
    answer: "Yes. Every Kage Labs product will include a free tier so you can explore core features before committing. We believe you should experience the value before you pay for it."
  },
  {
    question: "How can I stay updated?",
    answer: "Join our Discord community to follow development progress, get early announcements, and connect with the team directly. You can also check back on this website for updates as we get closer to launch."
  },
  {
    question: "Where is the Kage Labs team located?",
    answer: "We're a distributed team working across different regions globally. Kage Labs is built remotely, allowing us to bring together talent from around the world."
  },
  {
    question: "Will my data be secure?",
    answer: "Absolutely. Security and privacy are foundational to how we build. All products will follow industry best practices for data protection, encryption, and user privacy. We'll share detailed security documentation closer to launch."
  },
  {
    question: "How can I contact the team?",
    answer: "The best way to reach us right now is through our Discord community. Whether you have questions, feedback, or just want to say hello—we'd love to hear from you."
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
          <p className="text-zinc-600 dark:text-zinc-500">Questions about our products, launch timeline, and pricing.</p>
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
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
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
"use client";

import React, { useState } from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';
import { dictionaries } from '@/i18n/dictionaries';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

function AccordionItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/50 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <h3 className="font-heading font-semibold text-[clamp(1.125rem,1.5vw,1.375rem)] text-foreground pr-4 group-hover:text-[#FFD700] transition-colors">
          {question}
        </h3>
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-foreground group-hover:bg-[#FFD700]/10 group-hover:text-[#FFD700] transition-colors">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground text-[clamp(1rem,1.25vw,1.125rem)] leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].contactPage;

  const faqs = [
    { q: t.q1, a: t.a1 },
    { q: t.q2, a: t.a2 },
    { q: t.q3, a: t.a3 },
    { q: t.q4, a: t.a4 },
    { q: t.q5, a: t.a5 },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-24 pb-20 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="px-[clamp(1rem,4vw,2rem)] max-w-4xl mx-auto w-full mb-[clamp(3rem,8vh,5rem)] text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 items-center"
        >
          <div className="inline-flex items-center justify-center p-4 bg-[#FFD700]/10 text-[#FFD700] rounded-3xl mb-4">
            <MessageCircle className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <h1 className="font-heading font-bold text-[clamp(2.5rem,5vw,4.5rem)] text-foreground tracking-tight">
            {t.title}
          </h1>
          <p className="text-muted-foreground text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="px-[clamp(1rem,4vw,2rem)] max-w-3xl mx-auto w-full mb-[clamp(4rem,10vh,6rem)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* We use wa.me link for direct WhatsApp integration. Hardcoded to a placeholder number for now. */}
          <Link 
            href="https://wa.me/919876543210" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-full block"
          >
            <div className="absolute -inset-1.5 bg-[#25D366] rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative w-full py-6 px-8 bg-[#25D366] text-white rounded-3xl flex flex-col md:flex-row items-center justify-center gap-4 hover:bg-[#20bd5a] transition-colors shadow-2xl active:scale-[0.98] duration-200">
              <MessageCircle className="w-10 h-10 md:w-12 md:h-12 fill-current animate-pulse" />
              <span className="font-bold text-[clamp(1.25rem,2.5vw,1.75rem)] text-center md:text-left leading-tight">
                {t.whatsappBtn}
              </span>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="px-[clamp(1rem,4vw,2rem)] max-w-3xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur border border-border/50 rounded-3xl p-[clamp(1.5rem,4vw,3rem)]"
        >
          <h2 className="font-heading font-bold text-[clamp(2rem,3vw,2.5rem)] text-foreground mb-8 text-center md:text-left">
            {t.faqTitle}
          </h2>
          
          <div className="flex flex-col">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </motion.div>
      </section>

    </main>
  );
}

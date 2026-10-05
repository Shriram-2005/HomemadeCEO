"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';
import { dictionaries } from '@/i18n/dictionaries';
import { motion } from 'framer-motion';
import { Heart, Sparkles, HandHeart } from 'lucide-react';
import Link from 'next/link';

export default function StoryPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].storyPage;

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-16 md:pt-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col gap-6 items-center text-center px-[clamp(1rem,4vw,2rem)] pt-[clamp(2rem,6vh,4rem)] pb-[clamp(3rem,8vh,6rem)] max-w-5xl mx-auto w-full relative">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading font-bold tracking-tight text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] text-foreground"
        >
          {t.heroTitle}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-[clamp(1.125rem,2.5vw,1.5rem)] max-w-3xl leading-relaxed"
        >
          {t.heroDesc}
        </motion.p>
      </section>

      {/* Massive Hero Image Block */}
      <section className="w-full px-[clamp(1rem,4vw,2rem)] max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full bg-muted relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-border/50 group"
        >
          <img 
            src="/kerala_homemaker.png" 
            alt="Kerala Homemaker" 
            className="w-full h-auto md:max-h-[600px] object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-out block" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </motion.div>
      </section>

      {/* The Narrative Section */}
      <section className="flex flex-col gap-[clamp(2rem,5vh,3.5rem)] items-center px-[clamp(1rem,4vw,2rem)] py-[clamp(4rem,10vh,8rem)] max-w-4xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[#FFD700]"
        >
          <Heart className="w-8 h-8 md:w-12 md:h-12" />
          <h2 className="font-heading font-bold text-[clamp(2rem,5vw,3.5rem)] text-foreground">
            {t.narrativeTitle}
          </h2>
        </motion.div>
        
        <div className="flex flex-col gap-6 w-full text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-foreground relative">
          <div className="absolute -left-[3px] top-2 bottom-2 w-[2px] bg-[#FFD700] rounded-full hidden md:block" />
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:pl-8"
          >
            {t.narrativeDesc1}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:pl-8"
          >
            {t.narrativeDesc2}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:pl-8"
          >
            {t.narrativeDesc3}
          </motion.p>
        </div>
      </section>

      {/* The Backing Block */}
      <section className="w-full bg-accent/20 border-y border-[#FFD700]/20 py-[clamp(4rem,10vh,6rem)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFD700] rounded-full blur-[120px] opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
        
        <div className="container mx-auto px-[clamp(1rem,4vw,2rem)] max-w-5xl flex flex-col items-center text-center gap-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-2xl bg-background border border-[#FFD700]/30 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.2)]"
          >
            <Sparkles className="w-8 h-8 text-[#FFD700]" />
          </motion.div>
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-bold text-[clamp(1.75rem,4vw,2.5rem)] text-foreground">
              {t.backingTitle}
            </h3>
            <p className="text-muted-foreground text-[clamp(1.125rem,2vw,1.375rem)] max-w-2xl mx-auto leading-relaxed">
              {t.backingDesc}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center px-[clamp(1rem,4vw,2rem)] py-[clamp(5rem,12vh,8rem)] max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group w-full max-w-md"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
          <Link href="/products" className="relative w-full py-5 px-6 bg-[#FFD700] text-black font-bold text-[clamp(1.125rem,2.5vw,1.5rem)] rounded-2xl flex items-center justify-center gap-3 tracking-wide hover:bg-yellow-400 transition-colors shadow-xl active:scale-95 duration-150 break-words">
            <HandHeart className="w-6 h-6" />
            {t.ctaButton}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

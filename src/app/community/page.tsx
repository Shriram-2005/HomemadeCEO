"use client";

import React from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';
import { dictionaries } from '@/i18n/dictionaries';
import { motion } from 'framer-motion';
import { Play, Lock, MessageCircle, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const SUCCESS_STORIES = [
  {
    id: 1,
    name: "Raji",
    nameMl: "രാജി",
    location: "Kollam",
    locationMl: "കൊല്ലം",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    achievement: "Crossed ₹10,000 in first month selling pickles."
  },
  {
    id: 2,
    name: "Amina",
    nameMl: "ആമിന",
    location: "Kozhikode",
    locationMl: "കോഴിക്കോട്",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    achievement: "Expanded her spice business to 3 districts."
  }
];

export default function CommunityPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].communityPage;
  const isMl = language === 'ml';

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pt-24 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-[clamp(1rem,4vw,2rem)] max-w-7xl mx-auto w-full mb-[clamp(3rem,8vh,5rem)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 text-center items-center"
        >
          <div className="inline-flex items-center justify-center p-3 bg-[#FFD700]/10 text-[#FFD700] rounded-2xl mb-4">
            <Star className="w-8 h-8 md:w-10 md:h-10 fill-current" />
          </div>
          <h1 className="font-heading font-bold text-[clamp(2.5rem,5vw,4.5rem)] text-foreground tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-muted-foreground text-[clamp(1.125rem,2vw,1.375rem)] max-w-2xl">
            {t.heroDesc}
          </p>
        </motion.div>
      </section>

      {/* Success Stories Section */}
      <section className="px-[clamp(1rem,4vw,2rem)] max-w-7xl mx-auto w-full mb-[clamp(4rem,10vh,8rem)]">
        <div className="flex flex-col gap-4 mb-8 md:mb-12 text-center md:text-left">
          <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] text-foreground flex items-center justify-center md:justify-start gap-3">
            <TrendingUp className="text-[#FFD700] w-8 h-8 md:w-10 md:h-10" />
            {t.successTitle}
          </h2>
          <p className="text-muted-foreground text-[clamp(1.125rem,1.5vw,1.25rem)]">
            {t.successDesc}
          </p>
        </div>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(1.5rem,3vw,3rem)]">
          {SUCCESS_STORIES.map((story, idx) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border/50 flex flex-col h-[400px]"
            >
              <img 
                src={story.image} 
                alt={isMl ? story.nameMl : story.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="relative mt-auto p-6 flex flex-col gap-3 text-white z-10">
                <div>
                  <h3 className="font-heading font-bold text-2xl">
                    {isMl ? story.nameMl : story.name}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {isMl ? story.locationMl : story.location}
                  </p>
                </div>
                <p className="text-lg font-medium leading-snug">
                  "{story.achievement}"
                </p>
                <Link href="/story" className="mt-2 self-start flex items-center gap-2 text-[#FFD700] font-bold hover:text-white transition-colors">
                  <Play className="w-4 h-4 fill-current" /> {t.readStory}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Learning Modules Section (Locked) */}
      <section className="w-full bg-accent/30 py-[clamp(4rem,10vh,8rem)] border-y border-border/50 relative overflow-hidden">
        <div className="px-[clamp(1rem,4vw,2rem)] max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col gap-4 mb-8 md:mb-12 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4">
              <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] text-foreground flex items-center gap-3">
                {t.learningTitle}
              </h2>
              <div className="flex items-center gap-3 bg-background/50 backdrop-blur pl-3 pr-4 py-1.5 rounded-full border border-border/50">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  {t.lockedBadge}
                </span>
                <div className="w-px h-4 bg-border/50" />
                <Link 
                  href="/login" 
                  className="text-sm font-bold text-[#FFD700] hover:text-[#FFD700]/80 transition-colors flex items-center gap-1"
                >
                  {t.loginToAccess} &rarr;
                </Link>
              </div>
            </div>
            <p className="text-muted-foreground text-[clamp(1.125rem,1.5vw,1.25rem)] max-w-2xl mx-auto md:mx-0">
              {t.learningDesc}
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(1rem,2vw,2rem)] relative">
            {[
              { title: t.module1, desc: t.module1Desc },
              { title: t.module2, desc: t.module2Desc },
              { title: t.module3, desc: t.module3Desc }
            ].map((mod, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center gap-4 relative group overflow-hidden opacity-70 hover:opacity-100 transition-opacity cursor-not-allowed"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center relative z-0">
                  <Play className="w-8 h-8 text-foreground/70" />
                </div>
                <div className="flex flex-col gap-2 relative z-0 mt-2">
                  <h3 className="font-heading font-semibold text-xl text-foreground">
                    {mod.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {mod.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Movement CTA */}
      <section className="px-[clamp(1rem,4vw,2rem)] py-[clamp(4rem,10vh,8rem)] max-w-4xl mx-auto w-full text-center flex flex-col items-center gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-20 h-20 bg-[#25D366]/10 rounded-3xl flex items-center justify-center mb-2"
        >
          <MessageCircle className="w-10 h-10 text-[#25D366]" />
        </motion.div>
        
        <div className="flex flex-col gap-4">
          <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] text-foreground">
            {t.whatsappTitle}
          </h2>
          <p className="text-muted-foreground text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed">
            {t.whatsappDesc}
          </p>
        </div>
        
        <Link 
          href="https://wa.me/919876543210" 
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 relative group w-full max-w-sm"
        >
          <div className="absolute -inset-1 bg-[#25D366] rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative w-full py-4 px-6 bg-[#25D366] text-white font-bold text-[clamp(1.125rem,2vw,1.25rem)] rounded-2xl flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-colors shadow-lg active:scale-95 duration-150">
            <MessageCircle className="w-6 h-6 fill-current" />
            {t.whatsappBtn}
          </div>
        </Link>
      </section>

    </main>
  );
}

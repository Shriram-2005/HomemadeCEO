"use client";

import React, { useState, useEffect } from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';
import { dictionaries } from '@/i18n/dictionaries';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle2, Mic, Paperclip, ArrowLeft, MoreVertical, Phone, BookOpen, LineChart, Rocket, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].home;
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (!hasSeenSplash) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('hasSeenSplash', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-2"
            >
              <span className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
                Homemade
              </span>
              <span className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-[#FFD700]">
                CEO
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-background text-foreground flex flex-col pt-16 md:pt-24 pb-20 overflow-x-hidden">
        {/* Section 1: The Hook (Hero) */}
        <section className="flex flex-col gap-[clamp(1.5rem,4vh,2.5rem)] items-center text-center px-[clamp(1rem,4vw,2rem)] pt-[clamp(2rem,6vh,5rem)] pb-[clamp(2.5rem,8vh,5rem)] max-w-5xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading font-bold tracking-tight text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] text-foreground"
          >
            {t.heroHeadline}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground text-[clamp(1.125rem,2.5vw,1.5rem)] max-w-3xl leading-relaxed"
          >
            {t.heroSubheadline}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full max-w-[90%] md:max-w-lg mt-4 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <Link href="/login" className="relative w-full py-[clamp(1rem,2vh,1.5rem)] px-4 bg-[#FFD700] text-black font-bold text-[clamp(1.125rem,2.5vw,1.375rem)] leading-tight rounded-xl uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-lg active:scale-95 duration-150 break-words flex items-center justify-center text-center">
              {t.heroCTA}
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-4xl mt-[clamp(2rem,6vh,4rem)] aspect-video bg-muted/30 border border-[#FFD700]/20 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-2xl"
          >
            {/* Placeholder for actual Video/Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-[#FFD700]/5 z-0" />
            <div className="z-10 flex flex-col items-center gap-4 text-center px-4">
              <div className="w-16 h-16 rounded-full bg-[#FFD700]/20 flex items-center justify-center backdrop-blur-md border border-[#FFD700]/40">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-[#FFD700] border-b-[10px] border-b-transparent ml-1" />
              </div>
              <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm">Play Video</p>
            </div>
          </motion.div>
        </section>

        {/* Section 2: The Credibility Bar */}
        <section className="w-full border-y border-[#FFD700]/10 bg-accent/20 py-[clamp(1.5rem,4vh,2.5rem)] overflow-hidden relative flex items-center">
          {/* Subtle gradient fades on edges for smooth marquee entrance/exit */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max animate-marquee opacity-70 hover:opacity-100 transition-opacity duration-500">
            {[...Array(4)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-[clamp(3rem,6vw,5rem)] pr-[clamp(3rem,6vw,5rem)] items-center justify-start whitespace-nowrap" aria-hidden={groupIndex > 0 ? "true" : "false"}>
                <div className="flex items-center gap-3">
                  <span className="text-[clamp(0.875rem,1.5vw,1rem)] uppercase tracking-widest text-muted-foreground">{t.credibilityBacked}</span>
                  <span className="font-heading font-bold text-[clamp(1.125rem,2vw,1.5rem)] text-foreground">LSGD Kerala</span>
                </div>
                <div className="w-[1px] h-8 bg-[#FFD700]" />
                <div className="flex items-center gap-3">
                  <span className="text-[clamp(0.875rem,1.5vw,1rem)] uppercase tracking-widest text-muted-foreground">{t.credibilityPowered}</span>
                  <span className="font-heading font-bold text-[clamp(1.125rem,2vw,1.5rem)] text-[#FFD700]">Kudumbashree</span>
                </div>
                <div className="w-[1px] h-8 bg-[#FFD700]" />
                <div className="flex items-center gap-3">
                  <span className="text-[clamp(0.875rem,1.5vw,1rem)] uppercase tracking-widest text-muted-foreground">{t.credibilitySecure}</span>
                  <span className="font-heading font-bold text-[clamp(1.125rem,2vw,1.5rem)] text-foreground">Razorpay</span>
                </div>
                <div className="w-[1px] h-8 bg-[#FFD700]" />
                <div className="flex items-center gap-3">
                  <span className="text-[clamp(0.875rem,1.5vw,1rem)] uppercase tracking-widest text-muted-foreground">{t.credibilityLogistics}</span>
                  <span className="font-heading font-bold text-[clamp(1.125rem,2vw,1.5rem)] text-foreground">Shiprocket</span>
                </div>
                <div className="w-[1px] h-8 bg-[#FFD700]" />
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Problem & Solution */}
        <section className="flex flex-col gap-[clamp(2rem,5vh,3.5rem)] items-center px-[clamp(1rem,4vw,2rem)] py-[clamp(3rem,8vh,6rem)] max-w-6xl mx-auto w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-[clamp(2rem,5vw,3rem)] text-center text-[#FFD700]"
          >
            {t.problemTitle}
          </motion.h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(1.5rem,3vw,3rem)] w-full mt-4">
            {/* Old Way */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 p-[clamp(1.5rem,3vw,2.5rem)] rounded-3xl bg-muted/20 border border-border/50 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
              <div className="flex items-center gap-3 text-red-400">
                <XCircle className="w-8 h-8" />
                <h3 className="font-heading font-bold text-[clamp(1.25rem,2vw,1.75rem)]">{t.oldWayTitle}</h3>
              </div>
              <p className="text-muted-foreground text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed mt-2">
                {t.oldWayDesc}
              </p>
            </motion.div>
            
            {/* New Way */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 p-[clamp(1.5rem,3vw,2.5rem)] rounded-3xl bg-gradient-to-br from-[#FFD700]/10 to-transparent border border-[#FFD700]/30 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FFD700]" />
              <div className="flex items-center gap-3 text-[#FFD700]">
                <CheckCircle2 className="w-8 h-8" />
                <h3 className="font-heading font-bold text-[clamp(1.25rem,2vw,1.75rem)]">{t.newWayTitle}</h3>
              </div>
              <p className="text-foreground font-medium text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed mt-2">
                {t.newWayDesc}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Meet Jami */}
        <section className="flex flex-col gap-[clamp(2rem,5vh,3.5rem)] items-center px-[clamp(1rem,4vw,2rem)] py-[clamp(3rem,8vh,6rem)] max-w-6xl mx-auto w-full border-t border-[#FFD700]/10">
          <div className="flex flex-col items-center text-center gap-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-bold text-[clamp(2rem,5vw,3.5rem)] text-foreground"
            >
              {t.jamiTitle}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-[clamp(1.125rem,2vw,1.5rem)] max-w-2xl"
            >
              {t.jamiSubtitle}
            </motion.p>
          </div>

          {/* WhatsApp Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-md bg-[#0b141a] rounded-[2rem] border-8 border-muted overflow-hidden shadow-2xl mt-8 flex flex-col"
            style={{ aspectRatio: '9/19', maxHeight: '800px' }}
          >
            {/* WA Header */}
            <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
              <ArrowLeft className="w-5 h-5 text-gray-300" />
              <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center font-bold text-black text-xl">
                J
              </div>
              <div className="flex-1">
                <h3 className="text-gray-100 font-semibold text-lg leading-tight">Jami</h3>
                <p className="text-gray-400 text-xs">bot • online</p>
              </div>
              <Phone className="w-5 h-5 text-gray-300 ml-2" />
              <MoreVertical className="w-5 h-5 text-gray-300" />
            </div>

            {/* WA Chat Body */}
            <div className="flex-1 bg-[#0b141a] bg-opacity-95 p-4 flex flex-col gap-4 overflow-y-auto" style={{ backgroundImage: "url('https://static.whatsapp.net/rsrc.php/v3/yl/r/r_QxI0N-I0.png')", backgroundSize: 'cover', backgroundBlendMode: 'overlay' }}>
              {/* User Message */}
              <motion.div 
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="self-end bg-[#005c4b] text-gray-100 p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm relative"
              >
                <p className="text-[15px] leading-snug">{t.chatUserMsg}</p>
                <span className="text-[10px] text-gray-400 float-right mt-1 ml-2">10:42 AM</span>
              </motion.div>

              {/* Jami Reply 1 */}
              <motion.div 
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                className="self-start bg-[#202c33] text-gray-100 p-3 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm relative"
              >
                <p className="text-[15px] leading-snug italic text-gray-300">{t.chatJamiReply1}</p>
              </motion.div>

              {/* Jami Reply 2 */}
              <motion.div 
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.8 }}
                className="self-start bg-[#202c33] text-gray-100 p-4 rounded-2xl rounded-tl-none max-w-[90%] shadow-sm relative border border-[#FFD700]/10"
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{t.chatJamiReply2}</p>
                <div className="mt-3 p-3 bg-black/30 rounded-xl border border-gray-700">
                  <p className="text-blue-400 font-medium break-words text-[clamp(13px,1.5vw,14px)] underline underline-offset-2 break-all">{t.chatJamiLink}</p>
                </div>
                <span className="text-[10px] text-gray-400 float-right mt-2">10:43 AM</span>
              </motion.div>
            </div>

            {/* WA Input Area */}
            <div className="bg-[#202c33] px-2 py-3 flex items-center gap-2">
              <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 flex items-center gap-3">
                <div className="flex-1 text-gray-400 text-[15px]">Message</div>
                <Paperclip className="w-5 h-5 text-gray-400 transform -rotate-45" />
              </div>
              <div className="w-12 h-12 rounded-full bg-[#00a884] flex items-center justify-center flex-shrink-0">
                <Mic className="w-6 h-6 text-black" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section 5: The Funnel */}
        <section className="flex flex-col gap-[clamp(2rem,5vh,4rem)] items-center px-[clamp(1rem,4vw,2rem)] py-[clamp(3rem,8vh,6rem)] max-w-6xl mx-auto w-full border-t border-[#FFD700]/10 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-[clamp(2rem,5vw,3.5rem)] text-foreground text-center"
          >
            {t.funnelTitle}
          </motion.h2>

          <div className="flex flex-col md:flex-row items-stretch justify-between w-full gap-[clamp(2rem,4vw,3rem)] mt-4 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent z-0" />
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-1 flex flex-col items-center text-center gap-4 relative z-10"
            >
              <div className="w-[100px] h-[100px] rounded-full bg-background border-[2px] border-[#FFD700] flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(255,215,0,0.15)]">
                <BookOpen className="w-10 h-10 text-[#FFD700]" />
              </div>
              <h3 className="font-heading font-bold text-[clamp(1.25rem,2vw,1.75rem)]">{t.step1Title}</h3>
              <p className="text-muted-foreground text-[clamp(1rem,1.25vw,1.125rem)]">{t.step1Desc}</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex-1 flex flex-col items-center text-center gap-4 relative z-10"
            >
              <div className="w-[100px] h-[100px] rounded-full bg-background border-[2px] border-[#FFD700] flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(255,215,0,0.15)]">
                <LineChart className="w-10 h-10 text-[#FFD700]" />
              </div>
              <h3 className="font-heading font-bold text-[clamp(1.25rem,2vw,1.75rem)]">{t.step2Title}</h3>
              <p className="text-muted-foreground text-[clamp(1rem,1.25vw,1.125rem)]">{t.step2Desc}</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex-1 flex flex-col items-center text-center gap-4 relative z-10"
            >
              <div className="w-[100px] h-[100px] rounded-full bg-[#FFD700] border-[2px] border-[#FFD700] flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                <Rocket className="w-10 h-10 text-black" />
              </div>
              <h3 className="font-heading font-bold text-[clamp(1.25rem,2vw,1.75rem)]">{t.step3Title}</h3>
              <p className="text-muted-foreground text-[clamp(1rem,1.25vw,1.125rem)]">{t.step3Desc}</p>
            </motion.div>
          </div>
        </section>

        {/* Section 6: Faces of the New Entrepreneurs - Temporarily Removed */}
        {/* Section 7: The Subscription Model */}
        <section className="flex flex-col gap-[clamp(2rem,5vh,3.5rem)] items-center px-[clamp(1rem,4vw,2rem)] py-[clamp(3rem,8vh,6rem)] max-w-6xl mx-auto w-full border-t border-[#FFD700]/10">
          <div className="flex flex-col items-center text-center gap-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-bold text-[clamp(2rem,5vw,3.5rem)] text-foreground"
            >
              {t.pricingTitle}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-[clamp(1.125rem,2vw,1.5rem)]"
            >
              {t.pricingSubtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(1.5rem,3vw,3rem)] w-full mt-4">
            {/* Phase 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center justify-center gap-4 p-[clamp(2rem,4vw,3rem)] rounded-3xl bg-card border border-border shadow-lg hover:border-[#FFD700]/30 transition-colors"
            >
              <h3 className="font-heading font-semibold text-[clamp(1.25rem,2vw,1.75rem)] text-muted-foreground">{t.phase1Title}</h3>
              <p className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] text-[#FFD700]">{t.phase1Price}</p>
            </motion.div>
            
            {/* Phase 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center text-center justify-center gap-4 p-[clamp(2rem,4vw,3rem)] rounded-3xl bg-card border border-border shadow-lg hover:border-[#FFD700]/30 transition-colors relative overflow-hidden"
            >
              <h3 className="font-heading font-semibold text-[clamp(1.25rem,2vw,1.75rem)] text-muted-foreground">{t.phase2Title}</h3>
              <p className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] text-foreground">{t.phase2Price}</p>
            </motion.div>
          </div>
        </section>

        {/* Section 8: Final Call to Action */}
        <section className="flex flex-col items-center text-center px-[clamp(1rem,4vw,2rem)] py-[clamp(3.5rem,10vh,8rem)] max-w-4xl mx-auto w-full relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/10 to-transparent z-0 pointer-events-none rounded-t-[10rem] blur-3xl opacity-50" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 items-center relative z-10"
          >
            <h2 className="font-heading font-bold text-[clamp(2.5rem,6vw,4.5rem)] text-foreground leading-[1.1]">
              {t.finalCtaTitle}
            </h2>
            <p className="text-muted-foreground text-[clamp(1.25rem,2.5vw,1.75rem)] max-w-2xl mb-4">
              {t.finalCtaSubtitle}
            </p>
            <div className="w-full max-w-[90%] md:max-w-xl relative group mt-4">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-500"></div>
              <Link href="/login" className="relative w-full py-[clamp(1.25rem,3vh,1.75rem)] px-6 bg-[#FFD700] text-black font-bold text-[clamp(1.25rem,3vw,1.75rem)] leading-tight rounded-2xl uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-2xl active:scale-95 duration-150 break-words flex items-center justify-center text-center">
                {t.finalCtaBtn}
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

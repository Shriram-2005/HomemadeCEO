"use client";

import { useLanguageStore } from '@/store/useLanguageStore';
import { dictionaries } from '@/i18n/dictionaries';
import { motion, Variants } from 'framer-motion';
import { 
  MessageCircle, // Using MessageCircle for WhatsApp
  Send // Using Send for Telegram
} from 'lucide-react';
import Link from 'next/link';

export default function SocialsPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].socialsPage;
  const headerT = dictionaries[language].header;

  const socialLinks = [
    {
      id: 'whatsapp',
      name: headerT.whatsapp,
      icon: <MessageCircle className="w-10 h-10 mb-4 text-[#25D366]" />,
      href: "https://wa.me/1234567890",
      color: "hover:border-[#25D366]/50 hover:bg-[#25D366]/5"
    },
    {
      id: 'instagram',
      name: headerT.instagram,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-4 text-[#E1306C]">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      href: "https://instagram.com/homemadeceo",
      color: "hover:border-[#E1306C]/50 hover:bg-[#E1306C]/5"
    },
    {
      id: 'facebook',
      name: headerT.facebook,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-4 text-[#1877F2]">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
      href: "https://facebook.com/homemadeceo",
      color: "hover:border-[#1877F2]/50 hover:bg-[#1877F2]/5"
    },
    {
      id: 'youtube',
      name: t.youtube,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 mb-4 text-[#FF0000]">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      ),
      href: "https://youtube.com/@homemadeceo",
      color: "hover:border-[#FF0000]/50 hover:bg-[#FF0000]/5"
    },
    {
      id: 'telegram',
      name: headerT.telegram,
      icon: <Send className="w-10 h-10 mb-4 text-[#0088cc]" />,
      href: "https://t.me/homemadeceo",
      color: "hover:border-[#0088cc]/50 hover:bg-[#0088cc]/5"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <main className="min-h-[100dvh] pt-[clamp(6rem,10vh,8rem)] pb-20 px-[clamp(1.5rem,5vw,4rem)]">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight mb-4"
        >
          {t.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[clamp(1.1rem,2vw,1.25rem)] text-muted-foreground max-w-2xl mx-auto"
        >
          {t.subtitle}
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6"
      >
        {socialLinks.map((social) => (
          <motion.div key={social.id} variants={itemVariants}>
            <Link 
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center p-8 rounded-3xl border border-border/50 bg-card transition-all duration-300 group ${social.color}`}
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {social.icon}
              </div>
              <h2 className="text-xl font-bold mb-6">{social.name}</h2>
              <button 
                type="button"
                className="px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 w-full"
              >
                {t.visit} {social.name}
              </button>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}

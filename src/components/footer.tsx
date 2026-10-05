"use client";

import React from "react";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { Mail, ArrowRight } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export function Footer() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].footer;

  return (
    <footer className="w-full border-t border-[#FFD700]/20 bg-background mt-auto py-[clamp(4rem,10vh,6rem)] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[100px] bg-[#FFD700] opacity-5 blur-[100px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-[clamp(1rem,4vw,2rem)] max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[clamp(2.5rem,5vw,4rem)] pb-12 border-b border-border/50">
          
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-1 w-max group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]">
              <span className="text-[clamp(1.5rem,3vw,2rem)] font-heading font-bold tracking-tight text-foreground transition-colors group-hover:text-muted-foreground">
                Homemade
              </span>
              <span className="text-[clamp(1.5rem,3vw,2rem)] font-heading font-bold tracking-tight text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(255,215,0,0.6)] transition-all">
                CEO
              </span>
            </Link>
            <p className="text-muted-foreground text-[clamp(0.875rem,1.25vw,1rem)] max-w-md leading-relaxed mt-2">
              Empowering homemakers to build global businesses with just their voice. Learn, validate, and launch your premium storefront today.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Link href="/socials" aria-label="Instagram" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#FFD700] hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]">
                <InstagramIcon className="w-5 h-5" />
              </Link>
              <Link href="/socials" aria-label="Facebook" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#FFD700] hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]">
                <FacebookIcon className="w-5 h-5" />
              </Link>
              <Link href="/socials" aria-label="Twitter" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#FFD700] hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]">
                <TwitterIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-foreground text-lg mb-2">{t.quickLinks}</h4>
            <Link href="/story" className="text-muted-foreground hover:text-[#FFD700] transition-colors w-max text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFD700]">{t.aboutUs}</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-[#FFD700] transition-colors w-max text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFD700]">{t.faq}</Link>
            <Link href="#" className="text-muted-foreground hover:text-[#FFD700] transition-colors w-max text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFD700]">{t.terms}</Link>
            <Link href="#" className="text-muted-foreground hover:text-[#FFD700] transition-colors w-max text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFD700]">{t.privacy}</Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-heading font-bold text-foreground text-lg mb-2">{t.contactUs}</h4>
            <a href={`mailto:${t.contactEmail}`} className="flex items-center gap-2 text-muted-foreground hover:text-[#FFD700] transition-colors w-max group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFD700]">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{t.contactEmail}</span>
            </a>
            
            <div className="mt-4 relative group w-full max-w-[250px]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-yellow-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
              <Link href="/contact" className="relative w-full py-2.5 px-4 bg-accent border border-[#FFD700]/30 hover:border-[#FFD700] rounded-xl flex items-center justify-between text-foreground text-sm font-medium transition-all group-hover:bg-[#FFD700] group-hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]">
                Contact Support
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-muted-foreground">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="font-bold text-[#FFD700]">Kudumbashree</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

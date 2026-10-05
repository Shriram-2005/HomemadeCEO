"use client";

import React, { use } from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';
import { dictionaries } from '@/i18n/dictionaries';
import { PRODUCTS_DATA } from '@/data/products';
import { notFound } from 'next/navigation';
import { Star, MapPin, Tag, ArrowLeft, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { language } = useLanguageStore();
  const t = dictionaries[language].productDetailPage;
  const isMl = language === 'ml';

  const product = PRODUCTS_DATA.find(p => p.id === parseInt(resolvedParams.id));

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-8 pb-32 flex flex-col items-center">
      <div className="max-w-[1200px] w-full px-[clamp(1rem,4vw,2rem)]">
        
        {/* Back button */}
        <Link href="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-medium whitespace-nowrap">
          <ArrowLeft className="w-5 h-5" />
          {t.backToMarketplace}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2rem,6vw,4rem)]">
          {/* Image Gallery (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden relative shadow-2xl border border-border/50"
          >
            <img src={product.image} alt={isMl ? product.titleMl : product.title} className="w-full h-full object-cover" />
            <div className="absolute top-6 right-6 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full font-bold shadow-lg text-[clamp(1rem,1.5vw,1.125rem)] border border-border">
              {product.price}
            </div>
          </motion.div>

          {/* Product Info (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            {/* Maker Badge */}
            <div className="inline-flex items-center gap-3 bg-muted/50 rounded-full p-1.5 pr-5 mb-8 border border-border w-max">
              <img src={product.makerAvatar} alt="Maker" className="w-12 h-12 rounded-full object-cover shadow-sm" />
              <div className="flex flex-col">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{t.handcraftedBy}</span>
                <span className="font-bold text-[clamp(1rem,1.5vw,1.125rem)]">{isMl ? product.makerMl : product.maker}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-muted-foreground font-medium text-[clamp(0.875rem,1.5vw,1rem)]">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-5 h-5" />
                <span>{isMl ? product.districtMl : product.district}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-border" />
              <div className="flex items-center gap-1.5">
                <Tag className="w-5 h-5" />
                <span>{product.category}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-border" />
              <div className="flex items-center gap-1.5 text-yellow-500">
                <Star className="w-5 h-5 fill-yellow-500" />
                <span>{product.rating}</span>
              </div>
            </div>

            <h1 className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight mb-6">
              {isMl ? product.titleMl : product.title}
            </h1>

            <p className="text-[clamp(1.125rem,2vw,1.25rem)] leading-relaxed text-muted-foreground mb-12">
              "{product.story}" {t.storySuffix}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                <ShieldCheck className="w-8 h-8 text-green-500 shrink-0" />
                <span className="font-medium text-sm leading-tight">{t.authenticTitle}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50">
                <Truck className="w-8 h-8 text-blue-500 shrink-0" />
                <span className="font-medium text-sm leading-tight">{t.deliveryTitle}</span>
              </div>
            </div>

            {/* Massive CTA for Buyer Login */}
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[#FFD700]/10 to-yellow-600/10 border border-[#FFD700]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="font-heading font-bold text-[clamp(1.5rem,2.5vw,2rem)] mb-2 relative z-10">{t.buyTitle}</h3>
              <p className="text-muted-foreground text-[clamp(1rem,1.5vw,1.125rem)] mb-6 relative z-10">
                {t.buyDesc1} {isMl ? product.makerMl : product.maker} {t.buyDesc2}
              </p>
              
              <Link 
                href="/login"
                className="relative z-10 w-full py-4 px-6 bg-[#FFD700] text-black font-bold text-center rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors shadow-lg active:scale-95 duration-150 text-[clamp(1.125rem,2vw,1.25rem)] whitespace-nowrap"
              >
                {t.loginToBuy}
                <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}

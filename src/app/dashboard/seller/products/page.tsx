"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";

export default function SellerProductsPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 bg-muted rounded-full flex items-center justify-center border border-border/50 shadow-inner"
      >
        <Package className="w-12 h-12 text-muted-foreground" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="max-w-md"
      >
        <h1 className="font-heading font-bold text-[clamp(2rem,4vw,2.5rem)] mb-4">
          {t.comingSoon}
        </h1>
        <p className="text-muted-foreground text-[clamp(1rem,1.5vw,1.125rem)] leading-relaxed">
          {t.featureComingSoon}
        </p>
      </motion.div>
    </div>
  );
}

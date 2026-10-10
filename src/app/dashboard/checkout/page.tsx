"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";

export default function CheckoutAddressPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;
  const router = useRouter();

  const { items } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (items.length === 0) {
      router.replace("/dashboard/cart");
    }
  }, [items, router]);

  if (!isClient || items.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">{t.checkoutDeliveryAddress}</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-xl font-bold">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span>{t.addressAdd}</span>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); router.push('/dashboard/checkout/payment'); }}>
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">{t.formFullName}</label>
              <input type="text" required className="w-full p-4 rounded-2xl border-2 border-border/50 focus:border-blue-500 outline-none transition-colors bg-background" placeholder={t.formFullName} />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">{t.formPhone}</label>
              <input type="tel" required className="w-full p-4 rounded-2xl border-2 border-border/50 focus:border-blue-500 outline-none transition-colors bg-background" placeholder="10-digit mobile number" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">{t.formPincode}</label>
                <input type="text" required className="w-full p-4 rounded-2xl border-2 border-border/50 focus:border-blue-500 outline-none transition-colors bg-background" placeholder="6 digits" />
              </div>
              <div>
                <label className="block text-sm font-bold text-muted-foreground mb-1">{t.formState}</label>
                <select className="w-full p-4 rounded-2xl border-2 border-border/50 focus:border-blue-500 outline-none transition-colors bg-background">
                  <option>Kerala</option>
                  <option>Tamil Nadu</option>
                  <option>Karnataka</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">{t.formCity}</label>
              <input type="text" required className="w-full p-4 rounded-2xl border-2 border-border/50 focus:border-blue-500 outline-none transition-colors bg-background" placeholder={t.formCity} />
            </div>

            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">{t.formHouse}</label>
              <input type="text" required className="w-full p-4 rounded-2xl border-2 border-border/50 focus:border-blue-500 outline-none transition-colors bg-background" placeholder={t.formHouse} />
            </div>

            <div>
              <label className="block text-sm font-bold text-muted-foreground mb-1">{t.formArea}</label>
              <input type="text" required className="w-full p-4 rounded-2xl border-2 border-border/50 focus:border-blue-500 outline-none transition-colors bg-background" placeholder={t.formArea} />
            </div>

            {/* Total Summary */}
            <div className="w-full pt-4 mt-6 border-t border-border/50">
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl transition-all text-lg flex items-center justify-center gap-2"
              >
                {t.formContinuePayment}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

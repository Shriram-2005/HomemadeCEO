"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;
  const router = useRouter();

  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Hydration fix

  // Calculate totals
  const subtotal = items.reduce((acc, item) => {
    // Parse price like "₹250" to number
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return acc + (numericPrice * item.quantity);
  }, 0);

  // Helper to dynamically translate cart items regardless of which language they were added in
  const getLocalizedValue = (val: string) => {
    const enDict = dictionaries['en'].dashboard;
    const mlDict = dictionaries['ml'].dashboard;
    const matchedKey = Object.keys(enDict).find(k => 
      (enDict as any)[k] === val || (mlDict as any)[k] === val
    );
    return matchedKey ? (t as any)[matchedKey] : val;
  };

  const shippingCost = items.length > 0 ? 50 : 0; // Flat ₹50 shipping dummy
  const total = subtotal + shippingCost;

  return (
    <div className="w-full max-w-5xl mx-auto pb-24 md:pb-12 pt-4 px-4 md:px-0">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">{t.cartTitle}</h1>
        <div className="ml-auto bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-bold px-3 py-1 rounded-full text-sm whitespace-nowrap shrink-0">
          {items.length} {t.cartItemsLabel}
        </div>
      </div>

      <AnimatePresence>
        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-border/50 shadow-sm"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-10 h-10 text-muted-foreground opacity-50" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">{t.cartEmpty}</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-sm">{t.cartEmptyDesc}</p>
            <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-sm transition-colors">
              {t.cartContinue}
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-2xl border border-border/50 shadow-sm group"
                  >
                    <div className="w-full sm:w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-muted">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex flex-col flex-1 justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-bold text-base md:text-lg">{getLocalizedValue(item.name)}</h3>
                          <p className="text-xs text-muted-foreground">{getLocalizedValue(item.store)}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="font-bold text-lg text-blue-600 dark:text-blue-400">{item.price}</div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-muted rounded-full px-1 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center bg-background rounded-full shadow-sm hover:text-red-500 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold w-4 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center bg-background rounded-full shadow-sm hover:text-green-500 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm sticky top-24"
              >
                <h3 className="font-bold text-xl mb-6 font-heading">{t.cartOrderSummary}</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{t.cartSubtotal}</span>
                    <span className="font-bold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{t.cartShipping}</span>
                    <span className="font-bold">₹{shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-border my-2"></div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold">{t.cartTotal}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => router.push('/dashboard/checkout')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 group mb-4"
                >
                  {t.cartCheckout} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-green-500" /> {t.cartSecureCheckout}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Truck className="w-4 h-4 text-blue-500" /> {t.cartFastDelivery}
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

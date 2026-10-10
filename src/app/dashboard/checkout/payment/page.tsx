"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, CreditCard, Landmark, Truck } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPaymentPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;
  const router = useRouter();

  const { items, clearCart } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  const [activePayment, setActivePayment] = useState("upi");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (items.length === 0) {
      router.replace("/dashboard/cart");
    }
  }, [items, router]);

  if (!isClient || items.length === 0) return null;

  // Calculate totals
  const subtotal = items.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    return acc + (numericPrice * item.quantity);
  }, 0);
  const shippingCost = items.length > 0 ? 50 : 0; // Flat ₹50 shipping dummy
  const total = subtotal + shippingCost;

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <div className="w-full max-w-lg mx-auto py-32 px-4 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </motion.div>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold font-heading mb-4"
        >
          {t.checkoutSuccessTitle}
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg mb-10 max-w-md"
        >
          {t.checkoutSuccessDesc}
        </motion.p>
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-sm transition-all text-lg">
            {t.checkoutBackToHome}
          </Link>
        </motion.div>
      </div>
    );
  }

  const payments = [
    { id: "upi", icon: <Landmark className="w-6 h-6" />, label: t.paymentUPI },
    { id: "card", icon: <CreditCard className="w-6 h-6" />, label: t.paymentCard },
    { id: "cod", icon: <Truck className="w-6 h-6" />, label: t.paymentCOD },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">{t.checkoutPaymentMethod}</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Section 2: Payment */}
        <section className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-green-500" /> {t.checkoutPaymentMethod}
          </h2>
          <div className="flex flex-col gap-3">
            {payments.map((method) => (
              <div 
                key={method.id}
                onClick={() => setActivePayment(method.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all \${activePayment === method.id ? 'border-green-500 bg-green-50/50 dark:bg-green-900/10' : 'border-border/50 hover:border-border'}`}
              >
                <div className={`p-2 rounded-xl \${activePayment === method.id ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200' : 'bg-muted text-muted-foreground'}`}>
                  {method.icon}
                </div>
                <span className="font-bold text-base flex-1">{method.label}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center \${activePayment === method.id ? 'border-green-500' : 'border-border'}`}>
                  {activePayment === method.id && <div className="w-3 h-3 bg-green-500 rounded-full" />}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
             <div className="flex justify-between items-center text-lg mb-1">
                <span className="font-bold">{t.cartTotal}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">₹{total.toFixed(2)}</span>
             </div>
             <p className="text-xs text-muted-foreground mb-4">Including {t.cartShipping} - ₹50</p>
          </div>

          {/* Total Summary */}
          <div className="w-full pt-2">
             <button 
              onClick={handlePlaceOrder}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl transition-all text-lg flex items-center justify-center gap-2"
            >
              {t.checkoutPlaceOrder} - ₹{total.toFixed(2)}
            </button>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

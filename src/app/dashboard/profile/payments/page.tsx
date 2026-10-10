"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, ShieldCheck, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuyerPaymentsPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Payment Methods</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage your cards and UPI</p>
        </div>
      </div>

      <div className="bg-green-500/10 text-green-700 dark:text-green-400 p-4 rounded-2xl flex items-start gap-3 mb-8 border border-green-500/20">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <p className="text-sm font-medium leading-relaxed">Your payment information is securely encrypted and stored. We do not share your full card details with sellers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Saved UPI */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center">
              <span className="font-black text-xl">U</span>
            </div>
            <div>
              <p className="font-bold">Google Pay (UPI)</p>
              <p className="text-sm text-muted-foreground mt-0.5">aiswarya@okicici</p>
            </div>
          </div>
        </motion.div>

        {/* Add New Method */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card border-2 border-dashed border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all rounded-3xl p-6 flex items-center gap-4 cursor-pointer group"
        >
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold">Add Payment Method</p>
            <p className="text-sm text-muted-foreground mt-0.5">Card, UPI, Netbanking</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, DollarSign, Download, ArrowUpRight, Clock, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerEarningsPage() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const handleWithdraw = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const transactions = [
    { id: "TXN-9982", desc: "Payout to Bank Account", date: "Oct 10, 2026", amount: "-₹12,450", status: "Completed" },
    { id: "ORD-9281", desc: "Sale: Spicy Mango Pickle x2", date: "Oct 09, 2026", amount: "+₹500", status: "Settled" },
    { id: "ORD-9282", desc: "Sale: Kerala Kasavu Saree", date: "Oct 09, 2026", amount: "+₹1,500", status: "Pending" },
    { id: "ORD-9104", desc: "Sale: Garlic Pickle x1", date: "Oct 08, 2026", amount: "+₹200", status: "Settled" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-32 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Earnings & Payouts</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage your money</p>
        </div>
      </div>

      {/* Balance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#FFD700] to-yellow-600 rounded-[2rem] p-8 text-black mb-8 shadow-xl shadow-yellow-600/20 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <p className="font-bold text-black/70 mb-1 uppercase tracking-wider text-sm">Available Balance</p>
          <h2 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">₹4,250.00</h2>
          <p className="font-medium text-black/80 flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Next automatic payout: Oct 15
          </p>
        </div>
        <button 
          onClick={handleWithdraw}
          className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
        >
          <ArrowUpRight className="w-5 h-5" /> Withdraw to UPI / Bank
        </button>
      </motion.div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 font-bold whitespace-nowrap border border-white/20"
          >
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            Payout Requested! Funds arriving in 24 hrs.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-bold text-lg">Recent Transactions</h3>
        <button className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-card border border-border/50 rounded-[2rem] overflow-hidden shadow-sm">
        {transactions.map((txn, i) => (
          <div key={i} className="p-5 border-b border-border/50 last:border-0 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${txn.amount.startsWith('+') ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                {txn.amount.startsWith('+') ? <ArrowUpRight className="w-5 h-5 rotate-45" /> : <ArrowUpRight className="w-5 h-5 rotate-[225deg]" />}
              </div>
              <div>
                <h4 className="font-bold text-sm md:text-base">{txn.desc}</h4>
                <div className="flex items-center gap-2 text-xs font-medium mt-1 text-muted-foreground">
                  <span>{txn.date}</span>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded-full ${txn.status === 'Completed' ? 'bg-green-500/10 text-green-600' : txn.status === 'Pending' ? 'bg-orange-500/10 text-orange-600' : 'bg-muted text-foreground'}`}>
                    {txn.status}
                  </span>
                </div>
              </div>
            </div>
            <div className={`font-black text-lg ${txn.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
              {txn.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

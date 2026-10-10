"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Users, Eye, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerAnalyticsPage() {
  const router = useRouter();

  // Mock chart heights
  const chartData = [30, 45, 20, 60, 40, 80, 65, 90, 75, 100, 85, 95];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-32 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Store Analytics</h1>
          <p className="text-sm text-muted-foreground font-medium">Track your performance over time</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border/50 rounded-3xl p-5 shadow-sm">
          <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center mb-3"><Eye className="w-5 h-5" /></div>
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Store Views</p>
          <p className="text-2xl font-black">4,209</p>
          <p className="text-xs text-green-500 font-bold mt-1">+12% this week</p>
        </div>
        <div className="bg-card border border-border/50 rounded-3xl p-5 shadow-sm">
          <div className="w-10 h-10 bg-purple-500/10 text-purple-600 rounded-full flex items-center justify-center mb-3"><Users className="w-5 h-5" /></div>
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Unique Visitors</p>
          <p className="text-2xl font-black">1,842</p>
          <p className="text-xs text-green-500 font-bold mt-1">+5% this week</p>
        </div>
        <div className="bg-card border border-border/50 rounded-3xl p-5 shadow-sm">
          <div className="w-10 h-10 bg-orange-500/10 text-orange-600 rounded-full flex items-center justify-center mb-3"><TrendingUp className="w-5 h-5" /></div>
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Conversion Rate</p>
          <p className="text-2xl font-black">3.4%</p>
          <p className="text-xs text-red-500 font-bold mt-1">-0.2% this week</p>
        </div>
        <div className="bg-card border border-border/50 rounded-3xl p-5 shadow-sm">
          <div className="w-10 h-10 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-3"><BarChart3 className="w-5 h-5" /></div>
          <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Total Orders</p>
          <p className="text-2xl font-black">142</p>
          <p className="text-xs text-green-500 font-bold mt-1">+18% this week</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-[2rem] p-6 md:p-8 shadow-sm">
        <h3 className="font-bold text-lg mb-6">Traffic Overview (Last 30 Days)</h3>
        
        {/* CSS Only Animated Bar Chart */}
        <div className="h-48 flex items-end justify-between gap-1 md:gap-2 mb-4">
          {chartData.map((val, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${val}%` }}
              transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
              className="w-full bg-primary/20 hover:bg-primary transition-colors rounded-t-md relative group cursor-pointer"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                {val * 20}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between text-xs font-bold text-muted-foreground">
          <span>Oct 1</span>
          <span>Oct 15</span>
          <span>Oct 30</span>
        </div>
      </div>

    </div>
  );
}

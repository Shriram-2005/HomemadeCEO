"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, Package, Eye, PlusCircle, Video, 
  ArrowRight, User, Bell, ChevronRight, Activity, Sparkles, Send 
} from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SellerDashboardPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const mockPendingOrders = [
    { id: "ORD-9281", customer: "Rahul M.", item: "Spicy Mango Pickle", price: "₹500", time: "2h ago", status: "New" },
    { id: "ORD-9282", customer: "Sneha K.", item: "Kerala Kasavu Saree", price: "₹1500", time: "5h ago", status: "Packing" },
  ];

  // A simple simulated chart using pure divs
  const chartData = [40, 70, 45, 90, 65, 100, 85];

  if (!mounted) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen bg-gradient-to-b from-background to-muted/20">
      
      {/* Top Navigation Bar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-heading tracking-tight text-foreground">
              Amina Spices
            </h1>
            <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full w-fit mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Store Active
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-background border border-border/50 shadow-sm flex items-center justify-center relative hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
          </button>
          <Link 
            href="/dashboard/profile"
            className="hidden md:flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-primary/20 transition-colors"
          >
            <User className="w-4 h-4" />
            {t.sellerSwitchToBuyer}
          </Link>
        </div>
      </motion.div>

      {/* Share to WhatsApp Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}
        onClick={() => {
          const text = encodeURIComponent("Hi! I just launched my new store on Homemade CEO. Check out my amazing homemade products here: https://homemadeceo.app/store/amina-spices");
          window.open(`https://wa.me/?text=${text}`, '_blank');
        }}
        className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl p-4 flex items-center justify-center gap-3 font-bold mb-8 shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        Share Store to WhatsApp
      </motion.button>

      {/* Hero Banner / AI Insights */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 rounded-[2rem] p-6 md:p-8 mb-8 text-white shadow-xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-bold tracking-widest text-indigo-200 uppercase">Jami AI Insight</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Great job, Amina!</h2>
            <p className="text-indigo-100/80 leading-relaxed text-sm md:text-base">
              Your "Spicy Mango Pickle" is trending in Kochi. Consider recording a quick behind-the-scenes Short to boost sales even further.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto">
            <button 
              onClick={() => router.push('/dashboard/seller/shorts')}
              className="w-full sm:w-auto bg-white text-indigo-950 px-5 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all shadow-lg text-sm"
            >
              <Video className="w-4 h-4" />
              Create a Short Now
            </button>

            <a 
              href="https://t.me/Homemade_CEO_JAMI_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border border-white/30 px-5 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md text-sm text-center"
            >
              <Send className="w-4 h-4" />
              Telegram Bot
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main KPI Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="col-span-2 bg-card border border-border/50 rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.01)] relative overflow-hidden group">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-bold text-muted-foreground mb-1">{t.sellerTotalEarnings}</p>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">₹12,450</h3>
            </div>
            <div className="p-3 bg-green-500/10 text-green-600 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          
          {/* Animated Bar Chart */}
          <div className="flex items-end justify-between h-16 gap-2 w-full mt-auto">
            {chartData.map((val, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ duration: 1, delay: 0.3 + (i * 0.1), ease: "easeOut" }}
                className={`w-full rounded-t-sm ${i === chartData.length - 1 ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary/30 transition-colors'}`}
              />
            ))}
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer" onClick={() => router.push('/dashboard/seller/orders')}>
          <div className="w-12 h-12 bg-purple-500/10 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground mb-1">{t.sellerActiveOrders}</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black tracking-tight">14</h3>
              <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full mb-1">2 Urgent</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer">
          <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground mb-1">{t.sellerStoreViews}</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black tracking-tight">1.2K</h3>
              <span className="text-xs font-bold text-green-500 mb-1">+12%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Action Dock */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4 mb-10"
      >
        <Link 
          href="/dashboard/seller/products"
          className="relative overflow-hidden bg-card border border-border/50 rounded-3xl p-6 group hover:border-blue-500/50 hover:shadow-lg transition-all"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <PlusCircle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-base mb-0.5">{t.sellerAddProduct}</h4>
              <p className="text-xs text-muted-foreground">Expand your inventory</p>
            </div>
          </div>
        </Link>

        <Link 
          href="/dashboard/seller/shorts"
          className="relative overflow-hidden bg-card border border-border/50 rounded-3xl p-6 group hover:border-pink-500/50 hover:shadow-lg transition-all"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/10 transition-colors" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-14 h-14 bg-pink-500/10 text-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-base mb-0.5">{t.sellerUploadShort}</h4>
              <p className="text-xs text-muted-foreground">Boost your visibility</p>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Task List / Orders to Pack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-5 px-1">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold font-heading">{t.sellerPendingActions}</h2>
          </div>
          <Link href="/dashboard/seller/orders" className="text-sm font-bold text-primary hover:underline flex items-center">
            {t.sellerOrders}
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {mockPendingOrders.map((order, i) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.1) }}
              className="bg-card border border-border/50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-bold text-base">{order.item}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {order.customer} • <span className="font-medium text-foreground">{order.price}</span> • {order.time}
                  </p>
                </div>
              </div>
              
              <Link 
                href="/dashboard/seller/orders"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                {t.sellerPackOrder}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

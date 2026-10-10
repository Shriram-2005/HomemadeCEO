"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, Plus, ArrowLeft, X, Play, TrendingUp, BarChart3, CheckCircle2 } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { useRouter } from "next/navigation";

export default function SellerShortsPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;

  const [isUploading, setIsUploading] = useState(false);

  const mockShorts = [
    { id: 1, title: "Making our famous Banana Chips from scratch!", views: "12.4K", likes: "1.2K", conversion: "+14%", thumbnail: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "Packing a huge order for Ernakulam!", views: "5.4K", likes: "856", conversion: "+8%", thumbnail: "https://images.unsplash.com/photo-1579567936166-3d23da56847c?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "Harvesting fresh organic spices today", views: "3.2K", likes: "420", conversion: "+5%", thumbnail: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen bg-gradient-to-b from-background to-muted/20">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading">{t.sellerShorts}</h1>
            <p className="text-sm text-muted-foreground font-medium">Build trust through video</p>
          </div>
        </div>
      </motion.div>

      {/* Analytics Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-rose-600 to-orange-500 rounded-[2rem] p-6 md:p-8 mb-10 text-white shadow-xl shadow-pink-600/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-white" />
              <span className="text-sm font-bold tracking-widest text-pink-100 uppercase">Performance</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-1">21K Views</h2>
            <p className="text-pink-100 font-medium">Across all your shorts this week.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="text-sm text-pink-100 font-bold mb-1">Orders from Shorts</div>
              <div className="text-2xl font-black text-white flex items-center gap-2">
                142 <span className="text-xs bg-green-500/80 text-white px-2 py-0.5 rounded-full">+12%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Shorts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-24">
        
        {/* Upload New Short Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          onClick={() => setIsUploading(true)}
          className="relative aspect-[9/16] bg-card border-2 border-dashed border-pink-500/30 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-pink-500/60 hover:bg-pink-500/5 transition-all group flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="w-14 h-14 bg-pink-500/10 text-pink-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
            <Plus className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-center px-4 leading-tight">Upload New</h3>
        </motion.div>

        <AnimatePresence>
          {mockShorts.map((short, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }}
              key={short.id} 
              className="relative aspect-[9/16] bg-card rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-border/50 cursor-pointer"
            >
              <img src={short.thumbnail} alt={short.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 z-10">
                <div className="w-14 h-14 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/50 shadow-lg">
                  <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Gradient Bottom Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 flex flex-col justify-end z-0">
                <h3 className="text-white font-bold leading-tight line-clamp-2 mb-3 text-sm md:text-base text-shadow-sm">{short.title}</h3>
                
                <div className="flex items-center justify-between text-white/80">
                  <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">{short.views}</span>
                  </div>
                  <div className="text-xs font-bold text-green-400">
                    {short.conversion} Sales
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Premium Upload Modal */}
      <AnimatePresence>
        {isUploading && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center items-center bg-black/60 backdrop-blur-md px-4 pb-4 md:p-0"
          >
            <motion.div 
              initial={{ y: "100%", opacity: 0, scale: 0.95 }} 
              animate={{ y: 0, opacity: 1, scale: 1 }} 
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-card border border-border/50 rounded-[2rem] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50 sticky top-0 bg-card/80 backdrop-blur-xl z-10">
                <div>
                  <h2 className="text-2xl font-bold font-heading">{t.sellerUploadShort}</h2>
                  <p className="text-sm text-muted-foreground">Share your process with the world</p>
                </div>
                <button 
                  onClick={() => setIsUploading(false)}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 overflow-y-auto hide-scrollbar flex flex-col md:flex-row gap-6">
                
                {/* Vertical Video Upload Area */}
                <div className="w-[180px] h-[320px] mx-auto md:mx-0 shrink-0 bg-muted/50 border-2 border-dashed border-pink-500/30 rounded-3xl flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-pink-500/5 hover:border-pink-500/50 transition-all group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:text-pink-600 transition-all relative z-10">
                    <Video className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-foreground relative z-10">Tap to record</span>
                  <span className="text-xs mt-1 text-center px-4 relative z-10">Vertical video<br/>Up to 60s</span>
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-foreground ml-1">Caption</label>
                      <textarea 
                        rows={3}
                        placeholder="Write a catchy caption... e.g. Packing a huge order for Ernakulam today! Thank you for the support ❤️" 
                        className="w-full bg-muted/50 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-pink-500 focus:bg-card shadow-inner font-medium transition-all resize-none" 
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-foreground ml-1">Link a Product (Optional)</label>
                      <div className="relative">
                        <select className="w-full bg-muted/50 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-pink-500 focus:bg-card shadow-inner font-medium appearance-none transition-all">
                          <option>Select a product to link...</option>
                          <option>Spicy Mango Pickle</option>
                          <option>Kerala Kasavu Saree</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground ml-1 mt-1">Linking a product shows a "Buy Now" button directly on your video.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsUploading(false)}
                    className="w-full bg-foreground text-background font-bold text-lg py-5 rounded-2xl mt-6 hover:bg-pink-600 hover:text-white transition-all shadow-lg hover:shadow-pink-500/25 active:scale-[0.98]"
                  >
                    Post Short
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, MessageSquare, Image as ImageIcon, TrendingUp, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerAIPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 pb-32 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Jami AI Assistant
          </h1>
          <p className="text-sm text-muted-foreground font-medium">Your personal business co-pilot</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm mb-8 text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-4">
          <Sparkles className="w-10 h-10 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">How can Jami help you today?</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">Jami can write product descriptions, analyze your sales, and help you create engaging content for your store.</p>
        
        <button className="w-full max-w-xs bg-foreground text-background font-bold py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5" /> Open Chat
        </button>
      </div>

      <h3 className="font-bold text-lg mb-4 px-2">Popular AI Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="bg-card border border-border/50 rounded-[1.5rem] p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h4 className="font-bold">Magic Descriptions</h4>
          <p className="text-xs text-muted-foreground mt-1">Generate catchy SEO product descriptions instantly.</p>
        </div>

        <div className="bg-card border border-border/50 rounded-[1.5rem] p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-pink-500/10 text-pink-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h4 className="font-bold">Photo Enhancer</h4>
          <p className="text-xs text-muted-foreground mt-1">Automatically remove backgrounds and brighten photos.</p>
        </div>

        <div className="bg-card border border-border/50 rounded-[1.5rem] p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h4 className="font-bold">Sales Insights</h4>
          <p className="text-xs text-muted-foreground mt-1">Ask Jami what products to focus on next month.</p>
        </div>

        <div className="bg-card border border-border/50 rounded-[1.5rem] p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-purple-500/10 text-purple-600 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="font-bold">Reply to Reviews</h4>
          <p className="text-xs text-muted-foreground mt-1">Draft polite, professional responses to customer feedback.</p>
        </div>

      </div>
    </div>
  );
}

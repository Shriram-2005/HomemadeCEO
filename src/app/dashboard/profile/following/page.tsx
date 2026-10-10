"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Store, Star, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuyerFollowingPage() {
  const router = useRouter();

  const following = [
    { name: "Amina Spices", category: "Pickles & Spices", rating: "4.9", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" },
    { name: "Kerala Weaves", category: "Apparel", rating: "4.8", image: "https://images.unsplash.com/photo-1533758369344-933390ccbe34?auto=format&fit=crop&w=150&q=80" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Following</h1>
          <p className="text-sm text-muted-foreground font-medium">Stores you love and support</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {following.map((store, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-card border border-border/50 p-5 rounded-3xl flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <img src={store.image} alt={store.name} className="w-16 h-16 rounded-full object-cover border border-border/50" />
            <div className="flex-1">
              <h3 className="font-bold text-lg">{store.name}</h3>
              <p className="text-xs text-muted-foreground">{store.category}</p>
              <div className="flex items-center gap-1 mt-1 text-sm font-bold text-yellow-600">
                <Star className="w-3.5 h-3.5 fill-current" /> {store.rating}
              </div>
            </div>
            <button className="w-10 h-10 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

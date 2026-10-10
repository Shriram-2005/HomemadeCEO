"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuyerWishlistPage() {
  const router = useRouter();

  const wishlist = [
    { name: "Organic Black Pepper 250g", store: "Green Farms", price: "₹300", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Wishlist</h1>
          <p className="text-sm text-muted-foreground font-medium">Saved for later</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {wishlist.map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-muted">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-red-500 hover:bg-white transition-colors">
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{item.store}</p>
              <h3 className="font-bold text-lg leading-tight mb-3 line-clamp-1">{item.name}</h3>
              <div className="flex items-center justify-between">
                <div className="font-black text-xl">{item.price}</div>
                <button className="bg-foreground text-background w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Package, Tag, Megaphone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuyerNotificationsPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Notifications</h1>
          <p className="text-sm text-muted-foreground font-medium">Choose what you want to hear about</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-[2rem] overflow-hidden shadow-sm">
        
        <div className="p-5 md:p-6 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Order Updates</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Shipping, delivery, and delays</p>
            </div>
          </div>
          <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
          </div>
        </div>

        <div className="p-5 md:p-6 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-500/10 text-pink-600 rounded-full flex items-center justify-center shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Store Updates</h3>
              <p className="text-sm text-muted-foreground mt-0.5">New products from stores you follow</p>
            </div>
          </div>
          <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
          </div>
        </div>

        <div className="p-5 md:p-6 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Promotions & Offers</h3>
              <p className="text-sm text-muted-foreground mt-0.5">Exclusive discounts and seasonal sales</p>
            </div>
          </div>
          <div className="w-12 h-6 bg-muted rounded-full relative cursor-pointer">
            <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm" />
          </div>
        </div>

      </div>
    </div>
  );
}

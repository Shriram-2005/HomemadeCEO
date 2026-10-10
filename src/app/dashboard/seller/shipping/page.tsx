"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Truck, MapPin, PackageOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerShippingPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 pb-32 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Shipping & Delivery</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage logistics and rates</p>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Active Logistics Partner */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[2rem] p-6 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold">Delivery Partner</h2>
          </div>
          <p className="text-blue-100 text-sm mb-6">You are currently partnered with India Post for nationwide delivery.</p>
          
          <div className="bg-black/20 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-blue-200 uppercase tracking-wider font-bold">Standard Rate</p>
              <p className="text-xl font-black">₹50 <span className="text-sm font-medium text-blue-200">/ order</span></p>
            </div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform">
              Change
            </button>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> Pickup Address
          </h2>
          <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
            <p className="font-bold text-foreground">Amina Spices Store</p>
            <p className="text-sm text-muted-foreground mt-1 leading-snug">123 Palm Grove,<br/>Ernakulam, Kerala - 682011</p>
          </div>
          <button className="w-full mt-4 py-3 bg-muted font-bold rounded-xl hover:bg-foreground hover:text-background transition-colors text-sm">
            Change Pickup Location
          </button>
        </div>

        {/* Packaging Guide */}
        <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors group">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950/30 text-orange-600 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <PackageOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold">Packaging Guidelines</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Learn how to pack items safely to avoid damage.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

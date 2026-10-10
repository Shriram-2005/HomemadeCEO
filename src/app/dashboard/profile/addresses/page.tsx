"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Plus, CheckCircle2, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuyerAddressesPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Saved Addresses</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage where you receive orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Default Address */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 border-2 border-primary/30 rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl">
            DEFAULT
          </div>
          <div className="flex justify-between items-start mb-4 mt-2">
            <div className="flex items-center gap-2 font-bold text-lg">
              <MapPin className="w-5 h-5 text-primary" /> Home
            </div>
            <button className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
          <p className="text-foreground font-medium mb-1">Aiswarya R.</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Flat 4B, Skyline Apartments<br/>Kakkanad, Ernakulam<br/>Kerala - 682030
          </p>
          <p className="text-sm font-bold">Ph: +91 9876543210</p>
        </motion.div>

        {/* Add New */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card border-2 border-dashed border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all rounded-3xl p-6 flex flex-col items-center justify-center min-h-[200px] cursor-pointer group"
        >
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <p className="font-bold">Add New Address</p>
        </motion.div>

      </div>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Phone, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuyerInfoPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-2xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Personal Info</h1>
          <p className="text-sm text-muted-foreground font-medium">Update your account details</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-[2rem] p-6 md:p-8 shadow-sm space-y-6">
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl font-black shadow-inner">
            A
          </div>
          <button className="text-sm font-bold text-primary hover:underline">Change Photo</button>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
            <User className="w-3.5 h-3.5" /> Full Name
          </label>
          <input type="text" defaultValue="Aiswarya R." className="w-full bg-muted/50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-primary font-medium" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" /> Phone Number
          </label>
          <input type="tel" defaultValue="+91 9876543210" className="w-full bg-muted/50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-primary font-medium" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" /> Email Address
          </label>
          <input type="email" defaultValue="aiswarya@example.com" className="w-full bg-muted/50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-primary font-medium" />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> Date of Birth
          </label>
          <input type="date" defaultValue="1995-10-15" className="w-full bg-muted/50 p-4 rounded-2xl border-none focus:ring-2 focus:ring-primary font-medium" />
        </div>

        <button className="w-full bg-foreground text-background font-bold py-4 rounded-2xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg">
          Save Changes
        </button>

      </div>
    </div>
  );
}

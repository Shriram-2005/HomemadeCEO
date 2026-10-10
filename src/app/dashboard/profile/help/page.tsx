"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, FileText, PhoneCall, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuyerHelpPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Help & Support</h1>
          <p className="text-sm text-muted-foreground font-medium">How can we assist you?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        
        <div className="bg-card border border-border/50 p-6 rounded-3xl hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-lg mb-1">Chat with Support</h3>
          <p className="text-sm text-muted-foreground">Get instant help from our 24/7 team regarding your orders.</p>
        </div>

        <div className="bg-card border border-border/50 p-6 rounded-3xl hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-14 h-14 bg-orange-500/10 text-orange-600 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-lg mb-1">Read FAQs</h3>
          <p className="text-sm text-muted-foreground">Find answers to common questions about shipping and refunds.</p>
        </div>

      </div>

      <div className="bg-muted/30 rounded-3xl p-6 border border-border/50 space-y-4">
        <h3 className="font-bold text-lg">Other Contact Methods</h3>
        
        <button className="w-full flex items-center justify-between p-4 bg-background border border-border/50 rounded-2xl hover:bg-muted transition-colors">
          <div className="flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-primary" />
            <span className="font-bold">Call Us (1800-123-4567)</span>
          </div>
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-background border border-border/50 rounded-2xl hover:bg-muted transition-colors">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <span className="font-bold">Report a Safety Issue</span>
          </div>
        </button>
      </div>

    </div>
  );
}

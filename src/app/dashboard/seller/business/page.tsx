"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, FileText, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerBusinessPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 pb-32 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Business Profile</h1>
          <p className="text-sm text-muted-foreground font-medium">Verify your identity and compliance</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" /> Business Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Store Name</label>
              <input type="text" defaultValue="Amina Spices" className="w-full bg-muted/50 p-3 rounded-xl border border-border/50 font-medium" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1 block">Business Address</label>
              <textarea defaultValue="123 Palm Grove, Ernakulam, Kerala" className="w-full bg-muted/50 p-3 rounded-xl border border-border/50 font-medium resize-none" rows={3} />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border/50 rounded-[2rem] p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> FSSAI Registration
          </h2>
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center justify-between mb-4">
            <div>
              <p className="font-bold text-green-700 dark:text-green-400">Verified</p>
              <p className="text-xs text-green-600/80">FSSAI No: 11321000000123</p>
            </div>
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary font-bold hover:bg-primary/5 transition-colors">
            <Upload className="w-4 h-4" /> Update Certificate
          </button>
        </div>

        <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl shadow-lg hover:shadow-primary/25 active:scale-[0.98] transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}

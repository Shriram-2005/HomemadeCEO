"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Lock, Globe, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerSettingsPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 pb-32 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Store Settings</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage your store preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        <section className="bg-card border border-border/50 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border/50 flex items-center justify-between hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 text-blue-600 rounded-full"><Bell className="w-5 h-5" /></div>
              <div>
                <h3 className="font-bold">Notifications</h3>
                <p className="text-xs text-muted-foreground">Order alerts, messages</p>
              </div>
            </div>
            {/* Toggle switch mock */}
            <div className="w-12 h-6 bg-primary rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
            </div>
          </div>
          
          <div className="p-5 border-b border-border/50 flex items-center justify-between hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 text-purple-600 rounded-full"><Globe className="w-5 h-5" /></div>
              <div>
                <h3 className="font-bold">Language Preferences</h3>
                <p className="text-xs text-muted-foreground">English, Malayalam</p>
              </div>
            </div>
          </div>

          <div className="p-5 border-b border-border/50 flex items-center justify-between hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 text-green-600 rounded-full"><Lock className="w-5 h-5" /></div>
              <div>
                <h3 className="font-bold">Privacy & Security</h3>
                <p className="text-xs text-muted-foreground">Password, 2FA</p>
              </div>
            </div>
          </div>
        </section>

        <button className="w-full bg-red-500/10 text-red-500 font-bold py-4 rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
          Deactivate Store
        </button>
      </div>
    </div>
  );
}

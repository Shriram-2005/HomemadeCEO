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

        {/* Telegram Bot Account Linking Section */}
        <section className="bg-card border border-blue-500/30 rounded-[2rem] p-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-blue-500/15 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-base text-foreground">Connect Telegram Bot (Jami Co-pilot)</h3>
                  <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    Live
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Link your <b>Amina Spices</b> store with <b>@Homemade_CEO_JAMI_bot</b> to receive live order pings, check weekly earnings, and dictate descriptions via voice notes.
                </p>
              </div>
            </div>

            <a
              href="https://t.me/Homemade_CEO_JAMI_bot?start=LINK_seller_amina_01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Connect Telegram</span>
            </a>
          </div>
        </section>

        <button className="w-full bg-red-500/10 text-red-500 font-bold py-4 rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
          Deactivate Store
        </button>
      </div>
    </div>
  );
}

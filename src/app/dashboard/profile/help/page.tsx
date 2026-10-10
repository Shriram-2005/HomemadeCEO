"use client";

import React from "react";
import { ArrowLeft, MessageCircle, HelpCircle, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HelpSupportPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">Help & Support</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/50 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-bold mb-2">Chat with Jami AI</h3>
          <p className="text-sm text-muted-foreground mb-4">Get instant answers 24/7 from your personal assistant.</p>
          <button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors w-full">
            Start Chat
          </button>
        </div>
        
        <div className="bg-background rounded-2xl p-6 border border-border/50 flex flex-col items-center text-center shadow-sm">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="font-bold mb-2">Email Support</h3>
          <p className="text-sm text-muted-foreground mb-4">Expect a reply within 24 hours.</p>
          <button className="mt-auto bg-muted hover:bg-muted/80 font-medium py-2 px-6 rounded-full transition-colors w-full">
            support@homemadeceo.com
          </button>
        </div>
      </div>

      <h3 className="font-bold text-xl mb-4 font-heading">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {[
          "How do I track my order?",
          "Can I return a homemade product?",
          "How do I become a seller?"
        ].map((q, i) => (
          <div key={i} className="bg-background border border-border/50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
            <span className="font-medium">{q}</span>
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}

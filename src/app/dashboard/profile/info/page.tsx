"use client";

import React from "react";
import { ArrowLeft, User, Mail, Phone, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PersonalInfoPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-2xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">Personal Information</h1>
      </div>
      
      <div className="bg-background rounded-2xl p-6 shadow-sm border border-border/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <button className="text-sm text-blue-600 hover:underline font-medium">Change Avatar</button>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="text" defaultValue="Amina Spices" className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="email" defaultValue="amina@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="tel" defaultValue="+91 98765 43210" className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>

          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

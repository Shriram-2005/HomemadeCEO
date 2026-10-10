"use client";

import React from "react";
import { ArrowLeft, CreditCard, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentsPage() {
  const router = useRouter();

  const dummyCards = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/28",
      name: "AMINA M",
      isDefault: true
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Payment Methods</h1>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Add Card
        </button>
      </div>
      
      <div className="space-y-4">
        {dummyCards.map((card) => (
          <div key={card.id} className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden max-w-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-8 blur-2xl"></div>
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <CreditCard className="w-8 h-8 opacity-80" />
              {card.isDefault && (
                <span className="bg-white/20 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">Default</span>
              )}
            </div>
            
            <div className="text-xl tracking-widest font-mono mb-4 relative z-10 opacity-90">
              **** **** **** {card.last4}
            </div>
            
            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Card Holder</p>
                <p className="font-medium text-sm tracking-wide">{card.name}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Expires</p>
                <p className="font-medium text-sm tracking-wide">{card.expiry}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

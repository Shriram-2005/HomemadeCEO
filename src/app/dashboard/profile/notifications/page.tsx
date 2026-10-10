"use client";

import React from "react";
import { ArrowLeft, Bell, Gift, ShoppingBag, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const router = useRouter();

  const dummyNotifications = [
    { id: 1, type: "order", title: "Order Delivered!", desc: "Your order ORD-12345 has been delivered.", time: "2 hours ago", read: false },
    { id: 2, type: "promo", title: "Special Offer", desc: "Get 20% off on all Kochi Pickles this weekend.", time: "1 day ago", read: true },
    { id: 3, type: "info", title: "Welcome to Homemade CEO", desc: "Thanks for joining! Start exploring homemakers around you.", time: "1 week ago", read: true },
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case "order": return <ShoppingBag className="w-5 h-5 text-green-600" />;
      case "promo": return <Gift className="w-5 h-5 text-purple-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBg = (type: string) => {
    switch(type) {
      case "order": return "bg-green-100";
      case "promo": return "bg-purple-100";
      default: return "bg-blue-100";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">Notifications</h1>
      </div>
      
      <div className="space-y-3">
        {dummyNotifications.map((note) => (
          <div key={note.id} className={`bg-background rounded-2xl p-4 border border-border/50 flex gap-4 \${!note.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 \${getBg(note.type)}`}>
              {getIcon(note.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className={`font-bold text-sm \${!note.read ? 'text-foreground' : 'text-muted-foreground'}`}>{note.title}</h3>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{note.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{note.desc}</p>
            </div>
            {!note.read && <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

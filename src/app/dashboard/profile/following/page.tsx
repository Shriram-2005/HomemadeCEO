"use client";

import React from "react";
import { ArrowLeft, Store, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FollowedStoresPage() {
  const router = useRouter();

  const dummyStores = [
    { id: 1, name: "Kochi Pickles", followers: 1200, category: "Food" },
    { id: 2, name: "Kerala Handicrafts", followers: 850, category: "Art" },
    { id: 3, name: "Organic Spices Farm", followers: 3200, category: "Groceries" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">Followed Stores</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dummyStores.map((store) => (
          <div key={store.id} className="bg-background rounded-2xl p-4 shadow-sm border border-border/50 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Store className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate">{store.name}</h3>
              <p className="text-xs text-muted-foreground mb-1">{store.category}</p>
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Users className="w-3 h-3" />
                {store.followers} Followers
              </div>
            </div>
            <button className="bg-muted hover:bg-muted/80 text-sm font-medium px-4 py-2 rounded-full transition-colors">
              Following
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

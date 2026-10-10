"use client";

import React from "react";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const router = useRouter();

  const dummyProducts = [
    { id: 1, name: "Premium Banana Chips", price: "₹250", store: "Kochi Pickles" },
    { id: 2, name: "Handwoven Coir Mat", price: "₹450", store: "Kerala Handicrafts" },
    { id: 3, name: "Organic Black Pepper", price: "₹300", store: "Organic Spices Farm" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-heading">Wishlist</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyProducts.map((product) => (
          <div key={product.id} className="bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden group">
            <div className="aspect-square bg-muted relative flex items-center justify-center">
              <span className="text-muted-foreground">Image Placeholder</span>
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-red-500 hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold line-clamp-1 mb-1">{product.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{product.store}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{product.price}</span>
                <button className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

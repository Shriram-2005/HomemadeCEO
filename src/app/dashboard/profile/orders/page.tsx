"use client";

import React from "react";
import { ArrowLeft, Package, Clock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyOrdersPage() {
  const router = useRouter();

  const dummyOrders = [
    {
      id: "ORD-12345",
      date: "Oct 12, 2026",
      status: "Delivered",
      total: "₹450",
      items: "Kerala Banana Chips (x2), Spiced Mango Pickle (x1)",
    },
    {
      id: "ORD-12346",
      date: "Oct 05, 2026",
      status: "Processing",
      total: "₹1,200",
      items: "Homemade Ghee (x1), Organic Honey (x1)",
    }
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
        <h1 className="text-2xl md:text-3xl font-bold font-heading">My Orders</h1>
      </div>
      
      <div className="space-y-4">
        {dummyOrders.map((order) => (
          <div key={order.id} className="bg-background rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{order.id}</h3>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {order.status === 'Delivered' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {order.status}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm mb-4">
              <Package className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">{order.items}</span>
            </div>
            <div className="pt-4 border-t border-border/50 flex justify-between items-center">
              <span className="font-medium text-muted-foreground">Total</span>
              <span className="font-bold text-lg">{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

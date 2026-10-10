"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Package, Truck, CheckCircle2, ChevronRight, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuyerOrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ongoing" | "delivered">("ongoing");

  const mockOrders = [
    { id: "ORD-9281", store: "Amina Spices", item: "Spicy Mango Pickle x2", price: "₹500", status: "Shipped", date: "Oct 10, 2026", image: "https://images.unsplash.com/photo-1533758369344-933390ccbe34?auto=format&fit=crop&w=400&q=80", type: "ongoing" },
    { id: "ORD-9282", store: "Kerala Weaves", item: "Kasavu Saree", price: "₹1,500", status: "Processing", date: "Oct 09, 2026", image: "https://images.unsplash.com/photo-1579567936166-3d23da56847c?auto=format&fit=crop&w=400&q=80", type: "ongoing" },
    { id: "ORD-8992", store: "Green Farms", item: "Organic Black Pepper", price: "₹300", status: "Delivered", date: "Sep 25, 2026", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80", type: "delivered" },
  ];

  const filteredOrders = mockOrders.filter(o => o.type === activeTab);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">My Orders</h1>
          <p className="text-sm text-muted-foreground font-medium">Track and manage your purchases</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-card border border-border/50 p-1.5 rounded-2xl mb-8 shadow-sm relative overflow-hidden">
        <div 
          className="absolute top-1.5 bottom-1.5 w-[calc(50%-4px)] bg-foreground rounded-xl transition-all duration-500 ease-spring"
          style={{ left: activeTab === "ongoing" ? "6px" : "calc(50% + 2px)" }}
        />
        <button 
          onClick={() => setActiveTab("ongoing")}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors relative z-10 ${activeTab === "ongoing" ? "text-background" : "text-muted-foreground hover:text-foreground"}`}
        >
          Ongoing
        </button>
        <button 
          onClick={() => setActiveTab("delivered")}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors relative z-10 ${activeTab === "delivered" ? "text-background" : "text-muted-foreground hover:text-foreground"}`}
        >
          Delivered
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length > 0 ? filteredOrders.map((order, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={order.id}
              className="bg-card border border-border/50 rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6"
            >
              <img src={order.image} alt={order.item} className="w-full sm:w-24 sm:h-24 object-cover rounded-2xl bg-muted" />
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">{order.store}</p>
                    <h3 className="font-bold text-lg leading-tight">{order.item}</h3>
                  </div>
                  <div className="font-black text-lg">{order.price}</div>
                </div>
                
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
                  <span>{order.id}</span>
                  <span>•</span>
                  <span>{order.date}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'}`}>
                    {order.status === 'Delivered' ? <CheckCircle2 className="w-4 h-4" /> : order.status === 'Shipped' ? <Truck className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    {order.status}
                  </div>
                  {activeTab === 'delivered' && (
                    <button className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline">
                      <Star className="w-4 h-4" /> Rate Store
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="py-24 text-center bg-card rounded-3xl border border-dashed border-border/60"
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-xl font-bold mb-2">No {activeTab} orders</h3>
              <p className="text-muted-foreground">When you buy something, it will appear here.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

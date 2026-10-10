"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Package, Truck, CheckCircle2, Phone, MapPin, Clock } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { useRouter } from "next/navigation";

type OrderStatus = "new" | "packing" | "shipped";

export default function SellerOrdersPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;

  const [activeTab, setActiveTab] = useState<OrderStatus>("new");

  const mockOrders = [
    { id: "ORD-9281", customer: "Rahul M.", item: "Spicy Mango Pickle x2", price: "₹500", status: "new", time: "2 hours ago", phone: "+91 9876543210" },
    { id: "ORD-9282", customer: "Sneha K.", item: "Kerala Kasavu Saree", price: "₹1500", status: "new", time: "5 hours ago", phone: "+91 8765432109" },
    { id: "ORD-9104", customer: "Arjun P.", item: "Garlic Pickle x1", price: "₹200", status: "packing", time: "Yesterday", phone: "+91 7654321098" },
    { id: "ORD-8992", customer: "Maya T.", item: "Banana Chips 500g", price: "₹150", status: "shipped", time: "2 days ago", phone: "+91 6543210987" },
  ];

  const filteredOrders = mockOrders.filter(o => o.status === activeTab);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen bg-gradient-to-b from-background to-muted/20">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">{t.sellerOrders}</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage your fulfillment pipeline</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex bg-card border border-border/50 p-1.5 rounded-2xl mb-8 shadow-sm relative overflow-hidden"
      >
        {/* Animated Active Background */}
        <div 
          className="absolute top-1.5 bottom-1.5 w-[calc(33.333%-4px)] bg-primary rounded-xl transition-all duration-500 ease-spring"
          style={{ 
            left: activeTab === "new" ? "6px" : activeTab === "packing" ? "calc(33.333% + 2px)" : "calc(66.666% - 2px)",
            backgroundColor: activeTab === "new" ? "var(--color-blue-600)" : activeTab === "packing" ? "var(--color-purple-600)" : "var(--color-green-600)"
          }}
        />

        <button 
          onClick={() => setActiveTab("new")}
          className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-3 rounded-xl font-bold text-sm transition-colors relative z-10 ${activeTab === "new" ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
        >
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 hidden md:block" />
            <span>New Orders</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === "new" ? "bg-white/20" : "bg-muted"}`}>2</span>
        </button>
        <button 
          onClick={() => setActiveTab("packing")}
          className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-3 rounded-xl font-bold text-sm transition-colors relative z-10 ${activeTab === "packing" ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
        >
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 hidden md:block" />
            <span>Packing</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === "packing" ? "bg-white/20" : "bg-muted"}`}>1</span>
        </button>
        <button 
          onClick={() => setActiveTab("shipped")}
          className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 py-3 rounded-xl font-bold text-sm transition-colors relative z-10 ${activeTab === "shipped" ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
        >
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 hidden md:block" />
            <span>Shipped</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === "shipped" ? "bg-white/20" : "bg-muted"}`}>1</span>
        </button>
      </motion.div>

      {/* Order List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={order.id} 
                className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-xl leading-tight mb-1">{order.item}</h3>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <span className="bg-muted px-2 py-1 rounded-md text-foreground">{order.id}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {order.time}
                      </div>
                    </div>
                  </div>
                  <div className="font-black text-2xl text-primary">{order.price}</div>
                </div>
                
                {/* Customer Details Card */}
                <div className="bg-muted/30 border border-border/50 rounded-2xl p-4 mb-6 flex-1">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Delivery Details</h4>
                  
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-background rounded-full shadow-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{order.customer}</p>
                      <p className="text-sm text-muted-foreground leading-snug mt-0.5">123, Palm Grove, Ernakulam<br/>Kerala - 682011</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background rounded-full shadow-sm">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <p className="font-bold text-sm">{order.phone}</p>
                  </div>
                </div>

                {/* Actions */}
                {activeTab === "new" && (
                  <button className="w-full py-4 bg-blue-600 text-white font-bold text-base rounded-2xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg hover:shadow-blue-600/25 flex items-center justify-center gap-2">
                    <Package className="w-5 h-5" />
                    Start Packing Order
                  </button>
                )}
                
                {activeTab === "packing" && (
                  <button className="w-full py-4 bg-purple-600 text-white font-bold text-base rounded-2xl hover:bg-purple-700 active:scale-[0.98] transition-all shadow-lg hover:shadow-purple-600/25 flex items-center justify-center gap-2">
                    <Truck className="w-5 h-5" />
                    Mark as Shipped
                  </button>
                )}

                {activeTab === "shipped" && (
                  <div className="w-full py-4 bg-green-500/10 text-green-600 dark:text-green-400 font-bold text-base rounded-2xl flex items-center justify-center gap-2 border border-green-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                    Successfully Shipped
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="col-span-full text-center py-24 bg-card rounded-3xl border border-dashed border-border/60"
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-muted-foreground opacity-50" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">All caught up!</h3>
              <p className="text-muted-foreground font-medium">{t.sellerNoOrders}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

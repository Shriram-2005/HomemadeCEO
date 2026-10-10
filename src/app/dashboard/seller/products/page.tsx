"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Image as ImageIcon, X, ArrowLeft, MoreVertical, Edit3, Trash2, Search, Filter } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { useRouter } from "next/navigation";

export default function SellerProductsPage() {
  const router = useRouter();
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const mockMyProducts = [
    { id: 1, name: "Spicy Mango Pickle", category: "Pickles", price: "₹250", stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1533758369344-933390ccbe34?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Garlic Pickle", category: "Pickles", price: "₹200", stock: 12, status: "Low Stock", image: "https://images.unsplash.com/photo-1579567936166-3d23da56847c?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Organic Black Pepper", category: "Spices", price: "₹300", stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Active": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Low Stock": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "Out of Stock": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-32 md:pb-12 pt-6 min-h-screen bg-gradient-to-b from-background to-muted/20">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-10 h-10 bg-card border border-border/50 rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading">{t.sellerProducts}</h1>
            <p className="text-sm text-muted-foreground font-medium">Manage your inventory</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex gap-3 mb-8"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-12 pr-4 py-3.5 bg-card border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-shadow font-medium"
          />
        </div>
        <button className="w-14 h-14 shrink-0 bg-card border border-border/50 rounded-2xl flex items-center justify-center text-foreground hover:bg-muted transition-colors shadow-sm">
          <Filter className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
        
        {/* Add New Product Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
          onClick={() => setIsAddingProduct(true)}
          className="bg-card border-2 border-dashed border-primary/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/60 hover:bg-primary/5 transition-all group flex flex-col items-center justify-center min-h-[300px] cursor-pointer"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <Plus className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg mb-1">{t.sellerAddProduct}</h3>
          <p className="text-sm text-muted-foreground text-center px-6">Tap to list a new item in your storefront</p>
        </motion.div>

        {mockMyProducts.map((product, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + (i * 0.05) }}
            key={product.id} 
            className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group relative"
          >
            {/* Image Area */}
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-muted">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>

              {/* Action Menu Toggle */}
              <button 
                onClick={() => setActiveMenuId(activeMenuId === product.id ? null : product.id)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/30 backdrop-blur-md hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Popup Menu */}
              <AnimatePresence>
                {activeMenuId === product.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, originTopRight: true }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute top-14 right-4 bg-card/90 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl overflow-hidden z-20 min-w-[140px]"
                  >
                    <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-muted text-sm font-bold transition-colors">
                      <Edit3 className="w-4 h-4 text-blue-500" /> Edit
                    </button>
                    <div className="h-px w-full bg-border/50" />
                    <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-500/10 text-sm font-bold text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info Area */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-bold text-lg leading-tight line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{product.category}</p>
                </div>
                <div className="font-black text-xl text-primary shrink-0">{product.price}</div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                <span className="text-sm font-bold text-muted-foreground">In Stock</span>
                <span className="text-sm font-black bg-muted px-3 py-1 rounded-lg">{product.stock} units</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Premium Add Product Modal */}
      <AnimatePresence>
        {isAddingProduct && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center items-center bg-black/60 backdrop-blur-md px-4 pb-4 md:p-0"
          >
            <motion.div 
              initial={{ y: "100%", opacity: 0, scale: 0.95 }} 
              animate={{ y: 0, opacity: 1, scale: 1 }} 
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-xl bg-card border border-border/50 rounded-[2rem] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50 sticky top-0 bg-card/80 backdrop-blur-xl z-10">
                <div>
                  <h2 className="text-2xl font-bold font-heading">{t.sellerAddProduct}</h2>
                  <p className="text-sm text-muted-foreground">List a new item in your store</p>
                </div>
                <button 
                  onClick={() => setIsAddingProduct(false)}
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="p-6 overflow-y-auto hide-scrollbar space-y-6">
                
                {/* Image Upload Area */}
                <div className="w-full aspect-video bg-muted/50 border-2 border-dashed border-primary/30 rounded-3xl flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-primary/5 hover:border-primary/50 transition-all group">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="font-bold text-foreground">Upload Product Photo</span>
                  <span className="text-xs mt-1">High quality images sell faster!</span>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-foreground ml-1">Product Name</label>
                    <input type="text" placeholder="e.g. Special Banana Chips" className="w-full bg-muted/50 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary focus:bg-card shadow-inner font-medium transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-foreground ml-1">Price (₹)</label>
                      <input type="text" placeholder="150" className="w-full bg-muted/50 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary focus:bg-card shadow-inner font-medium transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-foreground ml-1">Initial Stock</label>
                      <input type="number" placeholder="10" className="w-full bg-muted/50 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary focus:bg-card shadow-inner font-medium transition-all" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-foreground ml-1">Category</label>
                    <div className="relative">
                      <select className="w-full bg-muted/50 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-primary focus:bg-card shadow-inner font-medium appearance-none transition-all">
                        <option>Snacks</option>
                        <option>Spices</option>
                        <option>Pickles</option>
                        <option>Handicrafts</option>
                        <option>Apparel</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsAddingProduct(false)}
                  className="w-full bg-foreground text-background font-bold text-lg py-5 rounded-2xl mt-4 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
                >
                  Publish to Store
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

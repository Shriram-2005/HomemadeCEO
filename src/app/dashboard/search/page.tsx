"use client";

import React, { useState } from "react";
import { Search as SearchIcon, Filter, Star, ShoppingCart, Heart, ChevronLeft, Box, Coffee, Flame, Utensils, Droplet, Cake, Cookie, ShoppingBag } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;

  const initialQ = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const [visibleCount, setVisibleCount] = useState(20);
  const [showToast, setShowToast] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (product: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addItem(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q);
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    const url = new URL(window.location.href);
    if (val) {
      url.searchParams.set("q", val);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState(null, '', url.toString());
  };

  // Theme-compliant Categories using High-Quality Images
  const categories = [
    { name: "Pickles", image: "https://images.unsplash.com/photo-1533758369344-933390ccbe34?auto=format&fit=crop&w=400&q=80", label: t.catPickles },
    { name: "Spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80", label: t.catSpices },
    { name: "Snacks", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80", label: t.catSnacks },
    { name: "Handicrafts", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=400&q=80", label: t.catHandicrafts },
    { name: "Oils", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80", label: t.catOils },
    { name: "Sweets", image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=400&q=80", label: t.catSweets },
    { name: "Bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80", label: t.catBakery },
    { name: "Beverages", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80", label: t.catBeverages },
    { name: "Apparel", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80", label: t.catApparel },
    { name: "Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80", label: t.catJewelry },
    { name: "HomeDecor", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80", label: t.catHomeDecor },
    { name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80", label: t.catBeauty },
  ];
  
  const dummyProducts = [
    { id: 1, name: "Spicy Mango Pickle", category: "Pickles", price: "₹250", store: "Amina Spices", rating: 4.8, image: "https://images.unsplash.com/photo-1533758369344-933390ccbe34?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Garlic Pickle", category: "Pickles", price: "₹200", store: "Amina Spices", rating: 4.6, image: "https://images.unsplash.com/photo-1579567936166-3d23da56847c?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Organic Black Pepper", category: "Spices", price: "₹300", store: "Kerala Farms", rating: 4.7, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Cardamom Pods", category: "Spices", price: "₹450", store: "Munnar Spices", rating: 4.9, image: "https://images.unsplash.com/photo-1599909695955-4e78a6ff6fc1?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Kerala Banana Chips", category: "Snacks", price: "₹150", store: "Kochi Bites", rating: 4.9, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Crunchy Murukku", category: "Snacks", price: "₹120", store: "Palakkad Sweets", rating: 4.8, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80" },
    { id: 7, name: "Handwoven Coir Mat", category: "Handicrafts", price: "₹500", store: "Alleppey Crafts", rating: 4.5, image: "https://images.unsplash.com/photo-1581428982868-e410dd1fc02c?auto=format&fit=crop&w=400&q=80" },
    { id: 8, name: "Terracotta Pot", category: "Handicrafts", price: "₹350", store: "Earth & Clay", rating: 4.7, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=400&q=80" },
    { id: 9, name: "Coconut Oil (Cold Pressed)", category: "Oils", price: "₹350", store: "Malabar Naturals", rating: 4.8, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80" },
    { id: 10, name: "Pure Sesame Oil", category: "Oils", price: "₹280", store: "Malabar Naturals", rating: 4.6, image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=400&q=80" },
    { id: 11, name: "Jaggery Ladoo", category: "Sweets", price: "₹180", store: "Sweet Home", rating: 4.7, image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=400&q=80" },
    { id: 12, name: "Wheat Halwa", category: "Sweets", price: "₹250", store: "Calicut Sweets", rating: 4.9, image: "https://images.unsplash.com/photo-1605197136005-4c07d353683a?auto=format&fit=crop&w=400&q=80" },
    { id: 13, name: "Christmas Plum Cake", category: "Bakery", price: "₹450", store: "Sara's Bakes", rating: 4.9, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" },
    { id: 14, name: "Tea Rusk", category: "Bakery", price: "₹100", store: "Sara's Bakes", rating: 4.5, image: "https://images.unsplash.com/photo-1596450514735-110052be141c?auto=format&fit=crop&w=400&q=80" },
    { id: 15, name: "Kerala Premium Tea", category: "Beverages", price: "₹199", store: "Munnar Leaves", rating: 4.8, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80" },
    { id: 16, name: "Filter Coffee Powder", category: "Beverages", price: "₹250", store: "Wayanad Beans", rating: 4.7, image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=400&q=80" },
    { id: 17, name: "Kerala Kasavu Saree", category: "Apparel", price: "₹1500", store: "Bindu Handlooms", rating: 4.9, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80" },
    { id: 18, name: "Handloom Dhoti", category: "Apparel", price: "₹800", store: "Bindu Handlooms", rating: 4.8, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=400&q=80" },
    { id: 19, name: "Handmade Beaded Necklace", category: "Jewelry", price: "₹350", store: "Artisan Gems", rating: 4.6, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80" },
    { id: 20, name: "Terracotta Earrings", category: "Jewelry", price: "₹150", store: "Earth & Clay", rating: 4.5, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80" },
    { id: 21, name: "Macrame Wall Hanging", category: "HomeDecor", price: "₹650", store: "Boho Knots", rating: 4.8, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" },
    { id: 22, name: "Bamboo Lamp", category: "HomeDecor", price: "₹850", store: "Nature Decor", rating: 4.9, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80" },
    { id: 23, name: "Aloe Vera Soap", category: "Beauty", price: "₹120", store: "Pure Naturals", rating: 4.7, image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=400&q=80" },
    { id: 24, name: "Herbal Hair Oil", category: "Beauty", price: "₹300", store: "Ayur Roots", rating: 4.8, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80" },
  ];

  // If user is searching by text, it overrides the category view
  const isSearching = searchQuery.length > 0;
  const showResults = isSearching || activeCategory !== null;

  const filteredProducts = dummyProducts.filter(p => {
    if (isSearching) {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             p.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
             p.category.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return p.category === activeCategory;
  });

  const paginatedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 md:pb-12 pt-2 md:pt-4 px-4 md:px-0">
      
      {/* Search Header Area (Mobile Only) */}
      <div className="mb-4 md:hidden">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1 group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-none bg-muted focus:bg-background focus:ring-2 focus:ring-blue-500 shadow-sm transition-all text-[16px] font-medium"
            />
          </div>
          {isSearching && (
            <button 
              onClick={() => handleSearchChange({ target: { value: "" } } as any)}
              className="px-4 font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {t.searchCancel}
            </button>
          )}
        </div>
      </div>

      {!showResults ? (
        /* Theme-Compliant Category Grid */
        <div>
          <h2 className="text-xl font-bold font-heading mb-4">{t.searchBrowseCategories}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div 
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className="relative rounded-2xl overflow-hidden min-h-[120px] md:min-h-[140px] cursor-pointer hover:shadow-md transition-all group"
              >
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {/* Gradient Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                
                {/* Content */}
                <div className="relative h-full p-3 md:p-4 flex flex-col justify-end z-10 pointer-events-none">
                  <h3 className="text-white font-bold font-heading text-[clamp(0.875rem,3.5vw,1.125rem)] leading-tight break-words line-clamp-3">
                    {cat.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Search/Category Results View */
        <div>
          <div className="flex items-center gap-3 mb-6">
            {!isSearching && (
              <button 
                onClick={() => setActiveCategory(null)}
                className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h2 className="text-xl font-bold font-heading">
              {isSearching ? t.searchResults : activeCategory}
            </h2>
          </div>

          {paginatedProducts.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {paginatedProducts.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => router.push(`/dashboard/product/${product.id}`)}
                    className="bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden group hover:shadow-md transition-all flex flex-col text-left cursor-pointer"
                  >
                  {/* Product Image */}
                  <div className="aspect-square w-full relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <button className="absolute top-2 right-2 md:top-3 md:right-3 p-1.5 md:p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform z-10">
                      <Heart className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    </button>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-3 md:p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#FFD700] text-[#FFD700]" />
                      <span className="text-[10px] md:text-xs font-bold">{product.rating}</span>
                    </div>
                    
                    <h3 className="font-bold text-sm md:text-base line-clamp-2 mb-1 leading-tight">{product.name}</h3>
                    <p className="text-[10px] md:text-xs text-muted-foreground mb-3">{product.store}</p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-bold text-base md:text-lg">{product.price}</span>
                      <button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shrink-0"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  </div>
                ))}
              </div>
              
              {/* Load More Pagination */}
              {filteredProducts.length > visibleCount && (
                <div className="flex justify-center mt-4">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 20)}
                    className="bg-muted hover:bg-muted/80 text-foreground font-bold py-3 px-8 rounded-full transition-colors text-sm"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <SearchIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.searchNoProducts}</h3>
              <p className="text-muted-foreground max-w-sm">
                {t.searchNoProductsDesc}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Product Quick View Modal has been replaced with dedicated /product/[id] route */}

      {/* Cart Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-xl font-bold flex items-center gap-2 z-[200]"
          >
            <CheckCircle2 className="w-5 h-5" />
            {t.addedToCart}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Heart, ChevronRight, Play, Flame, Percent, Clock, MapPin, Quote, X, Tv, CheckCircle2 } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;

  const router = useRouter();

  const dummyName = "Sarah"; 

  // Modal States
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);

  const { addItem } = useCartStore();

  const handleAddToCart = (product: any) => {
    addItem(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const stories = [
    { id: 1, name: "Amina", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", hasUnseen: true },
    { id: 2, name: "Lakshmi", image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400&q=80", hasUnseen: true },
    { id: 3, name: "Sara", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80", hasUnseen: false },
    { id: 4, name: "Bindu", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80", hasUnseen: false },
    { id: 5, name: "Radha", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", hasUnseen: false },
    { id: 6, name: "Priya", image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&q=80", hasUnseen: false },
    { id: 7, name: "Meena", image: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=400&q=80", hasUnseen: false },
  ];

  const quickCategories = [
    { name: t.catPickles || "Pickles", image: "https://images.unsplash.com/photo-1533758369344-933390ccbe34?auto=format&fit=crop&w=200&q=80" },
    { name: t.catSpices || "Spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=200&q=80" },
    { name: t.catSnacks || "Snacks", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=200&q=80" },
    { name: t.catSweets || "Sweets", image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=200&q=80" },
    { name: t.catHandicrafts || "Handicrafts", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=200&q=80" },
    { name: t.catBeauty || "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=200&q=80" },
  ];

  const trendingProducts = [
    { id: 1, name: t.prodMangoPickle, price: "₹250", store: t.storeAmina, rating: 4.8, image: "https://images.unsplash.com/photo-1533758369344-933390ccbe34?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: t.prodBananaChips, price: "₹150", store: t.storeKochi, rating: 4.9, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: t.prodBlackPepper, price: "₹300", store: t.storeFarms, rating: 4.7, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: t.prodKasavuSaree, price: "₹1500", store: t.storeBindu, rating: 4.9, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80" },
  ];

  const dealProducts = [
    { id: 5, name: t.prodKasavuSaree, price: "₹1200", oldPrice: "₹1500", store: t.storeBindu, rating: 4.9, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: t.prodSesameOil, price: "₹220", oldPrice: "₹280", store: t.storeMalabar, rating: 4.6, image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=400&q=80" },
    { id: 7, name: t.prodMacrame, price: "₹450", oldPrice: "₹650", store: t.storeBoho, rating: 4.8, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" },
  ];

  const shorts = [
    { id: 1, title: t.shortMakingChips, views: "12K", image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=300&h=500&q=80" },
    { id: 2, title: t.shortWeaving, views: "34K", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=300&h=500&q=80" },
    { id: 3, title: t.shortSpices, views: "8K", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&h=500&q=80" },
    { id: 4, title: t.shortPacking, views: "45K", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=300&h=500&q=80" },
  ];

  const newArrivals = [
    { id: 8, name: t.prodLadoo, price: "₹180", store: t.storeSweet, rating: 4.7, image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=400&q=80" },
    { id: 9, name: t.prodCoffee, price: "₹250", store: t.storeWayanad, rating: 4.7, image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=400&q=80" },
    { id: 10, name: t.prodSoap, price: "₹120", store: t.storePure, rating: 4.7, image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=400&q=80" },
    { id: 11, name: t.prodEarrings, price: "₹150", store: t.storeClay, rating: 4.5, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80" },
  ];

  const regions = [
    { name: t.regionWayanad, color: "bg-green-100 dark:bg-green-900/40", text: "text-green-800 dark:text-green-300", border: "border-green-200 dark:border-green-800" },
    { name: t.regionIdukki, color: "bg-blue-100 dark:bg-blue-900/40", text: "text-blue-800 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800" },
    { name: t.regionKozhikode, color: "bg-amber-100 dark:bg-amber-900/40", text: "text-amber-800 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800" },
    { name: t.regionAlappuzha, color: "bg-cyan-100 dark:bg-cyan-900/40", text: "text-cyan-800 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-800" },
  ];

  const testimonials = [
    { id: 1, name: t.test1Name, review: t.test1Review },
    { id: 2, name: t.test2Name, review: t.test2Review },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 md:pb-12 pt-2 md:pt-4 px-4 md:px-0 space-y-8 md:space-y-12">
      
      {/* 1. Personalized Greeting */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
          {t.homeGreeting} {dummyName}!
        </h1>
      </motion.div>

      {/* 2. Creator Stories */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-4 h-4 text-blue-500 fill-blue-500" />
          <h2 className="text-sm md:text-base font-bold text-foreground uppercase tracking-wider">{t.homeStoriesTitle}</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {stories.map(story => (
            <Link href={`/dashboard/search?q=\${story.name}`} key={story.id} className="flex flex-col items-center gap-2 cursor-pointer snap-start shrink-0 group">
              <div className={`p-[3px] rounded-full transition-transform group-hover:scale-110 \${story.hasUnseen ? 'bg-gradient-to-tr from-[#FFD700] via-[#FF8C00] to-red-500' : 'bg-border'}`}>
                <div className="w-[64px] h-[64px] md:w-[76px] md:h-[76px] rounded-full bg-background p-0.5">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
              <span className="text-[11px] md:text-xs font-bold text-foreground/80 group-hover:text-blue-600 transition-colors">{story.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* 3. Hero Banners (Fixed Mobile stacking) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        <Link href="/dashboard/search" className="relative rounded-3xl overflow-hidden min-h-[220px] md:min-h-[260px] group cursor-pointer shadow-md border border-border/50 block">
          <img src="https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80" alt="Handloom" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 p-5 z-10 w-full text-white pointer-events-none flex flex-col items-start">
            <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">Festival</span>
            <h3 className="text-xl md:text-2xl font-bold font-heading mb-1 leading-tight">{t.homeBanner1Title}</h3>
            <p className="text-xs md:text-sm text-white/80 max-w-[90%] md:max-w-sm line-clamp-2">{t.homeBanner1Desc}</p>
          </div>
        </Link>

        <Link href="/dashboard/search" className="relative rounded-3xl overflow-hidden min-h-[220px] md:min-h-[260px] group cursor-pointer shadow-md border border-border/50 block">
          <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80" alt="Spices" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 p-5 z-10 w-full text-white pointer-events-none flex flex-col items-start">
            <span className="px-3 py-1 bg-green-600/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">Fresh Harvest</span>
            <h3 className="text-xl md:text-2xl font-bold font-heading mb-1 leading-tight">{t.homeBanner2Title}</h3>
            <p className="text-xs md:text-sm text-white/80 max-w-[90%] md:max-w-sm line-clamp-2">{t.homeBanner2Desc}</p>
          </div>
        </Link>
      </motion.div>

      {/* 4. Quick Categories */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <h2 className="text-lg md:text-xl font-bold font-heading">{t.exploreCategories}</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {quickCategories.map((cat, idx) => (
            <Link key={idx} href="/dashboard/search" className="flex items-center gap-3 bg-card border-2 border-border/60 hover:border-blue-500 rounded-full pl-2 pr-5 py-2 shrink-0 hover:bg-muted transition-all shadow-sm group">
              <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-full object-cover shadow-sm group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold whitespace-nowrap">{cat.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* 5. Shop By Region */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-indigo-500" />
          <h2 className="text-lg md:text-xl font-bold font-heading">{t.homeShopByRegion}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {regions.map((r, i) => (
            <Link href="/dashboard/search" key={i} className={`\${r.color} \${r.border} border-2 p-5 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all active:scale-95`}>
              <MapPin className={`w-6 h-6 \${r.text} mb-2 opacity-80`} />
              <span className={`\${r.text} font-bold text-sm md:text-base`}>{r.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* 6. Trending Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <h2 className="text-lg md:text-xl font-bold font-heading">{t.homeTrendingTitle}</h2>
          </div>
          <Link href="/dashboard/search" className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline flex items-center gap-1">
            {t.homeViewAll} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {trendingProducts.map((product) => (
            <div onClick={() => router.push(`/dashboard/product/${product.id}`)} key={product.id} className="w-[160px] md:w-[220px] shrink-0 snap-start bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden group hover:shadow-md transition-all flex flex-col text-left cursor-pointer">
              <div className="aspect-square w-full relative">
                <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 p-1.5 md:p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform z-10">
                  <Heart className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500 transition-colors" />
                </div>
              </div>
              
              <div className="p-3 md:p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                  <span className="text-[10px] md:text-xs font-bold">{product.rating}</span>
                </div>
                <h3 className="font-bold text-xs md:text-sm line-clamp-2 mb-1 leading-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
                <p className="text-[9px] md:text-xs text-muted-foreground mb-3">{product.store}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-sm md:text-base">{product.price}</span>
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 group-hover:bg-blue-700 text-white flex items-center justify-center transition-colors shrink-0 shadow-sm">
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 7. Deals of the Day */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-red-50 dark:bg-red-950/20 rounded-3xl p-4 md:p-6 border border-red-100 dark:border-red-900/30 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400" />
            <h2 className="text-xl md:text-2xl font-bold font-heading text-red-900 dark:text-red-400">{t.homeDealsTitle}</h2>
          </div>
          <div className="flex items-center gap-1.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-sm border border-red-200 dark:border-red-800">
            <Clock className="w-4 h-4" /> Ends in 04:23:59
          </div>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
          {dealProducts.map((product) => (
            <div onClick={() => router.push(`/dashboard/product/${product.id}`)} key={product.id} className="w-[160px] md:w-[220px] shrink-0 snap-start bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden group hover:shadow-md transition-all flex flex-col relative text-left hover:-translate-y-1 cursor-pointer">
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm">
                {t.saleBadge}
              </div>
              <div className="aspect-square w-full relative">
                <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="p-3 flex flex-col flex-1">
                <h3 className="font-bold text-xs md:text-sm line-clamp-2 mb-1 group-hover:text-red-600 transition-colors">{product.name}</h3>
                <div className="mt-auto flex flex-col md:flex-row md:items-end gap-1 md:gap-2">
                  <span className="font-bold text-red-600 dark:text-red-400 text-sm md:text-base">{product.price}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground line-through pb-0.5">{product.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 8. Behind the Scenes (Shorts) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="flex items-center mb-4">
          <h2 className="text-lg md:text-xl font-bold font-heading">{t.homeShortsTitle}</h2>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {shorts.map((short) => (
            <div onClick={() => setActiveVideo(short)} key={short.id} className="w-[130px] h-[220px] md:w-[160px] md:h-[280px] shrink-0 snap-start rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm text-left">
              <img src={short.image} alt={short.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 p-3 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                <p className="text-xs md:text-sm font-bold line-clamp-2 leading-tight mb-1">{short.title}</p>
                <p className="text-[10px] opacity-80">{short.views} {t.viewsText}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 9. Community Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
          <h2 className="text-lg md:text-xl font-bold font-heading">{t.homeTestimonials}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map(test => (
            <div key={test.id} className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm relative overflow-hidden group hover:border-pink-200 transition-colors">
              <Quote className="absolute -right-4 -bottom-4 w-24 h-24 text-muted/20 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <p className="font-medium text-sm md:text-base mb-6 relative z-10 text-foreground/90 italic">"{test.review}"</p>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm shadow-sm border border-blue-200">
                  {test.name.charAt(0)}
                </div>
                <span className="font-bold text-sm">{test.name}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 10. New Arrivals Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold font-heading">{t.homeNewArrivals}</h2>
          <Link href="/dashboard/search" className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline flex items-center gap-1">
            {t.homeViewAll} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {newArrivals.map((product) => (
            <div onClick={() => router.push(`/dashboard/product/${product.id}`)} key={product.id} className="bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden group hover:shadow-md transition-all flex flex-col text-left cursor-pointer">
              <div className="aspect-[4/5] w-full relative">
                <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 p-1.5 md:p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform z-10">
                  <Heart className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500 transition-colors" />
                </div>
              </div>
              
              <div className="p-3 md:p-4 flex flex-col flex-1">
                <h3 className="font-bold text-xs md:text-sm line-clamp-2 mb-1 leading-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
                <p className="text-[9px] md:text-xs text-muted-foreground mb-3">{product.store}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-sm md:text-base">{product.price}</span>
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 group-hover:bg-blue-700 text-white flex items-center justify-center transition-colors shrink-0 shadow-sm">
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modals for Interactivity */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={activeVideo.image} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                <Tv className="w-16 h-16 text-white/50" />
                <p className="text-white font-bold text-lg text-center px-6">Playing "{activeVideo.title}"</p>
                <p className="text-white/60 text-sm">Dummy Video Player</p>
              </div>
              <button onClick={() => setActiveVideo(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

      {/* Product Quick View Modal has been removed in favor of dedicated product pages */}
      </AnimatePresence>

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

"use client";

import React, { useState, useMemo } from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';
import { dictionaries } from '@/i18n/dictionaries';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Sparkles, Filter, ArrowRight, Tag, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS_DATA } from '@/data/products';

const DISTRICTS = ["All", "Kozhikode", "Kochi", "Thrissur", "Trivandrum", "Wayanad", "Idukki"];
const CATEGORIES = ["All Categories", "Food & Spices", "Clothing", "Handicrafts", "Home Decor"];

const ITEMS_PER_PAGE = 20;

export default function ProductsPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].productsPage;
  const isMl = language === 'ml';

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products based on search and selected filters
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(p => {
      const titleMatch = (isMl ? p.titleMl : p.title).toLowerCase().includes(searchTerm.toLowerCase());
      const districtMatch = selectedDistrict === "All" || p.district === selectedDistrict;
      const categoryMatch = selectedCategory === "All Categories" || p.category === selectedCategory;
      return titleMatch && districtMatch && categoryMatch;
    });
  }, [searchTerm, selectedDistrict, selectedCategory, isMl]);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  
  // Ensure current page is valid when filters change
  if (currentPage > totalPages) {
    setCurrentPage(1);
  }

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: document.getElementById('grid-section')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col pb-20 overflow-x-hidden">
      
      {/* Editorial Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex flex-col items-center justify-center pt-20 px-[clamp(1rem,4vw,2rem)]">
        <div className="absolute inset-0 z-0">
          {/* Reliable hero image */}
          <img 
            src="https://picsum.photos/id/431/2000/1000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-[#FFD700]/30 text-[#FFD700] mb-6 font-medium text-[clamp(0.875rem,1.5vw,1rem)]">
            <Sparkles className="w-4 h-4" />
            <span>Discover Authenticity</span>
          </div>
          <h1 className="font-heading font-bold text-[clamp(3rem,6vw,5rem)] tracking-tight leading-[1.1] mb-6">
            The Marketplace <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-600">Reimagined</span>
          </h1>
          
          {/* Beautiful Search Bar */}
          <div className="w-full max-w-2xl relative group mt-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/50 to-yellow-600/50 rounded-2xl blur-lg opacity-30 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-2 shadow-2xl">
              <Search className="w-6 h-6 text-muted-foreground ml-3" />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none px-4 py-3 text-[clamp(1rem,1.5vw,1.125rem)] focus:outline-none placeholder:text-muted-foreground/70"
              />
              <button className="bg-[#FFD700] text-black px-[clamp(1rem,3vw,1.5rem)] py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors">
                Search
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Advanced Filter Area */}
      <section className="px-[clamp(1rem,4vw,2rem)] max-w-[1400px] mx-auto w-full mb-[clamp(1.5rem,3vw,2.5rem)] relative z-20 mt-[clamp(2rem,4vw,3rem)] flex flex-col gap-[clamp(1rem,2vw,1.5rem)]">
        
        {/* Categories row */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2 mr-4 text-muted-foreground font-medium shrink-0">
            <Tag className="w-5 h-5" />
            <span>Category:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-full font-medium transition-all duration-300 border text-[clamp(0.875rem,1.5vw,1rem)] ${
                selectedCategory === cat 
                  ? 'bg-foreground text-background border-foreground shadow-lg scale-105'
                  : 'bg-background text-muted-foreground border-border hover:border-[#FFD700]/50 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Districts row */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex items-center gap-2 mr-4 text-muted-foreground font-medium shrink-0">
            <Filter className="w-5 h-5" />
            <span>Location:</span>
          </div>
          {DISTRICTS.map((district) => (
            <button
              key={district}
              onClick={() => setSelectedDistrict(district)}
              className={`whitespace-nowrap px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-full font-medium transition-all duration-300 border text-[clamp(0.875rem,1.5vw,1rem)] ${
                selectedDistrict === district 
                  ? 'bg-foreground text-background border-foreground shadow-lg scale-105'
                  : 'bg-background text-muted-foreground border-border hover:border-[#FFD700]/50 hover:text-foreground'
              }`}
            >
              {district === "All" ? t.filterAll : (isMl ? t.districts[DISTRICTS.indexOf(district) - 1] || district : district)}
            </button>
          ))}
        </div>
      </section>

      {/* Dynamic Editorial Grid */}
      <section id="grid-section" className="px-[clamp(1rem,4vw,2rem)] max-w-[1400px] mx-auto w-full mb-[clamp(2rem,5vh,3rem)]">
        {/* Enforcing strict auto-fill minmax(300px, 1fr) based on instructions.md */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[clamp(1rem,2vw,2rem)]">
          <AnimatePresence mode="popLayout">
            {paginatedProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                key={product.id}
                className="group relative rounded-[2rem] overflow-hidden isolate aspect-[4/5]"
              >
                {/* Image Background */}
                <img 
                  src={product.image} 
                  alt={isMl ? product.titleMl : product.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 lg:opacity-80 lg:group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Maker Badge (Top Left) */}
                <div className="absolute top-6 left-6 flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-full p-1 pr-4 border border-white/10 z-10 hover:bg-black/60 transition-colors cursor-pointer">
                  <img src={product.makerAvatar} alt="Maker" className="w-10 h-10 rounded-full object-cover border border-white/20" />
                  <div className="flex flex-col">
                    <span className="text-white text-[clamp(0.7rem,1vw,0.75rem)] opacity-70">Made by</span>
                    <span className="text-white font-semibold text-[clamp(0.875rem,1.5vw,1rem)] leading-none">{isMl ? product.makerMl : product.maker}</span>
                  </div>
                </div>

                {/* Price & Rating (Top Right) */}
                <div className="absolute top-6 right-6 flex flex-col items-end gap-2 z-10">
                  <div className="bg-white text-black font-bold px-4 py-2 rounded-full shadow-xl text-[clamp(0.875rem,1.5vw,1rem)]">
                    {product.price}
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/20 text-white font-bold px-3 py-1.5 rounded-full shadow-lg text-[clamp(0.75rem,1.5vw,0.875rem)] flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Content (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-[clamp(1.5rem,3vw,2rem)] flex flex-col justify-end z-10">
                  <div className="flex items-center gap-4 text-white/70 mb-2 text-[clamp(0.75rem,1.5vw,0.875rem)] font-medium">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{isMl ? product.districtMl : product.district}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white/30" />
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span>{product.category}</span>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-white mb-0 text-[clamp(1.25rem,2.5vw,1.5rem)] leading-tight">
                    {isMl ? product.titleMl : product.title}
                  </h3>
                  
                  {/* Expandable Content Wrapper */}
                  <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <div className="pt-4 pb-1">
                        <p className="text-white/80 line-clamp-2 max-w-lg mb-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 lg:delay-100 text-[clamp(0.875rem,1.5vw,1rem)]">
                          {product.story}
                        </p>
                        
                        {/* Action Button */}
                        <div className="flex items-center gap-3">
                          <Link 
                            href={`/products/${product.id}`}
                            className="inline-flex items-center gap-2 bg-[#FFD700] text-black w-max px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-full font-bold hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(255,215,0,0.3)] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 lg:delay-200 text-[clamp(0.875rem,1.5vw,1rem)]"
                          >
                            <span className="whitespace-nowrap">{t.viewProduct}</span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {paginatedProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full py-32 flex flex-col items-center justify-center text-center gap-6"
          >
            <div className="w-[clamp(4rem,8vw,6rem)] h-[clamp(4rem,8vw,6rem)] rounded-full bg-muted flex items-center justify-center">
              <Search className="w-[clamp(2rem,4vw,2.5rem)] h-[clamp(2rem,4vw,2.5rem)] text-muted-foreground" />
            </div>
            <h3 className="font-heading text-[clamp(1.5rem,3vw,2rem)] font-bold">No hidden gems found</h3>
            <p className="text-muted-foreground max-w-md text-[clamp(1rem,1.5vw,1.125rem)]">Try searching for something else or explore a different category to discover more homemade treasures.</p>
          </motion.div>
        )}
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-[clamp(2rem,5vh,3rem)] w-full">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-accent disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{currentPage}</span>
              <span className="text-muted-foreground">of</span>
              <span className="font-medium text-foreground">{totalPages}</span>
            </div>
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-accent disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>

      {/* Post-Grid CTA Banner (For upgrading buyers to sellers) */}
      <section className="px-[clamp(1rem,4vw,2rem)] max-w-6xl mx-auto w-full">
        <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-[#FFD700] p-[clamp(2rem,5vw,4rem)] flex flex-col md:flex-row items-center justify-between gap-8 isolate">
          <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, black 10%, transparent 80%)' }}></div>
          
          <div className="relative z-10 flex flex-col gap-4 text-black max-w-xl text-center md:text-left">
            <h2 className="font-heading font-bold text-[clamp(2rem,4vw,3rem)] leading-tight">
              Amina made ₹15,000 this month selling her banana chips.
            </h2>
            <p className="text-black/80 font-medium text-[clamp(1rem,1.25vw,1.25rem)]">
              You can turn your passion into a business today. No complex setup. Just your voice and a smartphone.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 bg-black text-white px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,2vw,1rem)] rounded-full font-bold text-[clamp(1rem,1.5vw,1.125rem)] hover:bg-gray-900 hover:scale-105 transition-all shadow-xl"
            >
              <span>Start Your Free Store</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

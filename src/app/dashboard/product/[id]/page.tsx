"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft, Star, ShoppingCart, Heart, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { motion, AnimatePresence } from "framer-motion";

const dummyProducts = [
  { id: 1, name: "Spicy Mango Pickle", category: "Pickles", price: "₹250", store: "Amina Spices", rating: 4.8, image: "https://images.unsplash.com/photo-1533758369344-933390ccbe34?auto=format&fit=crop&w=800&q=80", description: "Authentic Kerala style spicy mango pickle made with sun-dried mangoes and organic spices." },
  { id: 2, name: "Garlic Pickle", category: "Pickles", price: "₹200", store: "Amina Spices", rating: 4.6, image: "https://images.unsplash.com/photo-1579567936166-3d23da56847c?auto=format&fit=crop&w=800&q=80", description: "Flavorful garlic pickle made from fresh garlic cloves." },
  { id: 3, name: "Organic Black Pepper", category: "Spices", price: "₹300", store: "Kerala Farms", rating: 4.7, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80", description: "Freshly harvested organic black pepper from the hills of Idukki." },
  { id: 4, name: "Cardamom Pods", category: "Spices", price: "₹450", store: "Munnar Spices", rating: 4.9, image: "https://images.unsplash.com/photo-1599909695955-4e78a6ff6fc1?auto=format&fit=crop&w=800&q=80", description: "Premium grade green cardamom directly from Munnar plantations." },
  { id: 5, name: "Kerala Banana Chips", category: "Snacks", price: "₹150", store: "Kochi Bites", rating: 4.9, image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80", description: "Crispy and thin banana chips fried in pure coconut oil." },
  { id: 6, name: "Crunchy Murukku", category: "Snacks", price: "₹120", store: "Palakkad Sweets", rating: 4.8, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80", description: "Traditional homemade crispy murukku." },
  { id: 7, name: "Handwoven Coir Mat", category: "Handicrafts", price: "₹500", store: "Alleppey Crafts", rating: 4.5, image: "https://images.unsplash.com/photo-1581428982868-e410dd1fc02c?auto=format&fit=crop&w=800&q=80", description: "Durable coir mat handwoven by artisans in Alleppey." },
  { id: 8, name: "Terracotta Pot", category: "Handicrafts", price: "₹350", store: "Earth & Clay", rating: 4.7, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80", description: "Beautiful handcrafted terracotta pot for your indoor plants." },
  { id: 9, name: "Coconut Oil (Cold Pressed)", category: "Oils", price: "₹350", store: "Malabar Naturals", rating: 4.8, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80", description: "100% pure cold-pressed coconut oil." },
  { id: 10, name: "Pure Sesame Oil", category: "Oils", price: "₹280", store: "Malabar Naturals", rating: 4.6, image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&w=800&q=80", description: "Traditional cold-pressed sesame oil." },
  { id: 11, name: "Jaggery Ladoo", category: "Sweets", price: "₹180", store: "Sweet Home", rating: 4.7, image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?auto=format&fit=crop&w=800&q=80", description: "Healthy ladoos made with pure jaggery and nuts." },
  { id: 12, name: "Wheat Halwa", category: "Sweets", price: "₹250", store: "Calicut Sweets", rating: 4.9, image: "https://images.unsplash.com/photo-1605197136005-4c07d353683a?auto=format&fit=crop&w=800&q=80", description: "Famous Kozhikodan wheat halwa, rich in ghee." },
  { id: 13, name: "Christmas Plum Cake", category: "Bakery", price: "₹450", store: "Sara's Bakes", rating: 4.9, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", description: "Rich plum cake loaded with dry fruits and nuts." },
  { id: 14, name: "Tea Rusk", category: "Bakery", price: "₹100", store: "Sara's Bakes", rating: 4.5, image: "https://images.unsplash.com/photo-1596450514735-110052be141c?auto=format&fit=crop&w=800&q=80", description: "Crispy tea rusks perfect for your evening chai." },
  { id: 15, name: "Kerala Premium Tea", category: "Beverages", price: "₹199", store: "Munnar Leaves", rating: 4.8, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80", description: "Premium tea dust from the estates of Munnar." },
  { id: 16, name: "Filter Coffee Powder", category: "Beverages", price: "₹250", store: "Wayanad Beans", rating: 4.7, image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=800&q=80", description: "Authentic Wayanadan filter coffee blend." },
  { id: 17, name: "Kerala Kasavu Saree", category: "Apparel", price: "₹1500", store: "Bindu Handlooms", rating: 4.9, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80", description: "Traditional Kerala Kasavu saree with golden zari border." },
  { id: 18, name: "Handloom Dhoti", category: "Apparel", price: "₹800", store: "Bindu Handlooms", rating: 4.8, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80", description: "Pure cotton handloom dhoti." },
  { id: 19, name: "Handmade Beaded Necklace", category: "Jewelry", price: "₹350", store: "Artisan Gems", rating: 4.6, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80", description: "Beautifully crafted beaded necklace." },
  { id: 20, name: "Terracotta Earrings", category: "Jewelry", price: "₹150", store: "Earth & Clay", rating: 4.5, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80", description: "Eco-friendly terracotta earrings." },
  { id: 21, name: "Macrame Wall Hanging", category: "HomeDecor", price: "₹650", store: "Boho Knots", rating: 4.8, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80", description: "Bohemian style macrame wall hanging." },
  { id: 22, name: "Bamboo Lamp", category: "HomeDecor", price: "₹850", store: "Nature Decor", rating: 4.9, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80", description: "Handcrafted bamboo table lamp." },
  { id: 23, name: "Aloe Vera Soap", category: "Beauty", price: "₹120", store: "Pure Naturals", rating: 4.7, image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=800&q=80", description: "Handmade soap enriched with aloe vera." },
  { id: 24, name: "Herbal Hair Oil", category: "Beauty", price: "₹300", store: "Ayur Roots", rating: 4.8, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80", description: "Traditional herbal hair oil for strong hair." },
];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;
  const { addItem } = useCartStore();
  
  const [showToast, setShowToast] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!params?.id) return;
    const p = dummyProducts.find(p => p.id === parseInt(params.id as string));
    if (p) setProduct(p);
  }, [params?.id]);

  if (!product) return <div className="p-8 text-center">Loading...</div>;

  const handleAddToCart = () => {
    addItem(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-0">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-8">
        {/* Product Image */}
        <div className="w-full">
          <div className="aspect-square w-full rounded-3xl overflow-hidden relative shadow-md border border-border/50">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <button className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform">
              <Heart className="w-5 h-5 text-muted-foreground hover:text-red-500" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 bg-[#FFD700]/20 text-yellow-700 dark:text-yellow-500 px-2 py-1 rounded font-bold text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded font-medium">{product.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="text-muted-foreground">{t.soldBy}</span>
            <span className="font-bold text-foreground underline decoration-border underline-offset-4 cursor-pointer hover:text-blue-600 transition-colors">{product.store}</span>
          </div>

          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            {product.price}
          </div>

          <div className="bg-card rounded-2xl p-5 border border-border/50 mb-8 shadow-sm">
            <h3 className="font-bold mb-2">Description</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{product.description || "A wonderful homemade product crafted with love and care."}</p>
          </div>
          
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span>{t.cartSecureCheckout}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="w-5 h-5 text-blue-500" />
              <span>{t.cartFastDelivery}</span>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-border/50">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl transition-all text-lg flex items-center justify-center gap-3 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {t.addToCart}
            </button>
          </div>
        </div>
      </div>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <CheckCircle2 className="w-5 h-5" />
            {t.addedToCart}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

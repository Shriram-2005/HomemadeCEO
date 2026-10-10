"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { Moon, Sun, Globe, User, LogOut, Settings, Search, ShoppingCart, Package, MapPin, Home, Store, ClipboardList, DollarSign, CreditCard, Heart, Bell, HelpCircle, Briefcase, Truck, BarChart3, Sparkles, Users, GraduationCap, PlayCircle, X, Camera, Mic, Menu, MessageSquare, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguageStore();
  const t = dictionaries[language].dashboard;
  const router = useRouter();
  const pathname = usePathname();
  
  const [isMounted, setIsMounted] = useState(false);
  const { getTotalItems } = useCartStore();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartItemCount = isMounted ? getTotalItems() : 0;

  const isSellerPage = pathname.startsWith("/dashboard/seller");
  const [isJamiOpen, setIsJamiOpen] = useState(false);
  const [isJamiSidebarOpen, setIsJamiSidebarOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col pb-20 md:pb-0">
      {/* Dashboard Custom Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-[clamp(1rem,3vw,2rem)]">
          {/* Left: Logo */}
          <Link href="/dashboard" className="flex items-center gap-1">
            <span className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold tracking-tight text-foreground">
              Homemade
            </span>
            <span className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold tracking-tight text-[#FFD700]">
              CEO
            </span>
          </Link>

          {/* Center: Search Bar (Buyer) OR Navigation Links (Seller) */}
          {!isSellerPage ? (
            <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                onFocus={() => {
                  if (pathname !== '/dashboard/search') {
                    router.push('/dashboard/search');
                  }
                }}
                onChange={(e) => {
                  if (pathname !== '/dashboard/search') {
                    router.push('/dashboard/search?q=' + encodeURIComponent(e.target.value));
                  } else {
                    window.history.replaceState(null, '', '?q=' + encodeURIComponent(e.target.value));
                    window.dispatchEvent(new Event('popstate')); // trigger re-render on the search page
                  }
                }}
                className="w-full bg-muted/50 border border-border/50 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#FFD700] transition-colors"
              />
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center gap-8 mx-6">
              <Link href="/dashboard/seller" className={`font-medium transition-colors hover:text-[#FFD700] ${pathname === '/dashboard/seller' ? 'text-[#FFD700] font-bold' : 'text-muted-foreground'}`}>
                {t.navStore}
              </Link>
              <Link href="/dashboard/seller/products" className={`font-medium transition-colors hover:text-[#FFD700] ${pathname.includes('/dashboard/seller/products') ? 'text-[#FFD700] font-bold' : 'text-muted-foreground'}`}>
                {t.navProducts}
              </Link>
              <Link href="/dashboard/seller/orders" className={`font-medium transition-colors hover:text-[#FFD700] ${pathname.includes('/dashboard/seller/orders') ? 'text-[#FFD700] font-bold' : 'text-muted-foreground'}`}>
                {t.navOrders}
              </Link>
              <Link href="/dashboard/seller/academy" className={`font-medium transition-colors hover:text-pink-500 flex items-center gap-1.5 ${pathname.includes('/academy') ? 'text-pink-500 font-bold' : 'text-pink-500/80'}`}>
                <GraduationCap className="w-4 h-4" /> {t.sellerAcademy}
              </Link>
              <Link href="/dashboard/seller/ai" className={`font-medium transition-colors hover:text-purple-500 flex items-center gap-1.5 ${pathname.includes('/ai') ? 'text-purple-500 font-bold' : 'text-purple-500/80'}`}>
                <Sparkles className="w-4 h-4" /> {t.jamiAI}
              </Link>
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Desktop Cart & Academy (Hidden on Mobile & Seller Page) */}
            {!isSellerPage && (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/dashboard/academy" className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors bg-blue-500/10 px-4 py-2 rounded-full ml-2">
                  <PlayCircle className="w-4 h-4" />
                  {t.academy}
                </Link>
                <Link href="/dashboard/cart" className="flex items-center justify-center rounded-full p-2.5 hover:bg-muted transition-colors border border-transparent hover:border-border/50 relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-background">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            )}

            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center rounded-full p-2.5 hover:bg-muted transition-colors border border-transparent hover:border-border/50">
                <Globe className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 z-[200]">
                <DropdownMenuItem onClick={() => setLanguage('en')} className="font-medium cursor-pointer">
                  English
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#FFD700]/80 h-[2px]" />
                <DropdownMenuItem onClick={() => setLanguage('ml')} className="font-medium cursor-pointer">
                  മലയാളം (Malayalam)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center rounded-full p-2.5 hover:bg-muted transition-colors border border-transparent hover:border-border/50"
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="hidden h-5 w-5 dark:block" />
            </button>

            {/* Profile Dropdown (Hidden on Mobile) */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center ml-2 relative outline-none">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-yellow-600 flex items-center justify-center border-2 border-background shadow-sm hover:scale-105 transition-transform">
                    <User className="h-5 w-5 text-black" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 z-[200] p-2">
                  <div className="flex flex-col px-2 py-2 mb-2 border-b border-border/50">
                    <span className="font-bold">Amina Spices</span>
                    <span className="text-xs text-muted-foreground">+91 98765 43210</span>
                  </div>

                  {isSellerPage ? (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/seller/profile')} className="cursor-pointer gap-2 py-2 font-medium text-foreground font-bold bg-muted/50 rounded-md mb-1">
                        <Settings className="w-4 h-4" /> Seller Profile Hub
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer gap-2 py-2 font-medium">
                        <User className="w-4 h-4" /> {t.switchToBuyer}
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/profile')} className="cursor-pointer gap-2 py-2 font-medium text-foreground font-bold bg-muted/50 rounded-md mb-1">
                        <User className="w-4 h-4" /> Buyer Profile Hub
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/seller')} className="cursor-pointer gap-2 py-2 font-medium">
                        <Store className="w-4 h-4" /> {t.switchToSeller}
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />

                  {!isSellerPage ? (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/profile/info')} className="cursor-pointer gap-2 py-2">
                        <User className="w-4 h-4" /> {t.personalInfo}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/profile/orders')} className="cursor-pointer gap-2 py-2">
                        <Package className="w-4 h-4" /> {t.myOrders}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/profile/addresses')} className="cursor-pointer gap-2 py-2">
                        <MapPin className="w-4 h-4" /> {t.savedAddresses}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/profile/payments')} className="cursor-pointer gap-2 py-2">
                        <CreditCard className="w-4 h-4" /> {t.paymentMethods}
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem onClick={() => router.push('/dashboard/profile/wishlist')} className="cursor-pointer gap-2 py-2">
                        <Heart className="w-4 h-4" /> {t.wishlist}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/profile/following')} className="cursor-pointer gap-2 py-2">
                        <Users className="w-4 h-4" /> {t.followedStores}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/academy')} className="cursor-pointer gap-2 py-2 text-blue-600 dark:text-blue-400 font-bold">
                        <PlayCircle className="w-4 h-4" /> {t.academy}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/profile/notifications')} className="cursor-pointer gap-2 py-2">
                        <Bell className="w-4 h-4" /> {t.notifications}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/profile/help')} className="cursor-pointer gap-2 py-2">
                        <HelpCircle className="w-4 h-4" /> {t.helpSupport}
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/seller/settings')} className="cursor-pointer gap-2 py-2">
                        <Settings className="w-4 h-4" /> {t.storeSettings}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/seller/business')} className="cursor-pointer gap-2 py-2">
                        <Briefcase className="w-4 h-4" /> {t.businessProfile}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/seller/shipping')} className="cursor-pointer gap-2 py-2">
                        <Truck className="w-4 h-4" /> {t.shippingDelivery}
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem onClick={() => router.push('/dashboard/seller/analytics')} className="cursor-pointer gap-2 py-2">
                        <BarChart3 className="w-4 h-4" /> {t.storeAnalytics}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/seller/earnings')} className="cursor-pointer gap-2 py-2">
                        <DollarSign className="w-4 h-4" /> {t.earnings}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/seller/ai')} className="cursor-pointer gap-2 py-2 font-bold text-purple-600 dark:text-purple-400">
                        <Sparkles className="w-4 h-4" /> {t.jamiAI}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/profile/help')} className="cursor-pointer gap-2 py-2">
                        <HelpCircle className="w-4 h-4" /> {t.helpSupport}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push('/dashboard/seller/academy')} className="cursor-pointer gap-2 py-2 font-bold text-pink-600 dark:text-pink-400">
                        <GraduationCap className="w-4 h-4" /> {t.sellerAcademy}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer gap-2 py-2 text-red-500 focus:text-red-500 focus:bg-red-500/10">
                    <LogOut className="w-4 h-4" /> {t.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 w-full container mx-auto px-[clamp(1rem,3vw,2rem)] pt-24 pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation (Hidden on Desktop & Seller Page) */}
      {!isSellerPage && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 flex items-center justify-around pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] px-2 z-[100] shadow-[0_-5px_15px_-10px_rgba(0,0,0,0.1)]">
          <Link href="/dashboard" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname === '/dashboard' ? 'text-[#FFD700]' : 'text-muted-foreground hover:text-foreground'}`}>
            <Home className="w-6 h-6" />
            <span className={`text-[10px] ${pathname === '/dashboard' ? 'font-bold' : 'font-medium'}`}>{t.navHome}</span>
          </Link>
          <Link href="/dashboard/search" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname.includes('/dashboard/search') ? 'text-[#FFD700]' : 'text-muted-foreground hover:text-foreground'}`}>
            <Search className="w-6 h-6" />
            <span className={`text-[10px] ${pathname.includes('/dashboard/search') ? 'font-bold' : 'font-medium'}`}>{t.navSearch}</span>
          </Link>
          <Link href="/dashboard/cart" className={`flex flex-col items-center gap-1.5 transition-colors relative ${pathname.includes('/dashboard/cart') ? 'text-[#FFD700]' : 'text-muted-foreground hover:text-foreground'}`}>
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-background">
                {cartItemCount}
              </span>
            )}
            <span className={`text-[10px] ${pathname.includes('/dashboard/cart') ? 'font-bold' : 'font-medium'}`}>{t.navCart}</span>
          </Link>
          <Link href="/dashboard/profile" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname.includes('/dashboard/profile') ? 'text-[#FFD700]' : 'text-muted-foreground hover:text-foreground'}`}>
            <User className="w-6 h-6" />
            <span className={`text-[10px] ${pathname.includes('/dashboard/profile') ? 'font-bold' : 'font-medium'}`}>{t.navProfile}</span>
          </Link>
        </nav>
      )}

      {/* Mobile Bottom Navigation (Visible ONLY on Seller Page) */}
      {isSellerPage && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border/50 flex items-center justify-around pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))] px-2 z-[100] shadow-[0_-5px_15px_-10px_rgba(0,0,0,0.1)]">
          <Link href="/dashboard/seller" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname === '/dashboard/seller' ? 'text-[#FFD700]' : 'text-muted-foreground hover:text-foreground'}`}>
            <Store className="w-6 h-6" />
            <span className={`text-[10px] ${pathname === '/dashboard/seller' ? 'font-bold' : 'font-medium'}`}>{t.navStore}</span>
          </Link>
          <Link href="/dashboard/seller/products" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname.includes('/dashboard/seller/products') ? 'text-[#FFD700]' : 'text-muted-foreground hover:text-foreground'}`}>
            <Package className="w-6 h-6" />
            <span className={`text-[10px] ${pathname.includes('/dashboard/seller/products') ? 'font-bold' : 'font-medium'}`}>{t.navProducts}</span>
          </Link>
          <Link href="/dashboard/seller/orders" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname.includes('/dashboard/seller/orders') ? 'text-[#FFD700]' : 'text-muted-foreground hover:text-foreground'}`}>
            <ClipboardList className="w-6 h-6" />
            <span className={`text-[10px] ${pathname.includes('/dashboard/seller/orders') ? 'font-bold' : 'font-medium'}`}>{t.navOrders}</span>
          </Link>
          <Link href="/dashboard/seller/profile" className={`flex flex-col items-center gap-1.5 transition-colors ${pathname.includes('/dashboard/seller/profile') ? 'text-[#FFD700]' : 'text-muted-foreground hover:text-foreground'}`}>
            <User className="w-6 h-6" />
            <span className={`text-[10px] ${pathname.includes('/dashboard/seller/profile') ? 'font-bold' : 'font-medium'}`}>{t.navProfile}</span>
          </Link>
        </nav>
      )}

      {/* Global Jami AI Chat System */}
      {isSellerPage && (
        <AnimatePresence>
          {!isJamiOpen ? (
            <motion.button
              key="jami-fab"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setIsJamiOpen(true)}
              className="fixed bottom-[80px] md:bottom-8 right-4 md:right-8 z-[110] bg-gradient-to-br from-blue-600 to-purple-600 text-white w-14 h-14 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden shrink-0"
            >
              <Sparkles className="w-6 h-6 shrink-0" />
            </motion.button>
          ) : (
            <motion.div
              key="jami-chat"
              initial={{ clipPath: "circle(28px at calc(100% - 40px) calc(100% - 40px))", opacity: 0 }}
              animate={{ clipPath: "circle(150% at calc(100% - 40px) calc(100% - 40px))", opacity: 1 }}
              exit={{ clipPath: "circle(28px at calc(100% - 40px) calc(100% - 40px))", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="origin-bottom-right fixed top-16 bottom-[72px] md:bottom-0 left-0 right-0 md:top-auto md:left-auto md:right-8 md:bottom-8 md:w-[400px] md:h-[650px] z-[110] bg-background md:border md:border-border/50 md:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between text-white shadow-md z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsJamiSidebarOpen(true)}
                    className="p-1.5 hover:bg-white/20 rounded-md transition-colors shrink-0 -ml-1.5"
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </button>
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg leading-tight truncate">{t.jamiAI}</h3>
                    <p className="text-xs font-medium text-blue-100 truncate">Always online</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsJamiOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors shrink-0"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Sidebar Drawer */}
              <AnimatePresence>
                {isJamiSidebarOpen && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsJamiSidebarOpen(false)}
                      className="absolute inset-0 bg-black/40 z-20 backdrop-blur-sm"
                    />
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute top-0 left-0 bottom-0 w-[280px] bg-background z-30 shadow-2xl flex flex-col border-r border-border/50"
                    >
                      <div className="p-4 border-b border-border/50 flex items-center justify-between">
                        <span className="font-bold font-heading text-lg">Jami AI</span>
                        <button onClick={() => setIsJamiSidebarOpen(false)} className="p-2 hover:bg-muted rounded-full">
                          <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                      </div>
                      
                      <div className="p-4 flex-1 overflow-y-auto">
                        <button className="w-full flex items-center gap-3 bg-purple-600 text-white p-3 rounded-xl font-medium hover:bg-purple-700 transition-colors mb-6 shadow-sm">
                          <Plus className="w-5 h-5" />
                          New Chat
                        </button>
                        
                        <div className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">Recent</div>
                        <div className="space-y-1">
                          <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors flex items-center gap-3 text-sm">
                            <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="truncate">Product description for spices</span>
                          </button>
                          <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors flex items-center gap-3 text-sm">
                            <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="truncate">Sales analysis Q3</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 border-t border-border/50">
                        <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors flex items-center gap-3 text-sm">
                          <Settings className="w-4 h-4 text-muted-foreground" />
                          <span>AI Settings</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Chat Body (Gemini style) */}
              <div className="flex-1 p-6 overflow-y-auto bg-muted/30 flex flex-col relative">
                {/* Greeting */}
                <div className="mt-4 md:mt-8 mb-8 md:mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold font-heading bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Hello, Amina
                  </h2>
                  <p className="text-xl md:text-2xl font-medium text-muted-foreground">
                    How can I help you grow today?
                  </p>
                </div>

                {/* Suggestions Grid */}
                <div className="grid grid-cols-1 gap-3 mt-auto mb-4">
                  <button className="text-left p-4 bg-background border border-border/50 hover:border-purple-500/50 hover:bg-purple-500/5 rounded-2xl transition-all shadow-sm flex items-center gap-3 group">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Write a product description</p>
                      <p className="text-xs text-muted-foreground">For my new Kerala banana chips</p>
                    </div>
                  </button>
                  
                  <button className="text-left p-4 bg-background border border-border/50 hover:border-purple-500/50 hover:bg-purple-500/5 rounded-2xl transition-all shadow-sm flex items-center gap-3 group">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Analyze my weekly sales</p>
                      <p className="text-xs text-muted-foreground">Compare this week to last week</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Chat Input with Camera & Mic */}
              <div className="p-4 border-t border-border/50 bg-background z-10">
                <div className="flex items-center gap-2">
                  <button className="w-11 h-11 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 text-muted-foreground transition-colors shrink-0">
                    <Camera className="w-5 h-5" />
                  </button>
                  
                  <input 
                    type="text" 
                    placeholder="Ask Jami anything..." 
                    className="flex-1 bg-muted/50 border border-border/50 rounded-full py-3 px-4 text-sm focus:outline-none focus:border-purple-500 transition-colors min-w-0"
                  />
                  
                  <button className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 text-white shadow-md transition-colors shrink-0">
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </div>
  );
}

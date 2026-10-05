"use client";

import React from "react";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { Moon, Sun, Globe, User, LogOut, Settings, Search, ShoppingCart, Package, MapPin, Home, Store, ClipboardList, DollarSign, CreditCard, Heart, Bell, HelpCircle, Briefcase, Truck, BarChart3 } from "lucide-react";
import { useTheme } from "next-themes";
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

  const isSellerPage = pathname.startsWith("/dashboard/seller");

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
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Desktop Cart Icon (Hidden on Mobile & Seller Page) */}
            {!isSellerPage && (
              <button className="hidden md:flex items-center justify-center rounded-full p-2.5 hover:bg-muted transition-colors border border-transparent hover:border-border/50 relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
              </button>
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
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer gap-2 py-2 font-medium">
                    <User className="w-4 h-4" /> {t.switchToBuyer}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => router.push('/dashboard/seller')} className="cursor-pointer gap-2 py-2 font-medium">
                    <User className="w-4 h-4" /> {t.switchToSeller}
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                
                {!isSellerPage ? (
                  <>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <User className="w-4 h-4" /> {t.personalInfo}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <Package className="w-4 h-4" /> {t.myOrders}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <MapPin className="w-4 h-4" /> {t.savedAddresses}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <CreditCard className="w-4 h-4" /> {t.paymentMethods}
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <Heart className="w-4 h-4" /> {t.wishlist}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <Bell className="w-4 h-4" /> {t.notifications}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <HelpCircle className="w-4 h-4" /> {t.helpSupport}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <Settings className="w-4 h-4" /> {t.storeSettings}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <Briefcase className="w-4 h-4" /> {t.businessProfile}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <Truck className="w-4 h-4" /> {t.shippingDelivery}
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <BarChart3 className="w-4 h-4" /> {t.storeAnalytics}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <DollarSign className="w-4 h-4" /> {t.earnings}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                      <HelpCircle className="w-4 h-4" /> {t.helpSupport}
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
      <main className="flex-1 w-full container mx-auto px-[clamp(1rem,3vw,2rem)] py-8 pt-24">
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
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background"></span>
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
    </div>
  );
}

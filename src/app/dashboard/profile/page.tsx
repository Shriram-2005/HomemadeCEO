"use client";

import React from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { 
  Package, MapPin, Settings, Store, LogOut, User, 
  ChevronRight, CreditCard, Heart, Bell, HelpCircle 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuyerProfilePage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].dashboard;
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-8">
      
      {/* Profile Header Card */}
      <div className="bg-background rounded-2xl p-6 shadow-sm border border-border/50 mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFD700] to-yellow-600 flex items-center justify-center shadow-inner shrink-0">
          <User className="w-12 h-12 text-black" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl font-bold font-heading mb-1">Amina Spices</h2>
          <p className="text-muted-foreground text-lg mb-4">+91 98765 43210</p>
          
          <button 
            onClick={() => router.push("/dashboard/seller")}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-yellow-500 text-black font-bold py-2.5 px-6 rounded-full transition-colors"
          >
            <Store className="w-5 h-5" />
            {t.switchToSeller}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Account Settings Section */}
        <section>
          <h3 className="text-lg font-bold mb-4 px-2 text-foreground/80">{t.accountSettings}</h3>
          <div className="bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.personalInfo}</div>
                  <div className="text-xs text-muted-foreground">{t.personalInfoDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <Package className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.myOrders}</div>
                  <div className="text-xs text-muted-foreground">{t.myOrdersDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.savedAddresses}</div>
                  <div className="text-xs text-muted-foreground">{t.savedAddressesDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.paymentMethods}</div>
                  <div className="text-xs text-muted-foreground">{t.paymentMethodsDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>

          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <h3 className="text-lg font-bold mb-4 px-2 text-foreground/80">{t.preferences}</h3>
          <div className="bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <Heart className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.wishlist}</div>
                  <div className="text-xs text-muted-foreground">{t.wishlistDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.notifications}</div>
                  <div className="text-xs text-muted-foreground">{t.notificationsDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.helpSupport}</div>
                  <div className="text-xs text-muted-foreground">{t.helpSupportDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-red-500/10 transition-colors text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-500/10 rounded-full group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <LogOut className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-medium text-red-500">{t.logout}</div>
                </div>
              </div>
            </button>

          </div>
        </section>

      </div>
    </div>
  );
}

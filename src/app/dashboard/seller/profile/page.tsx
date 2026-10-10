"use client";

import React from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import { 
  Settings, LogOut, User, ChevronRight, Store, 
  DollarSign, Briefcase, Truck, BarChart3, HelpCircle, Sparkles, GraduationCap, PlayCircle
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellerProfilePage() {
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
          <Store className="w-12 h-12 text-black" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl font-bold font-heading mb-1">Amina Spices Store</h2>
          <p className="text-muted-foreground text-lg mb-4">+91 98765 43210</p>
          
          <button 
            onClick={() => router.push("/dashboard")}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-yellow-500 text-black font-bold py-2.5 px-6 rounded-full transition-colors"
          >
            <User className="w-5 h-5" />
            {t.switchToBuyer}
          </button>
        </div>
      </div>

      {/* Seller Academy Training Banner */}
      <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white mb-8 shadow-md relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
        <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <GraduationCap className="w-32 h-32" />
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-heading mb-1 flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-[#FFD700]" />
              {t.sellerAcademy}
            </h3>
            <p className="text-purple-100 text-sm max-w-[200px] md:max-w-xs">{t.sellerAcademyDesc}</p>
          </div>
          <ChevronRight className="w-6 h-6 text-white shrink-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Store Management Section */}
        <section>
          <h3 className="text-lg font-bold mb-4 px-2 text-foreground/80">{t.storeManagement}</h3>
          <div className="bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.storeSettings}</div>
                  <div className="text-xs text-muted-foreground">{t.storeSettingsDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.businessProfile}</div>
                  <div className="text-xs text-muted-foreground">{t.businessProfileDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <Truck className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.shippingDelivery}</div>
                  <div className="text-xs text-muted-foreground">{t.shippingDeliveryDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left bg-gradient-to-r from-blue-500/5 to-purple-500/5">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/10 rounded-full">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-blue-600 dark:text-blue-400">{t.jamiAI}</div>
                  <div className="text-xs text-muted-foreground">{t.jamiAIDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            </button>

          </div>
        </section>

        {/* Performance & Support Section */}
        <section>
          <h3 className="text-lg font-bold mb-4 px-2 text-foreground/80">{t.performanceSupport}</h3>
          <div className="bg-background rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <BarChart3 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.storeAnalytics}</div>
                  <div className="text-xs text-muted-foreground">{t.storeAnalyticsDesc}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors border-b border-border/50 text-left">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <DollarSign className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium">{t.earnings}</div>
                  <div className="text-xs text-muted-foreground">{t.earningsDesc}</div>
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

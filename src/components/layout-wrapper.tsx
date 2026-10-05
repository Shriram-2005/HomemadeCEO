"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define which paths should NOT have the global header and footer
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}
      <main className={`flex-1 w-full ${!isDashboard ? "mt-[66px]" : ""}`}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}

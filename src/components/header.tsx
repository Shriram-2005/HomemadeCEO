"use client";

import * as React from "react";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useLanguageStore } from "@/store/useLanguageStore";
import { dictionaries } from "@/i18n/dictionaries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { StaggeredMenu } from "@/components/ui/staggered-menu";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguageStore();
  const t = dictionaries[language].header;

  const menuItems = [
    { label: t.home, ariaLabel: t.home, link: '/' },
    { label: t.story, ariaLabel: t.story, link: '/story' },
    { label: t.products, ariaLabel: t.products, link: '/products' },
    { label: t.community, ariaLabel: t.community, link: '/community' },
    { label: t.contact, ariaLabel: t.contact, link: '/contact' },
    { label: t.login, ariaLabel: t.login, link: '/login' },
    { label: t.socials, ariaLabel: t.socials, link: '/socials' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b-[2px] border-[#FFD700] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-1 z-[110]">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Homemade
            </span>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-[#FFD700]">
              CEO
            </span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 md:gap-4 relative z-[110]">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors" aria-label={t.languageToggle}>
                <Globe className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="z-[200]">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#FFD700]/80 h-[2px]" />
                <DropdownMenuItem onClick={() => setLanguage('ml')}>
                  മലയാളം (Malayalam)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label={t.themeToggle}
            >
              <Sun className="h-5 w-5 dark:hidden" />
              <Moon className="hidden h-5 w-5 dark:block" />
              <span className="sr-only">{t.themeToggle}</span>
            </button>

            {/* GSAP Staggered Menu Toggle */}
            <StaggeredMenu
              position="right"
              items={menuItems}
              displayItemNumbering={true}
              menuButtonColor="var(--foreground)"
              openMenuButtonColor="var(--foreground)"
              changeMenuColorOnOpen={true}
              colors={['#FFD700', '#222']}
              accentColor="#FFD700"
              isFixed={true}
              menuToggleLabel={t.menuToggle}
              closeToggleLabel={t.closeToggle}
              openMenuLabel={t.openMenu}
              closeMenuLabel={t.closeMenu}
            />
          </div>
        </div>
      </header>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { FavoritesCounter } from "@/components/favorites-counter";
import { CartButton } from "@/components/cart-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "@/components/mobile-menu";
import { UserMenu } from "@/components/user-menu";
import { SearchOverlay } from "@/components/search-overlay";
import { navItems } from "@/lib/site-data";
import { useTranslations } from "@/lib/locale";

export function SiteHeader() {
  const t = useTranslations("common");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="shrink-0 font-semibold text-zinc-900">
          {t("brandName")}
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-zinc-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-amber-700">
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 md:flex"
            aria-label={t("searchAriaLabel")}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <FavoritesCounter />
          <CartButton />
          <UserMenu />
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </div>
      <SearchOverlay open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}

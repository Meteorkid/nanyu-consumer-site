import Link from "next/link";
import { FavoritesCounter } from "@/components/favorites-counter";
import { CartButton } from "@/components/cart-button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenu } from "@/components/mobile-menu";
import { navItems } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="shrink-0 font-semibold text-zinc-900">
          玉汝于成
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-zinc-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-amber-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <FavoritesCounter />
          <CartButton />
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

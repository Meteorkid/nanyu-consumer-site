"use client";

import Link from "next/link";
import { useFavorites, useHydrated } from "@/lib/use-favorites";
import { useTranslations } from "@/lib/locale";

export function FavoritesCounter({ className = "" }: { className?: string }) {
  const { count } = useFavorites();
  const hydrated = useHydrated();
  const t = useTranslations("common");

  return (
    <Link
      href="/favorites"
      className={`inline-flex items-center gap-1 rounded-full border border-zinc-300 px-3 py-1 text-xs text-zinc-700 hover:border-amber-500 hover:text-amber-700 ${className}`}
    >
      <span aria-hidden>★</span>
      <span>{t("favorites")}</span>
      {hydrated && count > 0 ? (
        <span className="ml-0.5 inline-flex min-w-[1.1rem] items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-semibold text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}

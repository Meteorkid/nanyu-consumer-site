"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/locale";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/site-data";
import { useFavorites, useHydrated } from "@/lib/use-favorites";

export function FavoritesClient() {
  const t = useTranslations("favorites");
  const { favorites, clear } = useFavorites();
  const hydrated = useHydrated();

  const list = hydrated ? products.filter((p) => favorites.includes(p.slug)) : [];

  return (
    <div className="section-shell">
      <Breadcrumb items={[{ href: "/", label: "首页" }, { label: t("title") }]} />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="section-title">{t("title")}</h1>
          <p className="section-subtitle">仅保存在你本地浏览器（localStorage），清缓存会丢失。</p>
        </div>
        {hydrated && favorites.length > 0 ? (
          <button
            type="button"
            onClick={() => clear()}
            className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm text-zinc-700 hover:border-amber-500 hover:text-amber-700"
          >
            清空全部
          </button>
        ) : null}
      </div>

      {!hydrated ? (
        <p className="mt-8 text-sm text-zinc-500">读取本地收藏…</p>
      ) : list.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-600">
          <p>{t("empty")}</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
          >
            去逛一逛
          </Link>
        </section>
      ) : (
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </section>
      )}
    </div>
  );
}

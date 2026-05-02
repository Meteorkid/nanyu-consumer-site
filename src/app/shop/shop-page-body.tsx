"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";
import { TrackLink } from "@/components/track-link";
import { filterAndSortProducts, parseShopSearchParams } from "@/lib/catalog-filters";
import { products } from "@/lib/site-data";

export function ShopPageBody() {
  const searchParams = useSearchParams();
  const raw = useMemo(() => {
    const obj: Record<string, string | string[] | undefined> = {};
    searchParams.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  }, [searchParams]);
  const params = useMemo(() => parseShopSearchParams(raw), [raw]);
  const filtered = useMemo(() => filterAndSortProducts(products, params), [params]);

  return (
    <>
      <Breadcrumb items={[{ href: "/", label: "首页" }, { label: "去购买" }]} />
      <h1 className="section-title mt-3">去购买</h1>
      <p className="section-subtitle">
        按场景、价格带、寓意快速选品；支持关键词搜索与排序，URL 可直接分享给朋友。
      </p>

      <ShopFilters total={products.length} filteredCount={filtered.length} />

      {filtered.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-sm text-zinc-500">
          没有匹配的商品，换一组条件或清空筛选试试。
        </section>
      ) : (
        <section
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          aria-label="商品列表"
        >
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </section>
      )}

      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-50">
        <h2 className="text-xl font-semibold">需要人工选品建议？</h2>
        <p className="mt-2 text-sm text-zinc-300">可按预算与用途提供 1 对 1 推荐，减少首次购买决策成本。</p>
        <TrackLink
          href="/support"
          eventName="request_assistant"
          className="mt-4 inline-flex rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
        >
          联系客服
        </TrackLink>
      </section>
    </>
  );
}

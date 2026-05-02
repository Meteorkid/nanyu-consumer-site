"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { meaningOptions, priceBands, scenarios, sortOptions } from "@/lib/site-data";
import { parseShopSearchParams, serializeShopParams, type ShopParams } from "@/lib/catalog-filters";
import { trackEvent } from "@/lib/tracking";

type ShopFiltersProps = {
  total: number;
  filteredCount: number;
};

export function ShopFilters({ total, filteredCount }: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const raw = useMemo(() => {
    const obj: Record<string, string> = {};
    searchParams.forEach((v, k) => {
      obj[k] = v;
    });
    return obj;
  }, [searchParams]);

  const current: ShopParams = useMemo(() => parseShopSearchParams(raw), [raw]);
  const [keyword, setKeyword] = useState(current.q);

  useEffect(() => {
    setKeyword(current.q);
  }, [current.q]);

  function push(next: ShopParams, eventName: string, payload: Record<string, string | number> = {}) {
    const qs = serializeShopParams(next);
    const url = qs ? `${pathname}?${qs}` : pathname;
    startTransition(() => router.replace(url, { scroll: false }));
    trackEvent(eventName, payload);
  }

  function toggle<K extends keyof ShopParams>(key: K, value: ShopParams[K]) {
    const next = { ...current, [key]: current[key] === value ? (null as ShopParams[K]) : value };
    push(next, "shop_filter_toggle", { key: String(key), value: String(value ?? "") });
  }

  function setThreeD(v: boolean) {
    push({ ...current, threeD: v }, "shop_filter_toggle", { key: "threeD", value: v ? "1" : "0" });
  }

  function setSort(sort: ShopParams["sort"]) {
    push({ ...current, sort }, "shop_sort_change", { value: sort });
  }

  function onSubmitSearch(e: React.FormEvent) {
    e.preventDefault();
    push({ ...current, q: keyword.trim() }, "shop_search", { q: keyword.trim() });
  }

  function clearAll() {
    push(
      { scenario: null, meaning: null, price: null, threeD: false, q: "", sort: "default" },
      "shop_filter_clear",
    );
    setKeyword("");
  }

  const hasFilter =
    Boolean(current.scenario) ||
    Boolean(current.meaning) ||
    Boolean(current.price) ||
    Boolean(current.threeD) ||
    Boolean(current.q) ||
    current.sort !== "default";

  const chip = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm transition-colors ${
      active
        ? "bg-amber-500 text-zinc-950 shadow-sm shadow-amber-950/10"
        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
    }`;

  return (
    <section
      className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5"
      aria-busy={isPending}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-zinc-900">筛选维度</h2>
        <p className="text-xs text-zinc-500">
          共 {total} 款，筛选后 <span className="font-semibold text-zinc-800">{filteredCount}</span> 款
        </p>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <Row label="场景">
          {scenarios.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => toggle("scenario", item.key)}
              className={chip(current.scenario === item.key)}
            >
              {item.label}
            </button>
          ))}
        </Row>

        <Row label="价格带">
          {priceBands.map((band) => (
            <button
              key={band.key}
              type="button"
              onClick={() => toggle("price", band.key)}
              className={chip(current.price === band.key)}
            >
              {band.label}
            </button>
          ))}
        </Row>

        <Row label="寓意">
          {meaningOptions.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => toggle("meaning", item.key)}
              className={chip(current.meaning === item.key)}
            >
              {item.label}
            </button>
          ))}
        </Row>

        <Row label="3D 可查看">
          <button
            type="button"
            onClick={() => setThreeD(!current.threeD)}
            className={chip(current.threeD)}
          >
            仅 GLB 可旋转款
          </button>
        </Row>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-4">
        <form onSubmit={onSubmitSearch} className="flex min-w-[240px] flex-1 items-center gap-2">
          <label htmlFor="shop-q" className="text-xs text-zinc-500">
            搜索
          </label>
          <input
            id="shop-q"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="商品名 / 产品编号"
            className="flex-1 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-amber-500"
          />
          <button
            type="submit"
            className="rounded-full border border-amber-600 bg-white px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-50"
          >
            搜索
          </button>
        </form>

        <div className="flex items-center gap-2">
          <label htmlFor="shop-sort" className="text-xs text-zinc-500">
            排序
          </label>
          <select
            id="shop-sort"
            value={current.sort}
            onChange={(e) => setSort(e.target.value as ShopParams["sort"])}
            className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 focus:border-amber-500"
          >
            {sortOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {hasFilter ? (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto text-xs font-medium text-amber-700 hover:text-amber-800"
          >
            重置全部
          </button>
        ) : null}
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 w-16 shrink-0 text-xs font-medium text-zinc-500">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

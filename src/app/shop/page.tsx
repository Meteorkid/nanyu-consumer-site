import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopPageBody } from "./shop-page-body";

export const metadata: Metadata = {
  title: "选购商品",
  description: "按场景、价格带、寓意、3D 可查看等维度筛选玉饰商品，支持关键词搜索与多种排序。",
};

function ShopFallback() {
  return (
    <>
      <div className="h-8 w-48 animate-pulse rounded bg-zinc-200" />
      <div className="mt-3 h-10 w-64 animate-pulse rounded bg-zinc-200" />
      <div className="mt-2 h-16 max-w-2xl animate-pulse rounded bg-zinc-200" />
      <section className="mt-6 h-56 animate-pulse rounded-2xl border border-zinc-200 bg-white" />
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="section-shell">
      <Suspense fallback={<ShopFallback />}>
        <ShopPageBody />
      </Suspense>
    </div>
  );
}

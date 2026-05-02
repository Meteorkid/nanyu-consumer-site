import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import { articleCategoryLabel, articles, products } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "内容中心",
  description: "搭配教程、用户故事、选购知识三条内容线；每篇都绑定相关商品，种草到下单一步到位。",
};

const picks = products.slice(0, 6);

export default function ContentPage() {
  const byCategory = {
    style: articles.filter((a) => a.category === "style"),
    story: articles.filter((a) => a.category === "story"),
    guide: articles.filter((a) => a.category === "guide"),
  };

  return (
    <div className="section-shell">
      <Breadcrumb items={[{ href: "/", label: "首页" }, { label: "看内容" }]} />
      <h1 className="section-title mt-3">看内容</h1>
      <p className="section-subtitle">
        内容与购买并列为双引擎。每篇图文都绑定相关商品，缩短从种草到下单的路径。
      </p>

      {(Object.entries(byCategory) as [keyof typeof byCategory, typeof articles][]).map(
        ([key, list]) =>
          list.length > 0 ? (
            <section key={key} className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-xl font-semibold text-zinc-900">{articleCategoryLabel[key]}</h2>
                <span className="text-xs text-zinc-500">{list.length} 篇</span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {list.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          ) : null,
      )}

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-zinc-900">本期同款推荐</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

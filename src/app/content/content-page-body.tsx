"use client";

import { ArticleCard } from "@/components/article-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import { articles, products } from "@/lib/site-data";
import { useTranslations } from "@/lib/locale";

const picks = products.slice(0, 6);

export function ContentPageBody() {
  const t = useTranslations("content");
  const tCommon = useTranslations("common");

  const byCategory = {
    style: articles.filter((a) => a.category === "style"),
    story: articles.filter((a) => a.category === "story"),
    guide: articles.filter((a) => a.category === "guide"),
  };

  return (
    <div className="section-shell">
      <Breadcrumb items={[{ href: "/", label: tCommon("home") }, { label: tCommon("content") }]} />
      <h1 className="section-title mt-3">{tCommon("content")}</h1>
      <p className="section-subtitle">{t("description")}</p>

      {(Object.entries(byCategory) as [keyof typeof byCategory, typeof articles][]).map(
        ([key, list]) =>
          list.length > 0 ? (
            <section key={key} className="mt-8">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t(key)}</h2>
                <span className="text-xs text-zinc-500">{list.length} {t("readMinutes")}</span>
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
        <h2 className="text-xl font-semibold text-zinc-900">{t("relatedProducts")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

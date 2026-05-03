"use client";

import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import {
  articleCategoryLabel,
  articles,
  getArticleField,
  getProductsBySlugs,
} from "@/lib/site-data";
import { useTranslations, useLocale } from "@/lib/locale";

type Article = (typeof articles)[number];

export function ArticleDetailBody({ article }: { article: Article }) {
  const t = useTranslations("content");
  const tCommon = useTranslations("common");
  const { locale } = useLocale();

  const title = getArticleField(article, "title", locale) as string;
  const summary = getArticleField(article, "summary", locale) as string;
  const body = getArticleField(article, "body", locale) as string[];

  const related = getProductsBySlugs(article.relatedProductSlugs);
  const moreArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="section-shell">
      <Breadcrumb
        items={[
          { href: "/", label: tCommon("home") },
          { href: "/content", label: tCommon("content") },
          { label: title },
        ]}
      />

      <article className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative h-56 w-full bg-zinc-100 md:h-72">
          <Image
            src={article.cover}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 960px"
            priority
          />
        </div>

        {article.grassVideoSrc ? (
          <div className="border-b border-zinc-200 bg-zinc-950 px-4 py-6 md:px-10">
            <p className="mx-auto mb-3 max-w-3xl text-xs font-medium uppercase tracking-wide text-zinc-500">
              {t("grassVideo")}
            </p>
            <div className="mx-auto max-w-3xl">
              <video
                className="aspect-video w-full rounded-xl bg-black object-contain shadow-lg ring-1 ring-white/10"
                controls
                playsInline
                preload="metadata"
                poster={article.cover}
              >
                <source src={article.grassVideoSrc} type="video/mp4" />
                {t("videoNotSupported")}{" "}
                <a href={article.grassVideoSrc} className="text-amber-400 underline">
                  MP4
                </a>
                .
              </video>
            </div>
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl p-6 md:p-10">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-700">
              {t(articleCategoryLabel[article.category])}
            </span>
            <span>{article.readMinutes} {t("readMinutes")}</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-zinc-950 md:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-zinc-600">{summary}</p>

          <div className="mt-6 space-y-4 text-[15px] leading-7 text-zinc-800">
            {body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold text-zinc-900">{t("relatedProducts")}</h2>
            <Link href="/shop" className="text-sm text-amber-700 hover:text-amber-800">
              {tCommon("viewAllProducts")}
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      {moreArticles.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900">{t("moreArticles")}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {moreArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

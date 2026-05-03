"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ArticleCard } from "@/components/article-card";
import { TrackLink } from "@/components/track-link";
import { StructuredData } from "@/components/structured-data";
import {
  articles,
  getShowcase3dProducts,
  products,
  scenarios,
} from "@/lib/site-data";
import { useTranslations } from "@/lib/locale";

const featured = products.slice(0, 6);
const threeDPicks = getShowcase3dProducts();

const scenarioDescKeys: Record<string, string> = {
  gift: "scenarioGiftDescription",
  daily: "scenarioDailyDescription",
  collection: "scenarioCollectionDescription",
};

export function HomePageBody() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tShop = useTranslations("shop");

  const trustBadgeKeys = ["traceable", "warranty", "shipping"] as const;

  return (
    <div>
      <StructuredData type="website" />
      <StructuredData type="organization" />

      <section className="section-shell">
        <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-amber-950 p-8 text-white md:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-300">Consumer Portal</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">{t("heroTitle")}</h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-200 md:text-base">{t("heroDescription")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <TrackLink
              href="/shop"
              eventName="click_home_cta"
              eventPayload={{ cta: "shop_now" }}
              className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
            >
              {t("shopNow")}
            </TrackLink>
            <TrackLink
              href="/content"
              eventName="click_home_cta"
              eventPayload={{ cta: "browse_content" }}
              className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t("viewContent")}
            </TrackLink>
            <TrackLink
              href="/showcase-3d"
              eventName="click_home_cta"
              eventPayload={{ cta: "open_3d" }}
              className="rounded-full border border-amber-400/60 px-5 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-400/10"
            >
              {t("try3d")}
            </TrackLink>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs md:text-sm">
            {trustBadgeKeys.map((key) => (
              <li key={key} className="rounded-full bg-white/10 px-3 py-1">
                {t(`trustBadges.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell pt-0">
        <h2 className="section-title">{t("scenarioTitle")}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <TrackLink
              key={scenario.key}
              href={`/shop?scenario=${scenario.key}`}
              eventName="select_scenario"
              eventPayload={{ scenario: scenario.key }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm shadow-zinc-950/5 hover:border-amber-300"
            >
              <h3 className="text-lg font-semibold">{tShop(scenario.key)}</h3>
              <p className="mt-2 text-sm text-zinc-600">{t(scenarioDescKeys[scenario.key])}</p>
            </TrackLink>
          ))}
        </div>
      </section>

      {threeDPicks.length > 0 ? (
        <section className="section-shell pt-0">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title">{t("featured3d")}</h2>
              <p className="section-subtitle">{t("featured3dDescription")}</p>
            </div>
            <Link href="/showcase-3d" className="text-sm font-medium text-amber-700 hover:text-amber-800">
              {t("viewAll3d")}
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {threeDPicks.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-shell pt-0">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">{t("featuredProducts")}</h2>
            <p className="section-subtitle">{t("featuredProductsDescription")}</p>
          </div>
          <TrackLink href="/shop" eventName="view_more_products" className="text-sm font-medium text-amber-700">
            {t("viewAll")}
          </TrackLink>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">{t("contentHub")}</h2>
            <p className="section-subtitle">{t("contentHubDescription")}</p>
          </div>
          <TrackLink href="/content" eventName="enter_content_hub" className="text-sm font-medium text-amber-700">
            {t("viewAllContent")}
          </TrackLink>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

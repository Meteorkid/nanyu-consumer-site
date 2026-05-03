"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { TrackLink } from "@/components/track-link";
import { useTranslations } from "@/lib/locale";

export function BrandPageBody() {
  const t = useTranslations("brand");
  const tCommon = useTranslations("common");

  return (
    <div className="section-shell">
      <Breadcrumb items={[{ href: "/", label: tCommon("home") }, { label: t("title") }]} />
      <h1 className="section-title mt-3">{t("title")}</h1>
      <p className="section-subtitle">{t("description")}</p>

      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-950/5">
        <h2 className="text-xl font-semibold text-zinc-900">{t("positioning")}</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-700">{t("positioningDescription")}</p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5">
          <h3 className="text-lg font-semibold text-zinc-900">{t("culture")}</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-700">{t("cultureDescription")}</p>
        </article>
        <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5">
          <h3 className="text-lg font-semibold text-zinc-900">{t("industry")}</h3>
          <p className="mt-2 text-sm leading-7 text-zinc-700">{t("industryDescription")}</p>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-50">
        <h2 className="text-xl font-semibold">{t("readyToShop")}</h2>
        <p className="mt-2 text-sm text-zinc-300">{t("readyToShopDescription")}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackLink
            href="/shop"
            eventName="brand_to_shop"
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
          >
            {tCommon("shop")}
          </TrackLink>
          <TrackLink
            href="/content"
            eventName="brand_to_content"
            className="rounded-full border border-white/50 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            {tCommon("content")}
          </TrackLink>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { PhotoOrbit3D } from "@/components/photo-orbit-3d";
import { Product3dViewer } from "@/components/product-3d-viewer";
import { TrackLink } from "@/components/track-link";
import { getShowcase3dProducts, productUsesGlbViewer, getProductField } from "@/lib/site-data";
import { useTranslations, useTranslationsArray, useLocale } from "@/lib/locale";

export function ShowcasePageBody() {
  const t = useTranslations("showcase3d");
  const tArr = useTranslationsArray("showcase3d");
  const tCommon = useTranslations("common");
  const { locale } = useLocale();
  const showcase = getShowcase3dProducts();

  return (
    <div className="section-shell">
      <Breadcrumb items={[{ href: "/", label: tCommon("home") }, { label: t("title") }]} />
      <h1 className="section-title mt-3">{t("title")}</h1>
      <p className="section-subtitle">{t("description")}</p>

      <section className="mt-6 grid gap-5 md:grid-cols-3">
        {showcase.map((product) => {
          const name = getProductField(product, "name", locale) as string;
          const tagline = getProductField(product, "tagline", locale) as string;
          return (
          <article
            key={product.slug}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-950/5"
          >
            <h2 className="text-lg font-semibold text-zinc-950">{name}</h2>
            <p className="mt-2 text-sm text-zinc-600">{tagline}</p>

            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
              {productUsesGlbViewer(product) && product.modelGlb ? (
                <Product3dViewer
                  src={product.modelGlb}
                  poster={product.image}
                  alt={`${name} 3D`}
                  className="h-[320px] w-full rounded-xl bg-zinc-950"
                />
              ) : (
                <PhotoOrbit3D src={product.image} alt={name} />
              )}
            </div>

            <TrackLink
              href={`/product/${product.slug}`}
              eventName="jump_from_3d"
              eventPayload={{ product_slug: product.slug }}
              className="mt-4 inline-flex rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
            >
              {t("viewDetail")}
            </TrackLink>
          </article>
        );
        })}
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-950">{t("arRoadmap")}</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-700">
          {tArr("arRoadmapItems").map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

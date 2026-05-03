"use client";

import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { FavoriteButton } from "@/components/favorite-button";
import { PhotoOrbit3D } from "@/components/photo-orbit-3d";
import { Product3dViewer } from "@/components/product-3d-viewer";
import { ProductCard } from "@/components/product-card";
import { TrackLink } from "@/components/track-link";
import {
  categoryLabel,
  getArticlesForProduct,
  getProductField,
  getRelatedProducts,
  meaningLabel,
  productHasInline3d,
  products,
  productUsesGlbViewer,
} from "@/lib/site-data";
import { useTranslations, useLocale } from "@/lib/locale";

export function ProductDetailBody({ slug }: { slug: string }) {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const tShop = useTranslations("shop");
  const { locale } = useLocale();

  const product = products.find((item) => item.slug === slug);
  if (!product) return null;

  const name = getProductField(product, "name", locale) as string;
  const tagline = getProductField(product, "tagline", locale) as string;
  const material = getProductField(product, "material", locale) as string;
  const size = getProductField(product, "size", locale) as string;
  const weight = getProductField(product, "weight", locale) as string;
  const highlights = getProductField(product, "highlights", locale) as string[];

  const inline3d = productHasInline3d(product);
  const useGlb = productUsesGlbViewer(product);
  const related = getRelatedProducts(product.slug, 4);
  const relatedArticles = getArticlesForProduct(product.slug);

  return (
    <div className="section-shell">
      <Breadcrumb
        items={[
          { href: "/", label: tCommon("home") },
          { href: "/shop", label: tCommon("shop") },
          { label: name },
        ]}
      />

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <section className="space-y-4">
          <div className="relative h-80 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <Image
              src={product.image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {product.gallery.map((img) => (
              <div key={img} className="relative h-28 overflow-hidden rounded-xl border border-zinc-200 bg-white">
                <Image src={img} alt={`${name} ${t("gallery")}`} fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 text-xs">
            <p className="font-medium uppercase tracking-wide text-zinc-500">{product.folderId}</p>
            <FavoriteButton slug={product.slug} size="md" />
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-950">{name}</h1>
          <p className="mt-2 text-sm text-zinc-600">{tagline}</p>
          <p className="mt-4 text-3xl font-bold text-zinc-900">¥{product.priceCny}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-700">
              {t("category")}：{tShop(categoryLabel[product.category])}
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-700">
              {t("meaning")}：{tShop(meaningLabel[product.meaning])}
            </span>
            {useGlb ? (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800">{t("3dPreview")}</span>
            ) : null}
          </div>

          <div className="mt-5 grid gap-2 text-sm text-zinc-700">
            <p>{t("material")}：{material}</p>
            <p>{t("size")}：{size}</p>
            <p>{t("weight")}：{weight}</p>
          </div>

          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-zinc-700">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            {inline3d ? (
              <a
                href="#product-3d"
                className="rounded-full border border-amber-600 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50"
              >
                {t("3dPreview")}
              </a>
            ) : (
              <TrackLink
                href="/showcase-3d"
                eventName="open_3d_from_pdp"
                eventPayload={{ product_slug: product.slug }}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700"
              >
                {t("3dPreview")}
              </TrackLink>
            )}
            <TrackLink
              href="/support"
              eventName="start_checkout"
              eventPayload={{ product_slug: product.slug }}
              className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
            >
              {t("buyNow")}
            </TrackLink>
          </div>
        </section>
      </div>

      {inline3d ? (
        <section id="product-3d" className="mt-10 border-t border-zinc-200 pt-10">
          <h2 className="text-lg font-semibold text-zinc-900">{t("3dPreview")}</h2>
          {useGlb && product.modelGlb ? (
            <>
              <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-inner">
                <Product3dViewer
                  src={product.modelGlb}
                  poster={product.image}
                  alt={`${name} 3D`}
                  className="h-[min(52vh,480px)] w-full min-h-[300px] rounded-none bg-zinc-950 md:h-[440px]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-inner">
                <PhotoOrbit3D
                  src={product.image}
                  alt={name}
                  frameClassName="h-[min(52vh,480px)] w-full min-h-[300px] rounded-none md:h-[440px]"
                />
              </div>
            </>
          )}
          <TrackLink
            href="/showcase-3d"
            eventName="open_3d_hub_from_pdp"
            eventPayload={{ product_slug: product.slug }}
            className="mt-4 inline-block text-sm font-medium text-amber-700 hover:text-amber-800"
          >
            {tShop("relatedProducts")} →
          </TrackLink>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold text-zinc-900">{tShop("relatedProducts")}</h2>
            <Link href="/shop" className="text-sm text-amber-700 hover:text-amber-800">
              {tShop("viewDetail")} →
            </Link>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}

      {relatedArticles.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900">{tShop("relatedContent")}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

"use client";

import Image from "next/image";
import { categoryLabel, getProductField, meaningLabel, Product } from "@/lib/site-data";
import { TrackLink } from "@/components/track-link";
import { FavoriteButton } from "@/components/favorite-button";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { useTranslations, useLocale } from "@/lib/locale";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("shop");
  const tProduct = useTranslations("product");
  const { locale } = useLocale();
  const name = getProductField(product, "name", locale) as string;
  const tagline = getProductField(product, "tagline", locale) as string;
  const hasGlb = product.preview3dMode === "glb" && Boolean(product.modelGlb);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5">
      <div className="relative h-52 bg-zinc-100">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute right-2 top-2 flex items-center gap-1">
          {hasGlb ? (
            <span className="rounded-full bg-zinc-900/85 px-2 py-0.5 text-[10px] font-medium text-white">3D</span>
          ) : null}
          <FavoriteButton slug={product.slug} showLabel={false} className="bg-white/95" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-zinc-500">
          <span>{product.folderId}</span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5">{t(categoryLabel[product.category])}</span>
        </div>
        <h3 className="text-lg font-semibold text-zinc-950">{name}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{tagline}</p>
        <p className="text-[11px] text-zinc-500">{tProduct("meaning")}：{t(meaningLabel[product.meaning])}</p>
        <p className="mt-auto text-base font-semibold text-zinc-900">¥{product.priceCny}</p>
        <div className="flex gap-2">
          <TrackLink
            href={`/product/${product.slug}`}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
            eventName="view_product_detail"
            eventPayload={{ product_slug: product.slug }}
          >
            {t("viewDetail")}
          </TrackLink>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}

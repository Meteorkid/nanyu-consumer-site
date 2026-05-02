import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  getRelatedProducts,
  meaningLabel,
  productHasInline3d,
  products,
  productUsesGlbViewer,
} from "@/lib/site-data";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: ProductDetailProps): Promise<Metadata> {
  const { slug } = await props.params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "商品未找到" };
  return {
    title: product.name,
    description: `${product.tagline}｜材质：${product.material}｜寓意：${meaningLabel[product.meaning]}`,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage(props: ProductDetailProps) {
  const { slug } = await props.params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const inline3d = productHasInline3d(product);
  const useGlb = productUsesGlbViewer(product);
  const related = getRelatedProducts(product.slug, 4);
  const relatedArticles = getArticlesForProduct(product.slug);

  return (
    <div className="section-shell">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/shop", label: "去购买" },
          { label: product.name },
        ]}
      />

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <section className="space-y-4">
          <div className="relative h-80 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {product.gallery.map((img) => (
              <div key={img} className="relative h-28 overflow-hidden rounded-xl border border-zinc-200 bg-white">
                <Image src={img} alt={`${product.name} 图集`} fill className="object-cover" sizes="33vw" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 text-xs">
            <p className="font-medium uppercase tracking-wide text-zinc-500">{product.folderId}</p>
            <FavoriteButton slug={product.slug} size="md" />
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-950">{product.name}</h1>
          <p className="mt-2 text-sm text-zinc-600">{product.tagline}</p>
          <p className="mt-4 text-3xl font-bold text-zinc-900">¥{product.priceCny}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-700">
              场景：{categoryLabel[product.category]}
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-zinc-700">
              寓意：{meaningLabel[product.meaning]}
            </span>
            {useGlb ? (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800">3D 可旋转</span>
            ) : null}
          </div>

          <div className="mt-5 grid gap-2 text-sm text-zinc-700">
            <p>材质：{product.material}</p>
            <p>规格：{product.size}</p>
            <p>重量：{product.weight}</p>
          </div>

          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-zinc-700">
            {product.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            {inline3d ? (
              <a
                href="#product-3d"
                className="rounded-full border border-amber-600 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50"
              >
                跳转至页内 3D
              </a>
            ) : (
              <TrackLink
                href="/showcase-3d"
                eventName="open_3d_from_pdp"
                eventPayload={{ product_slug: product.slug }}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700"
              >
                进入3D展示
              </TrackLink>
            )}
            <TrackLink
              href="/support"
              eventName="start_checkout"
              eventPayload={{ product_slug: product.slug }}
              className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
            >
              立即咨询下单
            </TrackLink>
          </div>
        </section>
      </div>

      {inline3d ? (
        <section id="product-3d" className="mt-10 border-t border-zinc-200 pt-10">
          <h2 className="text-lg font-semibold text-zinc-900">3D 预览</h2>
          {useGlb && product.modelGlb ? (
            <>
              <p className="mt-1 max-w-2xl text-sm text-zinc-600">
                页内嵌 <code className="rounded bg-zinc-100 px-1 text-xs">model-viewer</code>，与{" "}
                <code className="rounded bg-zinc-100 px-1 text-xs">{product.modelGlb}</code> 一致。
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-inner">
                <Product3dViewer
                  src={product.modelGlb}
                  poster={product.image}
                  alt={`${product.name} 3D`}
                  className="h-[min(52vh,480px)] w-full min-h-[300px] rounded-none bg-zinc-950 md:h-[440px]"
                />
              </div>
            </>
          ) : (
            <>
              <p className="mt-1 max-w-2xl text-sm text-zinc-600">
                当前为<strong className="font-medium text-zinc-800">主图光影透视预览</strong>
                。正式珠宝 GLB 就绪后，在目录数据中将 <code className="rounded bg-zinc-100 px-1 text-xs">preview3dMode</code> 设为{" "}
                <code className="rounded bg-zinc-100 px-1 text-xs">glb</code> 并填写{" "}
                <code className="rounded bg-zinc-100 px-1 text-xs">modelGlb</code> 即可切换为 model-viewer。
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-inner">
                <PhotoOrbit3D
                  src={product.image}
                  alt={product.name}
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
            在 3D 合集页对比其他款 →
          </TrackLink>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold text-zinc-900">相关推荐</h2>
            <Link href="/shop" className="text-sm text-amber-700 hover:text-amber-800">
              查看全部 →
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
          <h2 className="text-xl font-semibold text-zinc-900">相关内容</h2>
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

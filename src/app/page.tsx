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
  trustBadges,
} from "@/lib/site-data";

const featured = products.slice(0, 6);
const threeDPicks = getShowcase3dProducts();

export default function Home() {
  return (
    <div>
      <StructuredData type="website" />
      <StructuredData type="organization" />

      <section className="section-shell">
        <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-amber-950 p-8 text-white md:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-300">Consumer Portal</p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">做年轻人买得起的好玉</h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-200 md:text-base">
            玉汝于成聚焦东南亚消费市场，通过图文种草、场景选品与 3D 展示，连接中国玉文化与全球年轻用户。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <TrackLink
              href="/shop"
              eventName="click_home_cta"
              eventPayload={{ cta: "shop_now" }}
              className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
            >
              立即选购
            </TrackLink>
            <TrackLink
              href="/content"
              eventName="click_home_cta"
              eventPayload={{ cta: "browse_content" }}
              className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              查看内容
            </TrackLink>
            <TrackLink
              href="/showcase-3d"
              eventName="click_home_cta"
              eventPayload={{ cta: "open_3d" }}
              className="rounded-full border border-amber-400/60 px-5 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-400/10"
            >
              体验 3D 展示
            </TrackLink>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs md:text-sm">
            {trustBadges.map((badge) => (
              <li key={badge} className="rounded-full bg-white/10 px-3 py-1">
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell pt-0">
        <h2 className="section-title">按场景快速选品</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <TrackLink
              key={scenario.key}
              href={`/shop?scenario=${scenario.key}`}
              eventName="select_scenario"
              eventPayload={{ scenario: scenario.key }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm shadow-zinc-950/5 hover:border-amber-300"
            >
              <h3 className="text-lg font-semibold">{scenario.label}</h3>
              <p className="mt-2 text-sm text-zinc-600">查看该场景下的热门款与价格带建议。</p>
            </TrackLink>
          ))}
        </div>
      </section>

      {threeDPicks.length > 0 ? (
        <section className="section-shell pt-0">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title">3D 可旋转款</h2>
              <p className="section-subtitle">
                由实物照片重建的浮雕 GLB，浏览器内直接拖拽查看。后续会逐步替换为高精度三维扫描。
              </p>
            </div>
            <Link href="/showcase-3d" className="text-sm font-medium text-amber-700 hover:text-amber-800">
              进入 3D 合集 →
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
            <h2 className="section-title">精选商品</h2>
            <p className="section-subtitle">素材来自产品分类目录，与详情页、3D 展示联动。</p>
          </div>
          <TrackLink href="/shop" eventName="view_more_products" className="text-sm font-medium text-amber-700">
            查看全部
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
            <h2 className="section-title">内容种草中心</h2>
            <p className="section-subtitle">搭配教程、用户故事、选购指南三条内容线并行，直接带动购买。</p>
          </div>
          <TrackLink href="/content" eventName="enter_content_hub" className="text-sm font-medium text-amber-700">
            查看全部内容
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductCard } from "@/components/product-card";
import {
  articleCategoryLabel,
  articles,
  getProductsBySlugs,
} from "@/lib/site-data";

type ArticleDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: ArticleDetailProps): Promise<Metadata> {
  const { slug } = await props.params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "内容未找到" };
  return {
    title: `${article.title} · ${articleCategoryLabel[article.category]}`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [article.cover],
    },
  };
}

export default async function ArticleDetailPage(props: ArticleDetailProps) {
  const { slug } = await props.params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = getProductsBySlugs(article.relatedProductSlugs);
  const moreArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="section-shell">
      <Breadcrumb
        items={[
          { href: "/", label: "首页" },
          { href: "/content", label: "看内容" },
          { label: article.title },
        ]}
      />

      <article className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative h-56 w-full bg-zinc-100 md:h-72">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 960px"
            priority
          />
        </div>

        {article.grassVideoSrc ? (
          <div className="border-b border-zinc-200 bg-zinc-950 px-4 py-6 md:px-10">
            <p className="mx-auto mb-3 max-w-3xl text-xs font-medium uppercase tracking-wide text-zinc-500">
              种草视频
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
                您的浏览器不支持视频播放，请升级浏览器或下载{" "}
                <a href={article.grassVideoSrc} className="text-amber-400 underline">
                  MP4 文件
                </a>
                。
              </video>
            </div>
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl p-6 md:p-10">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-700">
              {articleCategoryLabel[article.category]}
            </span>
            <span>约 {article.readMinutes} 分钟阅读</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-zinc-950 md:text-3xl">{article.title}</h1>
          <p className="mt-2 text-sm text-zinc-600">{article.summary}</p>

          <div className="mt-6 space-y-4 text-[15px] leading-7 text-zinc-800">
            {article.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold text-zinc-900">本文同款推荐</h2>
            <Link href="/shop" className="text-sm text-amber-700 hover:text-amber-800">
              查看全部商品 →
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
          <h2 className="text-xl font-semibold text-zinc-900">也可以看看</h2>
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

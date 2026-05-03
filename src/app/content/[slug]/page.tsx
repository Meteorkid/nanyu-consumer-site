import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articleCategoryLabel, articles } from "@/lib/site-data";
import { ArticleDetailBody } from "./article-detail-body";

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
  return <ArticleDetailBody article={article} />;
}

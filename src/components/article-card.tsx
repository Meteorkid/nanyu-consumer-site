import Image from "next/image";
import Link from "next/link";
import { Article, articleCategoryLabel } from "@/lib/site-data";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/content/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-950/5 transition-shadow hover:shadow-md"
    >
      <div className="relative h-44 bg-zinc-100">
        <Image
          src={article.cover}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-700">
            {articleCategoryLabel[article.category]}
          </span>
          <span>约 {article.readMinutes} 分钟</span>
        </div>
        <h3 className="text-lg font-semibold text-zinc-950 group-hover:text-amber-700">{article.title}</h3>
        <p className="line-clamp-2 text-sm text-zinc-600">{article.summary}</p>
        <span className="mt-auto text-xs font-medium text-amber-700">阅读全文 →</span>
      </div>
    </Link>
  );
}

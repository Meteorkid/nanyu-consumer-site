import { Fragment, type ReactNode } from "react";
import { products, articles, articleCategoryLabel, type Product, type Article } from "@/lib/site-data";

export type ProductResult = {
  kind: "product";
  product: Product;
  score: number;
};

export type ArticleResult = {
  kind: "article";
  article: Article;
  score: number;
};

export type SearchResult = ProductResult | ArticleResult;

function matchScore(text: string, query: string, weight: number): number {
  if (!text) return 0;
  return text.toLowerCase().includes(query.toLowerCase()) ? weight : 0;
}

export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const productResults: ProductResult[] = products
    .map((p) => {
      const score =
        matchScore(p.name, q, 10) +
        matchScore(p.nameEn ?? "", q, 10) +
        matchScore(p.tagline, q, 5) +
        matchScore(p.taglineEn ?? "", q, 5) +
        matchScore(p.folderId, q, 2) +
        matchScore(p.material, q, 2) +
        matchScore(p.materialEn ?? "", q, 2);
      return { kind: "product" as const, product: p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name, "zh-Hans"))
    .slice(0, 5);

  const articleResults: ArticleResult[] = articles
    .map((a) => {
      const score =
        matchScore(a.title, q, 10) +
        matchScore(a.summary, q, 5) +
        matchScore(articleCategoryLabel[a.category], q, 2);
      return { kind: "article" as const, article: a, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title, "zh-Hans"))
    .slice(0, 3);

  return [...productResults, ...articleResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

export function highlightMatch(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q) return text;

  const lower = text.toLowerCase();
  const lowerQ = q.toLowerCase();
  const idx = lower.indexOf(lowerQ);
  if (idx === -1) return text;

  const parts: ReactNode[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    const matchIdx = lower.indexOf(lowerQ, cursor);
    if (matchIdx === -1) {
      parts.push(text.slice(cursor));
      break;
    }
    if (matchIdx > cursor) {
      parts.push(text.slice(cursor, matchIdx));
    }
    parts.push(
      <mark key={matchIdx} className="rounded-sm bg-amber-100 px-0.5 text-amber-900">
        {text.slice(matchIdx, matchIdx + q.length)}
      </mark>
    );
    cursor = matchIdx + q.length;
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

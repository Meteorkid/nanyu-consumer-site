"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "@/lib/locale";
import { searchAll, highlightMatch, type SearchResult } from "@/lib/search";
import { articleCategoryLabel, getProductField } from "@/lib/site-data";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const t = useTranslations("common");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // 自动聚焦
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
    }
  }, [open]);

  // 锁定 body 滚动
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // 全局 Escape 键
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // 防抖搜索
  const handleChange = useCallback((value: string) => {
    setQuery(value);
    setActiveIndex(-1);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setResults(searchAll(value));
    }, 150);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < results.length) {
        // 跳转由 Link 处理，这里关闭 overlay
        onClose();
      } else if (query.trim()) {
        window.location.href = `/shop?q=${encodeURIComponent(query.trim())}`;
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    }
  };

  if (!open) return null;

  const trimmedQuery = query.trim();

  return (
    <div role="dialog" aria-modal="true" aria-label={t("search")}>
      {/* 遮罩 */}
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />

      {/* 搜索面板 */}
      <div className="fixed inset-x-0 top-[10vh] z-50 mx-auto max-w-2xl px-4">
        {/* 搜索框 */}
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-2xl">
          <svg className="h-5 w-5 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label={t("search")}
            aria-autocomplete="list"
            className="flex-1 bg-transparent text-base outline-none"
          />
          {query && (
            <button
              onClick={() => handleChange("")}
              className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
              aria-label={t("close")}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <kbd className="hidden shrink-0 rounded border border-zinc-200 px-1.5 py-0.5 text-xs text-zinc-400 sm:inline">ESC</kbd>
        </div>

        {/* 结果列表 */}
        {trimmedQuery && (
          <div className="mt-2 max-h-[60vh] overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl">
            {results.length > 0 ? (
              <div role="listbox" className="py-2">
                {results.map((result, index) => (
                  <SearchResultItem
                    key={result.kind === "product" ? result.product.slug : result.article.slug}
                    result={result}
                    query={trimmedQuery}
                    active={index === activeIndex}
                    onClose={onClose}
                  />
                ))}
                <Link
                  href={`/shop?q=${encodeURIComponent(trimmedQuery)}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-1 border-t border-zinc-100 px-4 py-3 text-sm font-medium text-amber-700 hover:bg-amber-50"
                >
                  {t("viewAllResults")}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm font-medium text-zinc-900">{t("noResults")}</p>
                <p className="mt-1 text-xs text-zinc-500">{t("noResultsDescription")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchResultItem({
  result,
  query,
  active,
  onClose,
}: {
  result: SearchResult;
  query: string;
  active: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("common");
  const tContent = useTranslations("content");
  const { locale } = useLocale();

  if (result.kind === "product") {
    const { product } = result;
    const name = getProductField(product, "name", locale) as string;
    const tagline = getProductField(product, "tagline", locale) as string;
    return (
      <Link
        href={`/product/${product.slug}`}
        onClick={onClose}
        role="option"
        aria-selected={active}
        className={`flex items-center gap-3 px-4 py-3 transition-colors ${active ? "bg-amber-50" : "hover:bg-zinc-50"}`}
      >
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
          <Image src={product.image} alt={name} fill className="object-cover" sizes="48px" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-900">
            {highlightMatch(name, query)}
          </p>
          <p className="truncate text-xs text-zinc-500">
            {highlightMatch(tagline, query)}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-zinc-900">¥{product.priceCny}</p>
          <p className="text-xs text-amber-700">{t("productBadge")}</p>
        </div>
      </Link>
    );
  }

  const { article } = result;
  return (
    <Link
      href={`/content/${article.slug}`}
      onClick={onClose}
      role="option"
      aria-selected={active}
      className={`flex items-center gap-3 px-4 py-3 transition-colors ${active ? "bg-amber-50" : "hover:bg-zinc-50"}`}
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
        <Image src={article.cover} alt={article.title} fill className="object-cover" sizes="48px" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900">
          {highlightMatch(article.title, query)}
        </p>
        <p className="text-xs text-zinc-500">
          {tContent(articleCategoryLabel[article.category])} · {article.readMinutes} {tContent("readMinutes")}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
        {t("articleBadge")}
      </span>
    </Link>
  );
}

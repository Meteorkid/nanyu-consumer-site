"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems, articleCategoryLabel, getProductField } from "@/lib/site-data";
import { useTranslations, useTranslationsArray, useLocale } from "@/lib/locale";
import { searchAll, highlightMatch, type SearchResult } from "@/lib/search";

export function MobileMenu() {
  const t = useTranslations("common");
  const tContent = useTranslations("content");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // 关闭菜单当屏幕大小改变
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 防止背景滚动当菜单打开
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 打开时重置搜索
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setResults([]);
    }
  }, [isOpen]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setResults(searchAll(value));
    }, 150);
  }, []);

  const handleResultClick = () => {
    setIsOpen(false);
  };

  const trimmedQuery = searchQuery.trim();

  return (
    <div className="md:hidden">
      {/* 汉堡菜单按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex h-10 w-10 items-center justify-center"
        aria-label={isOpen ? t("closeMenu") : t("openMenu")}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col items-center justify-center gap-1.5">
          <span
            className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {/* 菜单覆盖层 */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* 菜单内容 */}
      <nav
        className={`fixed right-0 top-0 z-40 h-full w-80 bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label={t("mobileNav")}
      >
        <div className="flex h-full flex-col p-6">
          {/* 菜单头部 */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-lg font-semibold text-zinc-900">{t("menu")}</span>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-100"
              aria-label={t("closeMenu")}
            >
              <svg
                className="h-5 w-5 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 搜索框 */}
          <div className="mb-4">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5">
              <svg className="h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="flex h-5 w-5 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-600"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* 搜索结果 */}
            {trimmedQuery && (
              <div className="mt-2 max-h-60 overflow-y-auto rounded-xl border border-zinc-200 bg-white">
                {results.length > 0 ? (
                  <div className="py-1">
                    {results.map((result) => (
                      <MobileSearchResult key={result.kind === "product" ? result.product.slug : result.article.slug} result={result} query={trimmedQuery} onClick={handleResultClick} />
                    ))}
                    <Link
                      href={`/shop?q=${encodeURIComponent(trimmedQuery)}`}
                      onClick={handleResultClick}
                      className="flex items-center justify-center gap-1 border-t border-zinc-100 px-3 py-2.5 text-xs font-medium text-amber-700 hover:bg-amber-50"
                    >
                      {t("viewAllResults")}
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-xs font-medium text-zinc-900">{t("noResults")}</p>
                    <p className="mt-0.5 text-xs text-zinc-500">{t("noResultsDescription")}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 导航链接 */}
          <ul className="flex-1 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100 hover:text-amber-700"
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>

          {/* 菜单底部 */}
          <div className="border-t border-zinc-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">{t("language")}</span>
              <div className="flex gap-2">
                <button className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                  {t("chinese")}
                </button>
                <button className="rounded-full px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-100">
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

function MobileSearchResult({
  result,
  query,
  onClick,
}: {
  result: SearchResult;
  query: string;
  onClick: () => void;
}) {
  const t = useTranslations("common");
  const tContent = useTranslations("content");
  const { locale } = useLocale();

  if (result.kind === "product") {
    const { product } = result;
    const name = getProductField(product, "name", locale) as string;
    return (
      <Link
        href={`/product/${product.slug}`}
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-50"
      >
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
          <Image src={product.image} alt={name} fill className="object-cover" sizes="40px" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-900">
            {highlightMatch(name, query)}
          </p>
          <p className="text-xs text-zinc-500">¥{product.priceCny}</p>
        </div>
      </Link>
    );
  }

  const { article } = result;
  return (
    <Link
      href={`/content/${article.slug}`}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 hover:bg-zinc-50"
    >
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
        <Image src={article.cover} alt={article.title} fill className="object-cover" sizes="40px" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-900">
          {highlightMatch(article.title, query)}
        </p>
        <p className="text-xs text-zinc-500">{tContent(articleCategoryLabel[article.category])}</p>
      </div>
      <span className="shrink-0 rounded-full bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">
        {t("articleBadge")}
      </span>
    </Link>
  );
}

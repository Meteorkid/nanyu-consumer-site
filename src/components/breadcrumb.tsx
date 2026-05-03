"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/locale";

export type BreadcrumbItem = {
  href?: string;
  label: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations("common");

  return (
    <nav aria-label={t("breadcrumb")} className="text-xs text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, idx) => {
          const last = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-amber-700">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "text-zinc-800" : ""}>{item.label}</span>
              )}
              {last ? null : <span className="text-zinc-300">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

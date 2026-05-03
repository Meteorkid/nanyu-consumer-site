"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/locale";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tCommon = useTranslations("common");

  return (
    <div className="section-shell">
      <div className="mx-auto max-w-xl rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-amber-700">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-950">{t("title")}</h1>
        <p className="mt-3 text-sm text-zinc-600">{t("description")}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/shop"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 hover:border-amber-400 hover:text-amber-700"
          >
            {t("shop")}
            <span className="mt-1 block text-xs text-zinc-500">{t("shopDesc")}</span>
          </Link>
          <Link
            href="/content"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 hover:border-amber-400 hover:text-amber-700"
          >
            {t("content")}
            <span className="mt-1 block text-xs text-zinc-500">{t("contentDesc")}</span>
          </Link>
          <Link
            href="/showcase-3d"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 hover:border-amber-400 hover:text-amber-700"
          >
            {t("showcase3d")}
            <span className="mt-1 block text-xs text-zinc-500">{t("showcase3dDesc")}</span>
          </Link>
          <Link
            href="/support"
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-800 hover:border-amber-400 hover:text-amber-700"
          >
            {t("support")}
            <span className="mt-1 block text-xs text-zinc-500">{t("supportDesc")}</span>
          </Link>
        </div>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
        >
          {tCommon("backToHome")}
        </Link>
      </div>
    </div>
  );
}

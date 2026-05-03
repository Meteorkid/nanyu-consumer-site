"use client";

import { useTranslations } from "@/lib/locale";

export function SiteFooter() {
  const t = useTranslations("common");

  return (
    <footer className="mt-16 border-t border-zinc-800 bg-zinc-950 text-zinc-50">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="font-semibold">{t("brandName")}</h3>
          <p className="mt-2 text-sm text-zinc-300">{t("footerBrandDescription")}</p>
        </div>
        <div>
          <h3 className="font-semibold">{t("footerServices")}</h3>
          <ul className="mt-2 space-y-1 text-sm text-zinc-300">
            <li>{t("footerReturn7")}</li>
            <li>{t("footerExchange15")}</li>
            <li>{t("footerShipping")}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">{t("footerContact")}</h3>
          <ul className="mt-2 space-y-1 text-sm text-zinc-300">
            <li>{t("footerEmail")}</li>
            <li>{t("footerWechat")}</li>
            <li>{t("footerHours")}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

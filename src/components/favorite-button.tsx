"use client";

import { useFavorites, useHydrated } from "@/lib/use-favorites";
import { trackEvent } from "@/lib/tracking";
import { useTranslations } from "@/lib/locale";

type FavoriteButtonProps = {
  slug: string;
  size?: "sm" | "md";
  className?: string;
  showLabel?: boolean;
};

/** 收藏切换按钮：通过 localStorage + CustomEvent 同步多处 UI。 */
export function FavoriteButton({ slug, size = "sm", className = "", showLabel = true }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites();
  const hydrated = useHydrated();
  const t = useTranslations("common");
  const active = hydrated && isFavorite(slug);

  const base =
    "inline-flex items-center gap-1 rounded-full border transition-colors select-none";
  const sizing = size === "md" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  const tone = active
    ? "border-amber-600 bg-amber-50 text-amber-700"
    : "border-zinc-300 bg-white text-zinc-600 hover:border-amber-500 hover:text-amber-700";

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? t("removeFromFavorites") : t("addToFavorites")}
      onClick={() => {
        toggle(slug);
        trackEvent("toggle_favorite", { product_slug: slug, state: active ? "off" : "on" });
      }}
      className={`${base} ${sizing} ${tone} ${className}`}
    >
      <span aria-hidden className={active ? "text-amber-600" : ""}>
        {active ? "★" : "☆"}
      </span>
      {showLabel ? <span>{active ? t("favorited") : t("favorites")}</span> : null}
    </button>
  );
}

"use client";

import { createElement, useEffect, useState } from "react";
import { useTranslations } from "@/lib/locale";

type Product3dViewerProps = {
  src: string;
  poster: string;
  alt: string;
  /** 默认 `h-[280px]`；详情页可传入更大高度类名 */
  className?: string;
};

const defaultFrame = "h-[280px] w-full rounded-xl bg-zinc-950";

/**
 * Loads @google/model-viewer on the client and renders an interactive GLB.
 * Poster uses the product photo until high-res textures / mesh ship.
 */
export function Product3dViewer({ src, poster, alt, className }: Product3dViewerProps) {
  const t = useTranslations("product");
  const frame = className?.trim() ? className : defaultFrame;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void import("@google/model-viewer").then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className={`flex items-center justify-center text-sm text-zinc-500 ${frame}`} aria-busy>
        {t("loading3d")}
      </div>
    );
  }

  return createElement("model-viewer", {
    src,
    poster,
    alt,
    "camera-controls": true,
    "touch-action": "pan-y",
    exposure: "1.05",
    "shadow-intensity": "0.85",
    "interaction-prompt": "auto",
    className: frame,
  });
}

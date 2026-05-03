"use client";

import { useState } from "react";
import { useCartActions } from "@/lib/cart";
import type { Product } from "@/lib/site-data";
import { useTranslations } from "@/lib/locale";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCartActions();
  const t = useTranslations("shop");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className="inline-flex items-center justify-center rounded-full border border-amber-600 px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50 disabled:opacity-60"
      disabled={added}
    >
      {added ? t("added") : t("addToCart")}
    </button>
  );
}

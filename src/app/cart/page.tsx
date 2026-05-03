"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/lib/locale";
import { useCart, useCartActions } from "@/lib/cart";

export default function CartPage() {
  const t = useTranslations("cart");
  const { state } = useCart();
  const { updateQuantity, removeItem, clearCart } = useCartActions();

  if (state.items.length === 0) {
    return (
      <div className="section-shell">
        <h1 className="section-title">{t("title")}</h1>
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-12 text-center">
          <svg
            className="h-16 w-16 text-zinc-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-zinc-900">{t("empty")}</h2>
          <p className="mt-2 text-sm text-zinc-600">{t("emptyDescription")}</p>
          <Link
            href="/shop"
            className="mt-6 rounded-full bg-amber-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-700"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-shell">
      <div className="flex items-center justify-between">
        <h1 className="section-title">
          {t("title")} ({state.itemCount} {t("itemCount")})
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-700"
        >
          {t("clearCart")}
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {state.items.map((item) => (
            <div
              key={item.slug}
              className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.slug}`}
                    className="font-semibold text-zinc-900 hover:text-amber-700"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-lg font-semibold text-zinc-900">
                    ¥{item.price}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      aria-label="减少数量"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      aria-label="增加数量"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.slug)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    {t("remove")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">{t("title")}</h2>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm text-zinc-600">
              <span>{t("subtotal")}</span>
              <span>¥{state.total.toFixed(2)}</span>
            </div>
            <div className="border-t border-zinc-200 pt-3">
              <div className="flex justify-between text-lg font-semibold text-zinc-900">
                <span>{t("total")}</span>
                <span>¥{state.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-amber-600 py-3 text-center text-sm font-medium text-white hover:bg-amber-700"
          >
            {t("checkout")}
          </Link>

          <Link
            href="/shop"
            className="mt-3 block text-center text-sm text-amber-700 hover:text-amber-800"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    </div>
  );
}

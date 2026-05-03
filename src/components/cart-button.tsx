"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export function CartButton() {
  const { state } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:bg-zinc-200"
      aria-label={`购物车，${state.itemCount} 件商品`}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
        />
      </svg>
      <span className="hidden sm:inline">购物车</span>
      {state.itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-medium text-white">
          {state.itemCount > 99 ? "99+" : state.itemCount}
        </span>
      )}
    </Link>
  );
}

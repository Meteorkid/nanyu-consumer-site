"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "yrc:favorites";
const EVENT = "yrc:favorites-changed";

/** 空收藏列表的稳定引用：getServerSnapshot / getSnapshot 必须避免每次 `return []` 新建数组，否则会触发 React 无限循环警告 */
const EMPTY_FAVORITES: string[] = [];

function readStore(): string[] {
  if (typeof window === "undefined") return EMPTY_FAVORITES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_FAVORITES;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY_FAVORITES;
    const list = parsed.filter((x): x is string => typeof x === "string");
    return list.length === 0 ? EMPTY_FAVORITES : list;
  } catch {
    return EMPTY_FAVORITES;
  }
}

function writeStore(next: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* quota / privacy mode: silently drop */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => onChange();
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", storageHandler);
  };
}

let cachedSignature = "";
let cachedSnapshot: string[] = EMPTY_FAVORITES;

function getSnapshot(): string[] {
  const fresh = readStore();
  const sig = fresh.join("|");
  if (sig !== cachedSignature) {
    cachedSignature = sig;
    cachedSnapshot = fresh;
  }
  return cachedSnapshot;
}

function getServerSnapshot(): string[] {
  return EMPTY_FAVORITES;
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    const current = readStore();
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    writeStore(next);
  }, []);

  const clear = useCallback(() => {
    writeStore([]);
  }, []);

  return {
    favorites,
    count: favorites.length,
    isFavorite: (slug: string) => favorites.includes(slug),
    toggle,
    clear,
  };
}

/** 简单 hook：仅用于标记客户端已 hydrate，避免 SSR / CSR 不一致 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

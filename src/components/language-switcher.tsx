"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/lib/locale";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const label = locale === "zh" ? "中文" : "English";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-amber-300 hover:text-amber-700"
        aria-label="切换语言"
      >
        {label}
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[100px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
          <button
            onClick={() => { setLocale("zh"); setOpen(false); }}
            className={`block w-full px-4 py-2 text-left text-sm hover:bg-zinc-50 ${
              locale === "zh" ? "bg-amber-50 font-medium text-amber-700" : "text-zinc-700"
            }`}
          >
            中文
          </button>
          <button
            onClick={() => { setLocale("en"); setOpen(false); }}
            className={`block w-full px-4 py-2 text-left text-sm hover:bg-zinc-50 ${
              locale === "en" ? "bg-amber-50 font-medium text-amber-700" : "text-zinc-700"
            }`}
          >
            English
          </button>
        </div>
      ) : null}
    </div>
  );
}

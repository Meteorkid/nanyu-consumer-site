"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navItems } from "@/lib/site-data";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // 关闭菜单当屏幕大小改变
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 防止背景滚动当菜单打开
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* 汉堡菜单按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex h-10 w-10 items-center justify-center"
        aria-label={isOpen ? "关闭菜单" : "打开菜单"}
        aria-expanded={isOpen}
      >
        <div className="flex flex-col items-center justify-center gap-1.5">
          <span
            className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-300 ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-zinc-900 transition-all duration-300 ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </div>
      </button>

      {/* 菜单覆盖层 */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* 菜单内容 */}
      <nav
        className={`fixed right-0 top-0 z-40 h-full w-80 bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="移动端导航菜单"
      >
        <div className="flex h-full flex-col p-6">
          {/* 菜单头部 */}
          <div className="mb-8 flex items-center justify-between">
            <span className="text-lg font-semibold text-zinc-900">菜单</span>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-100"
              aria-label="关闭菜单"
            >
              <svg
                className="h-5 w-5 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* 导航链接 */}
          <ul className="flex-1 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-100 hover:text-amber-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* 菜单底部 */}
          <div className="border-t border-zinc-200 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-600">语言</span>
              <div className="flex gap-2">
                <button className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                  中文
                </button>
                <button className="rounded-full px-3 py-1 text-sm text-zinc-600 hover:bg-zinc-100">
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

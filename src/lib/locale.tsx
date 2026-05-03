"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import zhMessages from "../../messages/zh.json";
import enMessages from "../../messages/en.json";

type Messages = typeof zhMessages;
type Locale = "zh" | "en";

const messagesMap: Record<Locale, Messages> = {
  zh: zhMessages,
  en: enMessages,
};

const LOCALE_COOKIE_KEY = "locale";

const LocaleContext = createContext<{
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
} | null>(null);

function getCookieLocale(): Locale {
  if (typeof document === "undefined") return "zh";
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE_KEY}=([^;]*)`));
  if (match && (match[1] === "zh" || match[1] === "en")) {
    return match[1];
  }
  return "zh";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getCookieLocale();
    setLocaleState(saved);
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `${LOCALE_COOKIE_KEY}=${newLocale};path=/;max-age=31536000`;
  };

  const messages = messagesMap[locale];

  return (
    <LocaleContext.Provider value={{ locale, messages, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

/**
 * 获取翻译文本的 hook
 * 支持嵌套 key，如 "common.shop"
 */
export function useTranslations(namespace?: string) {
  const { messages, locale } = useLocale();

  return (key: string, values?: Record<string, string | number>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const keys = fullKey.split(".");
    let result: unknown = messages;

    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return fullKey;
      }
    }

    if (typeof result !== "string") {
      return fullKey;
    }

    if (values) {
      return Object.entries(values).reduce(
        (str, [k, v]) => str.replace(`{${k}}`, String(v)),
        result
      );
    }

    return result;
  };
}

/**
 * 服务端组件使用的静态翻译函数
 * 始终返回中文（静态导出默认语言）
 */
export function getStaticTranslation(namespace?: string) {
  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const keys = fullKey.split(".");
    let result: unknown = zhMessages;

    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return fullKey;
      }
    }

    return typeof result === "string" ? result : fullKey;
  };
}

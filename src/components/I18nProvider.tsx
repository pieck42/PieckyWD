"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import {
  messagesByLocale,
  type Locale,
  type Messages,
} from "@/i18n";

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

// 通过"点路径"字符串（如 "home.title"）从嵌套对象中取值
function getMessageByPath(messages: Messages, key: string): string {
  const result = key
    .split(".")
    .reduce<unknown>((acc, currentKey) => {
      if (acc && typeof acc === "object" && currentKey in acc) {
        return (acc as Record<string, unknown>)[currentKey];
      }
      return undefined;
    }, messages);

  return typeof result === "string" ? result : key;
}

// locale 由父级 [locale]/layout.tsx 从 URL 参数传入，不再依赖 localStorage
export default function I18nProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  // 语言切换时同步更新 <html lang> 属性
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  const value = useMemo(() => {
    const messages = messagesByLocale[locale];
    return {
      locale,
      messages,
      t: (key: string) => getMessageByPath(messages, key),
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider.");
  }
  return context;
}

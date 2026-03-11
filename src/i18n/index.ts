import headerEn from "@/i18n/header/en.json";
import headerZh from "@/i18n/header/zh.json";
import homeEn from "@/i18n/home/en.json";
import homeZh from "@/i18n/home/zh.json";
import aboutEn from "@/i18n/about/en.json";
import aboutZh from "@/i18n/about/zh.json";
import footerEn from "@/i18n/footer/en.json";
import footerZh from "@/i18n/footer/zh.json";
import markdownViewerEn from "@/i18n/markdownViewer/en.json";
import markdownViewerZh from "@/i18n/markdownViewer/zh.json";

export const messagesByLocale = {
  zh: {
    header: headerZh,
    home: homeZh,
    about: aboutZh,
    footer: footerZh,
    markdownViewer: markdownViewerZh,
  },
  en: {
    header: headerEn,
    home: homeEn,
    about: aboutEn,
    footer: footerEn,
    markdownViewer: markdownViewerEn,
  },
} as const;

export type Locale = keyof typeof messagesByLocale;
export type Messages = (typeof messagesByLocale)[Locale];

export const defaultLocale: Locale = "zh";

export const localeLabels: Record<Locale, string> = {
  zh: "中文",
  en: "English",
};

export const localeStorageKey = "pieckywd-locale";

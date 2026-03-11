"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import type { Locale } from "@/i18n";

export default function Footer() {
  const { locale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // 把当前路径的语言前缀换掉，生成目标语言的路径
  function buildLocalePath(targetLocale: Locale): string {
    const withoutLocale = pathname.replace(/^\/(zh|en)/, "");
    return `/${targetLocale}${withoutLocale}`;
  }

  function switchLocale(targetLocale: Locale) {
    router.push(buildLocalePath(targetLocale));
    setIsOpen(false);
  }

  const localeLabel =
    locale === "zh" ? t("footer.languageOptionZh") : t("footer.languageOptionEn");

  const localeOptions: Locale[] = ["en", "zh"];

  return (
    <footer className="border-t border-[var(--color-border)] py-6">
      <div className="mx-auto flex w-2/3 items-center justify-between gap-8 px-4 sm:px-6">
        <nav className="flex items-center gap-8">
          <Link
            href={`/${locale}/devlog`}
            className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
          >
            {t("footer.devlog")}
          </Link>
          <Link
            href={`/${locale}/thoughts`}
            className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
          >
            {t("footer.thoughts")}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
          >
            {t("footer.about")}
          </Link>
        </nav>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3 py-2 text-sm text-[var(--color-text)]"
            aria-label={t("footer.languageLabel")}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            <span>{localeLabel}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {isOpen ? (
            <div
              className="absolute bottom-full right-0 z-10 mb-2 min-w-36 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-2 shadow-lg"
              role="listbox"
              aria-label={t("footer.languageLabel")}
            >
              {localeOptions.map((optionLocale) => {
                const label =
                  optionLocale === "zh"
                    ? t("footer.languageOptionZh")
                    : t("footer.languageOptionEn");
                const selected = optionLocale === locale;

                return (
                  <button
                    key={optionLocale}
                    type="button"
                    onClick={() => switchLocale(optionLocale)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${
                      selected
                        ? "bg-emerald-600 text-white"
                        : "text-[var(--color-text)] hover:bg-[var(--color-bg-soft)]"
                    }`}
                    role="option"
                    aria-selected={selected}
                  >
                    <span>{label}</span>
                    {selected ? (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

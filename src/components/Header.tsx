"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export default function Header() {
  const { locale, t } = useI18n();

  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="mx-auto w-2/3 px-4 py-5 sm:px-6">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-[var(--color-text)] hover:opacity-70 transition-opacity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
          >
            <path
              d="M3 8 C5 18, 8 4, 11 13 C14 20, 17 7, 21 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t("header.brand")}
        </Link>
      </div>
    </header>
  );
}

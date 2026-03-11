"use client";

import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";

export default function Header() {
  const { locale, t } = useI18n();

  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="mx-auto w-2/3 px-4 py-5 sm:px-6">
        {/* 点击品牌名回到当前语言的首页 */}
        <Link
          href={`/${locale}`}
          className="text-lg font-bold tracking-tight text-[var(--color-text)] hover:opacity-70 transition-opacity"
        >
          {t("header.brand")}
        </Link>
      </div>
    </header>
  );
}

"use client";

import { useI18n } from "@/components/I18nProvider";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
      <p className="text-3xl font-bold tracking-tight text-[var(--color-text)]">
        {t("home.title")}
      </p>
      <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
        {t("home.line1")}
      </p>
    </main>
  );
}

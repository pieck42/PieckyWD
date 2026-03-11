"use client";

import { useI18n } from "@/components/I18nProvider";

const TELEGRAM_URL = "https://t.me/ghosting42";
const GITHUB_URL = "https://github.com/pieck42/PieckyWD";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto w-2/3 px-4 py-20 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight">{t("about.title")}</h1>
      <p className="mt-4 text-[var(--color-text-secondary)]">
        {t("about.description")}
      </p>

      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">
          {t("about.projectTitle")}
        </h2>
        <p className="mt-3 text-[var(--color-text-secondary)]">
          {t("about.projectLabel")}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-text)] underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            github.com/pieck42/PieckyWD
          </a>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">
          {t("about.contactTitle")}
        </h2>
        <p className="mt-3 text-[var(--color-text-secondary)]">
          {t("about.telegramLabel")}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-text)] underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            @ghosting42
          </a>
        </p>
      </section>
    </main>
  );
}

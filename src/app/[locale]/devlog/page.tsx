"use client";

import { useI18n } from "@/components/I18nProvider";
import MarkdownViewer from "@/components/MarkdownViewer";

export default function DevlogPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto w-2/3 px-4 py-20 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight">{t("devlog.title")}</h1>
      <div className="mt-8">
        <MarkdownViewer src="/devlog/v0.1.0.md" />
      </div>
    </main>
  );
}

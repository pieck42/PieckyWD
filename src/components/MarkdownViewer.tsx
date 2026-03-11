"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";
import { useI18n } from "@/components/I18nProvider";

// 通用 Markdown 渲染组件
// src：public/ 下的 .md 文件路径
export default function MarkdownViewer({ src }: { src: string }) {
  const { t } = useI18n();
  const [html, setHtml] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.text();
      })
      .then((text) => marked(text))
      .then((result) => setHtml(result as string))
      .catch(() => setError(true));
  }, [src]);

  if (error) {
    return (
      <p className="text-[var(--color-text-secondary)]">
        {t("markdownViewer.error")}
      </p>
    );
  }

  if (!html) {
    return (
      <p className="text-[var(--color-text-secondary)] animate-pulse">
        {t("markdownViewer.loading")}
      </p>
    );
  }

  return (
    <article
      className="prose-custom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

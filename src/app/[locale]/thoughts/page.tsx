"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";

interface ThoughtEntry {
  content: string;
  date: string;
}

// 解析 YYMMDD 格式为可读日期，如 260311 → 2026-03-11
function formatDate(raw: string): string {
  const yy = raw.slice(0, 2);
  const mm = raw.slice(2, 4);
  const dd = raw.slice(4, 6);
  return `20${yy}-${mm}-${dd}`;
}

// 把 thoughts.md 拆成一条条想法
// 规则：跳过标题行（# 开头），每个段落以空行分隔，末尾 6 位数字为日期
function parseThoughts(text: string): ThoughtEntry[] {
  const lines = text.split("\n");
  const entries: ThoughtEntry[] = [];
  let current = "";

  for (const line of lines) {
    if (line.startsWith("# ")) continue;

    if (line.trim() === "") {
      if (current.trim()) {
        entries.push(extractEntry(current.trim()));
        current = "";
      }
      continue;
    }
    current += (current ? "\n" : "") + line;
  }

  if (current.trim()) {
    entries.push(extractEntry(current.trim()));
  }

  return entries.reverse();
}

function extractEntry(text: string): ThoughtEntry {
  const dateMatch = text.match(/\s(\d{6})$/);
  if (dateMatch) {
    return {
      content: text.slice(0, dateMatch.index!).trim(),
      date: formatDate(dateMatch[1]),
    };
  }
  return { content: text, date: "" };
}

export default function ThoughtsPage() {
  const { t } = useI18n();
  const [entries, setEntries] = useState<ThoughtEntry[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/thoughts/thoughts.md")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.text();
      })
      .then((text) => setEntries(parseThoughts(text)))
      .catch(() => setError(true));
  }, []);

  return (
    <main className="mx-auto w-2/3 px-4 py-20 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight">
        {t("thoughts.title")}
      </h1>

      {error && (
        <p className="mt-8 text-[var(--color-text-secondary)]">
          {t("markdownViewer.error")}
        </p>
      )}

      <div className="mt-8 space-y-6">
        {entries.map((entry, i) => (
          <article
            key={i}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5"
          >
            <p className="text-[var(--color-text)] leading-relaxed">
              {entry.content}
            </p>
            {entry.date && (
              <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
                {entry.date}
              </p>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}

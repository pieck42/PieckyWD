"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale, localeStorageKey } from "@/i18n";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(localeStorageKey)
        : null;
    const locale = stored === "en" ? "en" : defaultLocale;
    router.replace(`/${locale}`);
  }, [router]);

  return null;
}

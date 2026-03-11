import Header from "@/components/Header";
import Footer from "@/components/Footer";
import I18nProvider from "@/components/I18nProvider";
import { defaultLocale, type Locale } from "@/i18n";

// 告诉 Next.js 这两个语言路径在构建时静态生成
export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = localeParam === "en" ? "en" : defaultLocale;

  return (
    <I18nProvider locale={locale}>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </I18nProvider>
  );
}

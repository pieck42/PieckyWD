import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["zh", "en"] as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 已有语言前缀的路径，直接放行
  const hasLocale = LOCALES.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  // 裸路径重定向到 /zh 前缀（默认语言）
  const url = request.nextUrl.clone();
  url.pathname = `/zh${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // 排除 API 路由、Next.js 内部路径、静态资源
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

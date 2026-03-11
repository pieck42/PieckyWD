import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PieckyWD",
  description: "Piecky is coming...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col antialiased">
        {children}
      </body>
    </html>
  );
}

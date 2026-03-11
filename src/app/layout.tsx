import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PieckyWD",
  description: "Piecky is coming...",
  icons: {
    icon: [
      { url: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
    ],
  },
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

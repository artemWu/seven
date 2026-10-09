import type { Metadata, Viewport } from "next";
import "./globals.css";
import CookiePopup from "@/components/CookiePopup";

export const metadata: Metadata = {
  title: "Seven",
  description: "Starter project for 7barbershop.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: { title: "Seven", description: "Starter project for 7barbershop.", type: "website" },
  twitter: { card: "summary", title: "Seven", description: "Starter project for 7barbershop." },
  other: {
    "codex-preview": "development",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "transparent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <script
        dangerouslySetInnerHTML={{
          __html: `(() => { const ua = navigator.userAgent; const safari = /Safari/i.test(ua) && !/Chrome|CriOS|Android/i.test(ua); document.documentElement.classList.add(safari ? "is-safari" : "is-chrome-like"); })();`,
        }}
      />
      <body className="antialiased">
        {children}
        <CookiePopup />
      </body>
    </html>
  );
}

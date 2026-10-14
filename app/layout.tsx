import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import CookiePopup from "@/components/CookiePopup";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Барбершоп Семь в Москве, м. Сокол, Преображенская, Варшавская",
  description:
    "Записаться онлайн или по телефону в мужскую парикмахерскую в Москве. В барбершопе VII сделать модную мужскую стрижку у лучших мастеров!",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Барбершоп Семь в Москве, м. Сокол, Преображенская, Варшавская",
    description:
      "Записаться онлайн или по телефону в мужскую парикмахерскую в Москве. В барбершопе VII сделать модную мужскую стрижку у лучших мастеров!",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Барбершоп СЕМЬ Тони Селезнёва" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Барбершоп Семь в Москве, м. Сокол, Преображенская, Варшавская",
    description:
      "Записаться онлайн или по телефону в мужскую парикмахерскую в Москве. В барбершопе VII сделать модную мужскую стрижку у лучших мастеров!",
    images: ["/og-image.png"],
  },
  other: {
    "codex-preview": "development",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#202024",
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
      <body className={`${montserrat.variable} antialiased`}>
        {children}
        <CookiePopup />
      </body>
    </html>
  );
}

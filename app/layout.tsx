import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CookiePopup from "@/components/CookiePopup";
import YandexMetrika from "@/components/YandexMetrika";

const montserrat = localFont({
  src: "../public/fonts/montserrat-cyrillic.woff2",
  display: "swap",
  variable: "--font-montserrat",
  weight: "300 700",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.7barbershop.ru"),
  alternates: { canonical: "/" },
  title: "Барбершоп Семь в Москве, м. Сокол, Преображенская, Варшавская",
  description:
    "Записаться онлайн или по телефону в мужскую парикмахерскую в Москве. В барбершопе VII сделать модную мужскую стрижку у лучших мастеров!",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    url: "https://www.7barbershop.ru/",
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
  robots: process.env.SITE_TARGET === "github-pages"
    ? { index: false, follow: false }
    : { index: true, follow: true },
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
        <YandexMetrika />
      </body>
    </html>
  );
}

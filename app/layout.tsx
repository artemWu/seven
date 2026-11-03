import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = localFont({
  src: "../public/fonts/Montserrat-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-montserrat",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.7barbershop.ru"),
  alternates: { canonical: "/" },
  title: "Барбершоп Семь в Москве, м. Сокол, Преображенская, Варшавская",
  description:
    "Мужские стрижки, биозавивка, оформление бороды и уход за кожей лица и головы. Барбершоп СЕМЬ Тони Селезнёва, премиальная мужская парикмахерская в Москве.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    url: "https://www.7barbershop.ru/",
    title: "Барбершоп Семь в Москве, м. Сокол, Преображенская, Варшавская",
    description:
      "Мужские стрижки, биозавивка, оформление бороды и уход за кожей лица и головы. Барбершоп СЕМЬ Тони Селезнёва, премиальная мужская парикмахерская в Москве.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Барбершоп СЕМЬ Тони Селезнёва" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Барбершоп Семь в Москве, м. Сокол, Преображенская, Варшавская",
    description:
      "Мужские стрижки, биозавивка, оформление бороды и уход за кожей лица и головы. Барбершоп СЕМЬ Тони Селезнёва, премиальная мужская парикмахерская в Москве.",
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
        <meta name="yandex-verification" content="759a3978ae927cea" />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

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

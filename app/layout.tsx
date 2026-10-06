import type { Metadata } from "next";
import "./globals.css";
import CookiePopup from "@/components/CookiePopup";

export const metadata: Metadata = {
  title: "Seven",
  description: "Starter project for 7barbershop.",
  openGraph: { title: "Seven", description: "Starter project for 7barbershop.", type: "website" },
  twitter: { card: "summary", title: "Seven", description: "Starter project for 7barbershop." },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
        <CookiePopup />
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.7barbershop.ru"),
  title: "Политика конфиденциальности — барбершоп СЕМЬ",
  description: "Политика конфиденциальности сайта барбершопа СЕМЬ Тони Селезнёва.",
  alternates: { canonical: "https://www.7barbershop.ru/privacy-policy/" },
  openGraph: {
    title: "Политика конфиденциальности — барбершоп СЕМЬ",
    description: "Политика конфиденциальности сайта барбершопа СЕМЬ Тони Селезнёва.",
    url: "https://www.7barbershop.ru/privacy-policy/",
    type: "website",
  },
  robots: { index: false, follow: true },
};

export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

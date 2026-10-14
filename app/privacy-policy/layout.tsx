import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — барбершоп СЕМЬ",
  description: "Политика конфиденциальности сайта барбершопа СЕМЬ Тони Селезнёва.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

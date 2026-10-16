import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Услуги и цены барбершопа СЕМЬ в Москве",
  description:
    "Мужские стрижки, оформление бороды, бритьё и уход за лицом в барбершопе СЕМЬ Тони Селезнёва в Москве. Цены и онлайн-запись.",
  alternates: { canonical: "/uslugi" },
  openGraph: {
    title: "Услуги и цены барбершопа СЕМЬ в Москве",
    description: "Мужские стрижки, борода, бритьё и уходовые процедуры. Запись онлайн.",
    type: "website",
    url: "/uslugi",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Услуги барбершопа СЕМЬ" }],
  },
};


export default function ServicesPage() {
  return <Home servicesVariant="cards" />;
}

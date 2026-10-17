import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Барбершоп СЕМЬ на Преображенской — мужские стрижки в Москве",
  description:
    "Барбершоп СЕМЬ Тони Селезнёва на Преображенской в Москве. Мужские стрижки, оформление бороды и уход за лицом. Запишитесь онлайн.",
  alternates: { canonical: "/barbershop-na-preobrazhenskoj" },
  openGraph: {
    title: "Барбершоп СЕМЬ на Преображенской — мужские стрижки в Москве",
    description: "Барбершоп СЕМЬ Тони Селезнёва на Преображенской. Запись онлайн.",
    type: "website",
    url: "/barbershop-na-preobrazhenskoj",
  },
};

export default function PreobrazhenskayaPage() {
  return (
    <Home
      location={{ station: "м. Преображенская", titleSuffix: " на Преображенской" }}
      teamNames={["Тимур", "Анна Антонова", "Павел", "Ангелина"]}
    />
  );
}

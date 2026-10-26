import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Барбершоп СЕМЬ на Соколе — мужские стрижки в Москве",
  description:
    "Барбершоп СЕМЬ Тони Селезнёва на Соколе в Москве. Мужские стрижки, оформление бороды и уход за лицом. Запишитесь онлайн.",
  alternates: { canonical: "/barbershop-na-sokole" },
  openGraph: {
    title: "Барбершоп СЕМЬ на Соколе — мужские стрижки в Москве",
    description:
      "Барбершоп СЕМЬ Тони Селезнёва на Соколе в Москве. Запись онлайн.",
    type: "website",
    url: "/barbershop-na-sokole",
  },
};

export default function SokolPage() {
  return <Home location={{ station: "м. Сокол", titleSuffix: " на Соколе" }} teamNames={["Роман", "Артем", "Дарья", "Влад", "Яна", "Дмитрий", "Алексей"]} />;
}

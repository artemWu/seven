import type { Metadata } from "next";
import Home from "../page";

export const metadata: Metadata = {
  title: "Барбершоп СЕМЬ на Варшавской — мужские стрижки в Москве",
  description:
    "Барбершоп СЕМЬ Тони Селезнёва на Варшавской в Москве. Мужские стрижки, оформление бороды и уход за лицом. Запишитесь онлайн.",
  alternates: { canonical: "/barbershop-na-varshavskoj" },
  openGraph: {
    title: "Барбершоп СЕМЬ на Варшавской — мужские стрижки в Москве",
    description: "Барбершоп СЕМЬ Тони Селезнёва на Варшавской. Запись онлайн.",
    type: "website",
    url: "/barbershop-na-varshavskoj",
  },
};

export default function VarshavskayaPage() {
  return (
    <Home
      location={{ station: "м. Варшавская", titleSuffix: " на Варшавской" }}
      teamNames={["Анна Ашрапова", "Александр", "Имам", "Тулиген", "Залина"]}
    />
  );
}

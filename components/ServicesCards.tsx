import ServiceCard from "./ServiceCard";
import { sitePath } from "@/lib/site-path";

const cards = [
  { title: "Стрижки", price: "от 1 400 ₽", image: "/images/services-profile.webp", background: "beige" as const, href: sitePath("/uslugi/mujskie-strigki") },
  { title: "Бороды", price: "от 1 200 ₽", image: "/images/services-beard.webp", background: "brown" as const, href: sitePath("/uslugi/strigka-borody") },
  { title: "Дополнительные услуги", price: "от 300 ₽", image: "/images/services-care.webp", background: "gray" as const, href: sitePath("/uslugi/dopolnitelnye-uslugi") },
  { title: "Бритьё", price: "от 1 000 ₽", image: "/images/services-shave.webp", background: "beige" as const, href: sitePath("/uslugi/mujskie-strigki-lysye") },
];

export default function ServicesCards() {
  return (
    <div className="services-cards" aria-label="Основные услуги">
      {cards.map((card) => <ServiceCard key={card.title} {...card} showBooking={false} />)}
    </div>
  );
}

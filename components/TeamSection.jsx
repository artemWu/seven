import BarberCard from "./BarberCard.jsx";
import Reveal from "./Reveal";

const team = [
  { name: "Роман", role: "Бренд-барбер", image: "/images/barbers/роман.webp", theme: "dark" },
  { name: "Артем", role: "Творческий партнёр", image: "/images/barbers/артем.webp", theme: "light" },
  { name: "Дарья", role: "Творческий партнёр", image: "/images/barbers/даша.webp", theme: "purple" },
  { name: "Влад", role: "Бренд-барбер", image: "/images/barbers/влад.webp", theme: "dark" },
  { name: "Яна", role: "Топ-барбер", image: "/images/barbers/яна.webp", theme: "light" },
  { name: "Дмитрий", role: "Барбер", image: "/images/barbers/дмитрий.webp", theme: "light" },
  { name: "Алексей", role: "Бренд-барбер", image: "/images/barbers/алексей.webp", theme: "light" },
  { name: "Павел", role: "Бренд-барбер", image: "/images/barbers/павел.webp", theme: "light" },
  { name: "Анна Антонова", role: "Барбер", image: "/images/barbers/анна антонова.webp", theme: "light" },
  { name: "Залина", role: "Бренд-барбер", image: "/images/barbers/залина.webp", theme: "light" },
  { name: "Имам", role: "Топ-барбер", image: "/images/barbers/имам.webp", theme: "dark" },
  { name: "Анна Ашрапова", role: "Барбер", image: "/images/barbers/анна ашрапова.webp", theme: "purple" },
  { name: "Тулиген", role: "Старший барбер", image: "/images/barbers/тулиген.webp", theme: "light" },
];

export default function TeamSection() {
  return (
    <section className="team-section" id="team">
      <h2 className="team-section__eyebrow">Команда</h2>
      <div className="barbers-grid">
        {team.map((member, index) => (
          <Reveal key={member.name} className={`barber-card-reveal barber-card-reveal--${member.theme}`} delay={index * 90} y={24}>
            <BarberCard {...member} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

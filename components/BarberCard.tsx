type BarberCardProps = {
  name: string;
  role: string;
  image: string;
  theme?: "light" | "dark" | "purple";
};

import Image from "next/image";

export default function BarberCard({ name, role, image, theme = "light" }: BarberCardProps) {
  return (
    <article className={`barber-card barber-card--${theme}`}>
      <div className="barber-card__copy">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
      <div className="barber-card__media">
        <Image className="barber-card__image" src={image} alt={`Барбер ${name} — ${role.toLowerCase()} барбершопа СЕМЬ`} fill sizes="(max-width: 760px) 50vw, 25vw" style={{ objectFit: "contain", objectPosition: "right bottom" }} />
      </div>
    </article>
  );
}

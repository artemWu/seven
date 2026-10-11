type BarberCardProps = {
  name: string;
  role: string;
  image: string;
  theme?: "light" | "dark" | "purple";
};

export default function BarberCard({ name, role, image, theme = "light" }: BarberCardProps) {
  return (
    <article className={`barber-card barber-card--${theme}`}>
      <div className="barber-card__copy">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
      <div className="barber-card__media">
        <img className="barber-card__image" src={image} alt={`${name}, ${role}`} />
      </div>
    </article>
  );
}

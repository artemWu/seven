import Button from "../components/button";

type ServiceCardBackground = "beige" | "brown" | "gray";

type ServiceCardProps = {
  title: string;
  price: string;
  image: string;
  background: ServiceCardBackground;
};

const backgrounds: Record<ServiceCardBackground, string> = {
  beige: "linear-gradient(180deg, #D9C9C0 0%, #232120 100%)",
  brown: "linear-gradient(180deg, #AE9889 0%, #383330 100%)",
  gray: "linear-gradient(180deg, #B3AC90 0%, #36352D 100%)",
};

export default function ServiceCard({
  title,
  price,
  image,
  background,
  
}: ServiceCardProps) {
  return (
    <div
      className="service-card"
      style={{
        background: backgrounds[background],
      }}
    >
      <div
        className="service-card__image"
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />

      <div
        className="service-card__overlay"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 50%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.25) 78%, transparent 100%)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "100% 100%",

          maskImage:
            "linear-gradient(to top, black 0%, black 50%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.25) 78%, transparent 100%)",
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "100% 100%",
        }}
      />

      <div className="service-card__footer">
        <div className="service-card__row">
          <div className="service-card__info">
            <div className="service-card__name">
              {title}
            </div>

            <div className="service-card__price">
              {price}
            </div>
          </div>

            <Button href="https://n365899.yclients.com/company/348811/personal/menu?o=">
              Записаться
            </Button>
          </div>
        </div>
      </div>
  );
}
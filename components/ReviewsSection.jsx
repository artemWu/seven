import Button from "./button";
import Reveal from "./Reveal";

const reviews = [
  {
    name: "Евгений",
    status: "Знаток города 4 уровня",
    date: "31 августа",
    avatar:
      "/images/contacts-1.webp",
    text: "Ребята, просто Цари! За последние годы для меня — это лучшая команда) Им можно сказать сделай красиво — твои ожидания воплотятся в реальность 🔥",
    variant: "review-card--1",
  },
  {
    name: "Максим",
    status: "Знаток города 5 уровня",
    date: "28 августа",
    avatar:
      "/images/contacts-2.webp",
    text: "Очень атмосферное место, персонал создает впечатление хорошо знакомых людей, можно пообщаться на различные темы с мастером, что поднимет настроение:) Во время выполнения процедур ты отдыхаешь, а после завершения хочется вернуться снова! Так же есть напитки и конфеты (конфеты классные, спасибо). Внутри помещения уютно и комфортно. По возможности приеду к Вам снова. Спасибо за классную стрижку! Девушка оценила 😁",
    variant: "review-card--2",
  },
  {
    name: "Дмитрий",
    status: "Знаток города 5 уровня",
    date: "1 августа",
    avatar:
      "/images/contacts-3.webp",
    text: "Отличное место! Стригут настоящие профессионалы, Борис и Артем создали очень крутое пространство, очень хочется возвращаться снова, атмосфера на уровне!",
    variant: "review-card--3",
  },
];

const reviewItems = Array.from({ length: 21 }, (_, index) => ({
  ...reviews[index % reviews.length],
  id: `${reviews[index % reviews.length].name}-${index}`,
}));

function Star() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <path
        d="M12 0L14.694 8.292H23.413L16.359 13.416L19.053 21.708L12 16.584L4.947 21.708L7.641 13.416L0.587 8.292H9.306L12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ReviewsSection() {
  return (
    <section className="reviews-section" id="reviews">
      <Reveal y={12}>
        <h2 className="reviews-section__title">Что говорят о нас</h2>
      </Reveal>

      <Reveal className="reviews-section__content-reveal" delay={140} y={24}>
      <div className="reviews-section__list">
        {Array.from({ length: 3 }, (_, rowIndex) => (
          <div className={`reviews-section__row reviews-section__row--${rowIndex + 1}`} key={rowIndex}>
            {reviewItems.slice(rowIndex * 7, rowIndex * 7 + 7).map((review) => (
              <article className={`review-card ${review.variant}`} key={review.id}>
            <div
              className="review-card__glass"
              aria-hidden="true"
            />

            <div className="review-card__inner">
              <div className="review-card__header">
                <div
                  className="review-card__avatar"
                  style={{
                    backgroundImage: `url("${review.avatar}")`,
                  }}
                />

                <div className="review-card__person">
                  <div className="review-card__name">
                    {review.name}
                  </div>

                  <div className="review-card__status">
                    {review.status}
                  </div>
                </div>
              </div>

              <div className="review-card__body">
                <div className="review-card__meta">
                  <div className="review-card__stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} />
                    ))}
                  </div>

                  <div className="review-card__date">
                    {review.date}
                  </div>
                </div>

                <div className="review-card__text">
                  {review.text}
                </div>
              </div>
            </div>
              </article>
            ))}
          </div>
        ))}
      </div>
      </Reveal>

      <Reveal delay={240} y={16}>
        <Button href="#reviews" target="_blank" rel="noopener noreferrer" theme="dark">
          все отзывы
        </Button>
      </Reveal>
    </section>
  );
}

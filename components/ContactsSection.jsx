export default function ContactsSection() {
  return (
    <section className="contacts-section" id="contacts">
      <h2 className="contacts-section__title">
        Контакты
      </h2>

      <div className="contacts-section__content">

        {/* MAP */}
        <div className="contacts-map">
          <iframe
            className="contacts-map__frame"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A7ab19df5c3ff2d4199b918d6f4b226792c32d1ff4a0b3c81b1a9d2082eaab669&source=constructor"
            loading="lazy"
            title="Парикмахерская Свет на карте"
          />
        </div>

        {/* ADDRESS */}
        <div className="contacts-card">
          <div
            className="contacts-card__glass"
            aria-hidden="true"
          />

          <div className="contacts-card__inner">
            <div className="contacts-card__station">
              М. Чкаловская
            </div>

            <a
              className="contacts-card__address"
              href="https://yandex.com/maps/org/svet/68361411731/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Большой Полуярославский пер. 10, корп. 2
            </a>

            <a
              className="contacts-card__phone"
              href="tel:+79669791100"
            >
              +7 (966) 979-11-00
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

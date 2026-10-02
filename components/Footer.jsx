import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* BRAND */}
        <div className="footer__brand">

          <Image
            src="/svg/logo.png"
            alt="Свет, парикмахерская"
            width={224}
            height={60}
            className="footer__logo"
            unoptimized
          />
        </div>

        {/* NAVIGATION */}
        <div className="footer__group">
          <div className="footer__group-title">
            Навигация
          </div>

          <a href="#services" className="footer__link">
            Услуги
          </a>

          <a href="#team" className="footer__link">
            Команда
          </a>

          <a href="#reviews" className="footer__link">
            Нам доверяют
          </a>
        </div>

        {/* CONTACTS */}
        <div className="footer__group">
          <div className="footer__group-title">
            Контакты
          </div>

          <a
            href="tel:+79669791100"
            className="footer__link"
          >
            +7 (966) 979-11-00
          </a>

          <a
            href="https://yandex.com/maps/org/svet/68361411731/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link footer__link--address"
          >
            г. Москва, Большой Полуярославский пер. 10, корп. 2
          </a>
        </div>

        {/* INFO */}
        <div className="footer__group">
          <div className="footer__group-title">
            Инфо
          </div>

          <a href="#" className="footer__link">
            Публичная оферта
          </a>

          <a href="/privacy" className="footer__link">
            Политика конфиденциальности
          </a>
        </div>

        {/* COPYRIGHT */}
        <div className="footer__copyright">
          © 2026 Свет. Все права защищены
        </div>

      </div>
    </footer>
  );
}

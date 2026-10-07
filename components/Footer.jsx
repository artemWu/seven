import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* BRAND */}
        <div className="footer__brand">

          <Image
            src="/svg/seven-sign.svg"
            alt="7barbershop"
            width={224}
            height={60}
            className="footer__logo"
            unoptimized
          />
          <div className="footer__hours">Ежедневно<strong>с 10:00 до 22:00</strong></div>
        </div>

        {/* NAVIGATION */}
        <div className="footer__group">
          <div className="footer__group-title">
            Навигация
          </div>

          <a href="#services" className="footer__link">
            О нас
          </a>

          <a href="#team" className="footer__link">
            Команда
          </a>

          <a href="#reviews" className="footer__link">
            Галерея
          </a>
        </div>

        <div className="footer__group">
          <div className="footer__group-title">Сотрудничество</div>
          <a href="#masterclasses" className="footer__link">Мастер-классы</a>
          <a href="#contacts" className="footer__link">Стать моделью</a>
          <a href="#contacts" className="footer__link">Вакансии</a>
        </div>

        {/* CONTACTS */}
        <div className="footer__group">
          <div className="footer__contact-group">
            <div className="footer__contact-label">Номер сети</div>
            <a href="tel:+79992508424" className="footer__contact-value">+7 (999) 250 84 24</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">Сокол</div>
            <a href="#contacts" className="footer__contact-value">ул. Усиевича 27 к2</a>
            <a href="tel:+79992508424" className="footer__contact-value">+7 (999) 250 84 24</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">Варшавская</div>
            <a href="#contacts" className="footer__contact-value">М. Варшавская, Варшавское шоссе 74к3</a>
            <a href="tel:+79771516525" className="footer__contact-value">+7 (977) 151 65 25</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">Курская</div>
            <a href="#contacts" className="footer__contact-value">М. Курская, Малый Демидовский пер. 3</a>
            <a href="tel:+79163850602" className="footer__contact-value">+7 (916) 385 06 02</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">Преображенская</div>
            <a href="#contacts" className="footer__contact-value">М. Преображенская площадь, ул. Краснобогатырская 90с2</a>
            <a href="tel:+79636576943" className="footer__contact-value">+7 (963) 657 69 43</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">Обучение и сотрудничество</div>
            <a href="mailto:7studioru@gmail.com" className="footer__contact-value">7studioru@gmail.com</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">Обучение</div>
            <a href="tel:+79167717446" className="footer__contact-value">+7 (916) 771 74 46</a>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="footer__copyright">
          <span className="footer__disclaimer">Вся представленная на сайте информация, касающаяся цен и услуг, носит информационный характер и не является публичной офертой. Для получения подробной информации, требуется консультация и осмотр. Опубликованная на данном сайте информация может быть изменена в любое время без предварительного уведомления.</span>
          <a href="/privacy">Политика конфиденциальности</a>
          <strong>Designed by Artem Wu</strong>
        </div>

      </div>
    </footer>
  );
}

import Image from "next/image";
import { branches, NETWORK_PHONE, trainingContact } from "@/data/branches";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* BRAND */}
        <div className="footer__brand">

          <Image
            src="/svg/seven-sign.svg"
            alt="Барбершоп СЕМЬ Тони Селезнёва"
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

          <a href="#top" className="footer__link">
            Главная
          </a>

          <a href="#services" className="footer__link">
            Услуги
          </a>

          <a href="#about" className="footer__link">
            Цифры
          </a>

          <a href="#team" className="footer__link">
            Команда
          </a>

          <a href="#reviews" className="footer__link">
            Галерея
          </a>

          <a href="#contacts" className="footer__link">
            Контакты
          </a>
        </div>

        <div className="footer__group">
          <div className="footer__group-title">Сотрудничество</div>
          <a href="https://academy7.ru/" target="_blank" rel="noopener noreferrer" className="footer__link">Мастер-классы</a>
          <a href="#contacts" className="footer__link">Стать моделью</a>
          <a href="#contacts" className="footer__link">Вакансии</a>
        </div>

        {/* CONTACTS */}
        <div className="footer__group">
          <div className="footer__contact-group">
            <div className="footer__contact-label">Номер сети</div>
            <a href="tel:+79777977177" className="footer__contact-value">{NETWORK_PHONE}</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">{branches[0].name}</div>
            <a href={branches[0].mapSrc} target="_blank" rel="noopener noreferrer" className="footer__contact-value">ул. {branches[0].address}</a>
            <a href={`tel:${(branches[0].footerPhone ?? branches[0].phone).replace(/[^\d+]/g, "")}`} className="footer__contact-value">{branches[0].footerPhone ?? branches[0].phone}</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">{branches[2].name}</div>
            <a href={branches[2].mapSrc} target="_blank" rel="noopener noreferrer" className="footer__contact-value">{branches[2].address}</a>
            <a href={`tel:${branches[2].phone.replace(/[^\d+]/g, "")}`} className="footer__contact-value">{branches[2].phone}</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">{branches[1].name}</div>
            <a href={branches[1].mapSrc} target="_blank" rel="noopener noreferrer" className="footer__contact-value">{branches[1].address}</a>
            <a href={`tel:${branches[1].phone.replace(/[^\d+]/g, "")}`} className="footer__contact-value">{branches[1].phone}</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">{branches[3].name}</div>
            <a href={branches[3].mapSrc} target="_blank" rel="noopener noreferrer" className="footer__contact-value">{branches[3].address}</a>
            <a href={`tel:${branches[3].phone.replace(/[^\d+]/g, "")}`} className="footer__contact-value">{branches[3].phone}</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">Обучение и сотрудничество</div>
            <a href={`mailto:${trainingContact.email}`} className="footer__contact-value">{trainingContact.email}</a>
          </div>
          <div className="footer__contact-group">
            <div className="footer__contact-label">Обучение</div>
            <a href={`tel:${trainingContact.phone.replace(/[^\d+]/g, "")}`} className="footer__contact-value">{trainingContact.phone}</a>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="footer__copyright">
          <span className="footer__disclaimer">Вся представленная на сайте информация, касающаяся цен и услуг, носит информационный характер и не является публичной офертой. Для получения подробной информации, требуется консультация и осмотр. Опубликованная на данном сайте информация может быть изменена в любое время без предварительного уведомления.</span>
          <a href="/privacy">Политика конфиденциальности</a>
          <a
            className="footer__designer"
            href="https://t.me/wuprogress"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed by Artem Wu
          </a>
        </div>

      </div>
    </footer>
  );
}

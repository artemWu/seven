"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./button";

export default function Header() {
  const [isLight, setIsLight] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsLight(!entry.isIntersecting),
      { threshold: 0.12 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`site-header${isLight ? " site-header--light" : ""}${isMenuOpen ? " site-header--menu-open" : ""}`}
      aria-label="Основная навигация"
    >
      <a className="site-header__logo" href="#top" aria-label="Seven — наверх">
        <Image
          src="/svg/littlelogo.svg"
          alt="Seven"
          width={66}
          height={28}
          priority
          unoptimized
        />
      </a>

      <nav className="site-header__nav-shell">
        <a className="site-header__nav-link--active" href="#top">Главная</a>
        <a href="#services">Услуги</a>
        <a href="#team">Команда</a>
        <a href="#reviews">Галерея</a>
        <a href="#contacts">Контакты</a>
        <a href="#masterclasses">Мастер-классы</a>
      </nav>

      <div className="site-header__cta">
        <Button href="https://n399707.yclients.com/group:12717/city:all#1" target="_blank" rel="noopener noreferrer" theme="dark">Записаться</Button>
      </div>

      <button
        className={`site-header__menu-toggle${isMenuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <Image src="/icons/menu.svg" alt="" width={24} height={24} priority />
        <Image src="/icons/close.svg" alt="" width={24} height={24} priority />
      </button>

      <div className={`mobile-menu${isMenuOpen ? " mobile-menu--open" : ""}`} aria-hidden={!isMenuOpen}>
        <div className="mobile-menu__topline"><span>Навигация</span><span>Сотрудничество</span></div>
        <div className="mobile-menu__links">
          <nav aria-label="Мобильная навигация">
            <a href="#top" onClick={closeMenu}>о нас</a>
            <a href="#services" onClick={closeMenu}>услуги</a>
            <a href="#team" onClick={closeMenu}>команда</a>
            <a href="#reviews" onClick={closeMenu}>галерея</a>
          </nav>
          <nav aria-label="Сотрудничество">
            <a href="#contacts" onClick={closeMenu}>вакансии</a>
            <a href="#masterclasses" onClick={closeMenu}>мастер-классы</a>
            <a href="#contacts" onClick={closeMenu}>стать моделью</a>
          </nav>
        </div>
        <div className="mobile-menu__contacts">
          <span>Номер сети</span>
          <a href="tel:+79777977177">+7 (977) 797 71 77</a>
          <a href="mailto:7studioru@gmail.com">7studioru@gmail.com</a>
        </div>
        <div className="mobile-menu__footer">
          <div className="mobile-menu__hours">Ежедневно<strong>с 10:00 до 22:00</strong></div>
          <Image src="/svg/seven-sign.svg" alt="7barbershop" width={224} height={60} unoptimized />
          <Button href="https://n399707.yclients.com/group:12717/city:all#1" target="_blank" rel="noopener noreferrer" theme="primary">Записаться</Button>
        </div>
      </div>
    </header>
  );
}

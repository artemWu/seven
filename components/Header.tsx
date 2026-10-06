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

  return (
    <header
      className={`site-header${isLight ? " site-header--light" : ""}`}
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
    </header>
  );
}

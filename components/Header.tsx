"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "./button";
import MobileMenu from "./MobileMenu";
import { BOOKING_URL } from "@/data/site";

export default function Header() {
  const [isLight, setIsLight] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

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

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    menu.inert = !isMenuOpen;

    if (!isMenuOpen) {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => menuToggleRef.current?.focus());

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

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
        <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" theme="dark">Записаться</Button>
      </div>

      <button
        ref={menuToggleRef}
        className={`site-header__menu-toggle${isMenuOpen ? " is-open" : ""}`}
        type="button"
        aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <Image src="/icons/menu.svg" alt="" width={24} height={24} priority />
        <Image src="/icons/close.svg" alt="" width={24} height={24} priority />
      </button>

      <MobileMenu isOpen={isMenuOpen} menuRef={mobileMenuRef} onClose={closeMenu} />
    </header>
  );
}

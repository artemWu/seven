"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Button from "./button";
import MobileMenu from "./MobileMenu";
import { BOOKING_URL } from "@/data/site";
import { sitePath } from "@/lib/site-path";

type HeaderProps = {
  forceLight?: boolean;
};

export default function Header({ forceLight = false }: HeaderProps) {
  const pathname = usePathname();
  const sectionHref = (section: string) => pathname.startsWith("/barbershop-")
    ? sitePath(`${pathname}${section}`)
    : sitePath(`/${section}`);
  const [isLight, setIsLight] = useState(forceLight);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBranchesOpen, setIsBranchesOpen] = useState(false);
  const [branchesMenuPosition, setBranchesMenuPosition] = useState({ top: 0, left: 0 });
  const branchesCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const branchesTriggerRef = useRef<HTMLSpanElement>(null);
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

  const openBranchesMenu = () => {
    if (branchesCloseTimerRef.current) clearTimeout(branchesCloseTimerRef.current);
    setIsBranchesOpen(true);
  };

  const scheduleBranchesMenuClose = () => {
    if (branchesCloseTimerRef.current) clearTimeout(branchesCloseTimerRef.current);
    branchesCloseTimerRef.current = setTimeout(() => setIsBranchesOpen(false), 120);
  };

  useEffect(() => {
    if (!isBranchesOpen) return;

    const updateBranchesMenuPosition = () => {
      const rect = branchesTriggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setBranchesMenuPosition({ top: rect.bottom + 12, left: rect.left + rect.width / 2 });
    };

    updateBranchesMenuPosition();
    window.addEventListener("resize", updateBranchesMenuPosition);
    window.addEventListener("scroll", updateBranchesMenuPosition, true);
    return () => {
      window.removeEventListener("resize", updateBranchesMenuPosition);
      window.removeEventListener("scroll", updateBranchesMenuPosition, true);
    };
  }, [isBranchesOpen]);

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

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (
        target instanceof Node
        && !menu.contains(target)
        && !menuToggleRef.current?.contains(target)
      ) setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);
    requestAnimationFrame(() => menuToggleRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`site-header${isLight ? " site-header--light" : ""}${isMenuOpen ? " site-header--menu-open" : ""}`}
      aria-label="Основная навигация"
    >
      <Link className="site-header__logo" href="/" aria-label="Seven — на главную">
        <Image
          src="/svg/littlelogo.svg"
          alt="Seven"
          width={66}
          height={28}
          priority
          unoptimized
        />
      </Link>

      <nav
        className="site-header__nav-shell"
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <Link className="site-header__nav-link--active" href="/">Главная</Link>
        <a href={sectionHref("#services")}>Услуги</a>
        <a href={sectionHref("#team")}>Команда</a>
        <div className="site-header__branches">
          <span
            ref={branchesTriggerRef}
            className="site-header__branches-trigger"
            tabIndex={0}
            onMouseEnter={openBranchesMenu}
            onFocus={openBranchesMenu}
            onMouseLeave={scheduleBranchesMenuClose}
            onBlur={scheduleBranchesMenuClose}
          >Филиалы</span>
        </div>
        <Link href="/galereya">Галерея</Link>
        <a href={sectionHref("#reviews")}>Отзывы</a>
        <a href={sectionHref("#contacts")}>Контакты</a>
        <a href="https://academy7.ru/" target="_blank" rel="noopener noreferrer">Мастер-классы</a>
      </nav>

      {isBranchesOpen && typeof document !== "undefined" ? createPortal(
        <div
          className={`site-header__branches-menu site-header__branches-menu--portal${isLight ? " site-header__branches-menu--light" : ""}`}
          role="menu"
          onMouseEnter={openBranchesMenu}
          onMouseLeave={scheduleBranchesMenuClose}
          style={{
            position: "fixed",
            top: branchesMenuPosition.top,
            left: branchesMenuPosition.left,
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <Link href="/barbershop-na-sokole" role="menuitem">Сокол</Link>
          <Link href="/barbershop-na-preobrazhenskoj" role="menuitem">Преображенская</Link>
          <Link href="/barbershop-na-varshavskoj" role="menuitem">Варшавская</Link>
        </div>,
        document.body,
      ) : null}

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

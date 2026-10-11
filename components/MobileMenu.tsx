import type { RefObject } from "react";
import Image from "next/image";
import Button from "./button";
import styles from "./MobileMenu.module.css";
import { BOOKING_URL } from "@/data/site";

type MobileMenuProps = {
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, menuRef, onClose }: MobileMenuProps) {
  return (
    <div
      ref={menuRef}
      id="mobile-menu"
      className={`${styles.menu}${isOpen ? ` ${styles.open}` : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Мобильное меню"
      aria-hidden={!isOpen}
    >
      <div className={styles.topline}><span>Навигация</span></div>

      <div className={styles.links}>
        <nav aria-label="Мобильная навигация">
          <a href="#about" onClick={onClose}>о нас</a>
          <a href="#services" onClick={onClose}>услуги</a>
          <a href="#team" onClick={onClose}>команда</a>
          <a href="#reviews" onClick={onClose}>галерея</a>
        </nav>
        <nav aria-label="Сотрудничество">
          <span className={styles.subheading}>Сотрудничество</span>
          <a href="#contacts" onClick={onClose}>вакансии</a>
          <a href="https://academy7.ru/" target="_blank" rel="noopener noreferrer" onClick={onClose}>мастер-классы</a>
          <a href="#contacts" onClick={onClose}>стать моделью</a>
        </nav>
      </div>

      <div className={styles.contacts}>
        <span>Номер сети</span>
        <a href="tel:+79777977177">+7 (977) 797 71 77</a>
        <a href="mailto:7studioru@gmail.com">7studioru@gmail.com</a>
      </div>

      <div className={styles.footer}>
        <div className={styles.hours}>Ежедневно<strong>с 10:00 до 22:00</strong></div>
        <Image src="/svg/seven-sign.svg" alt="7barbershop" width={224} height={60} unoptimized />
        <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" theme="primary">Записаться</Button>
      </div>
    </div>
  );
}

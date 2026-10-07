"use client";

import { useEffect, useState } from "react";
import Button from "./button";

const COOKIE_CONSENT_KEY = "svet-cookie-consent";

export default function CookiePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!consent) {
      const timer = window.setTimeout(() => setIsVisible(true), 500);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function acceptCookies() {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <aside className="cookie-popup" role="dialog" aria-label="Уведомление о cookies">
      <img className="cookie-popup__image" src="/images/cookie-heart.webp" alt="" />
      <div className="cookie-popup__content">
        <p className="cookie-popup__title">Мы заботимся о вашем удобстве</p>
        <p className="cookie-popup__text">
          Все на сайте — <strong>для вас</strong>, cookies — для нас. Собираем их, чтобы
          сделать сайт еще удобнее. Настроить можно в браузере
        </p>
        <div className="cookie-popup__actions">
          <Button href="/privacy" theme="default">
            Настройки
          </Button>
          <Button theme="primary" onClick={acceptCookies}>
            Принять
          </Button>
        </div>
      </div>
    </aside>
  );
}

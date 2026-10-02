"use client";

import { useEffect, useState } from "react";

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
      <div className="cookie-popup__content">
        <p className="cookie-popup__title">Чтобы сайт работал лучше</p>
        <p className="cookie-popup__text">
          Мы используем cookies, чтобы сайт работал удобнее. Продолжая пользоваться
          сайтом, вы соглашаетесь с их использованием.
        </p>
      </div>

      <div className="cookie-popup__actions">
        <a href="/privacy" className="cookie-popup__link">
          Подробнее
        </a>
        <button type="button" className="cookie-popup__button" onClick={acceptCookies}>
          Принять
        </button>
      </div>
    </aside>
  );
}

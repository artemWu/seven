"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./button";
import { sitePath } from "@/lib/site-path";
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_KEY } from "@/lib/cookie-consent";

export default function CookiePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch {
      consent = null;
    }
    if (consent === "accepted") return;

    const timer = window.setTimeout(() => setIsVisible(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  function acceptCookies() {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
      window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
      setIsVisible(false);
    } catch {
      // Without persistent consent, analytics must remain disabled.
    }
  }

  if (!isVisible) return null;

  return (
    <aside className="cookie-popup" role="dialog" aria-label="Уведомление о cookies">
      <Image className="cookie-popup__image" src="/images/cookie-heart.webp" alt="" width={160} height={160} sizes="160px" />
      <div className="cookie-popup__content">
        <p className="cookie-popup__title">Мы заботимся о вашем удобстве</p>
        <p className="cookie-popup__text">
          Все на сайте — <strong>для вас</strong>, cookies — для нас. Собираем их, чтобы
          сделать сайт еще удобнее. Настроить можно в браузере
        </p>
        <div className="cookie-popup__actions">
          <Button href={sitePath("/privacy-policy")} theme="secondary" size="small">Настройки</Button>
          <Button theme="primary" size="small" onClick={acceptCookies}>Принять</Button>
        </div>
      </div>
    </aside>
  );
}

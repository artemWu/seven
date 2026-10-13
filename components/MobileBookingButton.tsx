"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { BOOKING_URL } from "@/data/site";

export default function MobileBookingButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let frame = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let lastTime = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 899px)");
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const render = (progress: number) => {
      const button = buttonRef.current;
      if (!button) return;
      const fullWidth = window.innerWidth - 48;
      button.style.width = `${44 + (fullWidth - 44) * (1 - progress)}px`;
      button.style.borderRadius = isSafari ? "12px" : `${16 + (22 - 16) * progress}px`;
      button.style.setProperty("--booking-progress", String(progress));
    };

    const update = (time: number) => {
      frame = 0;
      const dt = Math.min(64, Math.max(0, time - lastTime));
      lastTime = time;
      const alpha = 1 - Math.exp(-dt / 110);
      currentProgress += (targetProgress - currentProgress) * alpha;
      if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;
      render(currentProgress);
      if (currentProgress !== targetProgress) frame = window.requestAnimationFrame(update);
    };

    const requestUpdate = () => {
      targetProgress = Math.min(1, Math.max(0, window.scrollY / 240));
      if (reducedMotion.matches) currentProgress = targetProgress;
      if (!frame) {
        lastTime = performance.now();
        frame = window.requestAnimationFrame(update);
      }
    };

    const syncViewport = () => {
      if (mobileViewport.matches) {
        requestUpdate();
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
      } else {
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    syncViewport();
    mobileViewport.addEventListener("change", syncViewport);
    return () => {
      mobileViewport.removeEventListener("change", syncViewport);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <a ref={buttonRef} className="hero__cta-mobile" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label="Записаться">
      <span className="hero__cta-mobile-label">Записаться</span>
      <Image className="hero__cta-mobile-icon" src="/icons/calendar-plus.svg" alt="" width={24} height={24} />
    </a>
  );
}

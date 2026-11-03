"use client";

import { ReactNode, TouchEvent, TransitionEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type BottomSheetProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  hideTitle?: boolean;
};

export default function BottomSheet({ title, open, onClose, children, hideTitle = false }: BottomSheetProps) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const [contentScrolled, setContentScrolled] = useState(false);
  const touchStart = useRef<{
    y: number;
    lastY: number;
    lastTime: number;
    canDismiss: boolean;
    moved: boolean;
  } | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      const frame = window.requestAnimationFrame(() => {
        setMounted(true);
        setClosing(false);
      });
      return () => window.cancelAnimationFrame(frame);
    }
    if (!mounted) return;
    const frame = window.requestAnimationFrame(() => setClosing(true));
    const timeout = window.setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, 260);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [open, mounted]);

  if (!mounted && !open) return null;

  const requestClose = () => {
    if (!closing) onClose();
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    const sheetTop = event.currentTarget.getBoundingClientRect().top;
    touchStart.current = {
      y: touch.clientY,
      lastY: touch.clientY,
      lastTime: performance.now(),
      canDismiss: touch.clientY <= sheetTop + 100,
      moved: false,
    };
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const touch = event.touches[0];
    if (!start?.canDismiss || !touch || closing) return;

    const offset = Math.max(0, touch.clientY - start.y);
    if (offset <= 0) return;

    const sheet = event.currentTarget;
    sheet.style.animation = "none";
    sheet.style.transition = "none";
    sheet.style.transform = `translate3d(0, ${offset}px, 0)`;

    const backdrop = backdropRef.current;
    if (backdrop) {
      backdrop.style.transition = "none";
      backdrop.style.opacity = `${Math.max(0.35, 1 - offset / (sheet.offsetHeight * 1.2))}`;
    }

    start.lastY = touch.clientY;
    start.lastTime = performance.now();
    start.moved = true;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const end = event.changedTouches[0]?.clientY;
    touchStart.current = null;
    if (!start?.canDismiss || !start.moved || end === undefined) return;

    const sheet = sheetRef.current;
    const backdrop = backdropRef.current;
    const offset = Math.max(0, end - start.y);
    const velocity = (end - start.lastY) / Math.max(1, performance.now() - start.lastTime);
    const shouldClose = offset >= 100 || (offset >= 45 && velocity >= 0.65);

    if (shouldClose) {
      if (sheet) {
        sheet.style.transition = "";
        sheet.style.transform = "";
      }
      if (backdrop) {
        backdrop.style.transition = "";
        backdrop.style.opacity = "";
      }
      requestClose();
      return;
    }

    if (sheet) {
      sheet.style.transition = "transform 260ms cubic-bezier(.22, 1, .36, 1)";
      sheet.style.transform = "translate3d(0, 0, 0)";
    }
    if (backdrop) {
      backdrop.style.transition = "opacity 220ms ease";
      backdrop.style.opacity = "";
    }
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    event.currentTarget.style.transition = "";
    event.currentTarget.style.transform = "";
  };

  return createPortal(
    <>
      <button ref={backdropRef} className={`bottom-sheet__backdrop${closing ? " bottom-sheet__backdrop--closing" : ""}`} type="button" aria-label="Закрыть окно" onClick={requestClose} />
      <div ref={sheetRef} className={`bottom-sheet${closing ? " bottom-sheet--closing" : ""}`} role="dialog" aria-modal="true" aria-label={title} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onTransitionEnd={handleTransitionEnd}>
        <div className="bottom-sheet__topbar">
          <div className="bottom-sheet__handle" />
          <button className="bottom-sheet__close" type="button" aria-label="Закрыть окно" onClick={requestClose}>
            <Image src="/icons/close.svg" alt="" width={36} height={36} unoptimized />
          </button>
        </div>
        {!hideTitle && <strong className="bottom-sheet__title">{title}</strong>}
        <div
          className={`bottom-sheet__content${contentScrolled ? " bottom-sheet__content--scrolled" : ""}`}
          onScroll={(event) => setContentScrolled(event.currentTarget.scrollTop > 0)}
        >
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
}

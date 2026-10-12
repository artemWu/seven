"use client";

import { ReactNode, TouchEvent, useEffect, useRef, useState } from "react";

type BottomSheetProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function BottomSheet({ title, open, onClose, children }: BottomSheetProps) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const touchStart = useRef<number | null>(null);

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

  if (!mounted) return null;

  const requestClose = () => {
    if (!closing) onClose();
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStart.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    const end = event.changedTouches[0]?.clientY;
    touchStart.current = null;
    if (start !== null && end !== undefined && end - start > 60) requestClose();
  };

  return (
    <>
      <button className={`bottom-sheet__backdrop${closing ? " bottom-sheet__backdrop--closing" : ""}`} type="button" aria-label="Закрыть окно" onClick={requestClose} />
      <div className={`bottom-sheet${closing ? " bottom-sheet--closing" : ""}`} role="dialog" aria-modal="true" aria-label={title} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="bottom-sheet__handle" />
        <button className="bottom-sheet__close" type="button" aria-label="Закрыть окно" onClick={requestClose}>×</button>
        <strong className="bottom-sheet__title">{title}</strong>
        <div className="bottom-sheet__content">{children}</div>
      </div>
    </>
  );
}

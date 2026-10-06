"use client";

import { useEffect, useState } from "react";

const bookingUrl = "https://n399707.yclients.com/group:12717/city:all#1";

export default function BookingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-booking-modal", handleOpen);
    return () => window.removeEventListener("open-booking-modal", handleOpen);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div className="booking-modal" role="dialog" aria-modal="true" aria-label="Запись на услугу">
      <button className="booking-modal__backdrop" type="button" aria-label="Закрыть окно" onClick={() => setOpen(false)} />
      <aside className="booking-modal__panel">
        <div className="booking-modal__header">
          <h2>Запись</h2>
          <button className="booking-modal__close" type="button" aria-label="Закрыть" onClick={() => setOpen(false)}>×</button>
        </div>
        <iframe className="booking-modal__frame" src={bookingUrl} title="Онлайн-запись" />
        <a className="booking-modal__fallback" href={bookingUrl} target="_blank" rel="noopener noreferrer">
          Открыть запись в новой вкладке
        </a>
      </aside>
    </div>
  );
}

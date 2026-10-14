"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Image from "next/image";

const haircutCards = [
  "/images/haircut-02.webp",
  "/images/haircut-03.webp",
  "/images/haircut-04.webp",
  "/images/haircut-05.webp",
  "/images/haircut-06.webp",
  "/images/haircut-07.webp",
  "/images/haircut-08.webp",
  "/images/haircut-09.webp",
  "/images/haircut-01.webp",
];

const haircutNames = [
  "Французский кроп",
  "Текстурированный кроп",
  "Стрижка curtains",
  "Маллет",
  "Квифф",
  "Базз-кат",
  "Кроп с фейдом",
  "Кудрявый кроп",
  "Удлинённый кроп",
];

export default function HaircutsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const closeViewer = () => setSelectedIndex(null);
  const showPrevious = () => setSelectedIndex((index) => index === null ? null : (index + haircutCards.length - 1) % haircutCards.length);
  const showNext = () => setSelectedIndex((index) => index === null ? null : (index + 1) % haircutCards.length);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <section className="haircuts-section" id="haircuts" aria-labelledby="haircuts-title">
      <h2 className="haircuts-section__eyebrow" id="haircuts-title">Наши стрижки</h2>
      <div className="haircuts-grid">
        {haircutCards.map((image, index) => (
          <Reveal key={image} className={`haircut-card-reveal haircut-card-reveal--${index + 1}`} delay={index * 90} y={24}>
            <button className="haircut-card" type="button" onClick={() => setSelectedIndex(index)} aria-label={`Открыть фото стрижки ${index + 1}`}>
              <Image className="haircut-card__image" src={image} alt={`Мужская стрижка «${haircutNames[index]}»`} fill sizes="(max-width: 899px) 50vw, 33vw" unoptimized />
            </button>
          </Reveal>
        ))}
      </div>
      {selectedIndex !== null && (
        <div className="haircut-viewer" role="dialog" aria-modal="true" aria-label="Просмотр фотографий стрижек" onClick={closeViewer} onTouchStart={(event) => { touchStartX.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => { const start = touchStartX.current; if (start === null) return; const distance = event.changedTouches[0].clientX - start; if (Math.abs(distance) > 50) distance > 0 ? showPrevious() : showNext(); touchStartX.current = null; }}>
          <button className="haircut-viewer__close" type="button" onClick={closeViewer} aria-label="Закрыть просмотр"><Image src="/icons/close.svg" alt="" width={24} height={24} unoptimized /></button>
          <button className="haircut-viewer__arrow haircut-viewer__arrow--prev" type="button" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Предыдущая фотография"><Image src="/icons/chevron-right.svg" alt="" width={24} height={24} unoptimized /></button>
          <div className="haircut-viewer__image-wrap" onClick={(event) => event.stopPropagation()}>
            <Image className="haircut-viewer__image" src={haircutCards[selectedIndex]} alt={`Мужская стрижка «${haircutNames[selectedIndex]}»`} width={1600} height={1200} sizes="100vw" unoptimized priority />
          </div>
          <button className="haircut-viewer__arrow haircut-viewer__arrow--next" type="button" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Следующая фотография"><Image src="/icons/chevron-right.svg" alt="" width={24} height={24} unoptimized /></button>
        </div>
      )}
    </section>
  );
}

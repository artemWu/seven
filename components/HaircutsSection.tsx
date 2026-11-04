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
  const openingScrollY = useRef<number | null>(null);

  const closeViewer = () => setSelectedIndex(null);
  const showPrevious = () => setSelectedIndex((index) => index === null ? null : (index + haircutCards.length - 1) % haircutCards.length);
  const showNext = () => setSelectedIndex((index) => index === null ? null : (index + 1) % haircutCards.length);
  const isViewerOpen = selectedIndex !== null;

  useEffect(() => {
    if (!isViewerOpen) return;
    const body = document.body;
    const html = document.documentElement;
    const scrollY = openingScrollY.current ?? window.scrollY;
    const previousStyles = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.dataset.galleryViewerOpen = "true";

    return () => {
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.left = previousStyles.bodyLeft;
      body.style.right = previousStyles.bodyRight;
      body.style.width = previousStyles.bodyWidth;
      body.style.overflow = previousStyles.bodyOverflow;
      html.style.overflow = previousStyles.htmlOverflow;
      html.style.overscrollBehavior = previousStyles.htmlOverscroll;
      html.style.scrollBehavior = "auto";
      body.dataset.galleryViewerRestoring = "true";
      delete body.dataset.galleryViewerOpen;
      window.scrollTo(0, scrollY);
      openingScrollY.current = null;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          html.style.scrollBehavior = previousStyles.htmlScrollBehavior;
          delete body.dataset.galleryViewerRestoring;
          window.dispatchEvent(new Event("scroll"));
        });
      });
    };
  }, [isViewerOpen]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeViewer();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section className="haircuts-section" id="haircuts" aria-labelledby="haircuts-title">
      <h2 className="haircuts-section__eyebrow" id="haircuts-title">Наши стрижки</h2>
      <div className="haircuts-grid">
        {haircutCards.map((image, index) => (
          <Reveal key={image} className={`haircut-card-reveal haircut-card-reveal--${index + 1}`} delay={index * 90} y={24}>
            <button className="haircut-card" type="button" onClick={() => { openingScrollY.current = window.scrollY; setSelectedIndex(index); }} aria-label={`Открыть фото стрижки ${index + 1}`}>
              <Image className="haircut-card__image" src={image} alt={`Мужская стрижка «${haircutNames[index]}»`} fill sizes="(max-width: 899px) 50vw, 33vw" unoptimized />
            </button>
          </Reveal>
        ))}
      </div>
      {selectedIndex !== null && (
        <div
          className="haircut-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографий стрижек"
          onClick={closeViewer}
          onTouchStart={(event) => { touchStartX.current = event.changedTouches[0].clientX; }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            if (start === null) return;
            const distance = event.changedTouches[0].clientX - start;
            if (Math.abs(distance) > 50) {
              if (distance > 0) showPrevious();
              else showNext();
            }
            touchStartX.current = null;
          }}
        >
          <button className="haircut-viewer__close" type="button" onClick={(event) => { event.stopPropagation(); closeViewer(); }} aria-label="Закрыть просмотр"><Image src="/icons/close.svg" alt="" width={24} height={24} unoptimized /></button>
          <button className="haircut-viewer__arrow haircut-viewer__arrow--prev" type="button" onClick={(event) => { event.stopPropagation(); showPrevious(); }} aria-label="Предыдущая фотография"><Image src="/icons/chevron-right.svg" alt="" width={24} height={24} unoptimized /></button>
          <div className="haircut-viewer__image-wrap">
            <Image className="haircut-viewer__image" src={haircutCards[selectedIndex]} alt={`Мужская стрижка «${haircutNames[selectedIndex]}»`} width={1600} height={1200} sizes="100vw" unoptimized priority onClick={(event) => event.stopPropagation()} />
          </div>
          <button className="haircut-viewer__arrow haircut-viewer__arrow--next" type="button" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Следующая фотография"><Image src="/icons/chevron-right.svg" alt="" width={24} height={24} unoptimized /></button>
        </div>
      )}
    </section>
  );
}

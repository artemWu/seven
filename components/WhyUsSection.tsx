"use client";

import { useRef, useState } from "react";
import type { PointerEvent, UIEvent } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { BOOKING_URL } from "@/data/site";

type Reason = { title: string; text: string; image: string; theme: "dark" | "purple" };

const reasons: Reason[] = [
  { title: "Безопасность", text: "Мы тщательно дезинфицируем рабочие места и инструмент", image: "/images/why-us/defend.webp", theme: "dark" },
  { title: "Стандарт качества", text: "Вся команда проходит обучение и аккредитацию в нашей академии барберов", image: "/images/why-us/standart.webp", theme: "dark" },
  { title: "Гарантия на стрижку", text: "Мы даём гостю 3 дня для корректировки стрижки в случае, если что-то не так", image: "/images/why-us/сalendar.webp", theme: "purple" },
  { title: "Комфорт", text: "Для нас важна каждая деталь: от комфортной атмосферы и удобных кресел до внимательного отношения к каждому гостю", image: "/images/why-us/comfort.webp", theme: "dark" },
  { title: "White Cosmetics", text: "Наш опыт в барберинге лёг в основу собственного бренда косметики для профессионального ухода за волосами и бородой", image: "/images/why-us/white-cosmetics.webp", theme: "dark" },
];

export default function WhyUsSection() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollEdges, setScrollEdges] = useState({ left: false, right: true });
  const scrollTimeout = useRef<number | undefined>(undefined);
  const dragState = useRef({ startX: 0, startScrollLeft: 0, pointerId: -1, dragging: false });
  const suppressClick = useRef(false);
  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    setScrollEdges({
      left: element.scrollLeft > 2,
      right: element.scrollLeft + element.clientWidth < element.scrollWidth - 2,
    });
    setIsScrolling(true);
    window.clearTimeout(scrollTimeout.current);
    scrollTimeout.current = window.setTimeout(() => setIsScrolling(false), 120);
  };
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    dragState.current = {
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      pointerId: event.pointerId,
      dragging: false,
    };
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    if (!drag.dragging && Math.abs(distance) > 6) {
      drag.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }
    if (drag.dragging) {
      event.preventDefault();
      event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
    }
  };
  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (drag.pointerId !== event.pointerId) return;
    if (drag.dragging) {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      suppressClick.current = true;
      window.setTimeout(() => { suppressClick.current = false; }, 0);
      setIsDragging(false);
    }
    dragState.current = { startX: 0, startScrollLeft: 0, pointerId: -1, dragging: false };
  };

  return (
    <section className="why-us" id="why-us">
      <Reveal y={18}><h2 className="why-us__eyebrow">почему мы</h2></Reveal>
      <div className={`why-us__viewport${isScrolling ? " why-us__viewport--scrolling" : ""}${scrollEdges.left ? " why-us__viewport--has-left" : ""}${scrollEdges.right ? " why-us__viewport--has-right" : ""}`}>
        <div className={`why-us__grid${isDragging ? " why-us__grid--dragging" : ""}`} onScroll={handleScroll} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={stopDragging} onPointerCancel={stopDragging}>
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 90} y={0} x={0}>
              <a className={`why-us__card why-us__card--${reason.theme}`} href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClickCapture={(event) => {
                if (!suppressClick.current) return;
                suppressClick.current = false;
                event.preventDefault();
                event.stopPropagation();
              }}>
                <div className="why-us__copy"><h3>{reason.title}</h3><p>{reason.text}</p></div>
                <Image className="why-us__image" src={reason.image} alt={`${reason.title} в барбершопе СЕМЬ`} width={720} height={520} sizes="(max-width: 760px) 80vw, 40vw" draggable={false} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

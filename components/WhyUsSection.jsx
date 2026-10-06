"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";

const reasons = [
  { title: "Безопасность", text: "Мы тщательно дезинфицируем рабочие места и инструмент", image: "/images/why-us/defend.webp", theme: "dark" },
  { title: "Стандарт качества", text: "Вся команда проходит обучение и аккредитацию в нашей академии барберов", image: "/images/why-us/standart.webp", theme: "dark" },
  { title: "Гарантия на стрижку", text: "Мы даём гостю 3 дня для корректировки стрижки в случае, если что-то не так", image: "/images/why-us/сalendar.webp", theme: "purple" },
  { title: "Комфорт", text: "У нас введены единые стандарты сервиса", image: "/images/why-us/comfort.webp", theme: "dark" },
];

export default function WhyUsSection() {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef();

  const handleScroll = () => {
    setIsScrolling(true);
    window.clearTimeout(scrollTimeout.current);
    scrollTimeout.current = window.setTimeout(() => setIsScrolling(false), 300);
  };

  return <section className="why-us" id="why-us"><Reveal y={18}><h2 className="why-us__eyebrow">почему мы</h2></Reveal><div className={`why-us__viewport${isScrolling ? " why-us__viewport--scrolling" : ""}`}><div className="why-us__grid" onScroll={handleScroll}>{reasons.map((reason, index) => <Reveal key={reason.title} delay={index * 90} y={24}><article className={`why-us__card why-us__card--${reason.theme}`}><div className="why-us__copy"><h3>{reason.title}</h3><p>{reason.text}</p></div><img className="why-us__image" src={reason.image} alt="" /></article></Reveal>)}</div></div></section>;
}

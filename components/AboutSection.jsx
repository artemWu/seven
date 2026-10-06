"use client";

import Reveal from "./Reveal";
import { useEffect, useRef } from "react";

function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1100;
      const tick = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (ref.current) {
          ref.current.textContent = `${Math.round(value * eased)}${suffix}`;
        }
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>0{suffix}</span>;
}

const facts = [
  { value: "ТОП-10", label: "барбершопов Москвы", image: "/images/why-us/top-10.webp", theme: "light" },
  { value: "83%", label: "индекс возвращаемости", theme: "dark" },
  { value: ">10 лет", label: "на рынке", theme: "light" },
  { value: "4", label: "филиала", theme: "light" },
];

export default function AboutSection() {
  return <section className="about-section" id="about"><Reveal y={18}><h2 className="about-section__eyebrow">о нас</h2></Reveal><div className="about-section__grid">{facts.map((fact, index) => <Reveal key={fact.value} delay={index * 90} y={24}><article className={`about-section__card about-section__card--${fact.theme}`}><h3>{fact.value === "ТОП-10" ? <><span>ТОП-</span><CountUp value={10} /></> : fact.value === "83%" ? <CountUp value={83} suffix="%" /> : fact.value}</h3><p>{fact.label}</p>{fact.image && <img className="about-section__image" src={fact.image} alt="Награда Яндекс Карты" />}</article></Reveal>)}</div></section>;
}

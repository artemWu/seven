"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

type CountUpProps = { value: number; suffix?: string };
type Fact = { value: string; label: string; theme: "light" | "dark"; image?: string };

function CountUp({ value, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1100;
      const tick = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        if (ref.current) ref.current.textContent = `${Math.round(value * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.4 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [suffix, value]);

  return <span ref={ref}>0{suffix}</span>;
}

const facts: Fact[] = [
  { value: "ТОП-10", label: "барбершопов Москвы", image: "/images/why-us/top-10.webp", theme: "light" },
  { value: "83%", label: "индекс возвращаемости", theme: "dark" },
  { value: ">10 лет", label: "на рынке", theme: "light" },
  { value: "4", label: "филиала", theme: "light" },
];

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <Reveal y={18}><h2 className="about-section__eyebrow">цифры</h2></Reveal>
      <div className="about-section__grid">
        {facts.map((fact, index) => (
          <Reveal key={fact.value} delay={index * 90} y={24}>
            <article className={`about-section__card about-section__card--${fact.theme}`}>
              <h3>
                {fact.value === "ТОП-10" ? <><span>ТОП-</span><CountUp value={10} /></> : fact.value === "83%" ? <CountUp value={83} suffix="%" /> : fact.value}
              </h3>
              <p>{fact.label}</p>
              {fact.image && <Image className="about-section__image" src={fact.image} alt="Награда Яндекс Карты" width={240} height={240} sizes="(max-width: 760px) 40vw, 20vw" />}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

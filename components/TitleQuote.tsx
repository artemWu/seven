"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const renderQuoteChars = (text: string, offset: number, totalLength: number, className: string) => (
  [...text].map((character, index) => (
    <span
      className={className}
      key={`${className}-${offset + index}`}
      style={{
        "--quote-char-start": (offset + index) / totalLength,
        "--quote-char-factor": totalLength,
      } as CSSProperties}
    >
      {character}
    </span>
  ))
);

export default function TitleQuote() {
  const quoteRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const quote = quoteRef.current;
    if (!quote) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      quote.style.setProperty("--quote-progress", "1");
      return;
    }

    let raf = 0;
    const updateQuote = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const title = quote.querySelector<HTMLElement>(".title-quote-title");
        const rect = (title ?? quote).getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (window.innerHeight * 0.9 - rect.top) / (window.innerHeight * 0.45)),
        );
        quote.style.setProperty("--quote-progress", String(progress));
        raf = 0;
      });
    };

    updateQuote();
    window.addEventListener("scroll", updateQuote, { passive: true });
    window.addEventListener("resize", updateQuote);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateQuote);
      window.removeEventListener("resize", updateQuote);
    };
  }, []);

  const lead = "В нашей команде работают опытные мастера, которые постоянно развивают навыки и изучают современные техники. Мы подбираем стрижку и бороду с учётом ";
  const accent = "формы лица, образа жизни и индивидуального стиля гостя";
  const suffix = ". В студии вас ждёт уютная домашняя атмосфера.";
  const totalLength = lead.length + accent.length + suffix.length;

  return (
    <section className="title-quote" ref={quoteRef} aria-label="В нашей команде работают опытные мастера, которые постоянно развивают навыки и изучают современные техники. Мы подбираем стрижку и бороду с учётом формы лица, образа жизни и индивидуального стиля гостя. В студии вас ждёт уютная домашняя атмосфера.">
      <div className="title-quote-title">
        {renderQuoteChars(lead, 0, totalLength, "quoteFirstPart")}
        <span className="title-quote-title-accent">
          {renderQuoteChars(accent, lead.length, totalLength, "quoteAccentPart")}
        </span>
        {renderQuoteChars(suffix, lead.length + accent.length, totalLength, "quoteFirstPart")}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Reveal once so scrolling across the threshold cannot restart it.
        setVisible(true);
        observer.unobserve(element);
      },
      {
        threshold: 0.12,

        rootMargin: "0px 0px 10% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${
        visible ? "reveal--visible" : ""
      } ${className}`}
      style={{
        "--reveal-delay": `${delay}ms`,
        "--reveal-y": `${y}px`,
      }}
    >
      {children}
    </div>
  );
}

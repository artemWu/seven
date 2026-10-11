"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealStyle = CSSProperties & {
  "--reveal-delay": string;
  "--reveal-y": string;
  "--reveal-x": string;
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  visibleOnMount?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  x = 0,
  visibleOnMount = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(visibleOnMount);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.unobserve(element);
      },
      { threshold: 0.12, rootMargin: "0px 0px 10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style: RevealStyle = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-y": `${y}px`,
    "--reveal-x": `${x}px`,
  };

  return (
    <div ref={ref} className={`reveal ${visible ? "reveal--visible" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}

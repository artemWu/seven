"use client";

import { useLayoutEffect, useRef, useState } from "react";

type ServicesTabsProps = {
  items: string[];
  activeIndex: number;
  onChange: (index: number) => void;
};

export default function ServicesTabs({ items, activeIndex, onChange }: ServicesTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 2, width: 0 });

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const tabs = tabsRef.current;
      const activeTab = tabs?.querySelector<HTMLButtonElement>(`[data-tab-index="${activeIndex}"]`);
      if (!tabs || !activeTab) return;
      setIndicator({ left: activeTab.offsetLeft, width: activeTab.offsetWidth });
    };

    updateIndicator();
    const observer = new ResizeObserver(updateIndicator);
    if (tabsRef.current) observer.observe(tabsRef.current);
    return () => observer.disconnect();
  }, [activeIndex, items.length]);

  return (
    <div ref={tabsRef} className="services-table__tabs" role="tablist" aria-label="Категории услуг">
      <span
        className="services-table__tab-indicator"
        style={{ left: `${indicator.left}px`, width: `${indicator.width}px` }}
        aria-hidden="true"
      />
      {items.map((item, index) => (
        <button
          className={`services-table__tab${index === activeIndex ? " services-table__tab--active" : ""}`}
          key={item}
          onClick={() => onChange(index)}
          role="tab"
          aria-selected={index === activeIndex}
          data-tab-index={index}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

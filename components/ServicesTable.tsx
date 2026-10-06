"use client";

import { useEffect, useRef, useState } from "react";
import ServicesTabs from "./ServicesTabs";

type ServiceCategory = {
  label: string;
  image: string;
  rows: Array<[string, string, string, string, string]>;
};

const levelHints = {
  senior: "Мастера, которые находятся в нашей компании минимум полгода, сдали внутренние и внешние аттестации, имеют определённый уровень подготовки и навыков для необычных запросов наших гостей, могут предложить большую вариативность стрижек и укладок.",
  top: "Мастера с высоким уровнем подготовки и большим опытом, которые уверенно работают со сложными запросами и создают индивидуальный образ.",
  brand: "Ведущие мастера бренда с максимальным уровнем экспертизы, авторским подходом и большим опытом работы.",
};

const levelLabels = {
  senior: "Старший барбер",
  top: "Топ барбер",
  brand: "Бренд барбер",
};

const categories: ServiceCategory[] = [
  {
    label: "Стрижки",
    image: "/images/services-profile.webp",
    rows: [
      ["Стрижка мужская", "1 700 ₽", "2 000 ₽", "2 400 ₽", "2 800 ₽"],
      ["Стрижка машинкой", "1 400 ₽", "1 700 ₽", "1 900 ₽", "2 200 ₽"],
      ["Стрижка ножницами", "1 900 ₽", "2 300 ₽", "2 700 ₽", "3 100 ₽"],
      ["Детская стрижка (4–10 лет)", "1 400 ₽", "1 700 ₽", "1 900 ₽", "2 100 ₽"],
      ["Окантовка и укладка", "900 ₽", "1 100 ₽", "1 300 ₽", "1 600 ₽"],
      ["Укладка", "700 ₽", "800 ₽", "1 100 ₽", "1 300 ₽"],
      ["Hair tattoo", "—", "—", "700 ₽", "700 ₽"],
      ["Удаление волос воском (1 зона)", "400 ₽", "500 ₽", "500 ₽", "500 ₽"],
      ["Удаление волос воском (2–3 зоны)", "600 ₽", "700 ₽", "700 ₽", "700 ₽"],
    ],
  },
  {
    label: "Бороды",
    image: "/images/services-beard.webp",
    rows: [
      ["Стрижка бороды и усов", "1 200 ₽", "1 400 ₽", "1 800 ₽", "2 100 ₽"],
      ["Моделирование бороды", "1 400 ₽", "1 700 ₽", "2 100 ₽", "2 300 ₽"],
      ["Уход за кожей лица и премиальное оформление бороды Solomon's", "2 300 ₽", "2 800 ₽", "3 000 ₽", "3 300 ₽"],
    ],
  },
  {
    label: "Дополнительные услуги",
    image: "/images/services-care.webp",
    rows: [
      ["Уход за кожей головы LUXINA", "1 200 ₽", "1 400 ₽", "1 500 ₽", "1 500 ₽"],
      ["Комплексный уход за лицом VOLCARE", "1 400 ₽", "1 700 ₽", "1 700 ₽", "1 700 ₽"],
      ["Детокс-уход за кожей лица и бородой THE INGLORIOUS MARINER", "1 200 ₽", "1 400 ₽", "1 500 ₽", "1 500 ₽"],
      ["Лимфодренажный массаж лица", "1 000 ₽", "1 200 ₽", "1 200 ₽", "1 200 ₽"],
      ["Камуфляж бороды", "1 200 ₽", "1 400 ₽", "1 500 ₽", "1 500 ₽"],
      ["Камуфляж головы", "1 500 ₽", "1 800 ₽", "1 800 ₽", "1 800 ₽"],
      ["Патчи", "300 ₽", "400 ₽", "400 ₽", "400 ₽"],
      ["Терапия против выпадения волос WHITE", "800 ₽", "1 000 ₽", "1 000 ₽", "1 000 ₽"],
    ],
  },
  {
    label: "Бритьё",
    image: "/images/services-shave.webp",
    rows: [
      ["Чистое бритьё лица", "1 500 ₽", "1 800 ₽", "2 200 ₽", "2 600 ₽"],
      ["Чистое бритьё головы", "1 500 ₽", "1 800 ₽", "2 200 ₽", "2 600 ₽"],
      ["Бритьё лица шейвером", "1 000 ₽", "1 200 ₽", "1 500 ₽", "1 700 ₽"],
      ["Бритьё головы шейвером", "1 000 ₽", "1 200 ₽", "1 500 ₽", "1 700 ₽"],
    ],
  },
];

export default function ServicesTable() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasMoreColumns, setHasMoreColumns] = useState(true);
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const category = categories[activeIndex];

  const updateScrollMask = () => {
    const element = tableScrollRef.current;
    if (!element) return;
    setHasMoreColumns(element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(updateScrollMask);
    return () => cancelAnimationFrame(frame);
  }, [category.label]);
  const renderLevel = (level: keyof typeof levelHints, lines: string[]) => (
    <span className={`services-table__level services-table__level--${level}`}>
      <span>{lines.map((line) => <span key={line}>{line}<br /></span>)}</span>
      <button className="services-table__hint-trigger" type="button" aria-label={`Подробнее о грейде ${levelLabels[level]}`}>
        <img src="/svg/interactive-icon.svg" alt="" />
        <span className="services-table__hint">
          <strong>{levelLabels[level]}</strong>
          <span>{levelHints[level]}</span>
        </span>
      </button>
    </span>
  );

  return (
    <div className="services-table" aria-label="Прайс-лист услуг">
      <ServicesTabs items={categories.map(({ label }) => label)} activeIndex={activeIndex} onChange={setActiveIndex} />

      <div className="services-table__content" key={category.label}>
        <div className="services-table__photo-wrap">
          <img className="services-table__photo" src={category.image} alt="" />
        </div>
        <div className={`services-table__scroll-mask${hasMoreColumns ? " services-table__scroll-mask--right" : ""}`}>
          <div
            className="services-table__scroll services-table__table-container"
            ref={tableScrollRef}
            onScroll={updateScrollMask}
          >
            <table>
            <thead>
              <tr>
                <th aria-label="Услуга" />
                <th>Барбер</th>
                <th>{renderLevel("senior", ["Старший", "барбер"])}</th>
                <th>{renderLevel("top", ["Топ", "барбер"])}</th>
                <th>{renderLevel("brand", ["Бренд", "барбер"])}</th>
              </tr>
            </thead>
            <tbody>
              {category.rows.map(([name, barber, senior, top, brand]) => (
                <tr key={name}>
                  <th scope="row">{name}</th>
                  <td>{barber}</td>
                  <td>{senior}</td>
                  <td>{top}</td>
                  <td>{brand}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

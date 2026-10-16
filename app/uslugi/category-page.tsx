import type { Metadata } from "next";
import Home from "../page";

export const categories = {
  "mujskie-strigki": "Стрижки",
  "strigka-borody": "Бороды",
  "dopolnitelnye-uslugi": "Дополнительные услуги",
  "mujskie-strigki-lysye": "Бритьё",
} as const;

export function categoryMetadata(category: keyof typeof categories): Metadata {
  const title = categories[category];
  const description = `${title} в барбершопе СЕМЬ Тони Селезнёва в Москве. Цены и онлайн-запись.`;

  return {
    title: `${title} — услуги барбершопа СЕМЬ`,
    description,
    alternates: { canonical: `/uslugi/${category}` },
    openGraph: {
      title: `${title} — услуги барбершопа СЕМЬ`,
      description,
      type: "website",
      url: `/uslugi/${category}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${title} барбершопа СЕМЬ` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — услуги барбершопа СЕМЬ`,
      description: `${title} в барбершопе СЕМЬ Тони Селезнёва в Москве.`,
      images: ["/og-image.png"],
    },
  };
}

export function ServiceCategoryPage({ category }: { category: keyof typeof categories }) {
  return <Home servicesCategory={categories[category]} />;
}

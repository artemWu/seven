import type { Metadata } from "next";
import Home from "../../page";

const categories = {
  "mujskie-strigki": "Стрижки",
  "strigka-borody": "Бороды",
  "dopolnitelnye-uslugi": "Дополнительные услуги",
  "mujskie-strigki-lysye": "Бритьё",
} as const;

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const title = categories[category as keyof typeof categories] ?? "Услуги";

  return {
    title: `${title} — услуги барбершопа СЕМЬ`,
    description: `${title} в барбершопе СЕМЬ Тони Селезнёва в Москве. Цены и онлайн-запись.`,
    alternates: { canonical: `/uslugi/${category}` },
    openGraph: {
      title: `${title} — услуги барбершопа СЕМЬ`,
      description: `${title} в барбершопе СЕМЬ Тони Селезнёва в Москве. Цены и онлайн-запись.`,
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

export default async function ServiceCategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryLabel = categories[category as keyof typeof categories];

  return <Home servicesCategory={categoryLabel} />;
}

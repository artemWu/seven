import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Страница не найдена — Барбершоп СЕМЬ",
  description: "Запрашиваемая страница не найдена.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Header />

      <section className="not-found-page__content" aria-labelledby="not-found-title">
        <p className="not-found-page__code" aria-hidden="true">404</p>
        <h1 id="not-found-title">Что-то пошло не так</h1>
        <Link className="not-found-page__button" href="/">
          На главную
        </Link>
      </section>
    </main>
  );
}

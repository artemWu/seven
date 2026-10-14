import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Button from "@/components/button";
import HaircutsSection from "@/components/HaircutsSection";
import ContactsSection from "@/components/ContactsSection";
import { branches } from "@/data/branches";

export const metadata: Metadata = {
  title: "Галерея стрижек — барбершоп СЕМЬ в Москве",
  description: "Галерея мужских стрижек барбершопа СЕМЬ Тони Селезнёва в Москве.",
  alternates: { canonical: "/galereya" },
  openGraph: {
    title: "Галерея стрижек — барбершоп СЕМЬ в Москве",
    description: "Примеры мужских стрижек и работ барбершопа СЕМЬ.",
    type: "website",
    url: "/galereya",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Галерея стрижек барбершопа СЕМЬ" }],
  },
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero" id="top">
          <div className="hero__content" aria-label="Барбершоп СЕМЬ">
            <Reveal delay={120} y={10}>
              <Image
                src="/svg/seven-sign.svg"
                alt="Барбершоп СЕМЬ Тони Селезнёва"
                width={600}
                height={246}
                className="hero__logo"
                priority
                unoptimized
              />
            </Reveal>
            <Reveal delay={260} y={16}>
              <h1 className="hero__title">Галерея стрижек барбершопа СЕМЬ в Москве</h1>
            </Reveal>
            <Reveal delay={340} y={16}>
              <div className="location">
                <div className="location__stations" aria-label="Локации барбершопа">
                  {branches.map((branch) => (
                    <span className="location-tag" key={branch.station}>{branch.station}</span>
                  ))}
                </div>
                <p className="location__hours">с 10:00 до 22:00</p>
                <p className="location__schedule">Ежедневно</p>
              </div>
            </Reveal>
            <Reveal delay={440} y={16}>
              <Button href="https://n399707.yclients.com/group:12717/city:all#1" target="_blank" rel="noopener noreferrer" theme="dark">
                Записаться
              </Button>
            </Reveal>
          </div>
          <Reveal delay={80} y={0} className="hero__portraits-reveal">
            <div className="hero__portraits">
              <Image className="hero__portrait hero__portrait--left" src="/images/hero-image-right.webp" alt="Мужская стрижка кроп в барбершопе СЕМЬ" width={1000} height={1000} priority unoptimized />
              <Image className="hero__portrait hero__portrait--right" src="/images/hero-seven-left.webp" alt="Мужская стрижка удлинённый кроп в барбершопе СЕМЬ" width={1000} height={1000} priority unoptimized />
            </div>
          </Reveal>
        </section>
        <HaircutsSection />
        <ContactsSection />
      </main>
      <Footer />
    </>
  );
}

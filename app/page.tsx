import Image from "next/image";
import BorderGlow from "@/components/BorderGlow";
import ServiceCard from "../components/ServiceCard";
import TeamSection from "../components/TeamSection";
import ReviewsSection from "../components/ReviewsSection";
import BookingSection from "../components/BookingSection";
import ContactsSection from "../components/ContactsSection";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Button from "../components/button";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HairSalon",
            name: "Свет",
            description:
              "Парикмахерская «Свет» в Москве, рядом с метро Курская и Чкаловская.",
            telephone: "+7 (966) 979-11-00",
            url: "https://svethair.ru/",
            image:
              "https://svethair.ru/images/hero-portrait.webp",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Большой Полуярославский пер. 10, корп. 2",
              addressLocality: "Москва",
              addressCountry: "RU",
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "10:00",
              closes: "22:00",
            },
            makesOffer: [
              { "@type": "Offer", name: "Стрижки" },
              { "@type": "Offer", name: "Борода" },
              { "@type": "Offer", name: "Уход за лицом" },
            ],
          }),
        }}
      />
      <header className="site-header" aria-label="Основная навигация">
        <a className="site-header__logo" href="#top" aria-label="Свет — наверх">
          <Image
            src="/svg/mini-logo.png"
            alt="Свет"
            width={48}
            height={41}
            priority
            unoptimized
          />
        </a>

        <nav className="site-header__nav-shell">
          <a href="#services">Услуги</a>
          <a href="#team">Команда</a>
          <a href="#reviews">Нам доверяют</a>
          <a href="#contacts">Контакты</a>
        </nav>
      </header>
      <main>
      {/* HERO */}
      <section className="hero" id="top">
        <div
          className="hero__content"
          aria-label="Парикмахерская Свет"
        >
          <Image
            src="/svg/logo.png"
            alt="Свет, парикмахерская"
            width={600}
            height={600}
            className="hero__logo hero-animate hero-animate--logo"
            priority
            unoptimized
          />

          <h1 className="hero__title hero-animate hero-animate--location">
            Парикмахерская «Свет» в Москве
          </h1>

          <div className="location hero-animate hero-animate--location">
            <p className="location__station">
              Курская · Чкаловская
            </p>

            <p className="location__hours">
              с 10:00 до 22:00
            </p>

            <p className="location__schedule">
              Ежедневно
            </p>
          </div>

          <BorderGlow
            className="booking-glow"
            edgeSensitivity={12}
            glowColor="29 12 58"
            backgroundColor="#171513"
            borderRadius={12}
            glowRadius={40}
            glowIntensity={1.45}
            coneSpread={28}
            animated
            colors={[
              "#a29588",
              "#f2ebe4",
              "#a29588",
            ]}
            fillOpacity={0.18}
          >
            <a
              className="booking-button"
              href="https://n365899.yclients.com/company/348811/personal/menu?o="
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Записаться</span>
            </a>
          </BorderGlow>
        </div>

        <div className="hero__portraits hero-animate hero-animate--portrait">
          <div
            className="hero__portrait hero__portrait--left"
            role="img"
            aria-label="Портрет мастера парикмахерской"
          />

          <div
            className="hero__portrait hero__portrait--right"
            role="img"
            aria-label="Портрет второго мастера парикмахерской"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="services"
        id="services"
      >
        <h2 className="services__title">
          <Reveal y={12}>
            <span>Услуги</span>
          </Reveal>
        </h2>

        <div className="services__list">
          <Reveal
            delay={0}
            y={24}
          >
            <ServiceCard
              title="Стрижки"
              price="от 2 500 ₽"
              image="/images/haircut.webp"
              background="beige"
            />
          </Reveal>

          <Reveal
            delay={90}
            y={24}
          >
            <ServiceCard
              title="Моделирование"
              price="от 2 000 ₽"
              image="/images/beard.webp"
              background="brown"
            />
          </Reveal>

          <Reveal
            delay={180}
            y={24}
          >
            <ServiceCard
              title="Уход за лицом"
              price="от 1 000 ₽"
              image="/images/care.webp"
              background="gray"
            />
          </Reveal>
        </div>

        <Button
          href="https://n365899.yclients.com/company/348811/personal/select-services?o="
          target="_blank"
          rel="noopener noreferrer"
          theme="dark"
        >
          все услуги
        </Button>
      </section>

      {/* TEAM */}
      <Reveal y={28}>
        <TeamSection />
      </Reveal>

      {/* REVIEWS */}
      <Reveal y={28}>
        <ReviewsSection />
      </Reveal>

      {/* CONTACTS */}
      <Reveal y={28}>
        <ContactsSection />
      </Reveal>

      {/* BOOKING */}
      <Reveal y={18}>
        <BookingSection />
      </Reveal>

    </main>

      {/* FOOTER */}
      <Reveal y={16}>
        <Footer />
      </Reveal>
    </>
  );
}

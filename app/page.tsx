import Image from "next/image";
import TeamSection from "../components/TeamSection";
import WhyUsSection from "../components/WhyUsSection";
import AboutSection from "../components/AboutSection";
import ReviewsSection from "../components/ReviewsSection";
import HaircutsSection from "../components/HaircutsSection";
import BookingSection from "../components/BookingSection";
import ContactsSection from "../components/ContactsSection";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Button from "../components/button";
import ServicesTable from "../components/ServicesTable";
import Header from "../components/Header";
import BookingModal from "../components/BookingModal";
import MobileBookingButton from "../components/MobileBookingButton";
import { branches, NETWORK_PHONE } from "@/data/branches";

export default function Home({
  location,
  teamNames,
}: {
  location?: { station: string; titleSuffix: string };
  teamNames?: string[];
}) {
  const isBranchPage = Boolean(location);
  const currentBranch = location
    ? branches.find((branch) => branch.station === location.station)
    : undefined;
  const schemaAddresses = currentBranch
    ? {
        "@type": "PostalAddress",
        streetAddress: currentBranch.address,
        addressLocality: "Москва",
        addressCountry: "RU",
      }
    : branches.map((branch) => ({
        "@type": "PostalAddress",
        streetAddress: branch.address,
        addressLocality: "Москва",
        addressCountry: "RU",
      }));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HairSalon",
            name: "Барбершоп СЕМЬ Тони Селезнёва",
            image: "/og-image.png",
            description:
              "Барбершоп СЕМЬ Тони Селезнёва в Москве.",
            telephone: currentBranch?.phone ?? NETWORK_PHONE,
            address: schemaAddresses,
            priceRange: "₽₽",
            hasMap: currentBranch?.mapSrc,
            sameAs: ["https://academy7.ru/"],
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
      <Header />
      <BookingModal />
      <MobileBookingButton />
      <main>
      {/* HERO */}
      <section className="hero" id="top">
        <div
          className="hero__content"
          aria-label="7barbershop"
        >
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
            <h1 className="hero__title">Барбершоп СЕМЬ Тони Селезнёва в Москве{location?.titleSuffix ?? ""}</h1>
          </Reveal>

          <Reveal delay={340} y={16}>
            <div className="location">
              <div className="location__stations" aria-label="Локации барбершопа">
                {(isBranchPage ? [location!.station] : ["м. Сокол", "м. Варшавская", "м. Преображенская площадь"]).map((station) => (
                  <span className="location-tag" key={station}><Image src="/svg/geotag.svg" alt="" width={20} height={20} /> {station}</span>
                ))}
              </div>

              <p className="location__hours">с 10:00 до 22:00</p>
              <p className="location__schedule">Ежедневно</p>
            </div>
          </Reveal>

          <Reveal delay={440} y={16}>
            <div className="hero__cta-desktop">
              <Button href="https://n399707.yclients.com/group:12717/city:all#1" target="_blank" rel="noopener noreferrer" theme="dark">
                Записаться
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} y={0} className="hero__portraits-reveal">
        <div className="hero__portraits">
          <Image
            className="hero__portrait hero__portrait--left"
            src="/images/hero-image-right.webp"
            alt="Мужская стрижка кроп в барбершопе СЕМЬ"
            fill
            sizes="(max-width: 899px) 100vw, 50vw"
            priority
            unoptimized
          />

          <Image
            className="hero__portrait hero__portrait--right"
            src="/images/hero-seven-left.webp"
            alt="Мужская стрижка удлинённый кроп в барбершопе СЕМЬ"
            fill
            sizes="(max-width: 899px) 100vw, 50vw"
            priority
            unoptimized
          />
        </div>
        </Reveal>
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

        <Reveal delay={140} y={24}>
          <ServicesTable />
        </Reveal>

        <Button
          href="https://n399707.yclients.com/group:12717/city:all#1"
          target="_blank"
          rel="noopener noreferrer"
          theme="secondary"
          size="small"
        >
          все услуги
        </Button>
      </section>

      {/* TEAM */}
      <Reveal y={28}>
        <TeamSection onlyNames={teamNames} />
      </Reveal>

      <Reveal y={28}>
        <WhyUsSection />
      </Reveal>

      <Reveal y={28}>
        <AboutSection />
      </Reveal>

      {/* REVIEWS */}
      <ReviewsSection />

      {/* HAIRCUTS */}
      <Reveal y={28}>
        <HaircutsSection />
      </Reveal>

      {/* CONTACTS */}
      <Reveal y={28}>
        <ContactsSection initialBranchName={location?.station.replace("м. ", "")} />
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

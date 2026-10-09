"use client";

import { useState } from "react";
import ServicesTabs from "./ServicesTabs";

export default function ContactsSection() {
  const [activeBranch, setActiveBranch] = useState(0);
  const branches = [
    { name: "Сокол", address: "Усиевича 27 к2", phone: "+7 916 664 62 07", station: "м. Сокол", mapSrc: "https://yandex.ru/map-widget/v1/?um=constructor%3A2a840d82130e8367f4872fb25caed1f3cff6f936016b6270bae644723c832311&source=constructor" },
    { name: "Курская", address: "Малый Демидовский пер. 3", phone: "+7 (916) 385 06 02", station: "м. Курская", mapSrc: "https://yandex.ru/map-widget/v1/?um=constructor%3A353e53dab1988b07e4b35732a47a0bc7ae2dfab739e50ea20ea66280abc52e91&source=constructor" },
    { name: "Варшавская", address: "Варшавское шоссе 74к3", phone: "+7 (977) 151 65 25", station: "м. Варшавская", mapSrc: "https://yandex.ru/map-widget/v1/?um=constructor%3A74e9922e876a6a7c975b847042ae82da09e67cc6d0264e01c5eff7a696ce0829&source=constructor" },
    { name: "Преображенская", address: "Краснобогатырская 90с2", phone: "+7 (963) 657 69 43", station: "м. Преображенская", mapSrc: "https://yandex.ru/map-widget/v1/?um=constructor%3A9c56ee52acb48fcc1ca89bb0d9a1317dfea022cc7d474f656900994d55147138&source=constructor" },
  ];
  const branch = branches[activeBranch];

  return (
    <section className="contacts-section" id="contacts">
      <h2 className="contacts-section__title">
        Контакты
      </h2>

      <div className="contacts-mobile-tabs">
        <ServicesTabs
          items={branches.map(({ name }) => name)}
          activeIndex={activeBranch}
          onChange={setActiveBranch}
        />
      </div>

      <div className="contacts-section__content">

        {/* MAP */}
        <div className="contacts-map">
          <iframe
            className="contacts-map__frame"
            src={branch.mapSrc || branches[0].mapSrc}
            loading="lazy"
            title="7barbershop на карте"
          />
        </div>

        {/* ADDRESS */}
        <div className="contacts-card">
          <div className="contacts-card__inner">
            <ServicesTabs
              items={branches.map(({ name }) => name)}
              activeIndex={activeBranch}
              onChange={setActiveBranch}
            />

            <div className="contacts-card__details">
              <div className="contacts-card__copy">
                <a className="contacts-card__address" href={branch.mapSrc || branches[0].mapSrc} target="_blank" rel="noopener noreferrer">{branch.address}</a>
                <a className="contacts-card__phone" href={`tel:${branch.phone.replace(/[^\d+]/g, "")}`}>{branch.phone}</a>
                <div className="contacts-card__station">{branch.station}</div>
                <a className="contacts-card__email" href="mailto:7studioru@gmail.com">7studioru@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

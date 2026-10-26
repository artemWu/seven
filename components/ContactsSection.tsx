"use client";

import { useState } from "react";
import Image from "next/image";
import ServicesTabs from "./ServicesTabs";
import { branches, CONTACT_EMAIL } from "@/data/branches";

export default function ContactsSection({ initialBranchName }: { initialBranchName?: string }) {
  const initialBranch = initialBranchName ? branches.findIndex(({ name }) => name === initialBranchName) : 0;
  const [activeBranch, setActiveBranch] = useState(initialBranch >= 0 ? initialBranch : 0);
  const branch = branches[activeBranch] ?? branches[0];
  const branchNames = branches.map(({ name }) => name);
  const maxLink = branch.name === "Преображенская"
    ? "https://max.ru/u/f9LHodD0cOJc_3KsSRKm7pYGyy7Z8F-s8pnoExj4JsXgc9J_n_o5XRrQF44"
    : branch.name === "Сокол"
      ? "https://max.ru/u/f9LHodD0cOLFXKYcb1yzwou63AzLJkOEamM6TdXrvjUis9cxBnkaWzCWYOY"
      : null;

  return (
    <section className="contacts-section" id="contacts">
      <h2 className="contacts-section__title">Контакты</h2>
      <div className="contacts-mobile-tabs">
        <ServicesTabs items={branchNames} activeIndex={activeBranch} onChange={setActiveBranch} />
      </div>
      <div className="contacts-section__content">
        <div className="contacts-map">
          <iframe className="contacts-map__frame" src={branch.mapSrc} loading="lazy" title="7barbershop на карте" />
        </div>
        <div className="contacts-card">
          <div className="contacts-card__inner">
            <ServicesTabs items={branchNames} activeIndex={activeBranch} onChange={setActiveBranch} />
            <div className="contacts-card__details">
              <div className="contacts-card__copy">
                <a className="contacts-card__address" href={branch.mapSrc} target="_blank" rel="noopener noreferrer">{branch.address}</a>
                <div className="contacts-card__phone-row">
                  <a className="contacts-card__phone" href={`tel:${branch.phone.replace(/[^\d+]/g, "")}`}>
                  <span>{branch.phone}</span>
                  </a>
                  {maxLink ? (
                    <a className="contacts-card__max-link" href={maxLink} target="_blank" rel="noopener noreferrer" aria-label={`Написать в MAX: ${branch.name}`}>
                      <Image className="contacts-card__phone-icon" src="/icons/MAX.svg" alt="" width={24} height={24} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
                <div className="contacts-card__station">{branch.station}</div>
                <a className="contacts-card__email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </div>
            </div>
            <Image
              className="contacts-card__pin"
              src="/images/contacts-pin.webp"
              alt=""
              width={190}
              height={224}
              aria-hidden="true"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}

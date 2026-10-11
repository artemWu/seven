export type Branch = {
  name: string;
  address: string;
  phone: string;
  footerPhone?: string;
  station: string;
  mapSrc: string;
};

export const NETWORK_PHONE = "+7 (977) 797 71 77";
export const CONTACT_EMAIL = "7studioru@gmail.com";

export const branches: Branch[] = [
  { name: "Сокол", address: "Усиевича 27 к2", phone: "+7 916 664 62 07", footerPhone: "+7 (964) 640 15 94", station: "м. Сокол", mapSrc: "https://yandex.ru/map-widget/v1/?um=constructor%3A2a840d82130e8367f4872fb25caed1f3cff6f936016b6270bae644723c832311&source=constructor" },
  { name: "Курская", address: "Малый Демидовский пер. 3", phone: "+7 (916) 385 06 02", station: "м. Курская", mapSrc: "https://yandex.ru/map-widget/v1/?um=constructor%3A353e53dab1988b07e4b35732a47a0bc7ae2dfab739e50ea20ea66280abc52e91&source=constructor" },
  { name: "Варшавская", address: "Варшавское шоссе 74к3", phone: "+7 (977) 151 65 25", station: "м. Варшавская", mapSrc: "https://yandex.ru/map-widget/v1/?um=constructor%3A74e9922e876a6a7c975b847042ae82da09e67cc6d0264e01c5eff7a696ce0829&source=constructor" },
  { name: "Преображенская", address: "Краснобогатырская 90с2", phone: "+7 (963) 657 69 43", station: "м. Преображенская", mapSrc: "https://yandex.ru/map-widget/v1/?um=constructor%3A9c56ee52acb48fcc1ca89bb0d9a1317dfea022cc7d474f656900994d55147138&source=constructor" },
];

export const trainingContact = {
  email: CONTACT_EMAIL,
  phone: "+7 (916) 771 74 46",
};

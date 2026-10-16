import type { Metadata } from "next";
import { categoryMetadata, ServiceCategoryPage } from "../category-page";

export const metadata: Metadata = categoryMetadata("dopolnitelnye-uslugi");

export default function Page() {
  return <ServiceCategoryPage category="dopolnitelnye-uslugi" />;
}

import type { Metadata } from "next";
import { categoryMetadata, ServiceCategoryPage } from "../category-page";

export const metadata: Metadata = categoryMetadata("strigka-borody");

export default function Page() {
  return <ServiceCategoryPage category="strigka-borody" />;
}

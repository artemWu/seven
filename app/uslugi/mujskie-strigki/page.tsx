import type { Metadata } from "next";
import { categoryMetadata, ServiceCategoryPage } from "../category-page";

export const metadata: Metadata = categoryMetadata("mujskie-strigki");
export const dynamic = "force-static";

export default function Page() {
  return <ServiceCategoryPage category="mujskie-strigki" />;
}

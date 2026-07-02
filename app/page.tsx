import { LandingPage } from "@/components/sections/landing-page";
import { landingContent } from "@/lib/landing-content";
import { productFoundation } from "@/lib/product-foundation";

export default function Home() {
  return <LandingPage content={landingContent} productFoundation={productFoundation} />;
}

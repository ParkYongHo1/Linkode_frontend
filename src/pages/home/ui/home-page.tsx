import { Suspense } from "react";

import { HOME_FEATURES } from "../config/home-features";

import { FeatureSection } from "./feature-section";
import { HintPolicy } from "./hint-policy";
import { HomeCta } from "./home-cta";
import { HomeHero } from "./home-hero";

export function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-5 md:px-12">
      <HomeHero />
      {HOME_FEATURES.map((feature, index) => (
        <FeatureSection
          key={feature.id}
          feature={feature}
          reverse={index % 2 === 1}
        />
      ))}
      <HintPolicy />
      <Suspense fallback={null}>
        <HomeCta />
      </Suspense>
    </main>
  );
}

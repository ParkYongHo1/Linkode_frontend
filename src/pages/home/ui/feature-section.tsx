import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import type { HomeFeature } from "../config/home-features";

type FeatureSectionProps = {
  feature: HomeFeature;
  reverse: boolean;
};

export function FeatureSection({ feature, reverse }: FeatureSectionProps) {
  const titleId = `feature-${feature.id}-title`;

  return (
    <section
      aria-labelledby={titleId}
      className="grid grid-cols-1 gap-8 border-t border-border py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-16 md:py-20"
    >
      <div className={cn("flex flex-col", reverse && "md:order-2")}>
        <span className="text-sm font-semibold text-primary-strong">
          {feature.eyebrow}
        </span>
        <h2
          id={titleId}
          className="mt-2 text-2xl leading-[34px] font-bold tracking-[-0.4px] md:text-[30px] md:leading-[40px] md:tracking-[-0.6px]"
        >
          {feature.title}
        </h2>
        <p className="mt-3 text-[15px] leading-6 text-muted-foreground md:text-base md:leading-[26px]">
          {feature.description}
        </p>
        <ul className="mt-6 flex flex-col gap-2.5">
          {feature.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2.5 text-[15px] leading-6 text-body"
            >
              <Check
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-primary"
              />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-border",
          reverse && "md:order-1",
        )}
      >
        <Image
          src={feature.media.src}
          alt={feature.media.alt}
          width={feature.media.width}
          height={feature.media.height}
          unoptimized
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}

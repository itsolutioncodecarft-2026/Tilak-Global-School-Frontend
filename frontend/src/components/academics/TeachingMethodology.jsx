"use client";

import MobileSlider from "@/components/ui/MobileSlider";
import TeachingMethodologyCard from "@/components/academics/TeachingMethodologyCard";
import { teachingMethodology as d } from "@/data/academics";

/**
 * TeachingMethodology — client component (MobileSlider needs useRef/useState).
 *
 * Desktop (md+): 3-column grid of TeachingMethodologyCard.
 * Mobile (below md): one card per swipe via MobileSlider.
 *
 * Zero rounded-*. Zero literal text.
 * All content from data/academics.js → teachingMethodology.
 */
export default function TeachingMethodology() {
  return (
    <div>

      {/* Eyebrow */}
      <span
        className="inline-flex items-center gap-2
                   text-[11px] md:text-xs font-semibold uppercase
                   tracking-[0.2em] text-red-600"
      >
        <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
        {d.eyebrow}
      </span>

      {/* Heading */}
      <h2
        className="mt-4 text-2xl md:text-4xl
                   font-serif font-bold text-[#0B3D91] leading-tight"
      >
        {d.heading}
      </h2>

      {/* Red rule */}
      <div
        aria-hidden="true"
        className="w-12 h-[2px] md:h-1 bg-red-600 mt-4"
      />

      {/* Description */}
      <p className="mt-5 text-sm md:text-base text-gray-600 leading-relaxed">
        {d.description}
      </p>

      {/* Mobile slider — hidden md+ */}
      <MobileSlider
        items={d.items}
        breakpoint="md"
        slideWidth="w-[calc(100vw-2.5rem)]"
        activeDotClass="w-6 h-2 bg-red-600"
        inactiveDotClass="w-2 h-2 bg-gray-300"
        renderItem={(item) => <TeachingMethodologyCard item={item} />}
      />

      {/* Desktop grid — hidden below md */}
      <div
        className="hidden md:grid md:grid-cols-3
                   gap-5 lg:gap-6 mt-8"
      >
        {d.items.map((item) => (
          <TeachingMethodologyCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import MobileSlider from "@/components/ui/MobileSlider";
import { academicStages as d } from "@/data/academics";

/**
 * AcademicStages — client component (MobileSlider needs useRef/useState).
 * Tall image cards, sharp corners, consistent with Management / OurJourney style.
 *
 * Design rules:
 *   • Zero rounded-* anywhere.
 *   • Zero emojis or icon boxes.
 *   • Every string from data/academics.js → academicStages.
 *   • Mobile: description always visible (no reveal needed at small size).
 *   • Desktop (md+): description always visible too — card is tall enough.
 *   • Hover: scale-105 zoom, red tint, white inner frame, red rule widens.
 */

function StageCard({ stage }) {
  return (
    <Link
      href={stage.href}
      className="group relative block w-full h-[380px] md:h-[440px]
                 overflow-hidden shadow-lg border border-[#0B3D91]/10"
      aria-label={`${stage.title} — ${stage.range}`}
    >
      {/* Background image */}
      <Image
        src={stage.image.src}
        alt={stage.image.alt}
        fill
        sizes="(max-width: 768px) 85vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out
                   group-hover:scale-105"
      />

      {/* Permanent bottom gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0
                   bg-gradient-to-t from-[#0B3D91]/95 via-[#0B3D91]/40 to-[#0B3D91]/5
                   pointer-events-none"
      />

      {/* Red hover tint — desktop only */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-red-600 opacity-0
                   md:group-hover:opacity-20
                   transition-opacity duration-500
                   mix-blend-multiply pointer-events-none"
      />

      {/* Hover inner white frame */}
      <div
        aria-hidden="true"
        className="absolute inset-3 border border-white/0
                   md:group-hover:border-white/30
                   transition-colors duration-500 pointer-events-none"
      />

      {/* Red top-left corner accent — horizontal */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-10 h-1 bg-red-600" />
      {/* Red top-left corner accent — vertical */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-1 h-10 bg-red-600" />

      {/* Faint serif stage number — top-right */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-5
                   text-5xl font-serif font-bold text-white/15
                   leading-none select-none pointer-events-none"
      >
        {stage.number}
      </span>

      {/* Bottom content block */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">

        {/* Range eyebrow */}
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-red-300">
          {stage.range}
        </p>

        {/* Animated red rule */}
        <div
          aria-hidden="true"
          className="w-8 h-[2px] bg-red-500 my-3
                     transition-all duration-500 md:group-hover:w-16"
        />

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight">
          {stage.title}
        </h3>

        {/* Description — always visible (card is tall enough) */}
        <p className="mt-2 text-xs md:text-sm text-blue-100/90 leading-relaxed">
          {stage.description}
        </p>

        {/* Stats caption with left red border */}
        <span
          className="mt-3 inline-block
                     text-[10px] uppercase tracking-wider text-red-200
                     border-l-2 border-red-500 pl-2"
        >
          {stage.stats}
        </span>

      </div>
    </Link>
  );
}

export default function AcademicStages() {
  return (
    <section className="bg-white pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
            {d.heading}
          </h2>
          <div
            aria-hidden="true"
            className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-3 mb-3"
          />
          <p className="text-xs md:text-base text-gray-600 max-w-xl mx-auto mb-10 md:mb-14">
            {d.accent}
          </p>
        </div>

        {/* Mobile slider — hidden md+ */}
        <MobileSlider
          items={d.stages}
          breakpoint="md"
          slideWidth="w-[calc(100vw-2.5rem)]"
          activeDotClass="w-6 h-2 bg-red-600"
          renderItem={(stage) => <StageCard stage={stage} />}
        />

        {/* Desktop grid — hidden below md */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {d.stages.map((stage) => (
            <StageCard key={stage.id} stage={stage} />
          ))}
        </div>

      </div>
    </section>
  );
}

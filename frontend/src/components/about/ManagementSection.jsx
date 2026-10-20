"use client";

import MobileSlider from "@/components/ui/MobileSlider";
import ManagementCard from "@/components/about/ManagementCard";
import { management as d } from "@/data/management";

/**
 * ManagementSection — client component (MobileSlider needs useRef/useState).
 *
 * Layout:
 *   Mobile  (below md): one card per swipe via MobileSlider, red dots.
 *   Tablet  (md):       2-column grid.
 *   Desktop (lg+):      4-column grid with hover reveal + card lift.
 *
 * Section:  bg-[#EEF3FB], faint dot pattern, blurred glows.
 * Header:   two-column editorial block on lg+ (heading left, subtext+note right).
 * Cards:    layered backing plate + outline frame + info strip (see ManagementCard).
 *
 * Zero rounded-*. Zero literal text. All strings from data/management.js.
 */
export default function ManagementSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#EEF3FB] pt-8 md:pt-12 pb-8 md:pb-12"
      style={{
        backgroundImage:
          "radial-gradient(rgba(11,61,145,0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >

      {/* ── Decorative blurred glows ── */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-80 h-80
                   bg-[#0B3D91]/5 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-20 w-96 h-96
                   bg-red-600/5 blur-3xl pointer-events-none"
      />

      {/* ── Thin red top edge ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] w-24 bg-red-600"
      />

      {/* ── Faint serif watermark — top-right ── */}
      <span
        aria-hidden="true"
        className="absolute -top-4 right-4
                   text-[6rem] md:text-[9rem] font-serif font-bold
                   text-[#0B3D91]/5 leading-none select-none pointer-events-none"
      >
        {d.heading}
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Section header — two-column on lg+ ── */}
        <div
          className="lg:grid lg:grid-cols-12 lg:items-end gap-6
                     mb-10 md:mb-14"
        >

          {/* Left: eyebrow + heading + rule */}
          <div className="lg:col-span-7">
            <span
              className="inline-flex items-center gap-2
                         text-[11px] md:text-xs font-semibold uppercase
                         tracking-[0.2em] text-red-600"
            >
              <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
              {d.eyebrow}
            </span>

            <h2
              className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem]
                         font-serif font-bold text-[#0B3D91] leading-tight"
            >
              {d.heading}
            </h2>

            <div
              aria-hidden="true"
              className="w-12 h-[2px] md:h-1 bg-red-600 mt-3"
            />
          </div>

          {/* Right: subtext + note */}
          <div
            className="lg:col-span-5 lg:pl-8
                       lg:border-l border-[#0B3D91]/15
                       mt-4 lg:mt-0"
          >
            <p className="text-xs md:text-base text-gray-600 leading-relaxed">
              {d.subtext}
            </p>
            <span
              className="mt-3 inline-block
                         text-[10px] md:text-[11px] uppercase tracking-wider
                         text-red-700 border-l-2 border-red-600 pl-2"
            >
              {d.note}
            </span>
          </div>

        </div>

        {/* ── Mobile slider — hidden md+ ── */}
        <MobileSlider
          items={d.items}
          breakpoint="md"
          slideWidth="w-[calc(100vw-3rem)]"
          activeDotClass="w-6 h-2 bg-red-600"
          renderItem={(item, i) => (
            <ManagementCard item={item} index={i} />
          )}
        />

        {/* ── Desktop grid — hidden below md ── */}
        {/*
          gap-8 md:gap-10 ensures the offset backing plates never touch
          neighbouring cards (plate extends -3px beyond card edge → 10px gap
          gives at least 7px clearance on each side).
        */}
        <div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4
                     gap-8 md:gap-10"
        >
          {d.items.map((item, i) => (
            <ManagementCard key={item.id} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

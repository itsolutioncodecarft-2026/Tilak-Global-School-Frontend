"use client";

import Link from "next/link";
import MobileSlider from "@/components/ui/MobileSlider";
import CampusCard from "@/components/about/CampusCard";
import { ourCampus as d } from "@/data/about";

/**
 * CampusSection — client component (MobileSlider needs useRef/useState).
 *
 * The one dark-blue section on the About page — deliberately contrasts
 * with all other light card sections.
 *
 * Desktop (md+):
 *   Asymmetric 12-col × 2-row mosaic, fixed height:
 *     [0] Campus      — col-span-12 md:col-span-7, row-span-2  (large left)
 *     [1] Classroom   — md:col-span-5, row-span-1              (top right)
 *     [2] Playground  — md:col-span-5, row-span-1              (bottom right)
 *
 * Mobile (below md):
 *   Horizontal snap-scroll via MobileSlider, each tile aspect-[4/3].
 *
 * Zero rounded-*. Zero literal text. All strings from data/about.js → ourCampus.
 */
export default function CampusSection() {
  const [large, ...small] = d.items;

  return (
    <section
      className="relative overflow-hidden bg-[#0B3D91] pt-16 md:pt-24 pb-16 md:pb-24"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 14px)",
      }}
    >

      {/* ── Soft radial glow — top-right ── */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem]
                   bg-white/5 blur-3xl pointer-events-none"
      />

      {/* ── Thin red top edge ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[3px] w-full bg-red-600"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Header row ── */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between
                     gap-6 mb-10 md:mb-14"
        >

          {/* Left: eyebrow + heading + subtext */}
          <div>
            <span
              className="inline-flex items-center gap-2
                         text-[11px] md:text-xs font-semibold uppercase
                         tracking-[0.2em] text-red-300"
            >
              <span aria-hidden="true" className="w-8 h-[2px] bg-red-500 shrink-0" />
              {d.eyebrow}
            </span>

            <h2
              className="mt-3 text-2xl md:text-4xl lg:text-[2.6rem]
                         font-serif font-bold text-white leading-tight"
            >
              {d.heading}
            </h2>

            <p className="mt-3 text-xs md:text-base text-blue-100/80 max-w-xl">
              {d.subtext}
            </p>
          </div>

          {/* Right: stat + CTA */}
          <div className="flex flex-col items-start lg:items-end gap-5 shrink-0">

            {/* Stat */}
            <div className="border-l-2 border-red-500 pl-4">
              <p className="text-2xl md:text-4xl font-serif font-bold text-white">
                {d.stat.value}
              </p>
              <p className="text-[10px] md:text-xs uppercase tracking-wider text-blue-200 mt-0.5">
                {d.stat.label}
              </p>
            </div>

            {/* CTA — white square outline */}
            <Link
              href={d.cta.href}
              className="group inline-flex items-center
                         border-2 border-white/80 text-white
                         hover:bg-white hover:text-[#0B3D91]
                         font-semibold text-xs px-5 py-2.5
                         md:text-sm md:px-7 md:py-3
                         transition-all duration-300"
            >
              {d.cta.label}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4
                           transition-transform duration-300
                           group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

          </div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            MOBILE SLIDER — hidden md+
        ──────────────────────────────────────────────────────────── */}
        <MobileSlider
          items={d.items}
          breakpoint="md"
          slideWidth="w-[calc(100vw-1.5rem)]"
          activeDotClass="w-6 h-2 bg-red-500"
          inactiveDotClass="w-2 h-2 bg-white/30"
          renderItem={(item) => (
            <div className="aspect-[4/3]">
              <CampusCard
                item={item}
                href={d.cta.href}
                sizes="95vw"
                isLarge={false}
              />
            </div>
          )}
        />

        {/* ────────────────────────────────────────────────────────────
            DESKTOP MOSAIC GRID — hidden below md
            12-col × 2-row, fixed height so rows are equal-height halves.
        ──────────────────────────────────────────────────────────── */}
        <div
          className="hidden md:grid
                     grid-cols-12 grid-rows-2
                     gap-3 md:gap-4
                     h-[520px] lg:h-[600px]"
        >

          {/* Tile 1 — large left, both rows */}
          <div className="col-span-12 md:col-span-7 row-span-2">
            <CampusCard
              item={large}
              href={d.cta.href}
              sizes="(max-width: 1280px) 58vw, 700px"
              isLarge
            />
          </div>

          {/* Tile 2 — top right */}
          <div className="md:col-span-5 row-span-1">
            <CampusCard
              item={small[0]}
              href={d.cta.href}
              sizes="(max-width: 1280px) 40vw, 490px"
              isLarge={false}
            />
          </div>

          {/* Tile 3 — bottom right */}
          <div className="md:col-span-5 row-span-1">
            <CampusCard
              item={small[1]}
              href={d.cta.href}
              sizes="(max-width: 1280px) 40vw, 490px"
              isLarge={false}
            />
          </div>

        </div>

      </div>
    </section>
  );
}

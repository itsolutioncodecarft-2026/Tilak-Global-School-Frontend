import Image from "next/image";
import Link from "next/link";
import { hero, stats } from "@/data/home";

/**
 * HeroSection — server component.
 * Full-bleed background image with multi-stop left fade (md+) and
 * vertical overlay (mobile). Editorial hierarchy: eyebrow → badge →
 * split heading → subtext → CTA row.
 *
 * Design rules:
 *   • NO rounded-* on any content element — only the pulsing dot is round.
 *   • Every string from data/home.js → hero / stats.
 *   • Left fade overlay unchanged from original (9-stop gradient).
 *   • The watermark uses stats[2].label ("Since 2016") — data-driven.
 */
export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden
                 min-h-[400px] sm:min-h-[460px] md:min-h-[600px]
                 flex items-center mt-0"
    >

      {/* ══ Layer 0: Full-bleed background image ══ */}
      <Image
        src={hero.imageSrc}
        alt={hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
        style={{ zIndex: 0 }}
      />

      {/* ══ Layer 1a: Horizontal left-fade gradient — md+ ══
          Unchanged from original: 9 stops, solid navy left → transparent right.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden md:block pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(90deg," +
            "#0B3D91 0%," +
            "#0B3D91 30%," +
            "rgba(11,61,145,0.97) 36%," +
            "rgba(11,61,145,0.90) 43%," +
            "rgba(11,61,145,0.75) 51%," +
            "rgba(11,61,145,0.55) 59%," +
            "rgba(11,61,145,0.35) 67%," +
            "rgba(11,61,145,0.18) 76%," +
            "rgba(11,61,145,0.07) 85%," +
            "rgba(11,61,145,0.00) 100%)",
        }}
      />

      {/* ══ Layer 1b: Vertical overlay — mobile only ══ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(180deg," +
            "#0B3D91 0%," +
            "rgba(11,61,145,0.93) 55%," +
            "rgba(11,61,145,0.80) 100%)",
        }}
      />

      {/* ══ Layer 1c: Bottom vignette — blends into StatsBar ══ */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 md:h-40 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to top, rgba(11,61,145,0.65) 0%, transparent 100%)",
        }}
      />

      {/* ══ Layer 2: Faint serif year watermark — bottom-right, desktop only ══ */}
      <span
        aria-hidden="true"
        className="hidden md:block absolute right-6 bottom-28
                   text-[6rem] md:text-[9rem] font-serif font-bold
                   text-white/5 leading-none select-none pointer-events-none"
        style={{ zIndex: 3 }}
      >
        {stats[2].label}
      </span>

      {/* ══ Layer 3: Content ══ */}
      <div
        className="relative z-20 w-full max-w-7xl mx-auto
                   px-4 md:px-8 pt-14 md:pt-20 pb-28 md:pb-36"
      >
        {/*
          Thin vertical red editorial line + top square accent — lg+ only.
          Uses Tailwind's before: pseudo-element via arbitrary values.
          Positioned to the left of the content block, inside the section.
        */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute left-4 top-24
                     w-[2px] h-40 bg-red-600
                     before:absolute before:-top-1 before:-left-[3px]
                     before:w-2 before:h-2 before:bg-red-600"
        />

        {/* Text block */}
        <div className="w-full max-w-xl lg:max-w-2xl">

          {/* Eyebrow */}
          <span
            className="inline-flex items-center gap-2
                       text-[11px] md:text-xs font-semibold uppercase
                       tracking-[0.2em] text-red-300"
          >
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-500 shrink-0" />
            {hero.eyebrow}
          </span>

          {/* Admissions badge — square ribbon with left border accent */}
          <div className="mt-4">
            <span
              className="inline-flex items-center gap-2
                         bg-red-600 text-white
                         text-[10px] md:text-xs font-semibold uppercase tracking-wider
                         px-3 py-1.5 border-l-4 border-white/70"
            >
              {/* Pulsing dot — the only round element allowed */}
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shrink-0"
              />
              {hero.badge}
            </span>
          </div>

          {/* Heading — split across two lines */}
          <h1
            className="mt-5 font-serif font-bold text-white leading-[1.1]
                       text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {hero.headingLine1}{" "}
            {/*
              Second line: slightly lighter colour, clean end.
            */}
            <span className="block text-red-100">
              {hero.headingLine2}
            </span>
          </h1>

          {/* Subtext paragraph — left red rule */}
          <p
            className="mt-8 text-xs sm:text-sm md:text-lg text-blue-100
                       leading-relaxed border-l-2 border-red-500/70
                       pl-4 md:pl-5 max-w-lg"
          >
            {hero.subtext}
          </p>

          {/* CTA row — square corners on both buttons */}
          <div className="mt-8 flex flex-row flex-wrap gap-3 md:gap-4">
            {hero.cta.map((btn) =>
              btn.variant === "primary" ? (
                <Link
                  key={btn.href}
                  href={btn.href}
                  className="group inline-flex items-center
                             bg-red-600 hover:bg-red-700 text-white font-semibold
                             text-xs px-5 py-2.5 md:text-sm md:px-7 md:py-3.5
                             shadow-lg hover:-translate-y-0.5
                             transition-all duration-300 whitespace-nowrap"
                >
                  {btn.label}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ) : (
                <Link
                  key={btn.href}
                  href={btn.href}
                  className="inline-flex items-center
                             border-2 border-white/80 text-white
                             hover:bg-white hover:text-[#0B3D91] font-semibold
                             text-xs px-5 py-2.5 md:text-sm md:px-7 md:py-3.5
                             transition-all duration-300 whitespace-nowrap"
                >
                  {btn.label}
                </Link>
              )
            )}
          </div>

        </div>{/* end text block */}
      </div>{/* end content layer */}
    </section>
  );
}

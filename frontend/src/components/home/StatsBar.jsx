import { stats } from "@/data/home";

/**
 * StatsBar — server component.
 * Layered composition: navy backing plate (bottom-right) + red outline
 * frame (top-left) + sharp white main bar (z-10).
 *
 * Overlaps the hero via negative top margin (-mt-10 mobile, -mt-20 desktop).
 * The outer section wrapper (page.jsx) has no overflow-hidden so the plates
 * can render visibly; horizontal overflow is prevented by mx-3/mx-auto.
 *
 * Desktop: 5-column grid, each cell turns solid navy on hover.
 * Mobile:  horizontally swipeable snap strip, no hover effects.
 *
 * Design rules:
 *   • NO rounded-* anywhere on the bar, plates, frame or cells.
 *   • Every string from data/home.js → stats.
 */
export default function StatsBar() {
  return (
    /*
      Outer positioning wrapper.
      z-30 sits above the hero (z-20 content, z-0–3 image layers).
      mx-3 on mobile keeps the plates from touching the viewport edge.
      The negative margin pulls the bar up over the hero's bottom vignette.
    */
    <div className="relative z-30 mx-3 md:mx-auto md:max-w-6xl -mt-10 md:-mt-20">

      {/* ── Backing plate: solid navy, offset bottom-right ── */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4
                   w-full h-full bg-[#0B3D91] z-0"
      />

      {/* ── Outline frame: red border, offset top-left ── */}
      <div
        aria-hidden="true"
        className="absolute -top-2 -left-2 md:-top-4 md:-left-4
                   w-full h-full border-2 border-red-600 z-0"
      />

      {/* ── Main bar: white, sharp corners, red top rule ── */}
      <div
        className="relative z-10 bg-white shadow-2xl border-t-4 border-red-600"
      >

        {/* ══ MOBILE: swipeable snap strip — hidden md+ ══ */}
        <div
          className="md:hidden flex flex-row flex-nowrap overflow-x-auto
                     snap-x snap-mandatory scroll-smooth scrollbar-hide
                     divide-x divide-gray-200"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="snap-start shrink-0 min-w-[130px]
                         px-4 py-4 text-center"
            >
              {/* Small red square marker */}
              <div
                aria-hidden="true"
                className="mx-auto mb-1.5 w-1.5 h-1.5 bg-red-600"
              />
              <p className="text-sm font-serif font-bold text-[#0B3D91] whitespace-nowrap">
                {stat.label}
              </p>
              <p className="text-[9px] uppercase tracking-wide text-gray-500 whitespace-nowrap mt-0.5">
                {stat.subtextMobile}
              </p>
            </div>
          ))}
          {/* Right padding so last card clears the right-edge fade */}
          <div className="shrink-0 w-6" aria-hidden="true" />
        </div>

        {/* Right-edge scroll-hint fade — mobile only */}
        <div
          aria-hidden="true"
          className="md:hidden absolute right-0 top-0 h-full w-10
                     bg-gradient-to-l from-white to-transparent pointer-events-none"
        />

        {/* ══ DESKTOP: 5-column grid — hidden below md ══ */}
        <div className="hidden md:grid grid-cols-5 divide-x divide-gray-200">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative px-4 md:px-6 py-5 md:py-7
                         text-center group
                         hover:bg-[#0B3D91] transition-colors duration-300
                         cursor-default"
            >
              {/* Faint serif index number — top-right of each cell */}
              <span
                aria-hidden="true"
                className="absolute top-2 right-3
                           text-xs font-serif
                           text-[#0B3D91]/15 group-hover:text-white/20
                           transition-colors duration-300 select-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Small red square marker above the value */}
              <div
                aria-hidden="true"
                className="mx-auto mb-2 w-1.5 h-1.5 bg-red-600
                           group-hover:bg-white transition-colors duration-300"
              />

              {/* Stat value */}
              <p
                className="text-lg md:text-2xl lg:text-[1.7rem] font-serif font-bold
                           text-[#0B3D91] group-hover:text-white
                           whitespace-nowrap transition-colors duration-300"
              >
                {stat.label}
              </p>

              {/* Stat label */}
              <p
                className="mt-1 text-[10px] md:text-xs uppercase tracking-wide
                           text-gray-500 group-hover:text-blue-100
                           transition-colors duration-300"
              >
                {stat.subtext}
              </p>

            </div>
          ))}
        </div>

      </div>{/* end main bar */}
    </div>
  );
}

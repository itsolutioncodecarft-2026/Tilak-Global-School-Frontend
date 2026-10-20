import { examinationInformation as d } from "@/data/academics";

/**
 * ExaminationInformation — server component.
 * Full-width editorial panel: left = description, right = highlights list.
 * Rendered as ONE wide block — not two separate cards.
 *
 * Zero rounded-*. Zero emojis/icon boxes. Zero literal text.
 * All content from data/academics.js → examinationInformation.
 */
export default function ExaminationInformation() {
  return (
    <section className="w-full bg-[#EEF3FB] border-t-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* One wide panel — internal two-column grid on lg+ */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12
                     px-0 py-10 md:py-14"
        >

          {/* ── Left: eyebrow + heading + description + note ── */}
          <div className="lg:col-span-7">

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
              className="mt-4 text-xl sm:text-2xl md:text-4xl
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
            <p className="mt-5 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
              {d.description}
            </p>

            {/* Note — left red border block */}
            <div
              className="mt-5 border-l-4 border-red-600
                         bg-red-50/70 px-4 py-3"
            >
              <p className="text-[11px] md:text-xs uppercase tracking-wider
                            text-red-700 leading-relaxed">
                {d.note}
              </p>
            </div>

          </div>

          {/* ── Right: highlights list ── */}
          <div className="lg:col-span-5">

            <p
              className="text-[11px] md:text-xs font-semibold uppercase
                         tracking-[0.2em] text-[#0B3D91] mb-4"
            >
              {d.eyebrow}
            </p>

            <ul className="divide-y divide-[#0B3D91]/10 border-y border-[#0B3D91]/10">
              {d.highlights.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-4
                             py-3 md:py-4 px-2
                             hover:bg-white/60 transition-colors duration-200"
                >
                  {/* Red square marker */}
                  <span
                    aria-hidden="true"
                    className="mt-[5px] w-2 h-2 bg-red-600 shrink-0
                               group-hover:scale-110 transition-transform duration-200"
                  />
                  <span
                    className="text-xs sm:text-sm md:text-base
                               text-gray-700 leading-relaxed"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

          </div>

        </div>
      </div>
    </section>
  );
}

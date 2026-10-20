import { cbseCurriculum as d } from "@/data/academics";

/**
 * CbseCurriculum — server component.
 * Clean editorial layout: eyebrow → heading → red rule → description →
 * note (left-red-border block) → divider list of highlights.
 *
 * Zero rounded-*. Zero emojis/icon boxes. Zero literal text.
 * All content from data/academics.js → cbseCurriculum.
 */
export default function CbseCurriculum() {
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

      {/* Note — left red border block */}
      <div
        className="mt-5 border-l-4 border-red-600
                   bg-red-50/60 px-4 py-3"
      >
        <p className="text-[11px] md:text-xs uppercase tracking-wider
                      text-red-700 leading-relaxed">
          {d.note}
        </p>
      </div>

      {/* Highlights — divider list */}
      <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
        {d.highlights.map((item) => (
          <li
            key={item}
            className="group flex items-start gap-4
                       py-3 px-2
                       hover:bg-[#EEF3FB] transition-colors duration-200"
          >
            {/* Red square marker */}
            <span
              aria-hidden="true"
              className="mt-[5px] w-2 h-2 bg-red-600 shrink-0
                         group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-sm md:text-base text-gray-700 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
}

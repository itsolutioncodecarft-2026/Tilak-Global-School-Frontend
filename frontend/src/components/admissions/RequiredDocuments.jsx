import { requiredDocuments as d } from "@/data/admissions";

/**
 * RequiredDocuments — server component.
 * Divider list with red square markers.
 * Zero rounded-*. Zero literals.
 */
export default function RequiredDocuments() {
  return (
    <div>
      {/* Eyebrow */}
      <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
        <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
        {d.eyebrow}
      </span>

      <h2 className="mt-4 text-xl md:text-3xl font-serif font-bold text-[#0B3D91]">
        {d.heading}
      </h2>
      <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mt-3" />

      {/* Note */}
      <div className="mt-5 border-l-4 border-red-600 bg-red-50/60 px-4 py-3">
        <p className="text-[11px] md:text-xs uppercase tracking-wider text-red-700">
          {d.note}
        </p>
      </div>

      {/* Document list */}
      <ul className="mt-6 divide-y divide-[#0B3D91]/10 border-y border-[#0B3D91]/10">
        {d.items.map((item) => (
          <li
            key={item}
            className="group flex items-start gap-4 py-3 px-2
                       hover:bg-[#EEF3FB] transition-colors duration-200"
          >
            <span
              aria-hidden="true"
              className="mt-[5px] w-2 h-2 bg-red-600 shrink-0
                         group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

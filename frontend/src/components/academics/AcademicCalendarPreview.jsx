import Link from "next/link";
import AcademicEventCard from "@/components/academics/AcademicEventCard";
import { academicCalendar, academicCalendarPreview as cfg } from "@/data/academics";

/**
 * AcademicCalendarPreview — server component.
 * Displays the first `cfg.limit` events from academicCalendar.events.
 * Used on the main Academics page; the full calendar page shows all events.
 *
 * Both pages read from the SAME academicCalendar export — data is never
 * duplicated. Updating academicCalendar.events updates both pages at once.
 *
 * Zero rounded-*. Zero literal text.
 * All content from data/academics.js → academicCalendar / academicCalendarPreview.
 */
export default function AcademicCalendarPreview() {
  const events = academicCalendar.events.slice(0, cfg.limit);

  return (
    <section className="w-full bg-white py-12 md:py-20
                        border-t border-[#0B3D91]/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Centred header ── */}
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="text-2xl md:text-4xl
                       font-serif font-bold text-[#0B3D91]"
          >
            {cfg.heading}
          </h2>
          <div
            aria-hidden="true"
            className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-4"
          />
          <p className="mt-4 text-xs md:text-base text-gray-600 max-w-xl mx-auto">
            {cfg.subtext}
          </p>
        </div>

        {/* ── Event cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
          {events.map((event) => (
            <AcademicEventCard key={event.id} event={event} />
          ))}
        </div>

        {/* ── View all CTA ── */}
        <div className="flex justify-center mt-8 md:mt-10">
          <Link
            href={cfg.viewAll.href}
            className="group inline-flex items-center
                       border-2 border-[#0B3D91] text-[#0B3D91]
                       hover:bg-[#0B3D91] hover:text-white
                       font-semibold text-xs px-5 py-2.5
                       md:text-sm md:px-7 md:py-3
                       transition-all duration-300"
          >
            {cfg.viewAll.label}
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
    </section>
  );
}

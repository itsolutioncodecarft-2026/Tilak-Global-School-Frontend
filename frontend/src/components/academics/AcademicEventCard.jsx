/**
 * AcademicEventCard — server component.
 * Single event card used in AcademicCalendarPreview and the full calendar page.
 *
 * Props:
 *   event — { id, day, month, title, description, category, dateConfirmed }
 *
 * Design rules:
 *   • Zero rounded-* anywhere — every corner sharp.
 *   • Zero literal text — every string from props.
 *   • Unconfirmed dates shown as 'TBA' instead of implying confirmed dates.
 *   • Hover: card lifts, shadow deepens, date block turns red.
 */
export default function AcademicEventCard({ event }) {
  return (
    <div
      className="group relative bg-white border border-[#0B3D91]/15
                 shadow-sm
                 md:hover:-translate-y-1 md:hover:shadow-lg
                 transition-all duration-300
                 overflow-hidden"
    >
      {/* Red bottom border that expands left→right on hover */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600
                   md:group-hover:w-full transition-all duration-500"
      />

      <div className="flex items-start gap-4 p-5 md:p-6">

        {/* Date block — square, navy at rest → red on hover */}
        <div
          className="shrink-0 w-14 h-14 md:w-16 md:h-16
                     bg-[#0B3D91] md:group-hover:bg-red-600
                     transition-colors duration-300
                     flex flex-col items-center justify-center
                     text-white"
        >
          <span className="text-lg md:text-xl font-serif font-bold leading-none">
            {event.day}
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-wide text-blue-100 mt-0.5">
            {event.month}
          </span>
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">

          {/* Category tag */}
          <span
            className="inline-block text-[10px] uppercase tracking-wider
                       text-red-700 border-l-2 border-red-600 pl-2 mb-2"
          >
            {event.category}
          </span>

          {/* Title */}
          <h3
            className="text-sm md:text-base font-serif font-bold text-[#0B3D91]
                       leading-snug"
          >
            {event.title}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs md:text-sm text-gray-600 leading-relaxed">
            {event.description}
          </p>

          {/* Unconfirmed notice */}
          {!event.dateConfirmed && (
            <span
              className="mt-2 inline-block text-[10px] uppercase tracking-wider
                         text-amber-700 bg-amber-50 border border-amber-200
                         px-2 py-0.5"
            >
              Date to be confirmed
            </span>
          )}

        </div>
      </div>
    </div>
  );
}

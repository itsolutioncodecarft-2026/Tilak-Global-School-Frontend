import Image from "next/image";
import Link from "next/link";

/**
 * FacilityCard — server component.
 * Sharp-cornered image card consistent with AcademicStages and ManagementCard.
 *
 * Props:
 *   facility — { id, title, description, image: { src, alt }, href }
 *   index    — zero-based position used for the faint serif watermark number
 *
 * Design rules:
 *   • Zero rounded-* anywhere.
 *   • Hover: zoom, red tint, white inner frame, red rule widens.
 *   • Mobile (below md): description always visible.
 *   • Desktop (md+): description hidden by default, slides up on hover
 *     via the grid-rows trick (same pattern as ManagementCard).
 */
export default function FacilityCard({ facility, index = 0 }) {
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={facility.href}
      className="group relative block w-full aspect-[4/3] md:aspect-[3/2]
                 overflow-hidden shadow-lg border border-[#0B3D91]/10"
      aria-label={facility.title}
    >
      {/* Background image — zooms on hover */}
      <Image
        src={facility.image.src}
        alt={facility.image.alt}
        fill
        sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 22vw"
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

      {/* Faint serif index number — top-right */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-5
                   text-4xl md:text-5xl font-serif font-bold text-white/15
                   leading-none select-none pointer-events-none"
      >
        {ordinal}
      </span>

      {/* Bottom content block */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-white">

        {/* Animated red rule */}
        <div
          aria-hidden="true"
          className="w-8 h-[2px] bg-red-500 mb-3
                     transition-all duration-500 md:group-hover:w-16"
        />

        {/* Title */}
        <p className="text-base md:text-xl font-serif font-bold text-white leading-tight">
          {facility.title}
        </p>

        {/*
          Description reveal block — same grid-rows pattern as ManagementCard.
          Mobile  (below md): always visible → grid-rows-[1fr] opacity-100
          Desktop (md+):      hidden by default, slides up on hover
        */}
        <div
          className="grid grid-rows-[1fr] opacity-100 translate-y-0
                     md:grid-rows-[0fr] md:opacity-0 md:translate-y-3
                     md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100
                     md:group-hover:translate-y-0
                     transition-all duration-500 ease-out"
        >
          <div className="overflow-hidden">
            <p className="mt-2 text-xs md:text-sm text-blue-100/90 leading-relaxed">
              {facility.description}
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
}

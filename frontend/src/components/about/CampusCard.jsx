import Image from "next/image";
import Link from "next/link";

/**
 * CampusCard — server component.
 * Cinematic mosaic tile for the dark-blue Campus section.
 * NO border, NO frame, NO backing plate — full-bleed image with overlay.
 *
 * Props:
 *   item    — { id, number, title, caption, description, image: { src, alt } }
 *   href    — navigation target for the whole tile
 *   sizes   — Next.js Image sizes string (passed per-tile for correct srcset)
 *   isLarge — true for the big left tile (col-span-7 / row-span-2)
 *
 * Design rules:
 *   • Zero rounded-* anywhere.
 *   • Zero literal text — every string from props.
 *   • No border, no plate, no frame — stark cinematic style.
 *   • Image: grayscale-[35%] at rest → grayscale-0 on hover.
 *   • Hover: scale-110 over 900ms, red tint (desktop only).
 *   • Description: grid-rows reveal on desktop, always visible on mobile.
 *   • White underline draws in from left under title on hover.
 *   • Square arrow indicator bottom-right.
 */
export default function CampusCard({ item, href, sizes, isLarge = false }) {
  return (
    <Link
      href={href}
      aria-label={item.title}
      className="group relative block w-full h-full overflow-hidden"
    >
      {/* ── Background image ── */}
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes={sizes}
        className="object-cover
                   transition-all duration-[900ms] ease-out
                   group-hover:scale-110
                   grayscale-[35%] group-hover:grayscale-0"
      />

      {/* ── Cinematic gradient overlay — permanent ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0
                   bg-gradient-to-t from-[#061F4D]/95 via-[#061F4D]/35 to-transparent
                   pointer-events-none"
      />

      {/* ── Red hover tint — desktop only ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-red-600 opacity-0
                   md:group-hover:opacity-15
                   transition-opacity duration-500
                   mix-blend-multiply pointer-events-none"
      />

      {/* ── Number badge — top-left ── */}
      <span
        className="absolute top-5 left-5
                   bg-red-600 text-white
                   text-[10px] font-semibold tracking-[0.2em]
                   px-2.5 py-1"
      >
        {item.number}
      </span>

      {/* ── Bottom content block ── */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 text-white">

        {/* Title with animated white underline */}
        <p
          className={`font-serif font-bold leading-tight
                      after:block after:h-[2px] after:w-0 after:bg-white
                      after:transition-all after:duration-500 after:mt-2
                      md:group-hover:after:w-16
                      ${isLarge
                        ? "text-xl md:text-3xl"
                        : "text-lg md:text-2xl"
                      }`}
        >
          {item.title}
        </p>

        {/* Caption */}
        <p className="mt-1 text-[11px] md:text-xs uppercase tracking-wider
                      text-blue-100/80">
          {item.caption}
        </p>

        {/*
          Description reveal.
          Mobile  (below md): always visible.
          Desktop (md+):      hidden by default, slides in on hover.
        */}
        <div
          className="grid grid-rows-[1fr] opacity-100
                     md:grid-rows-[0fr] md:opacity-0
                     md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100
                     transition-all duration-500 ease-out"
        >
          <div className="overflow-hidden">
            <p className="mt-3 text-xs md:text-sm text-blue-50/90
                          leading-relaxed max-w-md">
              {item.description}
            </p>
          </div>
        </div>

      </div>

      {/* ── Square arrow indicator — bottom-right ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-5 right-5
                   w-9 h-9 border border-white/40
                   flex items-center justify-center
                   text-white opacity-70
                   md:group-hover:opacity-100 md:group-hover:bg-white
                   md:group-hover:text-[#0B3D91]
                   transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

    </Link>
  );
}

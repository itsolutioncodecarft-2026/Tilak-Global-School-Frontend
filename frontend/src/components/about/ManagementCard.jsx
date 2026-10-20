import Image from "next/image";

/**
 * ManagementCard — server component.
 * Square image card with layered backing plate (navy, bottom-right) +
 * outline frame (red, top-left) behind it, plus a white info strip below.
 *
 * Props:
 *   item  — { id, role, name, description, image: { src, alt } }
 *   index — zero-based position (ordinal watermark)
 *
 * Design rules:
 *   • Zero rounded-* anywhere.
 *   • Zero literal text — every string from props.
 *   • Name + description: hidden on desktop by default (grid-rows reveal),
 *     always visible on mobile.
 *   • Card lifts on md:hover via translate on the outer group wrapper.
 */
export default function ManagementCard({ item, index }) {
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    /*
      Outer group wrapper — provides the coordinate space for the
      backing plate and outline frame, and carries the hover-lift.
      pt/pl/pb/pr offsets reserve visual space so the absolute
      decoration layers render fully without clipping.
    */
    <div
      className="group relative pt-2 pl-2 pb-2 pr-2
                 md:pt-3 md:pl-3 md:pb-3 md:pr-3
                 md:hover:-translate-y-1.5 transition-transform duration-300"
    >

      {/* ── Backing plate: solid navy, offset bottom-right ── */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3
                   w-full h-full bg-[#0B3D91] z-0"
      />

      {/* ── Outline frame: red border, offset top-left ── */}
      <div
        aria-hidden="true"
        className="absolute -top-2 -left-2 md:-top-3 md:-left-3
                   w-full h-full border-2 border-red-600 z-0"
      />

      {/* ── Card body (image + info strip) — z-10 above plates ── */}
      <div className="relative z-10">

        {/* Square image block */}
        <div
          className="relative w-full aspect-square overflow-hidden
                     shadow-lg border border-[#0B3D91]/10"
        >
          {/* Background photo */}
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 768px) 85vw, 25vw"
            className="object-cover object-top
                       transition-transform duration-700 ease-out
                       group-hover:scale-105"
          />

          {/* Permanent bottom gradient */}
          <div
            aria-hidden="true"
            className="absolute inset-0
                       bg-gradient-to-t from-[#0B3D91]/95 via-[#0B3D91]/35 to-transparent
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
                       text-4xl md:text-5xl font-serif font-bold
                       text-white/15 leading-none select-none pointer-events-none"
          >
            {ordinal}
          </span>

          {/* Content block — pinned to bottom */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">

            {/* Animated red rule */}
            <div
              aria-hidden="true"
              className="w-8 h-[2px] bg-red-500 mb-3
                         transition-all duration-500 md:group-hover:w-16"
            />

            {/* Role — always visible */}
            <p className="text-lg md:text-xl font-serif font-bold tracking-tight">
              {item.role}
            </p>

            {/*
              Reveal block: name + description.
              Mobile  (below md): always visible.
              Desktop (md+):      hidden, slides up on hover.
            */}
            <div
              className="grid grid-rows-[1fr] opacity-100 translate-y-0
                         md:grid-rows-[0fr] md:opacity-0 md:translate-y-3
                         md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100
                         md:group-hover:translate-y-0
                         transition-all duration-500 ease-out"
            >
              <div className="overflow-hidden">
                <p className="text-sm md:text-base font-semibold text-red-200 mt-1">
                  {item.name}
                </p>
                <p className="text-xs md:text-sm text-blue-100/90 leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>
            </div>

          </div>
        </div>{/* end image block */}

        {/* ── Info strip — white bar below the square photo ── */}
        <div
          className="relative bg-white border border-t-0 border-[#0B3D91]/15
                     px-4 py-3 flex items-center justify-between"
        >
          <p
            className="text-[10px] md:text-[11px] uppercase tracking-[0.18em]
                       text-[#0B3D91]"
          >
            {item.role}
          </p>
          <span
            className="text-sm font-serif font-bold text-red-600"
          >
            {ordinal}
          </span>
        </div>

      </div>{/* end card body */}
    </div>
  );
}

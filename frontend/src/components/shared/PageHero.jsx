import Image from "next/image";
import Link from "next/link";

/**
 * PageHero — shared full-bleed hero for all inner pages.
 *
 * Props:
 *   data: {
 *     heading     string            (required)
 *     subtext     string            (required)
 *     breadcrumb  { label, href }[] (required, last item = current page)
 *     badge?      string            (optional square ribbon above heading)
 *     image?      { src, alt }      (optional — when absent, solid navy bg)
 *   }
 *
 * Fallback: when data.image is not supplied the section renders a solid
 * bg-[#0B3D91] with the dot pattern — consistent for sub-pages that don't
 * yet have a custom background photo.
 *
 * Design rules:
 *   • Zero rounded-* anywhere.
 *   • Zero literal text — every string from data prop.
 *   • Left fade overlay: 7-stop horizontal gradient (same technique as HeroSection).
 *   • Vertical overlay keeps text readable at all viewport widths.
 */
export default function PageHero({ data }) {
  const { heading, subtext, breadcrumb = [], badge, image } = data;
  const lastIdx = breadcrumb.length - 1;
  const hasImage = Boolean(image?.src);

  return (
    <section
      className={`relative overflow-hidden
                  min-h-[280px] md:min-h-[420px]
                  flex items-end
                  ${hasImage ? "" : "bg-[#0B3D91]"}`}
    >

      {/* ══ Background image — only when data.image exists ══ */}
      {hasImage && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ zIndex: 0 }}
        />
      )}

      {/* ══ Horizontal left-to-right fade overlay — md+ ══
          Solid navy left → transparent right (same 7-stop technique as HeroSection).
          On image pages this creates the seamless editorial left column.
          On no-image pages this adds a subtle depth gradient over the solid bg.
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
            "rgba(11,61,145,0.95) 42%," +
            "rgba(11,61,145,0.80) 55%," +
            "rgba(11,61,145,0.55) 68%," +
            "rgba(11,61,145,0.30) 82%," +
            "rgba(11,61,145,0.15) 100%)",
        }}
      />

      {/* ══ Mobile overlay — flat, high-opacity for readability ══ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{
          zIndex: 1,
          background: "rgba(11,61,145,0.85)",
        }}
      />

      {/* ══ Vertical overlay — top-dark + bottom-dark ══ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(180deg," +
            "rgba(11,61,145,0.30) 0%," +
            "transparent 40%," +
            "rgba(11,61,145,0.80) 100%)",
        }}
      />

      {/* ══ Dot pattern texture ══ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* ══ Red bottom edge ══ */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-1 w-full bg-red-600"
        style={{ zIndex: 3 }}
      />

      {/* ══ Thin vertical red line + square cap — lg+ only ══ */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute left-4 top-20 w-[2px] h-32 bg-red-600
                   before:absolute before:-top-1 before:-left-[3px]
                   before:w-2 before:h-2 before:bg-red-600"
        style={{ zIndex: 3 }}
      />

      {/* ══ Content ══ */}
      <div
        className="relative w-full max-w-7xl mx-auto
                   px-4 md:px-8 pb-10 md:pb-14 pt-24 md:pt-32"
        style={{ zIndex: 10 }}
      >

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center flex-wrap gap-x-2 gap-y-1">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {i < lastIdx ? (
                  <>
                    <Link
                      href={crumb.href}
                      className="text-[10px] md:text-xs uppercase tracking-[0.18em]
                                 text-blue-200 hover:text-white transition-colors duration-200"
                    >
                      {crumb.label}
                    </Link>
                    {/* Square separator */}
                    <span
                      aria-hidden="true"
                      className="w-1 h-1 bg-red-500 shrink-0"
                    />
                  </>
                ) : (
                  <span
                    aria-current="page"
                    className="text-[10px] md:text-xs uppercase tracking-[0.18em]
                               text-white font-semibold"
                  >
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Badge — square ribbon */}
        {badge && (
          <div className="mt-4">
            <span
              className="inline-flex items-center
                         bg-red-600 text-white
                         text-[10px] md:text-xs font-semibold uppercase tracking-wider
                         px-3 py-1.5 border-l-4 border-white/70"
            >
              {badge}
            </span>
          </div>
        )}

        {/* Heading */}
        <h1
          className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                     font-serif font-bold text-white leading-tight max-w-3xl"
        >
          {heading}
        </h1>

        {/* Red rule */}
        <div
          aria-hidden="true"
          className="w-12 h-[2px] md:h-1 bg-red-600 mt-4"
        />

        {/* Subtext */}
        <p
          className="mt-4 text-xs sm:text-sm md:text-lg text-blue-100
                     leading-relaxed max-w-2xl
                     border-l-2 border-red-500/70 pl-4"
        >
          {subtext}
        </p>

      </div>
    </section>
  );
}

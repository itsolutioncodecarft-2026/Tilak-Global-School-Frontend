import Image from "next/image";
import Link from "next/link";
import { directorMessage as dm } from "@/data/home";

export default function DirectorMessage() {
  return (
    <section className="w-full bg-[#EAF0FB] py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8
                      grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

        {/* ── Left: Director photo ── */}
        {/* Mobile: centered smaller card; lg+: full-height card */}
        <div className="lg:col-span-4 flex justify-center lg:justify-start">
          <div className="relative w-40 h-48 sm:w-52 sm:h-64 md:w-64 md:h-80 lg:w-full lg:h-[380px]
                          rounded-2xl overflow-hidden shadow-md bg-blue-100">
            <Image
              src={dm.image.src}
              alt={dm.image.alt}
              fill
              sizes="(max-width: 1024px) 60vw, 30vw"
              className="object-cover object-top"
            />
            {/* Caption pill */}
            <div className="absolute bottom-3 left-3
                            bg-[#0B3D91]/85 text-white text-[10px] md:text-xs
                            px-3 py-1 rounded-full">
              {dm.image.caption}
            </div>
          </div>
        </div>

        {/* ── Right: Text content ── */}
        <div className="lg:col-span-8 text-center lg:text-left">

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B3D91]">
            {dm.heading}
          </h2>

          {/* Red accent bar — centered on mobile, left-aligned on lg */}
          <div className="w-10 h-0.5 md:w-14 md:h-1 bg-red-600 rounded-full
                          mt-3 mb-5 mx-auto lg:mx-0" />

          {/* Quote */}
          <blockquote className="italic font-serif text-sm sm:text-base md:text-xl
                                  text-[#0B3D91] leading-relaxed">
            &ldquo;{dm.quote}&rdquo;
          </blockquote>

          {/* Disclaimer note pill */}
          <span className="inline-block mt-4 bg-red-50 text-red-700
                           text-[10px] md:text-xs px-3 py-1 rounded-full">
            {dm.note}
          </span>

          {/* Name + designation */}
          <p className="mt-5 text-sm md:text-lg font-bold text-[#0B3D91]">
            {dm.name}
          </p>
          <p className="text-xs md:text-sm text-gray-600">
            {dm.designation}
          </p>

          {/* CTA outline button */}
          <Link
            href={dm.cta.href}
            className="inline-flex mt-5 border-2 border-[#0B3D91] text-[#0B3D91]
                       hover:bg-[#0B3D91] hover:text-white font-semibold rounded-full
                       text-xs px-4 py-2 md:text-sm md:px-6 md:py-3
                       transition-colors duration-300"
          >
            {dm.cta.label}
          </Link>

        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";

/**
 * TeachingMethodologyCard — client component.
 * Image-based rectangular card with description reveal.
 *
 * Props:
 *   item — { id, number, title, description, image: { src, alt } }
 *
 * Desktop (md+):
 *   • Title + number always visible.
 *   • Description hidden by default, revealed on hover OR focus-within
 *     via CSS grid-rows-[0fr] → grid-rows-[1fr] transition.
 *
 * Mobile (below md):
 *   • Title + description permanently visible — no hover on touch.
 *   • Card height is content-driven (auto) so nothing clips.
 *
 * Design rules:
 *   • Zero rounded-* — every corner is sharp.
 *   • Zero emojis / icon boxes.
 *   • Zero literal text.
 */
export default function TeachingMethodologyCard({ item }) {
  return (
    /*
      The outer div is focusable (tabIndex=0) so keyboard users can
      trigger the description reveal via :focus-within on the parent,
      which is handled by the Tailwind focus-within variant on the
      reveal container below.
    */
    <div
      tabIndex={0}
      className="group relative
                 aspect-[4/3] md:aspect-auto md:h-[340px] lg:h-[380px]
                 overflow-hidden shadow-lg border border-[#0B3D91]/10
                 focus:outline-none focus-visible:ring-2
                 focus-visible:ring-red-600 focus-visible:ring-offset-2"
      aria-label={item.title}
    >

      {/* ── Background image ── */}
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes="(max-width: 768px) 90vw, 33vw"
        className="object-cover
                   transition-transform duration-700 ease-out
                   group-hover:scale-110"
      />

      {/* ── Permanent bottom gradient — stronger on mobile ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0
                   bg-gradient-to-t from-[#0B3D91]/95 via-[#0B3D91]/55 to-[#0B3D91]/10
                   md:from-[#0B3D91]/90 md:via-[#0B3D91]/40 md:to-transparent
                   pointer-events-none"
      />

      {/* ── Red hover tint — desktop only ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-red-600 opacity-0
                   md:group-hover:opacity-20
                   transition-opacity duration-500
                   mix-blend-multiply pointer-events-none"
      />

      {/* ── Faint serif number — top-right ── */}
      <span
        aria-hidden="true"
        className="absolute top-4 right-5
                   text-4xl md:text-5xl font-serif font-bold
                   text-white/15 leading-none select-none pointer-events-none"
      >
        {item.number}
      </span>

      {/* ── Content block — bottom of card ── */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">

        {/* Animated red rule */}
        <div
          aria-hidden="true"
          className="w-8 h-[2px] bg-red-500 mb-3
                     transition-all duration-500
                     md:group-hover:w-16"
        />

        {/* Title */}
        <h3 className="text-lg md:text-xl font-serif font-bold leading-tight">
          {item.title}
        </h3>

        {/*
          Description reveal container.

          Mobile (below md):
            Permanently visible — grid-rows-[1fr] opacity-100.

          Desktop (md+):
            Hidden by default: grid-rows-[0fr] opacity-0 translate-y-2.
            Revealed on group-hover OR group-focus-within.

          The inner div has overflow-hidden so the grid-rows transition
          masks/reveals content cleanly.
        */}
        <div
          className="grid overflow-hidden
                     grid-rows-[1fr] opacity-100 translate-y-0
                     md:grid-rows-[0fr] md:opacity-0 md:translate-y-2
                     md:group-hover:grid-rows-[1fr]
                     md:group-hover:opacity-100
                     md:group-hover:translate-y-0
                     md:group-focus-within:grid-rows-[1fr]
                     md:group-focus-within:opacity-100
                     md:group-focus-within:translate-y-0
                     transition-all duration-500 ease-out"
        >
          <div className="overflow-hidden">
            <p className="mt-2 text-xs md:text-sm text-blue-100/90 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

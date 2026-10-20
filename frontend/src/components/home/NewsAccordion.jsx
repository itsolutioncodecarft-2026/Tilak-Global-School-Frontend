"use client";

import { useState } from "react";

/**
 * NewsAccordion — client component.
 * Square cards, no rounded-*, no lucide chevron (replaced with plus/× SVG).
 * Single-open-at-a-time via openId state.
 * Left red edge grows to full height on hover/open via group + before: utility.
 *
 * Props:
 *   items — array of { id, day, month, title, summary, content, type }
 *
 * Zero literal text — every string from props (sourced from data/newsEvents.js).
 */
export default function NewsAccordion({ items }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`group relative bg-white border overflow-hidden
                        transition-all duration-300
                        ${isOpen
                          ? "border-[#0B3D91]/30 shadow-md"
                          : "border-[#0B3D91]/15 shadow-sm hover:shadow-md"
                        }`}
          >
            {/*
              Left red edge.
              Uses a real div (not before:) so Tailwind can transition height.
              h-0 → h-full when open; group-hover gives h-full even when closed.
            */}
            <div
              aria-hidden="true"
              className={`absolute left-0 top-0 w-1 bg-red-600
                          transition-all duration-500
                          ${isOpen ? "h-full" : "h-0 group-hover:h-full"}`}
            />

            {/* ── Header button ── */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`news-panel-${item.id}`}
              id={`news-btn-${item.id}`}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center gap-3 md:gap-4
                         pl-4 pr-4 py-3.5 md:py-4 text-left"
            >
              {/* Date badge — square block, turns red-600 when open */}
              <div
                className={`shrink-0 w-14 h-14 md:w-16 md:h-16
                            flex flex-col items-center justify-center
                            leading-none transition-colors duration-300
                            ${isOpen ? "bg-red-600" : "bg-[#0B3D91]"}
                            text-white`}
              >
                <span className="text-lg md:text-xl font-serif font-bold">
                  {item.day}
                </span>
                <span className="text-[10px] uppercase tracking-wide text-blue-100 mt-0.5">
                  {item.month}
                </span>
              </div>

              {/* Title + summary */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm md:text-base font-serif font-bold
                              leading-snug transition-colors duration-200
                              ${isOpen ? "text-red-600" : "text-[#0B3D91]"}`}
                >
                  {item.title}
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5 line-clamp-1">
                  {item.summary}
                </p>
              </div>

              {/* Plus / × icon — rotates 45° to become × when open */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 shrink-0 text-[#0B3D91] transition-transform duration-300
                            ${isOpen ? "rotate-45" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>

            {/* ── Content panel — grid-rows animation ── */}
            <div
              id={`news-panel-${item.id}`}
              role="region"
              aria-labelledby={`news-btn-${item.id}`}
              className={`grid transition-all duration-300 ease-in-out
                          ${isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                          }`}
            >
              <div className="overflow-hidden">
                <div
                  className="pl-4 md:pl-[5.25rem] pr-4 pb-4 md:pb-5
                              border-t border-gray-100 pt-3"
                >
                  {/* Type — minimal uppercase caption with left red border */}
                  <span
                    className="inline-block mb-2
                               text-[10px] uppercase tracking-wider text-red-700
                               border-l-2 border-red-600 pl-2 capitalize"
                  >
                    {item.type}
                  </span>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}

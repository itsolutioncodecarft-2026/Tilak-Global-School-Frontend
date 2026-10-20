"use client";

/**
 * MobileSlider.jsx
 * Reusable horizontal snap-scroll slider.
 * Renders children via a renderItem(item, index) render prop.
 *
 * Props:
 *   items           – array of data items
 *   renderItem      – (item, index) => ReactNode
 *   breakpoint      – 'md' (default) or 'lg' — screen width at which slider
 *                     hides and caller's desktop grid takes over
 *   slideWidth      – Tailwind class for each slide width
 *                     default: 'w-[calc(100vw-2rem)]' (one card per view)
 *   activeDotClass  – Tailwind classes for the active dot indicator
 *                     default: 'w-6 h-2 bg-[#0B3D91]'
 *   inactiveDotClass – Tailwind classes for inactive dots
 *                     default: 'w-2 h-2 bg-gray-300'
 */

import { useRef, useState, useCallback } from "react";

export default function MobileSlider({
  items,
  renderItem,
  breakpoint = "md",
  slideWidth = "w-[calc(100vw-2rem)]",
  activeDotClass   = "w-6 h-2 bg-[#0B3D91]",
  inactiveDotClass = "w-2 h-2 bg-gray-300",
}) {
  const sliderRef  = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const sw = el.firstElementChild?.getBoundingClientRect().width ?? el.offsetWidth;
    const idx = Math.round(el.scrollLeft / (sw + 16));
    setActiveIndex(Math.min(Math.max(idx, 0), items.length - 1));
  }, [items.length]);

  const scrollToSlide = (index) => {
    const el = sliderRef.current;
    if (!el) return;
    const sw = el.firstElementChild?.getBoundingClientRect().width ?? el.offsetWidth;
    el.scrollTo({ left: index * (sw + 16), behavior: "smooth" });
  };

  // Tailwind hide/show classes based on breakpoint
  const wrapHide  = breakpoint === "lg" ? "lg:hidden" : "md:hidden";

  return (
    <div className={`${wrapHide} mt-8`}>
      {/* Scroll track */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth
                   scrollbar-hide -mx-4 px-4 gap-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {items.map((item, i) => (
          <div
            key={item.id ?? i}
            className={`snap-center shrink-0 ${slideWidth} max-w-full`}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center items-center gap-2 mt-5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? activeDotClass
                : inactiveDotClass
            }`}
          />
        ))}
      </div>
    </div>
  );
}

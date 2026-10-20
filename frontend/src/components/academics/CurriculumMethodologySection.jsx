import CbseCurriculum from "@/components/academics/CbseCurriculum";
import TeachingMethodology from "@/components/academics/TeachingMethodology";

/**
 * CurriculumMethodologySection — server component wrapper.
 * Two-column layout on lg+:
 *   Left  (lg:col-span-5): CBSE Curriculum — text-focused editorial block
 *   Right (lg:col-span-7): Teaching Methodology — image cards
 *
 * Single-column stacked on mobile (curriculum first, methodology second).
 * Background: very light blue tint (bg-[#F4F7FC]) to contrast with the
 * white AcademicStages section above.
 *
 * Zero rounded-*. Zero literal text.
 */
export default function CurriculumMethodologySection() {
  return (
    <section className="w-full bg-[#F4F7FC] border-t border-[#0B3D91]/10
                        py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/*
          Two-column grid on lg+.
          items-start so the two columns don't stretch to equal height
          when one has much more content than the other.
        */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12
                     gap-10 lg:gap-12 items-start"
        >

          {/* ── Left: CBSE Curriculum ── */}
          <div className="lg:col-span-5">
            <CbseCurriculum />
          </div>

          {/*
            Vertical divider — visible only on lg+.
            Rendered as a visual separator between the two columns.
          */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:col-span-0
                       absolute left-[41.66%] top-0 bottom-0
                       w-px bg-[#0B3D91]/10 pointer-events-none"
          />

          {/* ── Right: Teaching Methodology ── */}
          <div className="lg:col-span-7">
            <TeachingMethodology />
          </div>

        </div>
      </div>
    </section>
  );
}

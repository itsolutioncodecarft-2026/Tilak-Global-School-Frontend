import { admissionProcess as d } from "@/data/admissions";

/**
 * AdmissionProcess — server component.
 * Desktop: horizontal 4-step timeline with connecting line.
 * Mobile:  vertical timeline with left connector line.
 *
 * Zero rounded-*. Zero emojis. Zero literal text.
 */
export default function AdmissionProcess() {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span
            className="inline-flex items-center gap-2
                       text-[11px] md:text-xs font-semibold uppercase
                       tracking-[0.2em] text-red-600"
          >
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
            {d.eyebrow}
            <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
          </span>

          <h2 className="mt-4 text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
            {d.heading}
          </h2>
          <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-4" />
          <p className="mt-4 text-xs md:text-base text-gray-600 max-w-xl mx-auto">
            {d.description}
          </p>
        </div>

        {/* ── Desktop: horizontal timeline ── */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="absolute top-8 left-0 right-0 h-[2px] bg-[#0B3D91]/20 z-0"
          />

          <div className="relative z-10 grid grid-cols-4 gap-6 lg:gap-10">
            {d.steps.map((step, i) => (
              <div
                key={step.id}
                className="group flex flex-col items-center text-center"
              >
                {/* Number block */}
                <div
                  className="w-16 h-16 flex items-center justify-center
                             bg-[#0B3D91] group-hover:bg-red-600
                             transition-colors duration-300
                             text-white font-serif font-bold text-xl
                             border-4 border-white shadow-md
                             shrink-0"
                >
                  {step.number}
                </div>

                {/* Title */}
                <h3
                  className="mt-5 text-base md:text-lg font-serif font-bold
                             text-[#0B3D91] group-hover:text-red-600
                             transition-colors duration-300"
                >
                  {step.title}
                </h3>

                {/* Red rule */}
                <div
                  aria-hidden="true"
                  className="w-8 h-[2px] bg-red-600 mt-2 mb-3
                             transition-all duration-500 group-hover:w-16"
                />

                {/* Description */}
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical timeline ── */}
        <div className="md:hidden relative pl-8">
          {/* Vertical connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-4 top-0 bottom-0 w-[2px] bg-[#0B3D91]/20"
          />

          <div className="space-y-8">
            {d.steps.map((step) => (
              <div key={step.id} className="relative flex items-start gap-5">
                {/* Number block — positioned over the line */}
                <div
                  className="shrink-0 -ml-8 w-8 h-8
                             flex items-center justify-center
                             bg-[#0B3D91] text-white
                             font-serif font-bold text-sm"
                >
                  {step.number}
                </div>

                {/* Content */}
                <div className="pb-2">
                  <h3 className="text-base font-serif font-bold text-[#0B3D91]">
                    {step.title}
                  </h3>
                  <div aria-hidden="true" className="w-8 h-[2px] bg-red-600 mt-1.5 mb-2" />
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

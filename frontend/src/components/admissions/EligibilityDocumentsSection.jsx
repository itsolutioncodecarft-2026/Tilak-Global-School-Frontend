import AdmissionEligibility from "@/components/admissions/AdmissionEligibility";
import RequiredDocuments from "@/components/admissions/RequiredDocuments";

/**
 * EligibilityDocumentsSection — server component.
 * Side-by-side on desktop (lg+), stacked on mobile.
 * Light-blue tinted background to separate from white sections.
 */
export default function EligibilityDocumentsSection() {
  return (
    <section className="w-full bg-[#EEF3FB] border-t border-[#0B3D91]/10 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <AdmissionEligibility />
          <div className="lg:border-l lg:border-[#0B3D91]/15 lg:pl-10">
            <RequiredDocuments />
          </div>
        </div>
      </div>
    </section>
  );
}

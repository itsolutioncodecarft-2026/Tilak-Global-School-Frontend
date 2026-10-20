import AdmissionEnquiryForm from "@/components/admissions/AdmissionEnquiryForm";
import OnlineAdmissionForm from "@/components/admissions/OnlineAdmissionForm";
import { admissionEnquiry, onlineAdmission } from "@/data/admissions";

/**
 * ApplyOnlineSection — server wrapper (client children handle state).
 * Enquiry form left, multi-step admission form right on desktop.
 * Stacked on mobile.
 */
export default function ApplyOnlineSection() {
  return (
    <section className="w-full bg-white border-t border-[#0B3D91]/10 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#0B3D91]">
            Apply Online
          </h2>
          <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mx-auto mt-4" />
          <p className="mt-4 text-xs md:text-base text-gray-600 max-w-2xl mx-auto">
            Use the quick enquiry form for a callback, or complete the full admission application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Enquiry Form */}
          <div className="bg-[#F4F7FC] border border-[#0B3D91]/15 p-6 md:p-8">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600 mb-4">
              <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
              {admissionEnquiry.eyebrow}
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0B3D91] mb-2">
              {admissionEnquiry.heading}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-6">
              {admissionEnquiry.description}
            </p>
            <AdmissionEnquiryForm />
          </div>

          {/* Full Admission Form */}
          <div className="bg-[#F4F7FC] border border-[#0B3D91]/15 p-6 md:p-8">
            <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600 mb-4">
              <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
              {onlineAdmission.eyebrow}
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0B3D91] mb-2">
              {onlineAdmission.heading}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-6">
              {onlineAdmission.description}
            </p>
            <OnlineAdmissionForm />
          </div>

        </div>
      </div>
    </section>
  );
}

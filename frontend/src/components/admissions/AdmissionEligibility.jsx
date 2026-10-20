import { admissionEligibility as d } from "@/data/admissions";

/**
 * AdmissionEligibility — server component.
 * Clean table: Class | Minimum Age.
 * Zero rounded-*. Zero literals.
 */
export default function AdmissionEligibility() {
  return (
    <div>
      {/* Eyebrow */}
      <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
        <span aria-hidden="true" className="w-8 h-[2px] bg-red-600 shrink-0" />
        {d.eyebrow}
      </span>

      <h2 className="mt-4 text-xl md:text-3xl font-serif font-bold text-[#0B3D91]">
        {d.heading}
      </h2>
      <div aria-hidden="true" className="w-12 h-[2px] md:h-1 bg-red-600 mt-3" />

      {/* Note */}
      <div className="mt-5 border-l-4 border-red-600 bg-red-50/60 px-4 py-3">
        <p className="text-[11px] md:text-xs uppercase tracking-wider text-red-700">
          {d.note}
        </p>
      </div>

      {/* Table */}
      <div className="mt-6 border border-[#0B3D91]/20 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0B3D91] text-white">
              <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">
                Class
              </th>
              <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold uppercase tracking-wider">
                Minimum Age
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0B3D91]/10">
            {d.rows.map((row, i) => (
              <tr
                key={row.classLabel}
                className={`group hover:bg-[#EEF3FB] transition-colors duration-200
                            ${i % 2 === 0 ? "bg-white" : "bg-[#F4F7FC]"}`}
              >
                <td className="px-4 py-3 font-medium text-[#0B3D91] text-xs md:text-sm">
                  {row.classLabel}
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs md:text-sm">
                  {row.minAge}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

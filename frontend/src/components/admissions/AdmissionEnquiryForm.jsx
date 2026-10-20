"use client";

import { useState } from "react";
import { admissionEnquiry as d } from "@/data/admissions";

/**
 * AdmissionEnquiryForm — client component.
 * Frontend-only quick enquiry form. No API calls. No data storage.
 * On valid submit shows the demoMessage from data/admissions.js.
 */
export default function AdmissionEnquiryForm() {
  const [values, setValues]     = useState({ studentName: "", classApplying: "", parentMobile: "" });
  const [errors, setErrors]     = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!values.studentName.trim())    e.studentName   = "Student name is required.";
    if (!values.classApplying)          e.classApplying = "Please select a class.";
    if (!/^\d{10}$/.test(values.parentMobile.trim()))
      e.parentMobile = "Enter a valid 10-digit mobile number.";
    return e;
  };

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border-2 border-amber-400 bg-amber-50 px-5 py-6 text-center">
        <p className="text-xs md:text-sm font-semibold text-amber-800 uppercase tracking-wider mb-2">
          Demo Preview
        </p>
        <p className="text-sm md:text-base text-amber-700 leading-relaxed">
          {d.demoMessage}
        </p>
        <button
          onClick={() => { setSubmitted(false); setValues({ studentName: "", classApplying: "", parentMobile: "" }); }}
          className="mt-4 inline-flex border-2 border-amber-600 text-amber-700
                     hover:bg-amber-600 hover:text-white font-semibold
                     text-xs px-5 py-2 transition-all duration-300"
        >
          Reset Form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Student Name */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-[#0B3D91] mb-1">
          {d.fields.studentName.label}
        </label>
        <input
          type="text"
          name="studentName"
          value={values.studentName}
          onChange={handleChange}
          placeholder={d.fields.studentName.placeholder}
          className={`w-full border ${errors.studentName ? "border-red-500" : "border-[#0B3D91]/30"}
                      px-4 py-2.5 text-sm text-gray-700
                      focus:outline-none focus:border-red-600
                      transition-colors duration-200`}
        />
        {errors.studentName && (
          <p className="mt-1 text-[11px] text-red-600">{errors.studentName}</p>
        )}
      </div>

      {/* Class Applying */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-[#0B3D91] mb-1">
          {d.fields.classApplying.label}
        </label>
        <select
          name="classApplying"
          value={values.classApplying}
          onChange={handleChange}
          className={`w-full border ${errors.classApplying ? "border-red-500" : "border-[#0B3D91]/30"}
                      px-4 py-2.5 text-sm text-gray-700 bg-white
                      focus:outline-none focus:border-red-600
                      transition-colors duration-200`}
        >
          <option value="">{d.fields.classApplying.placeholder}</option>
          {d.classOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.classApplying && (
          <p className="mt-1 text-[11px] text-red-600">{errors.classApplying}</p>
        )}
      </div>

      {/* Parent Mobile */}
      <div>
        <label className="block text-xs md:text-sm font-semibold text-[#0B3D91] mb-1">
          {d.fields.parentMobile.label}
        </label>
        <input
          type="tel"
          name="parentMobile"
          value={values.parentMobile}
          onChange={handleChange}
          placeholder={d.fields.parentMobile.placeholder}
          maxLength={10}
          className={`w-full border ${errors.parentMobile ? "border-red-500" : "border-[#0B3D91]/30"}
                      px-4 py-2.5 text-sm text-gray-700
                      focus:outline-none focus:border-red-600
                      transition-colors duration-200`}
        />
        {errors.parentMobile && (
          <p className="mt-1 text-[11px] text-red-600">{errors.parentMobile}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#0B3D91] hover:bg-red-600 text-white
                   font-semibold text-sm py-3
                   transition-colors duration-300"
      >
        {d.submitLabel}
      </button>
    </form>
  );
}

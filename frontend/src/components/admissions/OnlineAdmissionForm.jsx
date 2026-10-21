"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { onlineAdmission as d } from "@/data/admissions";
import { submitApplication } from "@/lib/api";

const TOTAL = 4;

const emptyData = {
  studentName: "", dob: "", classApplying: "", gender: "",
  parentName: "", mobile: "", email: "", address: "",
  prevSchool: "", prevClass: "", message: "",
};

export default function OnlineAdmissionForm() {
  const [step, setStep]           = useState(1);
  const [data, setData]           = useState(emptyData);
  const [errors, setErrors]       = useState({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId]         = useState("");

  const update = (e) => {
    setData((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!data.studentName.trim()) e.studentName   = "Required.";
      if (!data.dob)                e.dob           = "Required.";
      if (!data.classApplying)      e.classApplying = "Required.";
    }
    if (step === 2) {
      if (!data.parentName.trim()) e.parentName = "Required.";
      if (!/^(\+91)?[6-9]\d{9}$/.test(data.mobile.replace(/\s/g, "")))
        e.mobile = "Enter a valid 10-digit Indian mobile number.";
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        e.email = "Enter a valid email address.";
      if (!data.address.trim()) e.address = "Required.";
    }
    return e;
  };

  const next = () => {
    const e = validateStep();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep((s) => Math.min(s + 1, TOTAL));
  };

  const prev = () => { setErrors({}); setStep((s) => Math.max(s - 1, 1)); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: res, error } = await submitApplication({
      source:        "application",
      studentName:   data.studentName.trim(),
      dateOfBirth:   data.dob || undefined,
      gender:        data.gender || undefined,
      classApplying: data.classApplying,
      parentName:    data.parentName.trim(),
      phone:         data.mobile.replace(/\s/g, ""),
      email:         data.email.trim() || undefined,
      address:       data.address.trim(),
      previousSchool: data.prevSchool.trim() || undefined,
      message:       data.message.trim() || undefined,
    });

    setLoading(false);

    if (error) {
      if (error.status === 429) {
        toast.error("Too many submissions — please wait 15 minutes before trying again.");
      } else {
        toast.error(error.message || "Something went wrong. Please try again.");
      }
      return;
    }

    setAppId(res?.applicationId || "");
    setSubmitted(true);
    toast.success(`Application submitted! ID: ${res?.applicationId || ""}`);
  };

  const inputCls = (field) =>
    `w-full border ${errors[field] ? "border-red-500" : "border-[#0B3D91]/30"}
     px-4 py-2.5 text-sm text-gray-700 bg-white
     focus:outline-none focus:border-red-600 transition-colors duration-200`;
  const labelCls = "block text-xs md:text-sm font-semibold text-[#0B3D91] mb-1";
  const errCls   = "mt-1 text-[11px] text-red-600";

  if (submitted) {
    return (
      <div className="border-2 border-green-500 bg-green-50 px-5 py-8 text-center">
        <p className="text-xs md:text-sm font-semibold text-green-800 uppercase tracking-wider mb-2">
          Application Submitted ✓
        </p>
        {appId && (
          <p className="text-base font-mono text-green-700 font-bold mb-2">{appId}</p>
        )}
        <p className="text-sm text-green-700 leading-relaxed">
          Thank you, <strong>{data.parentName}</strong>! Your application for{" "}
          <strong>{data.studentName}</strong> (Class{" "}
          <strong>{data.classApplying}</strong>) has been received. We will
          contact you at <strong>{data.mobile}</strong> within 2 working days.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(1); setData(emptyData); setAppId(""); }}
          className="mt-5 inline-flex border-2 border-green-600 text-green-700
                     hover:bg-green-600 hover:text-white font-semibold
                     text-xs px-5 py-2 transition-all duration-300"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress indicator */}
      <div className="flex items-center mb-8 gap-0">
        {d.steps.map((s, i) => (
          <div key={s.number} className="flex-1 flex flex-col items-center relative">
            {i > 0 && (
              <div aria-hidden="true"
                className={`absolute top-4 right-1/2 w-full h-[2px]
                  ${step > i ? "bg-[#0B3D91]" : "bg-gray-200"}`}
              />
            )}
            <div className={`relative z-10 w-8 h-8 flex items-center justify-center
                font-serif font-bold text-sm border-2 transition-colors duration-300
                ${step === s.number
                  ? "bg-[#0B3D91] border-[#0B3D91] text-white"
                  : step > s.number
                    ? "bg-red-600 border-red-600 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}>
              {step > s.number ? "✓" : s.number}
            </div>
            <span className={`mt-2 text-[10px] md:text-xs text-center leading-tight
              ${step === s.number ? "text-[#0B3D91] font-semibold" : "text-gray-400"}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Step 1 — Student Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Student Full Name *</label>
              <input name="studentName" value={data.studentName} onChange={update}
                placeholder="Enter student's full name" className={inputCls("studentName")} />
              {errors.studentName && <p className={errCls}>{errors.studentName}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Date of Birth *</label>
                <input type="date" name="dob" value={data.dob} onChange={update}
                  className={inputCls("dob")} />
                {errors.dob && <p className={errCls}>{errors.dob}</p>}
              </div>
              <div>
                <label className={labelCls}>Gender</label>
                <select name="gender" value={data.gender} onChange={update}
                  className={inputCls("gender")}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Class Applying For *</label>
              <select name="classApplying" value={data.classApplying} onChange={update}
                className={inputCls("classApplying")}>
                <option value="">Select a class</option>
                {d.classOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.classApplying && <p className={errCls}>{errors.classApplying}</p>}
            </div>
          </div>
        )}

        {/* Step 2 — Parent Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Parent / Guardian Name *</label>
              <input name="parentName" value={data.parentName} onChange={update}
                placeholder="Enter parent's full name" className={inputCls("parentName")} />
              {errors.parentName && <p className={errCls}>{errors.parentName}</p>}
            </div>
            <div>
              <label className={labelCls}>Mobile Number *</label>
              <input type="tel" name="mobile" value={data.mobile} onChange={update}
                placeholder="10-digit mobile number" maxLength={13} className={inputCls("mobile")} />
              {errors.mobile && <p className={errCls}>{errors.mobile}</p>}
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input type="email" name="email" value={data.email} onChange={update}
                placeholder="parent@example.com" className={inputCls("email")} />
              {errors.email && <p className={errCls}>{errors.email}</p>}
            </div>
            <div>
              <label className={labelCls}>Residential Address *</label>
              <textarea name="address" value={data.address} onChange={update}
                placeholder="Enter full residential address" rows={3}
                className={inputCls("address") + " resize-none"} />
              {errors.address && <p className={errCls}>{errors.address}</p>}
            </div>
          </div>
        )}

        {/* Step 3 — Previous School */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Previous School Name</label>
              <input name="prevSchool" value={data.prevSchool} onChange={update}
                placeholder="Enter previous school name (if applicable)" className={inputCls("prevSchool")} />
            </div>
            <div>
              <label className={labelCls}>Previous Class / Grade</label>
              <input name="prevClass" value={data.prevClass} onChange={update}
                placeholder="e.g. Class III" className={inputCls("prevClass")} />
            </div>
            <div>
              <label className={labelCls}>Additional Message</label>
              <textarea name="message" value={data.message} onChange={update}
                placeholder="Any special requirements or information…" rows={3}
                className={inputCls("message") + " resize-none"} />
            </div>
          </div>
        )}

        {/* Step 4 — Review */}
        {step === 4 && (
          <div className="space-y-3 text-sm">
            <h4 className="font-serif font-bold text-[#0B3D91] text-base mb-4">
              Review Your Application
            </h4>
            {[
              ["Student Name",    data.studentName],
              ["Date of Birth",   data.dob],
              ["Gender",          data.gender],
              ["Class Applying",  data.classApplying],
              ["Parent Name",     data.parentName],
              ["Mobile",          data.mobile],
              ["Email",           data.email],
              ["Address",         data.address],
              ["Previous School", data.prevSchool],
              ["Previous Class",  data.prevClass],
            ].filter(([, v]) => v).map(([label, value]) => (
              <div key={label} className="flex items-start gap-3 py-2 border-b border-gray-100">
                <span className="w-32 shrink-0 text-xs text-gray-500 uppercase tracking-wider">{label}</span>
                <span className="text-gray-800 font-medium text-xs md:text-sm">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 gap-4">
          {step > 1 ? (
            <button type="button" onClick={prev}
              className="border-2 border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white
                         font-semibold text-xs px-5 py-2.5 transition-all duration-300">
              ← Previous
            </button>
          ) : <div />}

          {step < TOTAL ? (
            <button type="button" onClick={next}
              className="bg-[#0B3D91] hover:bg-red-600 text-white
                         font-semibold text-xs px-5 py-2.5 transition-colors duration-300">
              Continue →
            </button>
          ) : (
            <button type="submit" disabled={loading}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white
                         font-semibold text-xs px-6 py-2.5 transition-colors duration-300">
              {loading ? "Submitting…" : "Submit Application"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

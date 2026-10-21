"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { siteConfig } from "@/data/siteConfig";
import { submitContact } from "@/lib/api";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactUsPage() {
  const [form, setForm]       = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const { error } = await submitContact({
      name:    form.name.trim(),
      email:   form.email.trim(),
      phone:   form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    });
    setLoading(false);

    if (error) {
      if (error.status === 429) {
        toast.error("Too many submissions — please wait before trying again.");
      } else {
        toast.error(error.message || "Something went wrong. Please try again.");
      }
      return;
    }

    setDone(true);
    toast.success("Message sent! We will get back to you shortly.");
  };

  const inp = (field) =>
    `w-full border-b ${errors[field] ? "border-red-500" : "border-gray-300"}
     px-0 py-2.5 text-sm text-gray-700 bg-transparent
     focus:outline-none focus:border-[#0B3D91] transition-colors duration-200`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page heading */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-[#C8102E] uppercase mb-2">Contact Us</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0B3D91] leading-tight">
          Get In Touch
        </h1>
        <p className="mt-3 text-[#5B6785] max-w-xl">
          Have a question about admissions or our school? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* ── Contact info ─────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E8F1FB] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#0B3D91]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0B3D91] uppercase tracking-wider mb-1">Address</p>
              <p className="text-sm text-[#5B6785] leading-relaxed">{siteConfig.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E8F1FB] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#0B3D91]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0B3D91] uppercase tracking-wider mb-1">Phone</p>
              <p className="text-sm text-[#5B6785]">{siteConfig.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E8F1FB] flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-[#0B3D91]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0B3D91] uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm text-[#5B6785]">{siteConfig.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E8F1FB] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#0B3D91]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0B3D91] uppercase tracking-wider mb-1">Office Hours</p>
              <p className="text-sm text-[#5B6785]">[Office timings — to be confirmed]</p>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700
                       text-white text-sm font-semibold px-5 py-2.5 rounded transition"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Enquiry
          </a>
        </div>

        {/* ── Contact form ──────────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          {done ? (
            <div className="border-2 border-green-500 bg-green-50 p-8 text-center">
              <p className="text-2xl mb-2">✓</p>
              <p className="font-semibold text-green-800 mb-1">Message Sent!</p>
              <p className="text-sm text-green-700">
                Thank you for reaching out. We will get back to you within 2 working days.
              </p>
              <button
                onClick={() => { setDone(false); setForm({ name:"", email:"", phone:"", subject:"", message:"" }); }}
                className="mt-4 text-xs border-2 border-green-600 text-green-700
                           hover:bg-green-600 hover:text-white px-5 py-2 transition-all"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#0B3D91] mb-1 uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input name="name" value={form.name} onChange={change}
                    placeholder="Full name" className={inp("name")} />
                  {errors.name && <p className="mt-1 text-[11px] text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B3D91] mb-1 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input type="email" name="email" value={form.email} onChange={change}
                    placeholder="you@example.com" className={inp("email")} />
                  {errors.email && <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#0B3D91] mb-1 uppercase tracking-wider">
                    Phone (optional)
                  </label>
                  <input type="tel" name="phone" value={form.phone} onChange={change}
                    placeholder="Mobile number" maxLength={13} className={inp("phone")} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B3D91] mb-1 uppercase tracking-wider">
                    Subject
                  </label>
                  <input name="subject" value={form.subject} onChange={change}
                    placeholder="e.g. Admission Enquiry" className={inp("subject")} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B3D91] mb-1 uppercase tracking-wider">
                  Message *
                </label>
                <textarea name="message" value={form.message} onChange={change}
                  placeholder="How can we help you?" rows={5}
                  className={inp("message") + " resize-none"} />
                {errors.message && <p className="mt-1 text-[11px] text-red-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B3D91] hover:bg-[#C8102E] disabled:opacity-60
                           text-white font-semibold text-sm py-3 transition-colors duration-300"
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

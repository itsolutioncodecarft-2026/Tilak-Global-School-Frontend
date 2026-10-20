import { contactPage } from "@/data/contact";
export const metadata = { title: `${contactPage.heading} — Tilak Global School` };
export default function ContactUsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#0B3D91] mb-4">{contactPage.heading}</h1>
      <p className="text-[#5B6785]">{contactPage.subtext}</p>
    </div>
  );
}

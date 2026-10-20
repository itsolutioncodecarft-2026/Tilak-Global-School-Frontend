import { downloadsPage } from "@/data/contact";
export const metadata = { title: `${downloadsPage.heading} — Tilak Global School` };
export default function DownloadsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#0B3D91] mb-4">{downloadsPage.heading}</h1>
      <p className="text-[#5B6785]">{downloadsPage.subtext}</p>
    </div>
  );
}

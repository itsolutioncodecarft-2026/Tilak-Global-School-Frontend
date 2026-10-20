import { photoGalleryPage } from "@/data/gallery";
export const metadata = { title: `${photoGalleryPage.heading} — Tilak Global School` };
export default function PhotoGalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#0B3D91] mb-4">{photoGalleryPage.heading}</h1>
      <p className="text-[#5B6785]">{photoGalleryPage.subtext}</p>
    </div>
  );
}

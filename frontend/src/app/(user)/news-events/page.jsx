import { newsEventsPage } from "@/data/newsEvents";
export const metadata = { title: `${newsEventsPage.heading} — Tilak Global School` };
export default function NewsEventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#0B3D91] mb-4">{newsEventsPage.heading}</h1>
      <p className="text-[#5B6785]">{newsEventsPage.subtext}</p>
    </div>
  );
}

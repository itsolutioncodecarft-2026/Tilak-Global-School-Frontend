import { getGallery } from "@/lib/api";

export const metadata = {
  title: "Gallery — Tilak Global School",
  description: "Photo gallery of campus life, events, sports and activities at Tilak Global School, Jaipur.",
};

const CATEGORIES = ["All", "Campus", "Classrooms", "Sports", "Events", "Activities"];

export default async function GalleryPage({ searchParams }) {
  const cat = searchParams?.category || "All";
  const query = cat !== "All" ? `?category=${cat}&limit=60` : "?limit=60";

  const { data, error } = await getGallery(query);
  const images = data?.images || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Heading */}
      <div className="mb-10">
        <p className="text-xs font-bold tracking-widest text-[#C8102E] uppercase mb-2">
          Our Campus
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0B3D91]">
          Photo Gallery
        </h1>
        <p className="mt-3 text-[#5B6785]">
          Glimpses of life at Tilak Global School.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <a
            key={c}
            href={c === "All" ? "/gallery" : `/gallery?category=${c}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
              ${cat === c
                ? "bg-[#0B3D91] text-white border-[#0B3D91]"
                : "bg-white text-[#5B6785] border-[#E3E9F2] hover:border-[#0B3D91] hover:text-[#0B3D91]"
              }`}
          >
            {c}
          </a>
        ))}
      </div>

      {error && (
        <p className="text-sm text-[#5B6785] italic">
          Gallery is currently unavailable. Please check back soon.
        </p>
      )}

      {!error && images.length === 0 && (
        <p className="text-sm text-[#5B6785] italic">
          No photos have been uploaded yet. Check back soon.
        </p>
      )}

      {images.length > 0 && (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {images.map((img) => (
            <div
              key={img._id}
              className="break-inside-avoid overflow-hidden rounded-lg border border-[#E3E9F2]
                         hover:shadow-md transition-all duration-200 group relative"
            >
              <img
                src={img.imageUrl}
                alt={img.caption || img.category}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent
                                px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-white text-xs leading-snug line-clamp-2">{img.caption}</p>
                </div>
              )}
              {img.category && (
                <span className="absolute top-2 left-2 text-[9px] font-semibold
                                  bg-[#0B3D91]/80 text-white px-1.5 py-0.5 rounded-full">
                  {img.category}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { getNews } from "@/lib/api";
import { Calendar, Tag } from "lucide-react";

export const metadata = {
  title: "News & Events — Tilak Global School",
  description: "Latest news, events, announcements and notices from Tilak Global School, Jaipur.",
};

const CATEGORY_COLORS = {
  News:         "bg-blue-100 text-blue-800",
  Event:        "bg-purple-100 text-purple-800",
  Notice:       "bg-amber-100 text-amber-800",
  Achievement:  "bg-green-100 text-green-800",
  Announcement: "bg-red-100 text-red-800",
};

export default async function NewsEventsPage() {
  const { data, error } = await getNews("?limit=24&status=published");
  const posts = data?.posts || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Heading */}
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-[#C8102E] uppercase mb-2">
          Stay Updated
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0B3D91]">
          News &amp; Events
        </h1>
        <p className="mt-3 text-[#5B6785] max-w-2xl">
          Latest happenings, upcoming events and important notices from Tilak Global School.
        </p>
      </div>

      {error && (
        <p className="text-sm text-[#5B6785] italic">
          News is currently unavailable. Please check back soon.
        </p>
      )}

      {!error && posts.length === 0 && (
        <p className="text-sm text-[#5B6785] italic">
          No news or events have been published yet. Check back soon.
        </p>
      )}

      {posts.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post._id}
              className="border border-[#E3E9F2] rounded-xl overflow-hidden
                         hover:shadow-md hover:border-[#0B3D91]/30 transition-all duration-200 flex flex-col"
            >
              {/* Image */}
              {post.imageUrl ? (
                <div className="aspect-video bg-[#E8F1FB] overflow-hidden shrink-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-[#0B3D91] to-[#1B3C7A]
                                flex items-center justify-center shrink-0">
                  <span className="text-white/20 font-serif text-5xl font-bold">TGS</span>
                </div>
              )}

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Category + date */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                    ${CATEGORY_COLORS[post.category] || "bg-gray-100 text-gray-600"}`}>
                    {post.category}
                  </span>
                  {post.date && (
                    <span className="flex items-center gap-1 text-[11px] text-[#5B6785]">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </span>
                  )}
                  {post.isFeatured && (
                    <span className="text-[10px] font-semibold text-[#C9A24A] bg-amber-50
                                     px-2 py-0.5 rounded-full border border-amber-200">
                      ★ Featured
                    </span>
                  )}
                </div>

                <h2 className="font-serif font-bold text-[#0B3D91] text-base leading-snug mb-2 line-clamp-2">
                  {post.title}
                </h2>

                {post.summary && (
                  <p className="text-sm text-[#5B6785] leading-relaxed line-clamp-3 flex-1">
                    {post.summary}
                  </p>
                )}

                {post.slug && (
                  <Link
                    href={`/news-events/${post.slug}`}
                    className="mt-4 inline-flex items-center text-xs font-semibold
                               text-[#0B3D91] hover:text-[#C8102E] transition-colors"
                  >
                    Read more →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

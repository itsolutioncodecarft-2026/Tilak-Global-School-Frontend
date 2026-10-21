/**
 * gallery.js
 * Feeds all pages under app/(user)/gallery/.
 */

export const galleryPage = {
  heading: "Gallery",
  subtext: "Explore photos and videos from school events, activities and campus life.",
};

export const photoGalleryPage = {
  heading: "Photo Gallery",
  subtext: "A collection of photographs from school events, activities and everyday learning.",
};

export const videoGalleryPage = {
  heading: "Video Gallery",
  subtext: "Watch videos from school events, performances and activities.",
};

// ── Homepage gallery preview ───────────────────────────────────────────────────
export const galleryPreview = {
  heading: "Gallery Preview",
  viewAll: {
    label: "View Full Gallery",
    href:  "/gallery/photo-gallery",
  },
  items: [
    {
      id:    "annual-day",
      title: "Annual Day",
      image: {
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80&fm=webp",
        alt: "Annual Day celebrations at Tilak Global School",
      },
    },
    {
      id:    "classroom",
      title: "Classrooms",
      image: {
        src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80&fm=webp",
        alt: "Modern classrooms at Tilak Global School",
      },
    },
    {
      id:    "sports",
      title: "Sports",
      image: {
        src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80&fm=webp",
        alt: "Sports activities at Tilak Global School",
      },
    },
    {
      id:    "science-lab",
      title: "Science Lab",
      image: {
        src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80&fm=webp",
        alt: "Science laboratory at Tilak Global School",
      },
    },
  ],
};

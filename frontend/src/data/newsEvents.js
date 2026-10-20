/**
 * newsEvents.js
 * Feeds NewsAccordion (homepage), NewsGallerySection, and /news-events page.
 */

export const newsEventsPage = {
  heading: "News & Events",
  subtext: "[News and Events listing — coming soon]",
};

// ── Homepage section ──────────────────────────────────────────────────────────
export const newsEvents = {
  heading: "News & Events",
  note:    "Sample layout – dates shown are illustrative",
  viewAll: {
    label: "View All News & Events",
    href:  "/news-events",
  },
  items: [
    {
      id:      1,
      day:     "04",
      month:   "Apr",
      title:   "New session will begin",
      summary: "The new academic session begins from 4 April.",
      content:
        "Full notice: The new academic session 2025-26 will commence from 4 April. All students are requested to report by 8:00 AM in proper uniform. Book lists and timetables will be shared on the first day.",
      type: "event",
    },
    {
      id:      2,
      day:     "--",
      month:   "Date",
      title:   "Final exams for Nursery to IX",
      summary: "Final examinations for students of Nursery to Class IX begin.",
      content:
        "Final examinations for the academic year 2024-25 will be conducted for Nursery to Class IX. Detailed date sheets will be shared separately. Students are advised to revise all topics covered during the year.",
      type: "notice",
    },
    {
      id:      3,
      day:     "--",
      month:   "Date",
      title:   "Annual Day celebrated",
      summary: "Annual Day celebrations held at school.",
      content:
        "The school celebrated its Annual Day with great enthusiasm. Students performed various cultural programmes including dance, music, drama and recitation. Prizes were distributed to outstanding achievers.",
      type: "news",
    },
    {
      id:      4,
      day:     "--",
      month:   "Date",
      title:   "Parent-Teacher Meeting",
      summary: "PTM scheduled for all classes – parents are requested to attend.",
      content:
        "A Parent-Teacher Meeting is scheduled for all classes. Parents are requested to meet the respective class teachers to discuss their ward's academic progress. Timings will be communicated via school notice.",
      type: "notice",
    },
  ],
};

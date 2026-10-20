import PageHero from "@/components/shared/PageHero";

/**
 * AcademicsHero — thin wrapper around the shared PageHero component.
 * All four Academics pages (main, curriculum, faculty, academic-calendar)
 * use this wrapper so hero styles are maintained in one place.
 *
 * Props:
 *   data — hero data object from data/academics.js
 *          (academicsHero | curriculumHero | facultyHero | academicCalendarHero)
 */
export default function AcademicsHero({ data }) {
  return <PageHero data={data} />;
}

import AcademicsHero from "@/components/academics/AcademicsHero";
import AcademicStages from "@/components/home/AcademicStages";
import CurriculumMethodologySection from "@/components/academics/CurriculumMethodologySection";
import AcademicCalendarPreview from "@/components/academics/AcademicCalendarPreview";
import ExaminationInformation from "@/components/academics/ExaminationInformation";
import CtaBanner from "@/components/shared/CtaBanner";
import { academicsPage, academicsHero, academicsCta } from "@/data/academics";

export const metadata = {
  title: `${academicsPage.heading} — Tilak Global School`,
  description:
    "Explore the academic programmes, curriculum stages and faculty at Tilak Global School — an English-medium CBSE school in Jaipur.",
};

export default function AcademicsPage() {
  return (
    <>
      <AcademicsHero data={academicsHero} />
      <AcademicStages />
      <CurriculumMethodologySection />
      <AcademicCalendarPreview />
      <ExaminationInformation />
      <CtaBanner data={academicsCta} />
    </>
  );
}

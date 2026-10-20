import PageHero from "@/components/shared/PageHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import VisionMission from "@/components/about/VisionMission";
import DirectorMessage from "@/components/shared/DirectorMessage";
import OurJourney from "@/components/about/OurJourney";
import ManagementSection from "@/components/about/ManagementSection";
import CampusSection from "@/components/about/CampusSection";
import CtaBanner from "@/components/shared/CtaBanner";
import { aboutPage, aboutHero, aboutDirectorMessage, aboutCta } from "@/data/about";

export const metadata = { title: `${aboutPage.heading} — Tilak Global School` };

export default function AboutUsPage() {
  return (
    <>
      <PageHero data={aboutHero} />
      <WhoWeAre />
      <VisionMission />
      <DirectorMessage data={aboutDirectorMessage} bg="bg-white" />
      <OurJourney />
      <ManagementSection />
      <CampusSection />
      <CtaBanner data={aboutCta} />
    </>
  );
}

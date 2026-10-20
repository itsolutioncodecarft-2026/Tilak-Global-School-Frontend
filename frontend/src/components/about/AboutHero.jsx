/**
 * AboutHero — thin wrapper that passes aboutHero data to the shared PageHero.
 * Import PageHero directly in other pages; this exists only for convenience.
 */
import PageHero from "@/components/shared/PageHero";
import { aboutHero } from "@/data/about";

export default function AboutHero() {
  return <PageHero data={aboutHero} />;
}

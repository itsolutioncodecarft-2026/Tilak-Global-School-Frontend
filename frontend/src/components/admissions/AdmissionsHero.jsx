import PageHero from "@/components/shared/PageHero";

/**
 * AdmissionsHero — thin wrapper around the shared PageHero.
 * All admissions subpages use this so styles are maintained in one place.
 *
 * Props:
 *   data — hero data from data/admissions.js
 */
export default function AdmissionsHero({ data }) {
  return <PageHero data={data} />;
}

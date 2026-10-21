import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ToasterProvider from "@/components/ToasterProvider";

export const metadata = {
  title: "Tilak Global School",
  description: "Quality CBSE education in Jaipur — Nursery to Class XII",
};

export default function UserLayout({ children }) {
  return (
    <>
      <ToasterProvider />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

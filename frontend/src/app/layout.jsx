import "./globals.css";

export const metadata = {
  title: "Tilak Global School",
  description: "Quality CBSE education in Jaipur — Nursery to Class XII",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}

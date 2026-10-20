import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F1FB] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#0B3D91] mb-4">404</h1>
      <p className="text-xl text-[#5B6785] mb-8">Page not found</p>
      <Link
        href="/"
        className="bg-[#0B3D91] hover:bg-[#0d2f6e] text-white font-semibold px-6 py-3 rounded-lg transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

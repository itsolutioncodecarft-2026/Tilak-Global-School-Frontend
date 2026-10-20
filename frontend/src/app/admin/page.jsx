// This route is intentionally disabled on the public website.
// The admin panel runs at admin-portal.tilakglobalschool.in (prod)
// or http://localhost:3001 (dev).
import { notFound } from 'next/navigation';

export default function AdminBlockedPage() {
  notFound(); // Always returns 404 — no admin access via public domain
}

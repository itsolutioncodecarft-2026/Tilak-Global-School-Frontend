// Admin panel is at admin-portal.tilakglobalschool.com — NOT on the public site.
// This route intentionally returns 404 to prevent any access via public domain.
import { notFound } from 'next/navigation';

export default function AdminRoute() {
  notFound();
}

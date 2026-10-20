import './globals.css';
import { AuthProvider } from './AuthContext';
import AdminShell from './AdminShell';

export const metadata = {
  title:       'Admin Panel – Tilak Global School',
  description: 'Staff administration portal for Tilak Global School',
  robots:      'noindex, nofollow',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Explicitly block all search engine indexing */}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </head>
      <body>
        <AuthProvider>
          <AdminShell>{children}</AdminShell>
        </AuthProvider>
      </body>
    </html>
  );
}

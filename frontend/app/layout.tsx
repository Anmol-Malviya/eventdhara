import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: {
    default: 'Eventdhara — Book Services Online',
    template: '%s | Eventdhara',
  },
  description: 'Book event services, vendors and experiences online.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>

        <body suppressHydrationWarning>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
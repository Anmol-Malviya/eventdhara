import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { BookProvider } from '@/context/BookContext';

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
      <body suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <BookProvider>
              {children}
            </BookProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

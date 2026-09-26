import type { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ka">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
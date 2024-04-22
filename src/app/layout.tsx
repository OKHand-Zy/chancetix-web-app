import type { Metadata } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import './globals.css';

// Golbal Font: Noto Sans Traditional Chinese
const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ChanceTix',
  description: 'ChanceTix is a ticketing system.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={NotoSansTC.className}>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}

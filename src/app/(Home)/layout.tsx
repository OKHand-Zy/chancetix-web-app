import React, { FC } from 'react';
import { Noto_Sans_TC } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

interface WebLayoutProps {
  children: React.ReactNode;
}

const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
});

const WebLayout: FC<WebLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={NotoSansTC.className}>
        <Header/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}

export default WebLayout;

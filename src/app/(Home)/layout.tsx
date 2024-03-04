import React, { FC } from 'react';
import { Noto_Sans_TC } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/components/ui/home/Navbar';
import Footer from '@/components/ui/home/Footer';

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
      <body className= {NotoSansTC.className}>
        <Header/>
          <main className=' bg-gradient-to-b from-orange-400 to-amber-300 flex-grow '>
            {children}
          </main>
        <Footer/>
      </body>
    </html>
  );
}

export default WebLayout;

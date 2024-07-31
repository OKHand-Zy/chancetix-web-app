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

import { Metadata } from "next"
export const metadata: Metadata = {
  title: "ChanceTix",
  description: "ChanceTix 提供一個公平抽選制度的售票平台，並提供原價讓票轉移的平台",
}

const WebLayout: FC<WebLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={NotoSansTC.className}>
        <Header />
        <main className=" 
          bg-orange-300 
          flex-grow
          h-auto
          w-auto
        ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default WebLayout;

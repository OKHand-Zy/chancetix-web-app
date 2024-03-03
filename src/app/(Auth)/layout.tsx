import { Noto_Sans_TC } from 'next/font/google'
import '@/app/globals.css'
import Navbar from '@/components/ui/home/Navbar'
import Footer from '@/components/ui/home/Footer'
import { ReactNode } from 'react'

// Golbal Font: Noto Sans Traditional Chinese 
const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

interface WebLayoutProps {
  children: ReactNode;
}

export default function AuthLayout ({
    children, 
  } : {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body className={NotoSansTC.className}>
          <Navbar/>
            <div className='h-full flex items-center justify-center bg-blue-500'>
              {children}
            </div>
          <Footer/>
        </body>
      </html>
    )
}

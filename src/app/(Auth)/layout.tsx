import { Noto_Sans_TC } from 'next/font/google'
import '@/app/globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { ReactNode } from 'react'

// Golbal Font: Noto Sans Traditional Chinese 
const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

interface WebLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<WebLayoutProps> = ({ children } : any) => {
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

export default AuthLayout;
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
          {children}
        <Footer/>
      </body>
    </html>
  )
}

export default AuthLayout;
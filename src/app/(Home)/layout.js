import { Noto_Sans_TC } from 'next/font/google'
import '@/src/app/globals.css'
import Navbar from '@/src/components/ui/Navbar'
import Footer from '@/src/components/ui/Footer'

// Golbal Font: Noto Sans Traditional Chinese 
const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default function WebLayout({ children }) {
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

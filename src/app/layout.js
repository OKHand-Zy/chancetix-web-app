import { Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'

// Golbal Font: Noto Sans Traditional Chinese 
const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
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

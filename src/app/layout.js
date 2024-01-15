import { Inter,Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'


const inter = Inter({ subsets: ['latin'] })
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

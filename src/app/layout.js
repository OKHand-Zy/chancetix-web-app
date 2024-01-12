import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
          {children}
        <Footer/>
      </body>
    </html>
  )
}

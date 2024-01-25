import { Noto_Sans_TC } from 'next/font/google'
import '@/src/app/globals.css'

// Golbal Font: Noto Sans Traditional Chinese 
const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default function ApiLayout({ children }) {
  return (
    <html lang="en">
      <body className={NotoSansTC.className}>
        {children}
      </body>
    </html>
  )
}

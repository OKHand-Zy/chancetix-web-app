import { Noto_Sans_TC } from 'next/font/google'
import Header from '@/components/ui/home/Navbar'
import Footer from '@/components/ui/home/Footer'
import { Topbar } from "@/components/settings/navbar";
import { Toaster } from '@/components/ui/Shadcn/sonner';

const NotoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children } : ProtectedLayoutProps) => {
  return (
    <html lang="en">
      <body className={`${NotoSansTC.className} flex flex-col min-h-screen`}>
        <Header />
        <div className="flex-grow flex flex-col gap-y-10 items-center justify-center bg-blue-500 pt-16 pb-16">
          <Topbar />
          <Toaster />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

export default ProtectedLayout
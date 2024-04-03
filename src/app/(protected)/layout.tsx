import { Navbar } from "@/components/settings/navbar";
import { Toaster } from '@/components/ui/Shadcn/sonner';

interface ProtectedLayoutProps {
  children: React.ReactNode
}
const ProtectedLayout = ({ children } : ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-blue-500">
      <Navbar /> 
      <Toaster /> 
      {children}
    </div>
  );
}

export default ProtectedLayout
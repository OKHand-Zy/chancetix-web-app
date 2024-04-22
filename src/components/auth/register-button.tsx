'use client';

import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/Shadcn/dialog';
import { RegisterForm } from '@/components/auth/register-form'; 

interface RegisterButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export default function RegisterButton({
  children,
  mode = 'redirect',
  asChild,
}: RegisterButtonProps) {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/register');
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogContent className='p-0 w-auto bg-transparent border-none'>
          <RegisterForm />
        </DialogContent>
      </Dialog>
    )

  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}

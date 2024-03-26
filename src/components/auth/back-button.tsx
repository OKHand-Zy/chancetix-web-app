'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/Shadcn/button';

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button asChild variant="link" className="font-normal w-full" size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  );
};

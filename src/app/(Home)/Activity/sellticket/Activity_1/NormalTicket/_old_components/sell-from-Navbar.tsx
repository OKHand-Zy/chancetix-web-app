
import React from 'react';
import { 
  CardTitle,
  CardDescription
} from '@/components/ui/Shadcn/card';

interface SellFromNavbarProps {
  title: string;
  description: string;
}

export const SellFromNavbar: React.FC<SellFromNavbarProps> = ({ title, description }) => {
  return (
    <>
      <CardTitle className="text-4xl">
        {title}
      </CardTitle>
      <CardDescription>
        {description}
      </CardDescription>
    </>
  );
}
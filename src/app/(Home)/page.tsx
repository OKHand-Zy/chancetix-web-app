import CarouselSlide from '@/components/home/carouselslide';
import ProductCard from '@/components/home/productcards';
import React from 'react';

import { Card } from '@/components/ui/Shadcn/card';

const Home: React.FC = () => {
  return (
    <>
      <div className="h-full flex flex-col p-8">
        <CarouselSlide />
        <Card>
          <ProductCard />
        </Card>
      </div>
    </>
  );
};

export default Home;

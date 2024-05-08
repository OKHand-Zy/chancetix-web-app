import CarouselSlide from '@/components/home/carouselslide';
import NewCarouselSlide from '@/components/home/NewCarouselide/carouselslide';
import ProductCard from '@/components/home/productcards';
import React from 'react';

import { Card } from '@/components/ui/Shadcn/card';

const Home: React.FC = () => {
  return (
    <>
      <div className="w-auto h-auto flex flex-col p-8">
        <NewCarouselSlide />
        <Card>
          <ProductCard />
        </Card>
      </div>
    </>
  );
};

export default Home;

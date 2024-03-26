import CarouselSlide from '@/components/home/carouselslide';
import ProductCard from '@/components/home/productcards';
import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <div className="h-full flex flex-col p-8">
        <CarouselSlide />
        <ProductCard />
      </div>
    </>
  );
};

export default Home;

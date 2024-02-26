import CarouselSlide from '@/components/home/carouselslide';
import ProductCard from '@/components/home/productcards';
import React from 'react';


const Home: React.FC = () => {
  return (
    <>
      <main className="bg-black h-full flex flex-col p-8">
        <div>
          <CarouselSlide />
          <ProductCard />
        </div>
      </main>
    </>
  );
}

export default Home;
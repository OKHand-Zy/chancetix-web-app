"use client";
import CarouselSlide from '@/components/home/carouselslide';
import NewCarouselSlide from '@/components/home/NewCarouselide/carouselslide';
import ProductCard from '@/components/home/productcards';
import React from 'react';
import { useEffect } from 'react';
import { Card } from '@/components/ui/Shadcn/card';

import LTicketFromStore from '@/store/LTicketFromStore'

const Home: React.FC = () => {
  const { FVolunteer, SVolunteer, FVCount, SVCount, ACName } = LTicketFromStore((state) => ({
    ACName: state.activityName,
    FVolunteer: state.FVolunteer,
    FVCount: state.FVCount,
    SVolunteer: state.SVolunteer,
    SVCount: state.SVCount,
  }));

  useEffect(() => {
    // 在組件載入時執行 resetTicketData 方法
    LTicketFromStore.getState().resetTicketData();
  }, []);

  return (
    <>
      <div className="flex flex-col p-8">
        <NewCarouselSlide />
        <Card>
          <ProductCard />
        </Card>
      </div>
    </>
  );
};

export default Home;

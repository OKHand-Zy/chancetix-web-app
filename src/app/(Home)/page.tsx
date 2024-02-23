import ScrollAcImage from '@/components/scrollAcShow/ScrollAcImage';
import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <main className="bg-gray-400 flex h-full flex-col items-center justify-center p-24 ">
        <div>
          <ScrollAcImage/>
        </div>
      </main>
    </>
  );
}

export default Home;
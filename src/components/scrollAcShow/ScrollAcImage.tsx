'use client';
import { useState, useEffect, ReactNode, useCallback } from 'react';
import Image from 'next/image';

interface ScrollAcImageProps {
  children?: ReactNode;
}

const ScrollAcImage: React.FC<ScrollAcImageProps> = ({children}) => {
  
  const imagePaths = [
    "/images/activity_img/boat.jpg", 
    "/images/activity_img/rocks.jpg",
    "/images/activity_img/cat.jpg",
    "/images/activity_img/corgi.jpg",
    "/images/activity_img/avenue.jpg",
  ];

  const START_COUNT = 0;
  const FULL_COUNT = imagePaths.length;

  const [currentIndex, setCurrentIndex] = useState(START_COUNT);
  const [leftIndex, setLeftIndex] = useState(FULL_COUNT - 1);
  const [rightIndex, setRightIndex] = useState(START_COUNT + 1);
  
  const [trigger, setTrigger] = useState(false);

  const back = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % FULL_COUNT);
    setLeftIndex((prevIndex) => (prevIndex + 1) % FULL_COUNT);
    setRightIndex((prevIndex) => (prevIndex + 1) % FULL_COUNT);
    setTrigger(prev => !prev);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + FULL_COUNT) % FULL_COUNT);
    setLeftIndex((prevIndex) => (prevIndex - 1 + FULL_COUNT) % FULL_COUNT);
    setRightIndex((prevIndex) => (prevIndex - 1 + FULL_COUNT) % FULL_COUNT);
    setTrigger(prev => !prev);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(next, 3000);
    return () => clearInterval(intervalId);
  }, [next, trigger]);

  const currentImage = imagePaths[currentIndex];
  const leftImage = imagePaths[leftIndex];
  const rightImage = imagePaths[rightIndex];

  return (
    <div>
      <div className='columns-5'>
        <button onClick={next} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
          Next
        </button>

        <div>
            <Image src={leftImage} alt="activity_image" width={150} height={100} priority={true} />
            <Image src={currentImage} alt="activity_image" width={150} height={100} priority={true} />
            <Image src={rightImage} alt="activity_image" width={150} height={100} priority={true} />
        </div>
        
        <button onClick={back} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
          back
        </button>
      </div>
      
      {children}
    </div>
  );
}

export default ScrollAcImage;
//ref:https://zh-hans.react.dev/reference/react/use-client

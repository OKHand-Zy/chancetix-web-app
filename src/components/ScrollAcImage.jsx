'use client';
import { useState,useEffect } from 'react';
import activityImagList from './activityImagList';
import ShowImg from './ShowImg';

export default function ScrollAcImage({children}) {
  const start_count = 0
  const full_count = 5
  const [Index_c, setIndex_c] = useState(start_count);
  const image_C = activityImagList[Index_c];
  const [Index_l, setIndex_l] = useState(full_count-1);
  const image_L = activityImagList[Index_l];
  const [Index_r, setIndex_r] = useState(start_count+1);
  const image_R = activityImagList[Index_r];
  
  // Back Button Function
  const  back = () => {
    setIndex_c(Index_c+1);
    setIndex_l(Index_l+1);
    setIndex_r(Index_r+1);
    if (Index_c+1 == full_count){
      setIndex_c(0);
    }else if (Index_r+1 == full_count){
      setIndex_r(0);
    }else if (Index_l+1 == full_count){
      setIndex_l(0);
    }
  };
  
  // Next Button Function
  const  next = () => {
    setIndex_c(Index_c-1);
    setIndex_l(Index_l-1);
    setIndex_r(Index_r-1);
    if (Index_c - 1 < 0) {
      setIndex_c(full_count-1);
    }else if (Index_r-1 < 0) {
      setIndex_r(full_count-1);
    }else if (Index_l-1 < 0) {
      setIndex_l(full_count-1);
    }
  };
  
  // 活動每 30s 切換
  useEffect(() => {
    // Set up an interval to call the next function every 30 seconds
    const intervalId = setInterval(() => {
      next();
    }, 3000);
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  });

  return (
    <div>
      <div className='columns-5'>
        
        <button onClick={next} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
          Next
        </button>

        <ShowImg image_L={image_L} image_C={image_C} image_R={image_R} />
        
        <button onClick={back} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
          back
        </button>
      
      </div>
      {children}
    </div>
  );
}

//ref:https://zh-hans.react.dev/reference/react/use-client

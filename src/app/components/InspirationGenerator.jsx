'use client';

import { useState,setState } from 'react';
import inspirations from './inspirations';
import FancyText from './FancyText';
import ShowImg from './ShowImg';

export default function InspirationGenerator({count,full_count,children}) {
  const [index, setIndex] = useState(count);
  const quote = inspirations[index];
  //const next = () => setIndex((index + 1) % inspirations.length);
  
  const  next = () => {
    if (index + 1 == full_count) {
      setIndex(0);
    }
    else {
      setIndex(index + 1);
    }
  };

  const  back = () => {
    if (index - 1 < 0) {
      setIndex(full_count-1);
    }
    else {
      setIndex(index - 1);
    }
  };

  return (
    <div>
      <p>Your inspirational quote is:</p>
      <div className='container'>
        
        <ShowImg text={quote} />
        <button onClick={next} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
          Next
        </button>
        <button onClick={back} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
          back
        </button>
      </div>
      {children}
    </div>
  );
}

//ref:https://zh-hans.react.dev/reference/react/use-client
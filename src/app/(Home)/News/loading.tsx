import React from 'react';
import { FadeLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='flex justify-center text-center items-center'>
      <div>
        <h1>Loading.....</h1>
        <FadeLoader color="#10B981" />
      </div>
    </div>
  );
}

export default Loading;

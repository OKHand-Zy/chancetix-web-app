import React from 'react';
import Account from './Account';

const Popup = ({ togglePopup }) => (
  <dev className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-screen h-screen bg-black bg-opacity-75 flex justify-center items-center">
    <dev className="w-300 bg-white p-40 rounded-8">
      <dev className="text-black p-2 cursor-pointer w-90 text-center">
        <p>This is your popup content.</p>
      </dev>
      <button type="submit" onClick={Account}> Submit </button>
      <button className="bg-blue-500 text-black p-2 cursor-pointer w-90 text-center"
        onClick={togglePopup}> Close </button>
    </dev>
  </dev>
);

export default Popup;
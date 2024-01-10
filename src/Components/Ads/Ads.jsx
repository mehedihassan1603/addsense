import React, { useState } from 'react';

const Ads = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
     
      <div className="mb-4">
        <img
          src="https://placekitten.com/400/200" 
          alt="Advertisement"
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Click Here
        </button>
      </div>

      <div className="mt-4 text-center text-gray-600">
        Click count: {clickCount}
      </div>
    </div>
  );
};

export default Ads;

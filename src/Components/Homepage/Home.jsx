import React from 'react';

const Home = () => {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full text-center rounded-lg bg-white shadow-lg">
        <img
          src="https://placekitten.com/1200/400"
          alt="Banner"
          className="w-full h-40 md:h-80 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Website</h1>
        <p className="text-lg text-gray-700">
          Explore and discover amazing things.
        </p>
      </div>
    </div>
  );
};

export default Home;

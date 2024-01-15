import React from "react";
import { Link } from "react-router-dom";

const AddPackage = () => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold mb-4">Choose a Package</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full md:w-4/6 mx-auto gap-6 items-center mt-8">
        <Link
          to="/basic"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 text-center text-2xl px-4 rounded mb-2"
        >
          Basic
        </Link>
        <Link
          to="/standard"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-10 text-center text-2xl px-4 rounded mb-2"
        >
          Standard
        </Link>
        <Link
          to="/premium"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-10 text-center text-2xl px-4 rounded mb-2"
        >
          Premium
        </Link>
      </div>
    </div>
  );
};

export default AddPackage;

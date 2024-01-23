import React from "react";

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          Payment Successful
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Thank you for your payment. Your transaction was successful!
        </p>
        <div className="flex justify-center">
          <img
            src="https://www.svgrepo.com/show/13650/success.svg"
            alt="Success Icon"
            className="w-16 h-16 mr-2"
          />
        </div>
        <div className="flex justify-center">
          <button className="mt-6 text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline-green">
            <a href="/">Go to Home</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;

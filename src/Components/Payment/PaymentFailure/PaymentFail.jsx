import React from "react";

const PaymentFail = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-semibold text-red-600 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Please ensure that you have provided the correct information. You can
          try again or contact support for assistance.
        </p>
        <div className="flex justify-center">
          <img
            src="https://www.svgrepo.com/show/13658/error.svg"
            alt="Fail Icon"
            className="w-16 h-16 mr-2"
          />
        </div>
        <div className="flex justify-center">
          <button className="mt-6 text-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline-green">
            <a href="/">Go to Home</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;

import React from 'react';
import Axios from 'axios'; 
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const config = {
    baseUrl: 'http://localhost:5000/', 
  };

  const bkashPaymentHandler = async () => {
    try {
      const result = await Axios.post(config?.baseUrl + 'api/bkash/create',{
        transactionId: uuidv4(),
      });
      if (result?.data?.status) {
        window.location.href = result?.data?.data?.data?.bkashURL;
      } else {
        console.error('Error in bKash payment:', result?.data?.message);
        
      }
    } catch (error) {
      console.error('Error in bKash payment:', error);
      
    }
  };

  return (
    <div className="flex items-center justify-center mt-[100px]">
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded-md"
        onClick={bkashPaymentHandler}
      >
        Pay With Bkash
      </button>
    </div>
  );
};

export default Home;

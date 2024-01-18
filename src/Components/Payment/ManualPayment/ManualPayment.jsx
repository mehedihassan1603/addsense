import React, { useState } from 'react';
import useAxiosPublic from '../../Authentication/Hook/useAxiosPublic';

const ManualPayment = () => {
    const axiosPublic = useAxiosPublic();
    const [product, setProduct] = useState({
      number: "",
      transactionId: "",
      amount: "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(product);
  
      axiosPublic.post('/number', product)
          .then(res =>{
            if(res.data.insertedId){
              console.log('user added')
              toast.success("Submitted successfully! Wait for a minute.", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
      
              setTimeout(() => {
                e.target.reset();
              }, 3000);
            }
          })
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Manual bKash Payment</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Number:</label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="number"
            name="number"
            
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Transaction ID:</label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="transactionId"
           
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="amount"
           
            onChange={handleChange}
          />
        </div>
        
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          type="submit"
          
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ManualPayment;

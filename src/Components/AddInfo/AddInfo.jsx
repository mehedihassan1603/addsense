import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const AddInfo = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState({
    text: "",
    number: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);

    axiosPublic.post('/addinfo', product)
        .then(res =>{
          if(res.data.insertedId){
            console.log('user added')
            toast.success("Info Updated successfully!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
    
            setTimeout(() => {
              e.target.reset();  
              navigate("/");
            }, 2000);
          }
        })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="bg-gray-200 w-9/12 mt-10 mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
        Add Information
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-600">
            Info text:
          </label>
          <input
            type="text"
            id="text"
            name="text"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="block text-gray-600">
            Number:
          </label>
          <input
            type="number"
            id="number"
            name="number"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-5 text-white py-2 rounded-3xl text-lg card-hover mt-4 bg-gradient-to-r from-rose-700 via-rose-800 to-rose-700"
          >
            ADD
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddInfo;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const AddAds = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState({
    frame: "",
    name: "",
    playtime: "",
    reward: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);

    axiosPublic.post('/ads', product)
        .then(res =>{
          if(res.data.insertedId){
            console.log('user added')
            toast.success("Create ADS successfully!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
    
            setTimeout(() => {
              e.target.reset();  
              navigate("/dashboard");
            }, 2000);
          }
        })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="bg-gray-200 w-full md:w-9/12 mt-10 mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
        CREATE ADS
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="frame" className="block text-gray-600">
            URL:
          </label>
          <textarea
            id="frame"
            name="frame"
            required
            onChange={handleChange}
            className="w-full h-40 border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="playtime" className="block text-gray-600">
            Ads Run Time:
          </label>
          <input
            type="number"
            id="playtime"
            name="playtime"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reward" className="block text-gray-600">
            Reward Amount:
          </label>
          <input
            type="number"
            id="reward"
            step="any"
            name="reward"
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
            CREATE
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddAds;

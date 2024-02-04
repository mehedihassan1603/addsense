import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const EditForm = ({ ad, onSave, onCancel }) => {
  const axiosPublic = useAxiosPublic();
  const [editedProduct, setEditedProduct] = useState({ ...ad });

  const handleSave = (e) => {
    e.preventDefault();
    console.log(editedProduct);

    axiosPublic
      .put(`/ads/${ad._id}`, editedProduct)
      .then((res) => {
        if (res.status === 200) {
          console.log("Ad updated successfully");
          toast.success("Update ADS successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          // Invoke the onSave callback with the updated ad data
          onSave(editedProduct);
        } else {
          console.error(`Failed to update ad with ID ${ad._id}`);
        }
      })
      .catch((error) => {
        console.error(`Error updating ad with ID ${ad._id}:`, error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <div className="bg-gray-200 w-full mt-10 mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
        EDIT ADS
      </h1>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label htmlFor="frame" className="block text-gray-600">
            URL:
          </label>
          <input
            type="url"
            id="frame"
            name="frame"
            required
            value={editedProduct.frame}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
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
            value={editedProduct.name}
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
            value={editedProduct.playtime}
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
            value={editedProduct.reward}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-5 text-white py-2 rounded-3xl text-lg card-hover mt-4 bg-gradient-to-r from-rose-700 via-rose-800 to-rose-700"
          >
            SAVE
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="ml-4 px-5 text-white py-2 rounded-3xl text-lg card-hover mt-4 bg-gray-500 hover:bg-gray-700"
          >
            CANCEL
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditForm;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const OthersInfo = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState({
    title: "",
    facebook: "",
    linkdin: "",
    aboutus: "",
    phone: "",
    email: "",
    whatsapp: "",
  });

  useEffect(() => {
    axiosPublic
      .get("/othersinfo")
      .then((res) => {
        if (res.data.length > 0) {
          setProduct(res.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching appinfo:", error);
      });
  }, [axiosPublic]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosPublic
      .post("/othersinfo", {
        title: product.title,
        facebook: product.facebook,
        linkdin: product.linkdin,
        aboutus: product.aboutus,
        phone: product.phone,
        email: product.email,
        whatsapp: product.whatsapp,
      })
      .then((res) => {
        if (res.data.insertedId) {
          console.log("New item added with ID:", res.data.insertedId);
          toast.success("Info Added successfully!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setTimeout(() => {
            e.target.reset();
            navigate("/dashboard");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error posting data to /addinfo:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="bg-gray-200 w-full md:w-9/12 mt-10 mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
        Add Information
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-600">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            onChange={handleChange}
            value={product.title}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-600">
            Facebook:
          </label>
          <input
            type="text"
            id="facebook"
            name="facebook"
            required
            onChange={handleChange}
            value={product.facebook}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-600">
            Linkdin:
          </label>
          <input
            type="text"
            id="linkdin"
            name="linkdin"
            required
            onChange={handleChange}
            value={product.linkdin}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="aboutus" className="block text-gray-600">
            About Us:
          </label>
          <textarea
            id="aboutus"
            name="aboutus"
            required
            value={product.aboutus}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-600">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            onChange={handleChange}
            value={product.phone}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-600">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            required
            onChange={handleChange}
            value={product.email}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-600">
            Whatsapp:
          </label>
          <input
            type="text"
            id="whatsapp"
            name="whatsapp"
            required
            onChange={handleChange}
            value={product.whatsapp}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-5 text-white py-2 rounded-3xl text-lg card-hover mt-4 bg-gradient-to-r from-rose-700 via-rose-800 to-rose-700"
          >
            Update
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default OthersInfo;

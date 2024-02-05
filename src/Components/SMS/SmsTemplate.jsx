import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import useAuth from './../Authentication/Hook/useAuth';

const SmsTemplate = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState({
    name: "",
    text: "",
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/smstemplate");
        const foundEmail = response.data.filter(item => item.userEmail === user.email);
        const sortedUsers = foundEmail.sort((a, b) => {
          return b._id.localeCompare(a._id);
        });
        console.log(sortedUsers)
        setItems(sortedUsers);
      } catch (error) {
        console.error("Error fetching ads data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosPublic.post(`/smstemplate`, {
      userEmail: user.email,
      name: product.name,
      text: product.text,
    })
    .then(res => {
      if (res.data.insertedId) {
        toast.success("Successfully Created!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        
        setTimeout(() => {
            e.target.reset();
            window.location.reload();
          }, 2000);
      }
    })
    .catch(error => {
      console.error("Error posting data", error);
      toast.error("An error occurred. Please try again later.");
    });
  };
  const handleDelete = (templateId) => {
    axiosPublic.delete(`/smstemplate/${templateId}`)
      .then(() => {
        toast.success('Successfully Deleted!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setItems(items.filter(item => item._id !== templateId));
      })
      .catch(error => {
        console.error('Error deleting SMS template', error);
        toast.error('An error occurred while deleting. Please try again later.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  
  return (
    <div className="bg-gray-200 w-full md:w-9/12 mt-10 mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
        SMS Information
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600">
            Template Name:
          </label>
          <input
            type="name"
            id="name"
            name="name"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-600">
            Template Text:
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
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-5 text-white py-2 rounded-3xl text-lg card-hover mt-4 bg-gradient-to-r from-rose-700 via-rose-800 to-rose-700"
          >
            Create
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">SMS Templates</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Serial No.</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Text</th>
            </tr>
          </thead>
          <tbody>
        {items.map((item, index) => (
          <tr key={item._id}>
            <td className="border border-gray-300 p-2">{index + 1}</td>
            <td className="border border-gray-300 p-2">{item.name}</td>
            <td className="border border-gray-300 p-2">{item.text}</td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SmsTemplate;

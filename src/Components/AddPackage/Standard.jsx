import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Standard = () => {
    const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState({
    name: "Standard",
    amount: "",
    price: "",
    details: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);

    axiosPublic.post('/standard', product)
        .then(res =>{
          if(res.data.insertedId){
            console.log('user added')
            toast.success("Package plans successfully create!", {
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
    <div className="bg-gray-200 w-10/12 md:w-8/12 mt-10 mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
        Set Standard Package Plan
      </h1>
      <form onSubmit={handleSubmit}>
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
            value="Standard" 
            readOnly
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="playtime" className="block text-gray-600">
            Reward Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="playtime" className="block text-gray-600">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="playtime" className="block text-gray-600">
            Details:
          </label>
          <input
            type="textarea"
            id="details"
            name="details"
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
      <ToastContainer />
    </div>
  );
};

export default Standard;
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Standard = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [packagee, setPackagee] = useState({});
  const [product, setProduct] = useState({
    name: "Standard",
    price: "",
    details: "",
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axiosPublic.get("/standard");
            const responsePackage = response.data.find(item => item.name === "Standard");
            setPackagee(responsePackage);
        } catch (error) {
            console.error("Error fetching package:", error);
        }
    };

    fetchData();
  }, [axiosPublic]);

  useEffect(() => {
    setProduct({
      ...product,
      price: packagee.price,
      details: packagee.details,
    });
  }, [packagee]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosPublic.put(`/standard/${packagee._id}`, product).then((res) => {
      console.log(res.data)
      if (res.data.modifiedCount > 0) {
        console.log(res.data);
        toast.success("Package plans successfully updated!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  


  return (
    <div className="bg-gray-200 w-9/12 mt-10 mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
        Update Premium Package
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
            value={product.name}
            readOnly
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-600">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="details" className="block text-gray-600">
            Details:
          </label>
          <textarea
            id="details"
            name="details"
            value={product.details}
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
            Update
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Standard;

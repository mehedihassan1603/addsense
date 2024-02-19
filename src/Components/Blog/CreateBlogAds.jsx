import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlogAds = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState({
    name: "",
    image: "",
    details: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const imageUploadResponse = await axiosPublic.post("/upload-image", formData);
      const imageUrl = imageUploadResponse.data.imageUrl;

      const productData = {
        ...product,
        image: imageUrl,
      };

      const blogPostResponse = await axiosPublic.post("/blog", productData);
      console.log(blogPostResponse.data);
      if (blogPostResponse.data.insertedId) {
        toast.success("Blog page successfully created!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error occurred while processing request!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="bg-gray-200 w-9/12 mt-10 mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
        Blog
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600">
            Name:
          </label>
          <textarea
            id="name"
            name="name"
            onChange={handleChange}
            value={product.name}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-600">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="border p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="details" className="block text-gray-600">
            Description:
          </label>
          <textarea
            id="details"
            name="details"
            onChange={handleChange}
            value={product.details}
            className="w-full h-40 border p-2 rounded-md"
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

export default CreateBlogAds;

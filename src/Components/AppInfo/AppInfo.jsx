import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppInfo = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [product, setProduct] = useState({
    username: "",
    password: "",
    app_key: "",
    app_secret: "",
    grant_token_url: "",
    refresh_token_url: "",
    create_payment_url: "",
    execute_payment_url: "",
    backend_callback_url: "",
    frontend_success_url: "",
    frontend_fail_url: "",
  });
  useEffect(() => {
    axiosPublic.get('/appinfo')
      .then(res => {
        if (res.data.length > 0) {
          setProduct(res.data[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching appinfo:', error);
      });
  }, [axiosPublic]);
  console.log(product)

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Product ID:", product._id);
    axiosPublic.put(`/appinfo/${product._id}`, product)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          console.log('appinfo updated');
          toast.success("Update successful!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch(error => {
        console.error('Error updating appinfo:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="bg-gray-200 w-9/12 mt-10 mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
        App Information
      </h1>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={product.username}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={product.password}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="app_key" className="block text-gray-600">
            App Key:
          </label>
          <input
            type="text"
            id="app_key"
            name="app_key"
            value={product.app_key}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="app_secret" className="block text-gray-600">
            App Secret:
          </label>
          <input
            type="text"
            id="app_secret"
            name="app_secret"
            value={product.app_secret}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="grant_token_url" className="block text-gray-600">
            Grant Token URL:
          </label>
          <input
            type="text"
            id="grant_token_url"
            name="grant_token_url"
            value={product.grant_token_url}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="refresh_token_url" className="block text-gray-600">
            Refresh Token URL:
          </label>
          <input
            type="text"
            id="refresh_token_url"
            name="refresh_token_url"
            value={product.refresh_token_url}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="create_payment_url" className="block text-gray-600">
            Create Payment URL:
          </label>
          <input
            type="text"
            id="create_payment_url"
            name="create_payment_url"
            value={product.create_payment_url}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="execute_payment_url" className="block text-gray-600">
            Execute Payment URL:
          </label>
          <input
            type="text"
            id="execute_payment_url"
            name="execute_payment_url"
            value={product.execute_payment_url}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="backend_callback_url" className="block text-gray-600">
            Backend Callback URL:
          </label>
          <input
            type="text"
            id="backend_callback_url"
            name="backend_callback_url"
            value={product.backend_callback_url}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="backend_callback_url" className="block text-gray-600">
          Frontend Success url:
          </label>
          <input
            type="text"
            id="frontend_success_url"
            name="frontend_success_url"
            value={product.frontend_success_url}
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="backend_callback_url" className="block text-gray-600">
          Frontend fail url:
          </label>
          <input
            type="text"
            id="frontend_fail_url"
            name="frontend_fail_url"
            value={product.frontend_fail_url}
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

export default AppInfo;

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAdmin from "../Hook/useAdmin";
import useAuth from "../Hook/useAuth";

const AdminLogin = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { user } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    setEmailError("");
    setPasswordError("");
  
    try {
      const userr = await signInUser(email, password);
      
      toast.success("Login successful!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setTimeout(() => {
        e.target.reset();
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/user-not-found") {
        setEmailError("Email not found.");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Incorrect password.");
      } else if (error.code === "auth/invalid-login-credentials") {
        setPasswordError("Email not found or Incorrect password.");
      }
      toast.error("Login failed.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="grid grid-cols-2 gap-4">
          <div className="col-span-2 mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>

          <div className="col-span-2 mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>

          

          <div className="col-span-2 mt-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>

          </div>
          
          <div className="w-full text-center col-span-2 text-white bg-slate-700 p-2 rounded-md hover:bg-slate-600">
            <Link to="/login">Go Back</Link>
          </div>
       
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminLogin;

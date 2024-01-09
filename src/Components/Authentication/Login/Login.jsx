import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../AuthProvider/AuthProvider";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    
    setEmailError("");
    setPasswordError("");

    signInUser(email, password)
      .then(result => {
        console.log(result.user);
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });

        setTimeout(() => {
          e.target.reset();
          navigate('/');
        }, 2000);
      })
      .catch(error => {
        console.error(error);
        if (error.code === "auth/user-not-found") {
          setEmailError("Email not found.");
        } else if (error.code === "auth/wrong-password") {
          setPasswordError("Incorrect password.");
        } else if (error.code === "auth/invalid-login-credentials") {
          setPasswordError("Email not found or Incorrect password.");
        }
      });
  }

  const handleGoogle = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-900">
      <div className="bg-fuchsia-500 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </div>
          <p className="mt-2">New here? Please <span className="text-white"><Link to="/register">Register Account.</Link></span></p>
        </form>
        <p>
          Login with <button onClick={handleGoogle} className="btn-sm rounded-md bg-cyan-400">Google</button>
        </p>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default Login;

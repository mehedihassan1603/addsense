import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.PhotoUrl.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      setPasswordError("Password must contain at least one special character.");
    } else {
      setPasswordError("");

      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name,
          photoURL: photoUrl,
        });

        console.log("User profile updated successfully.");
        toast.success("Account created successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });

        setTimeout(() => {
          e.target.reset();
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-sky-900 flex flex-col items-center justify-center">
      <div className="bg-orange-300 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="name"
              name="name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Profile Photo Link
            </label>
            <input
              type="text"
              id="PhotoUrl"
              placeholder="PhotoUrl"
              name="PhotoUrl"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email"
              name="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            ></input>
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
              placeholder="password"
              name="password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            ></input>
            {passwordError && <p className="text-red-500">{passwordError}</p>}{" "}
            {/* Display password error message */}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
            >
              Register
            </button>
          </div>
          <p className="mt-2">
            Already have an Account? Please{" "}
            <span className="text-blue-500">
              <Link to="/login">Login.</Link>
            </span>
          </p>
        </form>
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default Register;

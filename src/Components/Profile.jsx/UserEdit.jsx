import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserEdit = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    password: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const getUser = await axiosPublic.get("/userinfo");
        const foundEmail = getUser.data.find(
          (item) => item.userEmail === user.email
        );
        setUserInfo(foundEmail);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [axiosPublic, user.email]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axiosPublic.patch(`/userinfo/${userInfo._id}`, {
        password: userInfo.password,
        phoneNumber: userInfo.phoneNumber,
      });

      // Show success toast
      toast.success("User information updated successfully!", {
        position: "top-right",
        autoClose: 3000, // Automatically close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate("/profile/user");
      }, 2000);

      // Handle success, e.g., show a success message, redirect, etc.
    } catch (error) {
      console.error("Error updating user info:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-8/12">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Update Information
        </h1>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleUpdate}>
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
              value={userInfo.password}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={userInfo.phoneNumber}
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full block bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default UserEdit;

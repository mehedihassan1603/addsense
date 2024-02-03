import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const User = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  if (!user) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const getUser = await axiosPublic.get("/userinfo");
        console.log(getUser);
        const foundEmail = getUser.data.find(
          (item) => item.userEmail === user.email
        );
        console.log(foundEmail);
        setUserInfo(foundEmail);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-md w-full md:w-8/12 mx-auto mt-10">
      <h1 className="text-3xl text-center font-semibold mb-4 text-blue-500">
        User Information
      </h1>
      <div className="flex items-center mb-6">
        <img
          className="rounded-full h-20 w-20 mr-6 border-4 border-blue-500"
          src={user.photoURL}
          alt="User Avatar"
        />
        <div>
          <p className="text-2xl font-semibold text-blue-800">{user.displayName}</p>
          <p className="text-gray-600">{userInfo.userEmail}</p>
        </div>
      </div>
      <div className="mb-6">
        <p className="font-semibold text-blue-800">Balance: {userInfo.count}</p>
        <p className="font-semibold text-blue-800">Current SMS Rate: {userInfo.rate}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <p className="font-semibold text-blue-800">Phone Number:</p>
          <p>{userInfo.phoneNumber}</p>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-blue-800">Password:</p>
            <p>{userInfo.password}</p>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            <a href="/profile/useredit">Edit</a>
          </button>
        </div>
        <div className="mb-4">
          <p className="font-semibold text-blue-800">Gender:</p>
          <p>{userInfo.gender}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold text-blue-800">Address:</p>
          <p>{userInfo.address}</p>
        </div>
      </div>
    </div>
  );
};

export default User;

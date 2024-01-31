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
      <h1 className="text-2xl text-center font-semibold mb-4">
        User Information
      </h1>
      <div className="flex items-center mb-4">
        <img
          className="rounded-full h-16 w-16 mr-4"
          src={user.photoURL}
          alt="User Avatar"
        />
        <div>
          <p className="text-lg font-semibold">{user.displayName}</p>
          <p className="text-gray-600">{userInfo.userEmail}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Balance: {userInfo.count}</p>
        <p className="font-semibold">Current SMS Rate: {userInfo.rate}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Phone Number:</p>
        <p>{userInfo.phoneNumber}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Password:</p>
        <p>{userInfo.password}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Gender:</p>
        <p>{userInfo.gender}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">District:</p>
        <p>{userInfo.district}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Division:</p>
        <p>{userInfo.division}</p>
      </div>
      <button className="btn btn-primary"><a href="/profile/useredit">Edit</a></button>
    </div>
  );
};

export default User;

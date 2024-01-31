import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";

const User = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  if (!user) {
    return <p>Loading...</p>;
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("/userinfo");
        setUserInfo(response.data);
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
    <div className="p-6">
      <h1 className="text-2xl text-center font-semibold mb-4">User Information</h1>
      <div className="flex items-center mb-4">
        <img
          className="rounded-full h-16 w-16 mr-4"
          src={user.photoURL}
          alt="User Avatar"
        />
        <div>
          <p className="text-lg font-semibold">{user.displayName}</p>
          <p className="text-gray-600">{userInfo.email}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Address:</p>
        <p>{userInfo.address}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Phone Number:</p>
        <p>{userInfo.phone}</p>
      </div>
    </div>
  );
};

export default User;

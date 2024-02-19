import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import BottomNavbar from "../Homepage/BottomNavbar";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";

const Dashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Successfully logged out");
        navigate("/adminlogin");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col md:flex-row bg-slate-400">
      <div
        className={`w-full md:w-1/4 p-6 bg-gray-800 text-white ${
          isMenuOpen ? "hidden" : ""
        }`}
      >
        <Link to="/dashboard">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        </Link>
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
          >
            Blog
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-gray-500 rounded-box w-52"
          >
            <Link
              to="/dashboard/createBlog"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              Create Blog
            </Link>
            <Link
              to="/dashboard/blogList"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              Blog List
            </Link>
          </ul>
        </div>
        <br />
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
          >
            ADS
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-gray-500 rounded-box w-52"
          >
            <Link
              to="/dashboard/addads"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              Create ADS
            </Link>
            <Link
              to="/dashboard/allAds"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              All ADS List
            </Link>
          </ul>
        </div>
        <br />
        <Link
          to="/dashboard/addpackage"
          className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
        >
          Package
        </Link>
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
          >
            Payment
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-gray-500 rounded-box w-52"
          >
            <Link
              to="/dashboard/appinfo"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              App Payment Info
            </Link>
            <Link
              to="/dashboard/history"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              App Payment History
            </Link>
            <Link
              to="/dashboard/addinfo"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              Manual Payment Info
            </Link>
            <Link
              to="/dashboard/number"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              Manual Payment History
            </Link>
          </ul>
        </div>

        <Link
          to="/dashboard/userinfo"
          className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
        >
          All Users
        </Link>
        <Link
          to="/dashboard/othersinfo"
          className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
        >
          All Info
        </Link>
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
          >
            SMS
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-gray-500 rounded-box w-52"
          >
            <Link
              to="/dashboard/smsinfo"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              SMS Information
            </Link>
            <Link
              to="/dashboard/smsAllHistory"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              SMS History
            </Link>
          </ul>
        </div>
        <Link to="/" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
          Front Home
        </Link>
        <Link
          onClick={() => {
            handleLogout();
          }}
          className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
        >
          Logout
        </Link>
      </div>
      <div className="flex-1 p-6">
        <button
          className="md:hidden absolute top-3 right-3 text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          )}
        </button>
        <div className="min-h-screen">
          <Outlet></Outlet>
        </div>
      </div>
          <BottomNavbar></BottomNavbar>
    </div>
  );
};

export default Dashboard;

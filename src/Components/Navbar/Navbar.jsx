import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import useAdmin from "../Authentication/Hook/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [title, setTitle] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.email) {
          const updatedCount = await axiosPublic.get("/userinfo");
          const foundEmail = updatedCount.data.find(
            (item) => item.userEmail === user.email
          );
          const title = await axiosPublic.get("/othersinfo");
          const take = title.data.find((item) => item.title);
          console.log(take.title);
          setTitle(take.title);
          setClickCount(foundEmail?.count || 0);
        } else {
          setClickCount(0);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, [axiosPublic, user?.email]);

  const handleLogout = () => {
    setClickCount(0);
    logOut()
      .then(() => {
        console.log("Successfull");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="navbar bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-3 z-10 p-2 shadow bg-blue-700 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/ads">Ads</NavLink>
              </li>
              <li>
                <NavLink to="/package">Payment</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/sms">Quick SMS</NavLink>
              </li>
              {user && !isAdmin && (
              <li>
                <NavLink to="/profile/profile">Dashboard</NavLink>
              </li>
            )}
              {user && isAdmin && (
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              )}
            </ul>
          </div>

          <a className="pl-4" href="/">
            <img
              src="/images/free sms apps.png"
              width={"170px"}
              alt=""
              className="rounded-lg"
            />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-title text-white text-lg menu-horizontal px-1 ">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/ads">Ads</NavLink>
            </li>
            <li>
              <NavLink to="/package">Payment</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/sms">Quick SMS</NavLink>
            </li>
            {user && !isAdmin && (
              <li>
                <NavLink to="/profile/profile">Dashboard</NavLink>
              </li>
            )}
            {user && isAdmin && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end flex gap-6 md:gap-10">
          <div>
            <h1 className="text-xs md:text-base">Balance: {clickCount}</h1>
          </div>
          <div className="text-white flex flex-col lg:flex-row items-center">
            {user ? (
              <>
                <Link
                  to="/profile/profile"
                  className="flex flex-col justify-center items-center"
                >
                  <span>
                    <img
                      className="w-8 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                  </span>
                  <span className="text-xs bg-green-600 p-2 rounded-md">
                    {user.displayName}
                  </span>
                </Link>
                <button className="text-sm bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-0 md:py-2 px-1 md:px-4 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
                  <a onClick={handleLogout}>Logout</a>
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="bg-gradient-to-r from-green-800 via-green-600 to-green-800 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const Profile = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [balance, setBalance] = useState();
  const [rate, setRate] = useState();
  const [sms, setSms] = useState();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchSmsHistory = async () => {
      try {
        if (!user) return;
        const response = await axiosPublic.get("/smsHistory");
        const getUser = await axiosPublic.get("/userinfo");
        const filteredSmsHistory = response.data.filter(
          (item) => item.userEmail === user.email
        );
        const foundEmail = getUser.data.find(
          (item) => item.userEmail === user.email
        );

        setSms(filteredSmsHistory);
        setBalance(foundEmail.count);
        setRate(foundEmail.rate);
      } catch (error) {
        console.error("Error fetching SMS history:", error);
      }
    };

    fetchSmsHistory();
  }, [axiosPublic, user]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Successfully logged out");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const toggleNavVisibility = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <div className="flex flex-col md:flex-row bg-slate-400">
      <div
        className={`w-full md:w-1/4 p-6 bg-gray-800 text-white ${
          isMenuOpen ? "hidden" : ""
        }`}
      >
        <div>
        <div className="flex items-center mb-8">
          <img
            className="rounded-full h-12 w-12 mr-2"
            src={user.photoURL}
            alt="User Avatar"
          />
          <div className="flex flex-col">
          <span className="text-white font-semibold text-lg">
            {user.displayName}
          </span>
        <p>Balance: {balance} Taka</p>
          </div>
        </div>
        </div>
        <Link
          to="/profile/profile"
          className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link
          to="/profile/user"
          className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
        >
          User
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
              to="/profile/smstemplate"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              SMS Template
            </Link>
            <Link
              to="/profile/sms"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              Quick SMS
            </Link>
            <Link
              to="/profile/contact"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              Campaign
            </Link>
            <Link
              to="/profile/contactemplate"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              Contact
            </Link>
            <Link
              to="/profile/smsHistory"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              SMS History
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
            Payment
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-gray-500 rounded-box w-52"
          >
            <Link
              to="/package"
              className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
            >
              Make Payment
            </Link>
            <Link
          to="/profile/myinfo"
          className="block py-2 px-4 mb-2 rounded hover:bg-gray-700"
        >
          Manual Payment History
        </Link>
          </ul>
        </div>
        
        <Link to="/" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
          Front Homepage
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
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Profile;

import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if user is available before accessing properties
  if (!user) {
    // You might want to add a loading state or redirect to login
    return <p>Loading...</p>;
  }
  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Successfull");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="bg-gray-800 w-64 min-h-screen p-6">
        <div className="flex items-center mb-8">
          <img
            className="rounded-full h-12 w-12 mr-2"
            src={user.photoURL}
            alt="User Avatar"
          />
          <span className="text-white font-semibold text-lg">
            {user.displayName}
          </span>
        </div>
        <ul className="space-y-2">
          <li>
            <a
              href="/profile/user"
              className="text-white hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
            >
              User
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
            >
              Profile
            </a>
          </li>
          <li>
            <a
              onClick={handleLogout}
              className="text-white hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;

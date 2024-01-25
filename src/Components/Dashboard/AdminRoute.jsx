import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAdmin from "../Authentication/Hook/useAdmin";
import { AuthContext } from "../Authentication/AuthProvider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isAdmin) {
    return children;
  } else {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <p className="text-xl font-semibold mb-4 text-red-500">
            Access Denied!
          </p>
          <p className="text-gray-700">
            You do not have the necessary permissions to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default AdminRoute;

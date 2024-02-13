import React, { useState, useEffect } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserCount, setEditedUserCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPublic.get("/userinfo");
        const sortedUsers = response.data.sort((a, b) => {
          // Assuming the default MongoDB _id field
          return b._id.localeCompare(a._id);
        });
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching user information:", error);
        toast.error("Error fetching user information. Please try again.");
      }
    };
  
    fetchUsers();
  }, [axiosPublic]);

  const filteredUsers = users.filter(user => user.userEmail.toLowerCase().startsWith(searchQuery.toLowerCase()));

  const handleEditClick = (_id, rate) => {
    setEditingUserId(_id);
    setEditedUserCount(rate);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUserCount("");
  };

  const handleSaveEdit = async (_id) => {
    try {
      await axiosPublic.put(`/userinfo/${_id}`, {
        rate: editedUserCount,
      });
      toast.success("User information updated successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("Error updating user information. Please try again.");
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">User Information</h2>
      <div className="flex justify-center mb-4 gap-4">
      <h1 className="px-3 py-2 rounded bg-slate-700 text-white">Find User:</h1>
        <input
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={handleSearch}
          className="border rounded px-4 py-2"
        />
      </div>
      <div className="w-full overflow-scroll">
      <table className="min-w-full bg-white border rounded overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4">User Email</th>
            <th className="py-2 px-4">Password</th>
            <th className="py-2 px-4">Count</th>
            <th className="py-2 px-4">SMS Rate</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4">{user.userEmail}</td>
              <td className="py-2 px-4">{user.password}</td>
              <td className="py-2 px-4">{user.count}</td>
              <td className="py-2 px-4">
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    value={editedUserCount}
                    onChange={(e) => setEditedUserCount(e.target.value)}
                  />
                ) : (
                  user.rate
                )}
              </td>
              <td className="py-2 px-4">
                {editingUserId === user._id ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(user._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEditClick(user._id, user.rate)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-2 border rounded ${
              currentPage === index + 1 ? "bg-gray-600 text-white" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Users;

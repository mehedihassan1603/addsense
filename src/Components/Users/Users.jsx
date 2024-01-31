import React, { useState, useEffect } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserCount, setEditedUserCount] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPublic.get("/userinfo");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUsers();
  }, [axiosPublic]);

  const handleEditClick = (_id, rate) => {
    setEditingUserId(_id);
    setEditedUserCount(rate);
    console.log(rate)
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedUserCount("");
  };
  console.log(editedUserCount)

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
  

  return (
    <div className="w-11/12 md:w-9/12 mx-auto mt-8 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
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
          {users.map((user) => (
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
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Users;

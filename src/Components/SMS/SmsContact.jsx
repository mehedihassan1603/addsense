import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import useAuth from "./../Authentication/Hook/useAuth";

const SmsContact = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState({
    name: "",
    number: "",
  });
  const [items, setItems] = useState([]);
  const [expandedMessages, setExpandedMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/smscontact");
        const foundEmail = response.data.filter(
          (item) => item.userEmail === user.email
        );
        const sortedUsers = foundEmail.sort((a, b) => {
          return b._id.localeCompare(a._id);
        });
        console.log(sortedUsers);
        setItems(sortedUsers);
        setExpandedMessages(sortedUsers.map(() => false));
      } catch (error) {
        console.error("Error fetching ads data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const existingContact = items.find((item) => item.name === product.name);
  if (existingContact) {
    toast.error("Contact with the same name already exists.");
    return;
  }
    axiosPublic
      .post(`/smscontact`, {
        userEmail: user.email,
        name: product.name,
        number: product.number,
      })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Successfully Created!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setTimeout(() => {
            e.target.reset();
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error posting data", error);
        toast.error("An error occurred. Please try again later.");
      });
  };
  const handleDelete = (templateId) => {
    axiosPublic
      .delete(`/smscontact/${templateId}`)
      .then(() => {
        toast.success("Successfully Deleted!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setItems(items.filter((item) => item._id !== templateId));
      })
      .catch((error) => {
        console.error("Error deleting SMS template", error);
        toast.error(
          "An error occurred while deleting. Please try again later."
        );
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const toggleMessageExpansion = (index) => {
    setExpandedMessages((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-200 w-full md:w-11/12 mt-10 mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
        Create Contact Template
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600">
            Name:
          </label>
          <input
            type="name"
            id="name"
            name="name"
            required
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="number" className="block text-gray-600">
            Numbers:
          </label>
          <input
            type="text"
            id="number"
            name="number"
            required
            pattern="^88\d{11}(,88\d{11})*$"
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            title="Please enter phone numbers starting with '88' and separated by commas, each being 13 digits long."
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-5 text-white py-2 rounded-3xl text-lg card-hover mt-4 bg-gradient-to-r from-rose-700 via-rose-800 to-rose-700"
          >
            Create
          </button>
        </div>
      </form>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Contact Template</h2>
        <div className="overflow-scroll">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Serial No.</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Numbers</th>
              </tr>
            </thead>
            <tbody>
            {currentItems.map((item, index) => (
                <tr key={item._id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{item.name}</td>
                  <td className="border border-gray-300 p-2">
                    {expandedMessages[index]
                      ? item.number
                      : `${item.number.slice(0, 50)}${
                          item.number.length > 50 ? "..." : ""
                        }`}
                    {item.number.length > 50 && (
                      <button
                        className="text-blue-500 hover:underline focus:outline-none"
                        onClick={() => toggleMessageExpansion(index)}
                      >
                        {expandedMessages[index] ? "See Less" : "See More"}
                      </button>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <ul className="flex justify-center mt-4">
          {items.length > itemsPerPage &&
            Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map(
              (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 mx-1 ${
                      currentPage === index + 1
                        ? "bg-gray-600 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SmsContact;

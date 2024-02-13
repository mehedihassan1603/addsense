import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import moment from "moment";
import useAuth from "../Authentication/Hook/useAuth";

const SmsHistory = () => {
  const [smsHistory, setSmsHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(10);
  const [expandedMessages, setExpandedMessages] = useState([]);
  const [filter, setFilter] = useState("all"); // State to hold selected filter option
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    const fetchSmsHistory = async () => {
      try {
        const response = await axiosPublic.get("/smsHistory");
        const filteredSmsHistory = response.data.filter(
          (item) => item.userEmail === user.email
        );
        const sortedUsers = filteredSmsHistory.sort((a, b) => {
          return b._id.localeCompare(a._id);
        });
        setSmsHistory(sortedUsers);
        setExpandedMessages(sortedUsers.map(() => false));
      } catch (error) {
        console.error("Error fetching SMS history:", error);
      }
    };

    fetchSmsHistory();
  }, [axiosPublic, user]);

  // Function to handle filter change
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // Function to filter SMS history based on selected filter
  const filteredSmsHistory = () => {
    switch (filter) {
      case "today":
        return smsHistory.filter((sms) =>
          moment(sms.timestamp).isSame(moment(), "day")
        );
      case "yesterday":
        return smsHistory.filter((sms) =>
          moment(sms.timestamp).isSame(moment().subtract(1, "day"), "day")
        );
      case "last7days":
        return smsHistory.filter((sms) =>
          moment(sms.timestamp).isAfter(moment().subtract(7, "days"))
        );
      case "last30days":
        return smsHistory.filter((sms) =>
          moment(sms.timestamp).isAfter(moment().subtract(30, "days"))
        );
      default:
        return smsHistory;
    }
  };

  // Pagination logic...
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredSmsHistory().slice(indexOfFirstMessage, indexOfLastMessage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Toggle message expansion logic...
  const toggleMessageExpansion = (index) => {
    setExpandedMessages((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <div className="w-full mx-auto mt-8 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">SMS History</h2>

      {/* Dropdown menu for filtering */}
      <div className="flex mb-4 justify-center">
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 days</option>
          <option value="last30days">Last 30 days</option>
        </select>
      </div>

      {/* SMS history table */}
      <div className="w-full overflow-scroll"> 
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-300">
              <th className="py-2 px-4 border-r border-gray-400">Serial no.</th>
              <th className="py-2 px-4 border-r border-gray-400">Recipient</th>
              <th className="py-2 px-4 border-r border-gray-400">Sender ID</th>
              <th className="py-2 px-4 border-r border-gray-400">Message</th>
              <th className="py-2 px-4 border-r border-gray-400">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.map((sms, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="py-2 px-4 border-r border-gray-400">{index + 1}</td>
                <td className="py-2 px-4 border-r border-gray-400">{sms.recipient}</td>
                <td className="py-2 px-4 border-r border-gray-400">{sms.sender_id}</td>
                <td className="py-2 px-4 border-r border-gray-400">
                  {expandedMessages[index]
                    ? sms.message
                    : `${sms.message.slice(0, 50)}${sms.message.length > 50 ? "..." : ""}`}
                  {sms.message.length > 50 && (
                    <button
                      className="text-blue-500 hover:underline focus:outline-none"
                      onClick={() => toggleMessageExpansion(index)}
                    >
                      {expandedMessages[index] ? "See Less" : "See More"}
                    </button>
                  )}
                </td>
                <td className="py-2 px-4 border-r border-gray-400">
                  {moment(sms.timestamp).format("MMMM D, YYYY h:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ul className="flex pl-0 list-none rounded my-2">
          {Array.from({length: Math.ceil(filteredSmsHistory().length / messagesPerPage)}, (_, i) => i + 1).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`px-3 py-2 rounded-lg mx-1 cursor-pointer hover:bg-gray-200 ${
                pageNumber === currentPage ? "bg-gray-300" : ""
              }`}
              onClick={() => paginate(pageNumber)}
            >
              {pageNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SmsHistory;

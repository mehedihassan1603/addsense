import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import moment from "moment";

const SmsAllHistory = () => {
  const [smsHistory, setSmsHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedMessages, setExpandedMessages] = useState([]);
  const [filter, setFilter] = useState("all");
  const itemsPerPage = 10;
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchSmsHistory = async () => {
      try {
        const response = await axiosPublic.get("/smsHistory");
        const sortedUsers = response.data.sort((a, b) => {
          return b._id.localeCompare(a._id);
        });
        console.log(sortedUsers);
        setSmsHistory(sortedUsers);
        setExpandedMessages(sortedUsers.map(() => false));
      } catch (error) {
        console.error("Error fetching SMS history:", error);
      }
    };

    fetchSmsHistory();
  }, [axiosPublic]);

  const filterSmsHistory = () => {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'day').startOf('day');
    const last7days = moment().subtract(7, 'days').startOf('day');
    const last30days = moment().subtract(30, 'days').startOf('day');

    switch (filter) {
      case "today":
        return smsHistory.filter(sms => moment(sms.timestamp).isSame(today, 'day'));
      case "yesterday":
        return smsHistory.filter(sms => moment(sms.timestamp).isSame(yesterday, 'day'));
      case "last7days":
        return smsHistory.filter(sms => moment(sms.timestamp).isAfter(last7days));
      case "last30days":
        return smsHistory.filter(sms => moment(sms.timestamp).isAfter(last30days));
      default:
        return smsHistory;
    }
  };

  const totalPages = Math.ceil(filterSmsHistory().length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentSmsHistory = filterSmsHistory().slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleMessageExpansion = (index) => {
    setExpandedMessages((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  return (
    <div className="w-full mx-auto mt-8 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">SMS History</h2>

      <div className="flex justify-end mb-4">
        <select value={filter} onChange={(e) => handleFilterChange(e.target.value)} className="border rounded px-4 py-2">
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>
      </div>

      {currentSmsHistory.length === 0 ? (
        <p className="text-gray-500">No SMS history available.</p>
      ) : (
        <div className="w-full overflow-scroll">
          <table className="w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-300">
                <th className="py-2 px-4 border-r border-gray-400">Serial no.</th>
                <th className="py-2 px-4 border-r border-gray-400">User Email</th>
                <th className="py-2 px-4 border-r border-gray-400">Recipient</th>
                <th className="py-2 px-4 border-r border-gray-400">Sender ID</th>
                <th className="py-2 px-4 border-r border-gray-400">Message</th>
                <th className="py-2 px-4 border-r border-gray-400">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {currentSmsHistory.map((sms, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="py-2 px-4 border-r border-b border-gray-400">{index + 1}</td>
                  <td className="py-2 px-4 border-r border-b border-gray-400">{sms.userEmail}</td>
                  <td className="py-2 px-4 border-r border-b border-gray-400">{sms.recipient}</td>
                  <td className="py-2 px-4 border-r border-b border-gray-400">{sms.sender_id}</td>
                  <td className="py-2 px-4 border-r border-b border-gray-400">
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
                  <td className="py-2 px-4 border-r border-b border-gray-400">
                    {moment(sms.timestamp).format("MMMM D, YYYY h:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </div>
      )}
    </div>
  );
};

export default SmsAllHistory;

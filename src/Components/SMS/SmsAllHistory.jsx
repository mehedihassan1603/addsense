import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import moment from "moment";

const SmsAllHistory = () => {
  const [smsHistory, setSmsHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedMessages, setExpandedMessages] = useState([]);
  const itemsPerPage = 10;
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchSmsHistory = async () => {
      try {
        const response = await axiosPublic.get("/smsHistory");
        setSmsHistory(response.data);
        // Initialize expanded state for each message
        setExpandedMessages(response.data.map(() => false));
      } catch (error) {
        console.error("Error fetching SMS history:", error);
      }
    };

    fetchSmsHistory();
  }, [axiosPublic]);

  const totalPages = Math.ceil(smsHistory.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentSmsHistory = smsHistory.slice(startIndex, endIndex);

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

  return (
    <div className="w-full mx-auto mt-8 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">SMS History</h2>

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

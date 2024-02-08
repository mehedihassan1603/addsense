import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import moment from "moment";
import useAuth from "../Authentication/Hook/useAuth";

const SmsHistory = () => {
  const [smsHistory, setSmsHistory] = useState([]);
  const [expandedMessages, setExpandedMessages] = useState([]);
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
        console.log(sortedUsers)
        setSmsHistory(sortedUsers);
        
        setExpandedMessages(sortedUsers.map(() => false));
      } catch (error) {
        console.error("Error fetching SMS history:", error);
      }
    };

    fetchSmsHistory();
  }, [axiosPublic, user]);
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

      {smsHistory.length === 0 ? (
        <p className="text-gray-500">No SMS history available.</p>
      ) : (
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
            {smsHistory.map((sms, index) => (
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
      )}
    </div>
  );
};

export default SmsHistory;

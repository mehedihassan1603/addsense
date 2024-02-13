import React, { useEffect, useState } from "react";
import moment from "moment";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../Authentication/Hook/useAuth";

const ManualHistory = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All"); // State to store the selected filter
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/number");
        const sortedUsers = response.data.sort((a, b) => {
          return b._id.localeCompare(a._id);
        });
        console.log(sortedUsers)
        setPaymentHistory(sortedUsers);
      } catch (error) {
        console.error("Error fetching payment history data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  const handleAccept = async (id, amount, userEmail) => {
    const updatedStatus = "accepted";

    try {
      const response = await axiosPublic.put(`/number/${id}`, {
        status: updatedStatus,
      });

      console.log(response.data);

      if (response.data.modifiedCount > 0) {
        toast.success("Request Accepted successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        updateCount(amount, userEmail);
      }
    } catch (error) {
      console.error("Error updating bid status:", error);
      toast.error("Failed to update bid status", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  const updateCount = async (amount, userEmail) => {
    try {
      const getCurrentCount = await axiosPublic.get("/userinfo");
      console.log(getCurrentCount);

      const foundEmail = getCurrentCount.data.find(
        (item) => item.userEmail === userEmail
      );
      console.log(foundEmail);

      const userRate = foundEmail ? Number(foundEmail.rate) : 0;
      console.log("UserRate:", userRate);

      const defaultRateResponse = await axiosPublic.get("/smsinfo");
      const defaultRate = defaultRateResponse.data[0]?.defaultRate;
      console.log("Default Rate:", defaultRate);

      const rateValue = userRate !== 0 ? userRate : 0.25;
      console.log(rateValue);

      const currentCount = foundEmail ? foundEmail.count : 0;
      const newCount = Number(currentCount) + Number(amount);

      const response = await axiosPublic.post("/userinfo", {
        userEmail: userEmail,
        count: newCount,
        rate: rateValue,
      });

      if (response.status === 200) {
        toast.success("Successfully added to balance", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 100,
        });

        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        console.error("Failed to update user count value:", response.data);
      }
    } catch (error) {
      console.error("Error updating user count value:", error);
    }
  };

  const handleReject = async (id) => {
    const updatedStatus = "rejected";

    try {
      const response = await axiosPublic.put(`/number/${id}`, {
        status: updatedStatus,
      });

      console.log(response.data);

      if (response.data.modifiedCount > 0) {
        toast.success("Request Rejected successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating bid status:", error);
      toast.error("Failed to update bid status", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  const totalPages = Math.ceil(paymentHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter currentPayments based on the selected filter
  let filteredPayments = paymentHistory.filter(payment => {
    if (filter === "All") return true;
    return payment.status === filter.toLowerCase();
  });

  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setCurrentPage(1); // Reset current page when filter changes
  };
  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      <h1 className="text-2xl text-center font-bold mb-4">Manual Payment History</h1>
      <div className="w-full overflow-scroll">
      <div className="my-4 flex justify-center bg-white w-full md:w-8/12 mx-auto p-2">
          <button className={`px-3 py-1 mr-2 ${filter === "All" && 'bg-gray-600 rounded-md text-white'}`} onClick={() => handleFilterChange("All")}>All</button>
          <button className={`px-3 py-1 mr-2 ${filter === "Accepted" && 'bg-gray-600 rounded-md text-white'}`} onClick={() => handleFilterChange("Accepted")}>Accepted</button>
          <button className={`px-3 py-1 mr-2 ${filter === "Rejected" && 'bg-gray-600 rounded-md text-white'}`} onClick={() => handleFilterChange("Rejected")}>Rejected</button>
          <button className={`px-3 py-1 ${filter === "Pending" && 'bg-gray-600 rounded-md text-white'}`} onClick={() => handleFilterChange("Pending")}>Pending</button>
        </div>
        <table className="w-full bg-white border border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">User Email</th>
              <th className="border border-gray-300 px-4 py-2">Number</th>
              <th className="border border-gray-300 px-4 py-2">
                Transaction ID
              </th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">
                Payment Execute Time
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.userEmail}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.number}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.transactionId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.amount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                {payment.time}
              </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleAccept(
                            payment._id,
                            payment.amount,
                            payment.userEmail
                          )
                        }
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(payment._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {payment.status === "accepted" && (
                    <div className="">
                      <h1>Accepted</h1>
                    </div>
                  )}
                  {payment.status === "rejected" && (
                    <div className="">
                      <h1>Rejected</h1>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-2 border rounded ${
              currentPage === index + 1
                ? "bg-gray-600 text-white"
                : "bg-gray-300"
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

export default ManualHistory;

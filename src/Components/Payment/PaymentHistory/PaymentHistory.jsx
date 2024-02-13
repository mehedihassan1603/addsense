import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Authentication/Hook/useAxiosPublic";
import moment from "moment";

const PaymentHistory = () => {
  const axiosPublic = useAxiosPublic();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/bkash");
        const sortedUsers = response.data.sort((a, b) => {
          return b._id.localeCompare(a._id);
        });
        setPaymentHistory(sortedUsers);
      } catch (error) {
        console.error("Error fetching payment history data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  const filteredPayments = () => {
    switch (filter) {
      case "today":
        return paymentHistory.filter((payment) =>
          moment(payment.paymentExecuteTime, "YYYY-MM-DDTHH:mm:ss.SSSZ").isSame(
            moment(),
            "day"
          )
        );
      case "yesterday":
        return paymentHistory.filter((payment) =>
          moment(payment.paymentExecuteTime, "YYYY-MM-DDTHH:mm:ss.SSSZ").isSame(
            moment().subtract(1, "day"),
            "day"
          )
        );
      case "last7days":
        return paymentHistory.filter((payment) =>
          moment(
            payment.paymentExecuteTime,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          ).isAfter(moment().subtract(7, "days"))
        );
      case "last30days":
        return paymentHistory.filter((payment) =>
          moment(
            payment.paymentExecuteTime,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          ).isAfter(moment().subtract(30, "days"))
        );
      default:
        return paymentHistory;
    }
  };
  const totalPages = Math.ceil(filteredPayments().length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments().slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setCurrentPage(1);
  };

  return (
    <div className="w-full mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">App Payment History</h1>
      <div className="flex items-center mb-4 gap-4">
        <h1 className="px-3 py-2 rounded bg-slate-700 text-white">Filtering by:</h1>
        <select
          onChange={(e) => handleFilterChange(e.target.value)}
          value={filter}
          className="mr-2 px-3 py-2 border rounded bg-gray-300 text-gray-800"
        >
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </select>
      </div>

      <div className="w-full overflow-scroll">
        <table className="w-full bg-white border border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Payment ID</th>
              <th className="border border-gray-300 px-4 py-2">Number</th>
              <th className="border border-gray-300 px-4 py-2">
                Transaction ID
              </th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">
                Payment Execute Time
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.paymentID}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.customerMsisdn}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.trxID}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.amount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {moment(
                    payment.paymentExecuteTime,
                    "YYYY-MM-DDTHH:mm:ss:SSSZ"
                  ).format("MMMM Do YYYY, h:mm:ss a")}
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
    </div>
  );
};

export default PaymentHistory;

import React, { useEffect, useState } from "react";
import moment from "moment";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import useAuth from "../Authentication/Hook/useAuth";

const MyInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/number");
        setPaymentHistory(response.data);
      } catch (error) {
        console.error("Error fetching payment history data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  const currentUserPayments = paymentHistory.filter(
    (payment) => payment.userEmail === user.email
  );

  return (
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      {currentUserPayments.length === 0 ? (
        <div className="text-gray-700 text-center text-2xl"><p>No payment history available.</p></div>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Number</th>
              <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Payment Execute Time</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentUserPayments.map((payment, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{payment.number}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.transactionId}</td>
                <td className="border border-gray-300 px-4 py-2">{payment.amount}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {moment(payment.paymentExecuteTime).format('MMMM Do YYYY, h:mm:ss a')}
                </td>
                <td className="border border-gray-300 px-4 py-2">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyInfo;

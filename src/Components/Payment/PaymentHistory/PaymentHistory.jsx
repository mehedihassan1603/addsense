import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Authentication/Hook/useAxiosPublic";
import moment from "moment";

const PaymentHistory = () => {
  const axiosPublic = useAxiosPublic();
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/bkash");
        setPaymentHistory(response.data);
      } catch (error) {
        console.error("Error fetching payment history data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Payment ID</th>
            <th className="border border-gray-300 px-4 py-2">Number</th>
            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Payment Execute Time</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{payment.paymentID}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.customerMsisdn}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.trxID}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.amount}</td>
              <td className="border border-gray-300 px-4 py-2">{moment(payment.paymentExecuteTime, 'YYYY-MM-DDTHH:mm:ss:SSSZ').format('MMMM Do YYYY, h:mm:ss a')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;

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
      const foundEmail = getCurrentCount.data.find(
        (item) => item.userEmail === userEmail
      );
      const userRate = getCurrentCount.data.find(
        (item) => item.userEmail === user.email
      )?.rate;
      console.log(userRate);
      const rateValue = userRate !== undefined ? userRate : null;
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">User Email</th>
            <th className="border border-gray-300 px-4 py-2">Number</th>
            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">
              Payment Execute Time
            </th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paymentHistory.map((payment, index) => (
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
                {moment().format("MMMM Do YYYY, h:mm:ss a")}
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
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ManualHistory;

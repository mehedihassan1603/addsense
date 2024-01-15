import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../Authentication/Hook/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Authentication/Hook/useAuth";

const PaymentSuccess = () => {
  const location = useLocation();
  const paymentData = new URLSearchParams(location.search);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    const updateCount = async () => {
      try {
        // Get the current count value
        const getCurrentCount = await axiosPublic.get("/userinfo");
        const foundEmail = getCurrentCount.data.find(
          (item) => item.userEmail === user.email
        );
        const currentCount = foundEmail ? foundEmail.count : 0;

        // Add the payment amount to the current count
        const newCount = currentCount + parseFloat(paymentData.get("amount"));

        // Update the count value
        const response = await axiosPublic.post("/userinfo", {
          userEmail: user.email,
          count: newCount,
        });

        if (response.status === 200) {
          toast.success("Credit added to your balance", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setTimeout(() => {
            
          }, 1000);
        } else {
          console.error("Failed to update user count value:", response.data);
          // Handle the error as needed (e.g., show an error message)
        }
      } catch (error) {
        console.error("Error updating user count value:", error);
        // Handle the error as needed (e.g., show an error message)
      }
    };

    updateCount();
  }, [axiosPublic, paymentData]);

  return (
    <div>
      <h1 className="text-center py-3 text-2xl text-green-400">
        Payment Success
      </h1>
      <p>Payment ID: {paymentData.get("paymentID")}</p>
      <p>customerMsisdn: {paymentData.get("customerMsisdn")}</p>
      <p>trxID: {paymentData.get("trxID")}</p>
      <p>amount: {paymentData.get("amount")}</p>
      <p>paymentExecuteTime: {paymentData.get("paymentExecuteTime")}</p>
      <ToastContainer />
    </div>
  );
};

export default PaymentSuccess;

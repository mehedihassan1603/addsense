import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Authentication/Hook/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Authentication/Hook/useAuth";

const PaymentSuccess = () => {
  const location = useLocation();
  const paymentData = new URLSearchParams(location.search);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const updateCount = async () => {
      try {
        const getCurrentCount = await axiosPublic.get("/userinfo");
        const foundEmail = getCurrentCount.data.find(
          (item) => item.userEmail === user.email
        );
        const currentCount = foundEmail ? foundEmail.count : 0;
        const newCount = currentCount + parseFloat(paymentData.get("amount"));
        const response = await axiosPublic.post("/userinfo", {
          userEmail: user.email,
          count: newCount,
        });
        if (response.status === 200) {
          
        // if (response.status === 200) {
        //   toast.success("Credit Successfully added to your balance", {
        //     position: toast.POSITION.TOP_CENTER,
        //     autoClose: 100,
        //   });

          setTimeout(() => {
          navigate("/success");
            window.location.reload();
          }, 100);
        } else {
          console.error("Failed to update user count value:", response.data);
        }
      } catch (error) {
        console.error("Error updating user count value:", error);
      }
    };

    updateCount();
  }, [axiosPublic, paymentData]);

  return (
    <div>
      
      <h1 className="text-center py-3 text-2xl text-green-400">
        Please Wait.. <span className="loading loading-spinner loading-lg"></span>
      </h1>
      <ToastContainer />
    </div>
  );
};

export default PaymentSuccess;

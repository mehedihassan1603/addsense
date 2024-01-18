import React from 'react';
import { useLocation } from 'react-router-dom';
import useAxiosPublic from '../../Authentication/Hook/useAxiosPublic';
import useAuth from '../../Authentication/Hook/useAuth';

const addCredit = () => {
    const location = useLocation();
  const paymentData = new URLSearchParams(location.search);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
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
          toast.success("Credit added to your balance", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
          setTimeout(() => {
          }, 1000);
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
            
        </div>
    );
};

export default addCredit;
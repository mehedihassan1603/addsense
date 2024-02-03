import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import useAuth from "../Authentication/Hook/useAuth";

const UserHome = () => {
  const [balance, setBalance] = useState();
  const [rate, setRate] = useState();
  const [sms, setSms] = useState();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  useEffect(() => {
    const fetchSmsHistory = async () => {
      try {
        const response = await axiosPublic.get("/smsHistory");
        const getUser = await axiosPublic.get("/userinfo");
        const filteredSmsHistory = response.data.filter(
          (item) => item.userEmail === user.email
        );
        const foundEmail = getUser.data.find(
          (item) => item.userEmail === user.email
        );

        setSms(filteredSmsHistory);
        setBalance(foundEmail.count);
        setRate(foundEmail.rate);
      } catch (error) {
        console.error("Error fetching SMS history:", error);
      }
    };

    fetchSmsHistory();
  }, [axiosPublic, user]);

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-gradient-to-r from-slate-400 to-indigo-300">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-around gap-10 "
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white rounded-lg shadow-lg  text-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">Balance</h2>
            <p className="text-2xl font-bold  text-purple-600">
              {balance} credits
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white rounded-lg shadow-lg  text-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">SMS Rate</h2>
            <p className="text-2xl font-bold text-purple-600">{rate} per SMS</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-white rounded-lg shadow-lg  text-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">SMS Sent</h2>
            <p className="text-2xl font-bold text-purple-600">
              {sms && sms.length ? `${sms.length} SMS sent` : "No SMS sent"}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserHome;

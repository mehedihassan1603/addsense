import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import useAuth from "../Authentication/Hook/useAuth";

const SmsForm = () => {
  const [recipient, setRecipient] = useState("");
  const [senderId, setSenderId] = useState("");
  const [message, setMessage] = useState("");
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const updateCount = async () => {
    try {
      const getCurrentCount = await axiosPublic.get("/userinfo");
      const foundEmail = getCurrentCount.data.find(
        (item) => item.userEmail === user.email
      );
      console.log(typeof(foundEmail.count))
      const currentCount = foundEmail ? foundEmail.count : 0;
      const newCount = currentCount - foundEmail.rate;
      console.log("User count before update:", currentCount);
      

      const response = await axiosPublic.post("/userinfo", {
        userEmail: user.email,
        count: newCount,
        rate: foundEmail.rate,
      });

      if (response.status === 200) {
        console.log("User count updated successfully!");
        console.log("User count after update:", newCount);
      } else {
        console.error(
          "Failed to update user count value:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error updating user count value:", error);
    }
  };

  const handleSendSMS = () => {
    if (!recipient || !message) {
      toast.error("Please fill in both recipient and message fields.");
      return;
    }

    axiosPublic
      .post("/send-sms", {
        recipient,
        sender_id: senderId,
        type: "plain",
        message,
      })
      .then((response) => {
        console.log("SMS sending response:", response.data);

        if (response.data.response.status === "success") {
          toast.success("SMS sent successfully!");
          console.log("User count before update:", response.data.count);
          updateCount();
          setTimeout(() => {
              window.location.reload();
            }, 2000);
        } else {
          toast.error("Error sending SMS. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error sending SMS:", error);
        toast.error("Error sending SMS. Please try again.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-md">
      <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold mb-4">SMS Form</h2>
      <a href="/myinfo" className="text-xl font-bold mb-4 px-3 py-2 hover:bg-slate-600 hover:text-white hover:rounded-md">History</a>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Recipient:
        </label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Sender ID:
        </label>
        <input
          type="text"
          value={senderId}
          onChange={(e) => setSenderId(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Message:
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={handleSendSMS}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
      >
        Send SMS
      </button>
      <ToastContainer />
    </div>
  );
};

export default SmsForm;

import React, { useState } from "react";
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
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(1);
  const [currentCount, setCurrentCount] = useState(0);

  const fetchCurrentCount = async () => {
    try {
      const response = await axiosPublic.get("/userinfo");
      const foundEmail = response.data.find(
        (item) => item.userEmail === user.email
      );
      const count = foundEmail ? foundEmail.count : 0;
      setCurrentCount(count);
    } catch (error) {
      console.error("Error fetching current count:", error);
    }
  };
  
  const updateCount = async (newCount, foundEmail) => {
    try {
      const response = await axiosPublic.post("/userinfo", {
        userEmail: user.email,
        count: newCount,
        rate: foundEmail.rate,
      });
  
      if (response.status === 200) {
        console.log("User count updated successfully!");
      } else {
        console.error("Failed to update user count value:", response.data);
      }
    } catch (error) {
      console.error("Error updating user count value:", error);
    }
  };
  

  const handleSendSMS = async () => {
    try {
      const getCurrentCount = await axiosPublic.get("/userinfo");
      const foundEmail = getCurrentCount.data.find(
        (item) => item.userEmail === user.email
      );
      const count = foundEmail ? foundEmail.count : 0;
      console.log(count);
      console.log(foundEmail)
      const rate = foundEmail.rate * messageCount;
      console.log(rate)
      if (count >= rate) {
        const response = await axiosPublic.post("/send-sms", {
          recipient,
          sender_id: senderId,
          type: "plain",
          message,
        });
  
        console.log("SMS sending response:", response.data);
  
        if (response.data.response.status === "success") {
          toast.success("SMS sent successfully!");
          const newCount = count - rate;
          updateCount(newCount, foundEmail);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Error sending SMS. Please try again.");
        }
      } else {
        toast.error("You do not have enough balance to send an SMS.");
      }
    } catch (error) {
      console.error("Error handling send SMS:", error);
      toast.error("Error sending SMS. Please try again.");
    }
  };
  
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setMessage(inputText);
    setCharCount(inputText.length);
    const newMessageCount = Math.ceil(inputText.length / 160);
    setMessageCount(newMessageCount);
  };
  const handleChange = (e) => {
    const inputText = e.target.value;
    const formattedRecipient = inputText.startsWith("880")
      ? inputText
      : `88${inputText}`;
    setRecipient(formattedRecipient);
    
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
          onChange={handleChange}
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
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4 flex justify-between text-sm text-gray-500">
        <p>Character: {charCount} / 160</p>
        <p>Message: {messageCount}</p>
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

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const SmsForm = () => {
  const [recipient, setRecipient] = useState("");
  const [senderId, setSenderId] = useState("");
  const [message, setMessage] = useState("");
  const axiosPublic = useAxiosPublic();

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
        console.log(response.data);

        if (response.data.response.status === "success") {
          toast.success("SMS sent successfully!");
          setRecipient("");
          setSenderId("");
          setMessage("");
        } else {
          toast.error("Error sending SMS. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending SMS. Please try again.");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">SMS Form</h2>
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
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SmsForm;

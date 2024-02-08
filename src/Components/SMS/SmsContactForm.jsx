import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import useAuth from "../Authentication/Hook/useAuth";

const SmsContactForm = () => {
  const [recipient, setRecipient] = useState("");
  const [senderId, setSenderId] = useState("");
  const [message, setMessage] = useState("");
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [charCount, setCharCount] = useState(0);
  const [messageCount, setMessageCount] = useState(1);
  const [currentCount, setCurrentCount] = useState(0);
  const [template, setTemplate] = useState();
  const isEnglish = (text) =>
    /^[a-zA-Z0-9\s\+\-\*\/.,"'`{}(&%@#$!^?><:;]+$/u.test(text);
  const [takeSenderId, setTakeSenderId] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [numbers, setNumbers] = useState(0);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axiosPublic.get("/smstemplate");
        console.log(response);
        const foundEmail = response.data.filter(
          (item) => item.userEmail === user.email
        );
        setTemplates(foundEmail);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, [axiosPublic]);
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axiosPublic.get("/smscontact");
        console.log(response);
        const foundEmail = response.data.filter(
          (item) => item.userEmail === user.email
        );
        setContacts(foundEmail);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, [axiosPublic]);

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
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPublic.get("/smsinfo");
        console.log(response.data);
        const data = response.data.find((item) => item.senderId);
        console.log(data.senderId);
        setTakeSenderId(data.senderId);
        const templateResponse = await axiosPublic.get("/smstemplate");
        console.log(templateResponse);
        const foundTemplate = templateResponse.data.filter(
          (item) => item.userEmail === user.email
        );
        console.log(foundTemplate);
        setTemplate(foundTemplate);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchUsers();
  }, [axiosPublic]);
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

  const handleContactChange = (e) => {
    const contactId = e.target.value;
    const selectedContact = contacts.find(
      (contact) => contact._id === contactId
    );
    if (selectedContact) {
      const numbers = selectedContact.number.split(',').filter((num) => {
        return /^88\d{11}$/.test(num.trim());
      });
      const numberOfNumbers = numbers.length;
      console.log(`Number of valid numbers: ${numberOfNumbers}`);
      setRecipient(selectedContact.number);
      setNumbers(numberOfNumbers)
    }
  };
  console.log(numbers)
  

  const handleSendSMS = async () => {
    try {
      const getCurrentCount = await axiosPublic.get("/userinfo");
      const foundEmail = getCurrentCount.data.find(
        (item) => item.userEmail === user.email
      );
      const count = foundEmail ? foundEmail.count : 0;
      console.log(count);
      console.log(foundEmail);
      const rate = foundEmail.rate * messageCount;
      const totalNumber = foundEmail.rate * numbers;
      console.log(totalNumber)
      console.log(rate);
      const check = numbers * messageCount;
      console.log(check)
      if (count >= rate && count >= totalNumber && count >= check && count !== 0 && rate !== 0) {
        const recipientList = recipient.split(",");
        let errorMessages = "";
        for (let recipient of recipientList) {
          try {
            const response = await axiosPublic.post("/send-sms", {
              recipient,
              sender_id: takeSenderId,
              type: "plain",
              message,
            });

            console.log("SMS sending response:", response.data);

            if (response.data.success) {
              toast.success(`SMS sent successfully to ${recipient}!`);
              console.log(user.email);
              await axiosPublic.post("/smsHistory", {
                userEmail: user.email,
                recipient,
                sender_id: takeSenderId,
                message,
                timestamp: new Date().toISOString(),
              });
            } else {
              errorMessages += `Error sending SMS to ${recipient}: ${response.data.error.message}\n`;
            }
          } catch (error) {
            console.error(`Error sending SMS to ${recipient}:`, error.message);
            errorMessages += `Error sending SMS to ${recipient}. Please try again.\n`;
          }
        }

        if (errorMessages !== "") {
          toast.error(errorMessages);
        }

        const newCount = count - rate * recipientList.length;
        updateCount(newCount, foundEmail);

        setTimeout(() => {
          //   window.location.reload();
        }, 2000);
      } else {
        toast.error("You do not have enough balance to send SMS.");
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

    if (isEnglish(inputText)) {
      const newMessageCount = Math.ceil(inputText.length / 160);
      setMessageCount(newMessageCount);
    } else {
      const newMessageCount = Math.ceil(inputText.length / 65);
      setMessageCount(newMessageCount);
    }
  };
  const handleChange = (e) => {
    const inputText = e.target.value;
    if (inputText.startsWith("88")) {
      setRecipient(inputText);
    } else {
      setRecipient(`88${inputText}`);
    }
  };
  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    const selectedTemplate = templates.find(
      (template) => template._id === templateId
    );
    if (selectedTemplate) {
      setSelectedTemplate(selectedTemplate.message);
      setMessage(selectedTemplate.text);
    }
  };

  const renderContactDropdown = () => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white">Contacts:</label>
      <select
        onChange={handleContactChange} // Add onChange event handler
        className="mt-1 p-2 border rounded w-full bg-slate-300"
      >
        <option value="">Select a Contact</option>
        {contacts.map((contact) => (
          <option key={contact._id} value={contact._id}>
            {contact.name}
          </option>
        ))}
      </select>
    </div>
  );
  const renderTemplateDropdown = () => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-white">Template:</label>
      <select
        value={selectedTemplate}
        onChange={handleTemplateChange}
        className="mt-1 p-2 border rounded w-full bg-slate-300"
      >
        <option value="">Select a template</option>
        {templates.map((template) => (
          <option key={template._id} value={template._id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="w-full md:w-8/12 lg:w-2/4 mx-auto my-8 p-4 border bg-gray-500 rounded shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4 text-white">SMS Form</h2>
        {/* <a href="/smsHistory" className="text-lg px-2 rounded-md bg-slate-300 font-bold mb-2 hover:bg-slate-400">SMS History</a> */}
      </div>
      {renderContactDropdown()}

      <div className="mb-4">
        <label className="block text-sm font-medium text-white">
          Sender ID:
        </label>
        <input
          type="text"
          value={takeSenderId}
          readOnly
          className="mt-1 p-2 border rounded w-full bg-slate-300"
        />
      </div>
      <div>{renderTemplateDropdown()}</div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Message:</label>
        <textarea
          value={message}
          placeholder="Type here first..."
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full bg-slate-300"
        />
      </div>
      <div className="mb-4 flex justify-between text-sm text-white">
        <p>
          Character: {charCount} /{" "}
          {isEnglish(message) ? "160 (English)" : "65 (Unicode)"}
        </p>

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

export default SmsContactForm;

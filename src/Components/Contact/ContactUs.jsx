import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({});
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axiosPublic.get("/othersinfo");
        setContactInfo(response.data[0]);
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
    };

    fetchContactInfo();
  }, [axiosPublic]);

  return (
    <div className="w-full md:w-8/12 mx-auto bg-gray-300 py-10">
      <div className="flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-1/2 p-4">
          <form>
            <div className="mb-5 p-2 bg-white rounded-2xl flex justify-center gap-6">
              <h1 className="block mb-1 text-xl">PHONE: </h1>
              <a className="text-blue-600 mb-1 text-xl text-center" href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
            </div>
            <div className="mb-5 p-2 bg-white rounded-2xl flex justify-center gap-6">
              <h1 className="block mb-1 text-xl">EMAIL: </h1>
              <a className="text-red-600 mb-1 text-xl text-center" href={`tel:${contactInfo.phone}`}>{contactInfo.email}</a>
            </div>
            <div className="mb-5 p-2 bg-white rounded-2xl flex justify-center gap-6">
              <h1 className="block mb-1 text-xl">WHATSAPP: </h1>
              <a className="text-green-600 mb-1 text-xl text-center" href={`tel:${contactInfo.phone}`}>{contactInfo.whatsapp}</a>
            </div>
            <div className="mb-5 p-2 bg-white rounded-2xl flex justify-center gap-6">
              <h1 className="block mb-1 text-xl">Linkedin: </h1>
              <a className="text-blue-600 mb-1 text-xl text-center" href={`tel:${contactInfo.phone}`}>{contactInfo.linkdin}</a>
            </div>
            
          </form>
        </div>
        <div className="md:w-1/2 p-4">
          <img src="/images/contact.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

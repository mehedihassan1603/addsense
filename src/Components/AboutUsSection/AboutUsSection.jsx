import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const AboutUsSection = () => {
  const [aboutUsContent, setAboutUsContent] = useState("");
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchAboutUsContent = async () => {
      try {
        const response = await axiosPublic.get("/othersinfo");
        setAboutUsContent(response.data[0].aboutus);
      } catch (error) {
        console.error("Error fetching about us content:", error);
      }
    };

    fetchAboutUsContent();
  }, [axiosPublic]);

  const renderAboutUsContent = () => {
    const lines = aboutUsContent.split(". ");
    return lines.map((line, index) => (
      <p key={index} className="mb-2">
        {index === lines.length - 1 ? line : line + "."}
      </p>
    ));
  };
  return (
    <div className="px-4 pb-10 bg-gray-200 pt-10">
      <div className="w-full md:w-8/12 mx-auto flex flex-col md:flex-row ">
      <div className="w-10/12 md:w-7/12 bg-white mx-auto ">
        <img className="w-96 mx-auto" src="/images/about.jpg" alt="" />
      </div>
      <div className="bg-white w-10/12 md:w-7/12 text-lg mx-auto p-6 ">
        {renderAboutUsContent()}
      </div>
    </div>
    </div>
  );
};

export default AboutUsSection;

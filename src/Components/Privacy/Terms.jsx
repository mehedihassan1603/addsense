import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const Terms = () => {
  const [aboutUsContent, setAboutUsContent] = useState("");
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchAboutUsContent = async () => {
      try {
        const response = await axiosPublic.get("/othersinfo");
        setAboutUsContent(response.data[0].terms);
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
    
      <div className="w-full mt-4">
        <h1 className="text-3xl text-center">Terms & Conditions</h1>
      <div className="bg-white w-11/12 md:w-10/12 text-lg mx-auto p-6 ">
        {renderAboutUsContent()}
      </div>
    </div>

  );
};

export default Terms;

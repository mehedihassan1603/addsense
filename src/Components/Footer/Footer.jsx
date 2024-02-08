import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const Footer = () => {
  const axiosPublic = useAxiosPublic();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const takeInfo = await axiosPublic.get("/othersinfo");
        console.log(takeInfo.data);
        const response = takeInfo.data.find(item => item.title);
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  return (
    <footer className="bg-gray-800 text-white">
      <div className="flex flex-col md:flex-row justify-center items-center md:justify-around  py-10">
        <div className="flex flex-col justify-center">
          {data && data.title && (
            <h3 className="text-3xl text-red-500 mb-3">{data.title}</h3>
          )}
        </div>
        <div>
          <h1 className="mt-6 mb-3 text-xl">Visit Us: </h1>
          <ul className="list-none p-0 grid grid-cols-1 text-left md:grid-cols-3 gap-4">
            <li>
              {data && data.facebook && (
                <a href={data.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              )}
            </li>
            <li>
              {data && data.linkdin && (
                <a href={data.linkdin} target="_blank" rel="noopener noreferrer">
                  Linkedin
                </a>
              )}
            </li>
            <li>
              {data && data.email && (
                <a href={`mailto:${data.email}`}>Gmail</a>
              )}
            </li>
          </ul>
        </div>

        <div className="">
          <h3 className="text-xl my-3">About Us:</h3>
          <ul className="list-none p-0">
            <li>
              <a href="/about">Company</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container bg-black mx-auto text-center">
        <p>&copy; 2024 {data && data.title && (
            <span className="text-red-500">{data.title}</span>
          )}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

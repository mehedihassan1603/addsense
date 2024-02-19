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
        const response = takeInfo.data.find((item) => item.title);
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
        <a className="pl-4" href="/">
            <img
              src="/images/free sms apps.png"
              width={"250px"}
              alt=""
              className="rounded-lg"
            />
          </a>
        </div>
        <div className="flex w-9/12 justify-between md:justify-around">
          <div>
            <h1 className="mt-3 mb-3 text-xl">Visit Us: </h1>
            <ul className="list-none p-0 grid grid-cols-1 text-left md:grid-cols-3 gap-4">
              <li>
                {data && data.facebook && (
                  <a
                    className="hover:text-blue-500"
                    href={data.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                )}
              </li>
              <li>
                {data && data.linkdin && (
                  <a
                    className="hover:text-blue-500"
                    href={data.linkdin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </a>
                )}
              </li>
              <li>
                {data && data.email && (
                  <a 
                  className="hover:text-blue-500"
                  href={`mailto:${data.email}`}>Gmail</a>
                )}
              </li>
            </ul>
          </div>

          <div className="">
            <h3 className="text-xl my-3">Importent Link</h3>
            <ul className="list-none p-0">
              <li>
                <a className="hover:text-blue-500" href="/about">About Us</a>
              </li>
              <li>
                <a className="hover:text-blue-500" href="/contact-us">Contact Us</a>
              </li>
              <li>
                <a className="hover:text-blue-500" href="/privacy">Privacy & Policy</a>
              </li>
              <li>
                <a className="hover:text-blue-500" href="/terms">Terms & Conditions</a>
              </li>
              <li>
                <a className="hover:text-blue-500" href="/disclaimer">Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container bg-black mx-auto text-center">
        <p>
          &copy; 2024{" "}
          {data && data.title && (
            <span className="text-red-500">{data.title}</span>
          )}
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

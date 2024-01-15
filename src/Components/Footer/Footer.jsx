import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="flex justify-around py-10">
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl text-red-500 mb-3">Addsense</h3>
          
          
        </div>
        <div>
        <h1 className="mt-6 mb-3 text-xl">Visit Us: </h1>
        <ul className="list-none p-0 grid grid-cols-2 gap-4">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Linkedin</a>
            </li>
            <li>
              <a href="#">Whatsapp</a>
            </li>
          </ul>
        </div>
        
        <div className="">
          <h3 className="text-xl my-3">About Us:</h3>
          <ul className="list-none p-0">
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Media Center</a>
            </li>
            <li>
              <a href="#">Investors Relations</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container bg-black mx-auto text-center">
        <p>&copy; 2024 Survey-Hunter. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

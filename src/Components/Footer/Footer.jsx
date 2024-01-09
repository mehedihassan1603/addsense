import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-5">
      <div className="container pl-10 lg:pl-0 mx-auto grid grid-cols-2 lg:grid-cols-4">
        <div className="lg:w-2/4">
          <h3 className="text-3xl text-red-500 mb-3">Addsense</h3>
          <h1 className="mt-6 mb-3 text-xl">Visit Us: </h1>
          <ul className="list-none p-0">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">X</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Linkedin</a>
            </li>
            <li>
              <a href="#">Viber</a>
            </li>
            <li>
              <a href="#">Whatsapp</a>
            </li>
          </ul>
        </div>
        <div className="lg:w-2/4">
          <h3 className="text-xl mb-3">Smart Ads:</h3>
          <ul className="list-none p-0">
            <li>
              <a href="#">Ads-1</a>
            </li>
            <li>
              <a href="#">Ads-2</a>
            </li>
            
            
          </ul>
        </div>
        <div className="lg:w-2/4">
          <h3 className="text-xl my-3">Ads Deals:</h3>
          <ul className="list-none p-0">
            <li>
              <a href="#">AdsShare:</a>
            </li>
            <li>
              <a href="#">AdsBookBusiness</a>
            </li>
          </ul>
        </div>
        <div className="lg:w-2/4">
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
          <div className="container mx-auto mt-5">
            <h1>Get Support:</h1>
            <ul>
              <li>
                <a href="#">Tech Support</a>
              </li>
              <li>
                <a href="#">Contact US</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container bg-black mx-auto text-center">
        <p>&copy; 2024 Survey-Hunter. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

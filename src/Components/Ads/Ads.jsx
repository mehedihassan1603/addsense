import React, { useState, useEffect } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import useAuth from "../Authentication/Hook/useAuth";
import { Link } from "react-router-dom";

const Ads = () => {
  const [clickCount, setClickCount] = useState(0);
  const [adsData, setAdsData] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/ads");
        setAdsData(response.data);
      } catch (error) {
        console.error("Error fetching ads data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);
  const handleButtonClick = async () => {
    setClickCount(clickCount + 1);

    if (user?.email) {
      try {
        await axiosPublic.post("/userinfo", {
          count: clickCount + 1,
          userEmail: user.email,
        });
        console.log("Data posted to /userinfo successfully!");
      } catch (error) {
        console.error("Error posting data to /userinfo:", error);
      }
    } else {
      console.error("User email not available");
    }
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <div>
        <h1 className="text-3xl text-white text-center mb-2">
          Here are the Products for you:
        </h1>
      </div>
      <div className="flex flex-col  justify-center gap-10">
        {adsData.length === 0 ? (
          <div className="col-span-3 mt-20 pb-20">
            <h1 className="text-center text-3xl text-red-500">
              No Product available of this brand right now!!!
            </h1>
          </div>
        ) : (
          adsData.map((product) => (
            <div
              key={product._id}
              className="flex px-10 items-center justify-between w-full md:w-8/12 mx-auto bg-slate-200 rounded-lg shadow-xl"
            >
              <h1>Name: {product.name}</h1>
              <div className="flex justify-between  items-center gap-10">
                <Link to={`/details/${product._id}`}>
                  <button className="px-5 py-2 rounded-3xl text-lg card-hover bg-rose-500 hover:bg-rose-700 text-white">
                    Play Ads
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ads;

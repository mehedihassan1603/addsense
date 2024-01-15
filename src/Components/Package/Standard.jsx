import React, { useEffect, useState } from "react";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const Standard = () => {
  const [standard, setStandard] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/standard");
        setStandard(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching ads data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  const purchaseHandler = async (price) => {
    try {
      const result = await axiosPublic.post("api/bkash/create", {
        transactionId: uuidv4(),
        amount: price,
      });
      if (result?.data?.status) {
        window.location.href = result?.data?.data?.data?.bkashURL;
      } else {
        console.error("Error in payment:", result?.data?.message);
      }
    } catch (error) {
      console.error("Error in payment:", error);
    }
  };

  return (
    <div className="w-8/12 mx-auto md:w-1/5">
      {standard.map((plan, index) => (
        <div key={index} className="relative bg-teal-500 text-white p-6 ">
          <div className="absolute -top-6 left-1/4 bg-white text-center text-black px-5 py-2 rounded-lg">
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <span className="text-2xl font-bold mb-4">{plan.price} BDT</span>
          </div>
          <h2 className="text-base mt-12">{plan.details}</h2>
          <p className="my-4 text-base">
            You can get <span className=" font-bold">{plan.amount}</span>{" "}
            credit.
          </p>

          <div className="flex justify-center">
            <button
              className="bg-white text-teal-500 px-3 py-2 rounded-md hover:bg-teal-400 hover:text-white"
              onClick={() => purchaseHandler(plan.price)}
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Standard;

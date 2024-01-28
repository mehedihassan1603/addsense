import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { Link } from "react-router-dom";

const Standard = () => {
  const [basic, setBasic] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/standard");
        setBasic(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching ads data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  const purchaseHandler = async (price, email) => {
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
    <div className="w-3/4 mx-auto md:w-1/5">
      {basic.map((plan, index) => (
        <div key={index} className="relative bg-teal-500 text-white p-6 ">
          <div className="absolute -top-6 left-1/4 bg-white text-center text-black px-5 py-2 rounded-lg">
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <span className="text-2xl font-bold mb-4">{plan.price} BDT</span>
          </div>
          <h2 className="text-base mt-12">{plan.details}</h2>
          

          <div className="flex justify-center mt-10">
            <div>
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_7").showModal()
                }
              >
                Buy Now
              </button>
              <dialog
                id="my_modal_7"
                className="modal modal-bottom sm:modal-middle "
              >
                <div className="bg-amber-400 p-10 space-y-10 rounded-lg">
                  <div>
                  <Link className="text-black border-2 w-full border-teal-600 rounded-md px-4 py-2 hover:bg-teal-600 hover:text-white" to="/standardpay">
                    Payment Manually
                  </Link>
                  </div>
                  <div>
                  <button
                className="text-black border-2 w-full border-red-600 rounded-md px-4 py-2 hover:bg-red-600 hover:text-white"
                onClick={() => purchaseHandler(plan.price)}
              >
                Pay with Bkash
              </button>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn bg-red-600 text-white hover:text-black">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
              
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Standard;

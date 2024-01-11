import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import useAuth from "../Authentication/Hook/useAuth";

const Details = () => {
  const [product, setProduct] = useState(null);
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [showButton, setShowButton] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedCount = await axiosPublic.get("/userinfo");
        const foundEmail = updatedCount.data.find(
          (item) => item.userEmail === user.email
        );
        setClickCount(foundEmail.count);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, [axiosPublic, user.email]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/ads");
        const foundProduct = response.data.find((item) => item._id === _id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, [axiosPublic, _id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setShowButton(true);
    }
  }, [countdown]);

  const handleRewardButtonClick = async () => {
    if (user?.email) {
      try {
        // Update the state immediately to provide a responsive UI
        setClickCount((prevCount) => prevCount + 1);

        // Make the API call to update the count on the server
        const response = await axiosPublic.post("/userinfo", {
          count: clickCount + 1,
          userEmail: user.email,
        });

        // Check the response status or data for success
        if (response.status === 200) {
          console.log("Data posted successfully!");
          navigate("/ads")
        } else {
          console.error("Error posting data to /userinfo:", response.data);
          // If there's an error, you may want to revert the UI count update
          setClickCount((prevCount) => prevCount - 1);
        }
      } catch (error) {
        console.error("Error posting data to /userinfo:", error);
        // If there's an error, you may want to revert the UI count update
        setClickCount((prevCount) => prevCount - 1);
      }
    } else {
      console.error("User email not available");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-6">
      <div className="w-80 h-[400px] bg-slate-200 rounded-lg shadow-xl">
        <img src={product.frame} alt={product.name} />
        <div className="mx-10">
          <h1>Name: {product.name}</h1>
          {showButton ? (
            <button
              onClick={handleRewardButtonClick}
              className="bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded mt-2"
            >
              Get Reward
            </button>
          ) : (
            <div>Redirecting back in: {countdown} seconds</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Details;

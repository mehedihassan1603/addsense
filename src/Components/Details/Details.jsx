import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import useAuth from "../Authentication/Hook/useAuth";

const Details = () => {
  const [product, setProduct] = useState(null);
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState("");
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
        console.log(response);
        const foundProduct = response.data.find((item) => item._id === _id);

        if (foundProduct) {
          setProduct(foundProduct);
          setCountdown(foundProduct.playtime);
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
        setClickCount((prevCount) => prevCount + 1);
        const response = await axiosPublic.post("/userinfo", {
          count: clickCount + 1,
          userEmail: user.email,
        });
        if (response.status === 200) {
          toast.success("Reward gain successful!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });

          setTimeout(() => {
            navigate("/ads");
            window.location.reload();
          }, 2000);
        } else {
          console.error("Error posting data to /userinfo:", response.data);
          setClickCount((prevCount) => prevCount - 1);
        }
      } catch (error) {
        console.error("Error posting data to /userinfo:", error);
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
    <div className="">
      <div className="flex justify-center gap-10 py-4">
        <div className="bg-blue-700 text-white text-center font-bold py-2 px-4 rounded">
          <h2>Time: {product.playtime}</h2>
        </div>
        <div>
          {showButton ? (
            <button
              onClick={handleRewardButtonClick}
              className="bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded"
            >
              Get Reward
            </button>
          ) : (
            <div className="bg-blue-200 text-gray-600 text-center font-bold py-2 px-4 rounded">Redirecting back in: {countdown} seconds</div>
          )}
        </div>
      </div>
      <div className="bg-slate-200 flex justify-center w-full h-auto py-10 rounded-lg shadow-xl">
        <img src={product.frame} alt={product.name} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Details;

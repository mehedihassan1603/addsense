import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import useAxiosPublic from "../../Authentication/Hook/useAxiosPublic";
import useAuth from "../../Authentication/Hook/useAuth";

const PremiumPayment = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [amounts, setAmounts] = useState("");
  const [product, setProduct] = useState({
    number: "",
    transactionId: "",
    amount: amounts.price,
    userEmail: user.email,
    time: moment().format("MMMM Do YYYY, h:mm:ss a"),
    status: "pending",
  });
  const [text, setText] = useState([]);
  useEffect(() => {
    axiosPublic.get("/addinfo").then((res) => {
      setText(res.data);
    });

    axiosPublic.get("/premium").then((res) => {
      const packageAmount = res.data.find((item) => item.price);
      console.log(packageAmount)
      setAmounts(packageAmount)
    });
  }, [axiosPublic]);
  console.log(amounts)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);

    const productWithAmount = {
      ...product,
      amount: amounts && amounts.price !== undefined ? amounts.price : 0,
    };

    console.log(productWithAmount);

    axiosPublic.post("/number", productWithAmount).then((res) => {
      if (res.data.insertedId) {
        console.log("user added");
        toast.success("Submitted successfully! Wait for a minute.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });

        setTimeout(() => {
          e.target.reset();
          window.location.reload();
        }, 3000);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Manual bKash Payment</h1>
      {text.map((item, index) => (
        <div key={index}>
          <p>{item.text}</p>
          <p className="text-lg font-bold ">{item.number}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Your Number:
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="number"
            name="number"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Transaction ID:
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="transactionId"
            required
            onChange={handleChange}
          />
        </div>
        
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount:
            </label>
            <input
              className="border border-gray-300 p-2 w-full"
              type="number"
              name="amount"
              defaultValue={amounts.price}
              readOnly
            />
          </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PremiumPayment;

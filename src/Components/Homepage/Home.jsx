import React, { useEffect, useState } from "react";
import AboutUsSection from "../AboutUsSection/AboutUsSection";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { Link } from "react-router-dom";

const Home = () => {
  const [blog, setBlog] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/blog");
        setBlog(response.data.reverse().slice(0, 3));
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  return (
    <div>
      <div className="flex justify-center mb-10">
        <div className="w-full text-center rounded-lg bg-white">
          <img
            src="https://placekitten.com/1200/400"
            alt="Banner"
            className="w-full h-40 md:h-80 object-cover rounded-lg mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Our Website
          </h1>
          <p className="text-lg text-gray-700">
            Explore and discover amazing things.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <AboutUsSection></AboutUsSection>
      </div>

      <div className="w-9/12 mx-auto my-6">
        <h1 className="text-center text-3xl py-2 bg-slate-700 rounded-md text-white">Latest Blogs</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
          {blog.map((item, index) => (
            <div key={index} className="border border-gray-300 hover:border-none rounded-md p-4 hover:transform hover:scale-105 transition-transform duration-300">
            <Link to={`/seemore/${item._id}`}>
                <img
                  src={`https://manage.freesmsapps.com/public/${item.image}`}
                  alt={item.name}
                  className="w-320 h-48 mx-auto mb-4"
                />
                <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                <p>
                  {item.details.length > 50
                    ? `${item.details.slice(0, 50)}...`
                    : item.details}
                </p>
              </Link>
            </div>
          ))}
        </div>
          <div className="flex justify-center mt-3">
            <Link className="bg-green-600 rounded-md px-4 py-2 text-white hover:bg-green-700" to="/blog">SEE ALL</Link>
          </div>
      </div>
    </div>
  );
};

export default Home;

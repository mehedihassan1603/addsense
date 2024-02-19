import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const ViewBlog = () => {
  const { _id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axiosPublic.get("/blog");
        console.log(response);
        const foundProduct = response.data.find((item) => item._id === _id);

        setBlogPost(foundProduct);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };
    fetchBlogPost();
  }, [axiosPublic, _id]);

  if (!blogPost) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border border-gray-300 rounded-md p-4">
        <img
          src={`https://manage.freesmsapps.com/public/${blogPost.image}`}
          alt={blogPost.name}
          className=" w-auto h-[300px] md:h-[500px] mx-auto mb-4"
        />
        <div className="w-full md:w-10/12 mx-auto">
          <h2 className="text-2xl font-bold mb-2">{blogPost.name}</h2>
          <p>{blogPost.details}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;

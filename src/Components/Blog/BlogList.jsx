import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const BlogList = () => {
  const axiosPublic = useAxiosPublic();
  const [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/blog");
        setBlogData(response.data.reverse());
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchData();
  }, [axiosPublic]);

  const handleDelete = async (id) => {
    try {
      await axiosPublic.delete(`/blog/${id}`);
      setBlogData(blogData.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog entry:", error);
    }
  };

  const toggleContent = (index) => {
    setBlogData((prevBlogData) => {
      const updatedBlogData = [...prevBlogData];
      updatedBlogData[index].expanded = !updatedBlogData[index].expanded;
      return updatedBlogData;
    });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-300">
      <h1 className="text-3xl font-bold mb-4">Blog List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Image</th>
              <th className="border border-black px-4 py-2">Name</th>
              <th className="border border-black px-4 py-2">Details</th>
              <th className="border border-black px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((blog, index) => (
              <tr key={blog._id}>
                <td className="border border-black px-4 py-2">
                  <img
                    src={`https://manage.freesmsapps.com/public/${blog.image}`}
                    className="w-28 mx-auto"
                    alt={blog.image}
                  />
                </td>
                <td className="border border-black px-4 py-2">{blog.name}</td>
                <td className="border border-black px-4 py-2">
                  {blog.details.length > 50 && !blog.expanded
                    ? `${blog.details.slice(0, 50)}...`
                    : blog.details}
                  {blog.details.length > 50 && (
                    <button
                      onClick={() => toggleContent(index)}
                      className="text-blue-500 hover:underline focus:outline-none"
                    >
                      {blog.expanded ? "See Less" : "See More"}
                    </button>
                  )}
                </td>
                <td className="border border-black px-4 py-2">
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <ul className="flex">
          {Array.from({ length: Math.ceil(blogData.length / postsPerPage) }, (_, i) => (
            <li key={i}>
              <button
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 bg-gray-200 ${currentPage === i + 1 ? 'bg-gray-400' : ''}`}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogList;

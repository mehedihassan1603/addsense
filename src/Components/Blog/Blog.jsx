import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Authentication/Hook/useAxiosPublic';

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/blog");
                setBlog(response.data.reverse());
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };
        fetchData();
    }, [axiosPublic]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blog.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentPosts.map((item, index) => (
                    <div key={index} className="border border-gray-300 rounded-md p-4 hover:transform hover:scale-105 transition-transform duration-300">
                    <Link to={`/seemore/${item._id}`}>
                            <img src={`https://manage.freesmsapps.com/public/${item.image}`} alt={item.name} className="w-60 h-80 mx-auto mb-4" />
                            <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                            <p>{item.details.length > 50 ? `${item.details.slice(0, 50)}...` : item.details}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <ul className="flex">
                    {Array.from({length: Math.ceil(blog.length / postsPerPage)}, (_, i) => (
                        <li key={i}>
                            <button onClick={() => paginate(i + 1)} className="mx-1 px-3 py-1 bg-gray-200">{i + 1}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Blog;

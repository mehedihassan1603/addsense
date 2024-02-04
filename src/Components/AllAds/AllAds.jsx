import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const AllAds = () => {
    const axiosPublic = useAxiosPublic();
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/ads");
                setAds(response.data);
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        };

        fetchData();
    }, [axiosPublic]);

    const handleEdit = (adId) => {
        // Add logic for handling edit action
        console.log(`Editing ad with ID ${adId}`);
    };

    const handleDelete = (adId) => {
        // Add logic for handling delete action
        console.log(`Deleting ad with ID ${adId}`);
    };

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold mb-6">All Ads</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {ads.map((ad) => (
                    <div key={ad.id} className="bg-white p-4 rounded-md shadow-md flex flex-col h-full">
                        <h2 className="text-lg font-semibold mb-2">{ad.name}</h2>
                        <div className="flex-grow mb-6">
                            <img src={ad.frame} className="w-full h-52 mb-4" alt="" />
                            <p className="text-center text-gray-600">Playtime: <span className="font-semibold">{ad.playtime}</span></p>
                            <p className="text-center text-gray-600">Reward Value: <span className="font-semibold">{ad.reward}</span></p>
                        </div>
                        <div className="flex justify-between mt-auto">
                            <button
                                className="mr-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                onClick={() => handleEdit(ad.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                onClick={() => handleDelete(ad.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllAds;

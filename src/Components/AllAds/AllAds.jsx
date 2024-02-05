import React, { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "./EditForm";

const ITEMS_PER_PAGE = 9;

const AllAds = () => {
    const axiosPublic = useAxiosPublic();
    const [ads, setAds] = useState([]);
    const [selectedAd, setSelectedAd] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPublic.get("/ads");
                const sortedUsers = response.data.sort((a, b) => {
                    return b._id.localeCompare(a._id);
                  });
                  console.log(sortedUsers)
                setAds(sortedUsers);
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        };

        fetchData();
    }, [axiosPublic]);

    const handleEdit = (adId) => {
        const adToEdit = ads.find((ad) => ad._id === adId);
        setSelectedAd(adToEdit);
        setIsModalOpen(true);
    };

    const handleEditSave = async (editedAd) => {
        try {
            const response = await axiosPublic.put(`/ads/${editedAd._id}`, editedAd);

            if (response.status === 200) {
                console.log(`Ad with ID ${editedAd._id} updated successfully`);
                const updatedAds = ads.map((ad) => (ad._id === editedAd._id ? editedAd : ad));
                setAds(updatedAds);
            } else {
                console.error(`Failed to update ad with ID ${editedAd._id}`);
            }
            setIsModalOpen(false);
            setSelectedAd(null);
        } catch (error) {
            console.error(`Error updating ad with ID ${editedAd._id}:`, error);
        }
    };

    const handleEditCancel = () => {
        setIsModalOpen(false);
        setSelectedAd(null);
    };

    const handleDelete = async (adId) => {
        try {
            const response = await axiosPublic.delete(`/ads/${adId}`);
            console.log(response)
            if (response.status === 200) {
                console.log(`Ad with ID ${adId} deleted successfully`);
                toast.success("Delete successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                  });
                const updatedAds = ads.filter((ad) => ad._id !== adId);
                setAds(updatedAds);
            } else {
                console.error(`Failed to delete ad with ID ${adId}`);
            }
        } catch (error) {
            console.error(`Error deleting ad with ID ${adId}:`, error);
        }
    };
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentAds = ads.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold mb-6">All Ads</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {currentAds.map((ad) => (
                    <div key={ad._id} className="bg-white p-4 rounded-md shadow-md flex flex-col h-full">
                        <h2 className="text-lg font-semibold mb-2">{ad.name}</h2>
                        <div className="flex-grow mb-6">
                            <img src={ad.frame} className="w-full h-52 mb-4" alt="" />
                            <p className="text-center text-gray-600">Playtime: <span className="font-semibold">{ad.playtime}</span></p>
                            <p className="text-center text-gray-600">Reward Value: <span className="font-semibold">{ad.reward}</span></p>
                        </div>
                        <div className="flex justify-between mt-auto">
                        <button
                                className="mr-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                onClick={() => handleEdit(ad._id)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                onClick={() => handleDelete(ad._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-center">
                <ul className="flex space-x-2">
                    {Array.from({ length: Math.ceil(ads.length / ITEMS_PER_PAGE) }, (_, index) => (
                        <li key={index}>
                            <button
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <ToastContainer></ToastContainer>
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="relative bg-white p-8 rounded-md shadow-md">
                        <EditForm
                            ad={selectedAd}
                            onSave={handleEditSave}
                            onCancel={handleEditCancel}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllAds;

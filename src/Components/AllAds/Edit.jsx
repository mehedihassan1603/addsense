// Edit.jsx
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const Edit = ({ adId, onClose, fetchData }) => {
    const axiosPublic = useAxiosPublic();
    const [editedData, setEditedData] = useState({
        frame: "",
        name: "",
        playtime: 0,
        reward: 0,
    });

    useEffect(() => {
        // Fetch the ad data based on adId and set it to editedData
        const fetchAdData = async () => {
            try {
                const response = await axiosPublic.get(`/ads/${adId}`);
                console.log(response.data)
                setEditedData(response.data);
            } catch (error) {
                console.error("Error fetching ad data for editing:", error);
            }
        };

        fetchAdData();
    }, [axiosPublic, adId]);
console.log(editedData)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            // Make a PUT request to update the ad with editedData
            const response = await axiosPublic.put(`/ads/${adId}`, editedData);
            console.log(response);

            if (response.status === 200) {
                console.log(`Ad with ID ${adId} updated successfully`);
                toast.success("Update successfully!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });

                // Refetch data in the parent component
                fetchData();
            } else {
                console.error(`Failed to update ad with ID ${adId}`);
            }

            // Close the Edit modal
            onClose();
        } catch (error) {
            console.error(`Error updating ad with ID ${adId}:`, error);
        }
    };

    return (
        <div className="bg-gray-200 w-full md:w-9/12 mt-10 mx-auto p-6 rounded-lg">
            <h1 className="text-2xl font-bold bg-slate-800 py-2 rounded-lg text-center text-white mb-4">
                EDIT ADS
            </h1>
            <form onSubmit={handleSave}>
                <div className="mb-4">
                    <label htmlFor="frame" className="block text-gray-600">
                        URL:
                    </label>
                    <input
                        type="url"
                        id="frame"
                        name="frame"
                        required
                        value={editedData.frame}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-600">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={editedData.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="playtime" className="block text-gray-600">
                        Ads Run Time:
                    </label>
                    <input
                        type="number"
                        id="playtime"
                        name="playtime"
                        required
                        value={editedData.playtime}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="reward" className="block text-gray-600">
                        Reward Amount:
                    </label>
                    <input
                        type="number"
                        id="reward"
                        step="any"
                        name="reward"
                        required
                        value={editedData.reward}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md"
                    />
                </div>
                <div className="flex justify-center items-center">
                    <button
                        type="submit"
                        className="px-5 text-white py-2 rounded-3xl text-lg card-hover mt-4 bg-gradient-to-r from-rose-700 via-rose-800 to-rose-700"
                    >
                        SAVE
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Edit;

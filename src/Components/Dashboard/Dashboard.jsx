import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex flex-col md:flex-row bg-slate-400">
            <div className={`w-full md:w-1/4 p-6 bg-gray-800 text-white ${isMenuOpen ? 'hidden' : ''}`}>
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <Link to="/dashboard/addads" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
                    Ads
                </Link>
                <Link to="/dashboard/addpackage" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
                    Package
                </Link>
                <Link to="/dashboard/history" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
                    Auto Payment History
                </Link>
                <Link to="/dashboard/number" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
                    Manual Payment History
                </Link>
                <Link to="/dashboard/addinfo" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
                    ADD INFO
                </Link>
                <Link to="/dashboard/appinfo" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
                    BKASH APP INFO
                </Link>
                <Link to="/dashboard/userinfo" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
                    USERS
                </Link>
                <Link to="/dashboard/othersinfo" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
                    Others Info
                </Link>
                <Link to="/dashboard/smsAllHistory" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">
                    SMS History
                </Link>
            </div>
            <div className="flex-1 p-6">
                <button
                    className="md:hidden absolute top-3 right-3 text-white"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    )}
                </button>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;

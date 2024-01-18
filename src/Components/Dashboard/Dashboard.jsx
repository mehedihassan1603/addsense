import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="text-center">
            <div className="flex w-full md:w-4/6 mx-auto justify-between px-6 py-6">
                <Link to="/addads" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-10 rounded">
                    Create Ads
                </Link>
                <Link to="/addpackage" className="bg-green-500 hover:bg-green-700 text-white font-bold py-10 px-10 rounded">
                    Create Package
                </Link>
                <Link to="/history" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-10 px-10 rounded">
                    Payment History
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;

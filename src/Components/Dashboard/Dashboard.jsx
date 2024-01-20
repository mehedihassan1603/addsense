import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="text-center">
            <div className="grid grid-cols-3 gap-10 w-full md:w-4/6 mx-auto  px-6 py-6">
                <Link to="/addads" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-10 rounded">
                    Create Ads
                </Link>
                <Link to="/addpackage" className="bg-green-500 hover:bg-green-700 text-white font-bold py-10 px-10 rounded">
                    Create Package
                </Link>
                <Link to="/history" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-10 px-10 rounded">
                    Payment History
                </Link>
                <Link to="/number" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-10 px-10 rounded">
                    Manual History
                </Link>
                <Link to="/addinfo" className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-10 px-10 rounded">
                    ADD INFO
                </Link>
                <Link to="/appinfo" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-10 px-10 rounded">
                    APP INFO
                </Link>
                <Link to="/myinfo" className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-10 px-10 rounded">
                    MY INFO
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;

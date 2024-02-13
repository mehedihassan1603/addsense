import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCommentSms, faRectangleAd } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/Hook/useAxiosPublic";

const DashHome = () => {
    const axiosPublic = useAxiosPublic();
    const [allUser, setAllUser] = useState();
    const [allSMS, setAllSMS] = useState();
    const [allAds, setAllAds] = useState();
    useEffect(()=>{
        const fetchData = async() =>{
            const responseUser = await axiosPublic.get("/userinfo");
            const responseSMS = await axiosPublic.get("/smsHistory");
            const responseAds = await axiosPublic.get("/ads");
            console.log(responseUser)
            console.log(responseSMS)
            setAllUser(responseUser.data.length);
            setAllSMS(responseSMS.data.length);
            setAllAds(responseAds.data.length);
        }
        fetchData();
    },[axiosPublic])
  return (
    <div>
      
      <h1 className="text-2xl text-center font-bold mb-6">
        Welcome to the Admin Dashboard!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-10/12 md:w-11/12 mx-auto">
        <div className="flex items-center justify-center gap-4 bg-sky-600 p-4 rounded-md">
            <div><FontAwesomeIcon className="text-7xl text-white" icon={faUser} /></div>
            <div className="flex flex-col justify-center items-center text-white">
                <h1 className="text-lg">Total User: </h1>
                <p className="text-4xl"> {allUser} </p>
            </div>
        </div>
        <div className="flex items-center justify-center gap-4 bg-teal-600 p-4 rounded-md">
            <div><FontAwesomeIcon className="text-7xl text-white" icon={faCommentSms} /></div>
            <div className="flex flex-col justify-center items-center text-white">
                <h1 className="text-lg">Total SMS Send: </h1>
                <p className="text-4xl"> {allSMS} </p>
            </div>
        </div>
        <div className="flex items-center justify-center gap-4 bg-rose-600 p-4 rounded-md">
            <div><FontAwesomeIcon className="text-7xl text-white" icon={faRectangleAd} /></div>
            <div className="flex flex-col justify-center items-center text-white">
                <h1 className="text-lg">Total Ads: </h1>
                <p className="text-4xl"> {allAds} </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;

import React from "react";
import Package from "./Package";
import Standard from "./Standard";
import Premium from "./Premium";

const AllPackage = () => {
  return (
    <div className="bg-slate-400">
      <div className="text-white text-center py-10">
        <h1 className="text-2xl">Choose Your Pay</h1>
        <p className="text-3xl font-bold">Monthly Website Plan</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20 py-10 h-auto">
        <Package></Package>
        <Standard></Standard>
        <Premium></Premium>
      </div>
    </div>
  );
};

export default AllPackage;

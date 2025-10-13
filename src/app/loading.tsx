import Loader from "@/components/Loader";
import React from "react";

const LoadingProject = () => {
  return (
    <div className="  w-full form-control items-center">
      <Loader iconStyles="text-7xl" className="min-h-[70vh] " />
    </div>
  );
};

export default LoadingProject;

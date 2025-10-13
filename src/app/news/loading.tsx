import React from "react";
import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <div className="space-y-5">
      <Skeleton width={500} height={22} className="w-1/6" />
      <Skeleton width={500} height={22} className="w-1/5" />
      <Skeleton width={500} height={22} className="w-1/4" />
      <Skeleton width={500} height={22} className="w-1/3" />
      <Skeleton width={500} height={42} className="w-1/2" />
    </div>
  );
};

export default loading;

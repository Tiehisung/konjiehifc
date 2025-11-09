import PageLoader from "@/components/loaders/Page";
import React from "react";

const loading = () => {
  return (
    <div className="space-y-5">
      <PageLoader />
    </div>
  );
};

export default loading;

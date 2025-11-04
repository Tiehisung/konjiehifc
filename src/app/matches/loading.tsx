import TableLoader from "@/components/loaders/Table";
import React from "react";

const LoadingMatches = () => {
  return (
    <div className='pt-12 flex justify-center items-center '>
      <TableLoader cols={3} rows={10} wrapperClassName="mx-auto"/>
    </div>
  );
};

export default LoadingMatches;

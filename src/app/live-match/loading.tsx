import TableLoader from "@/components/loaders/Table";
import React from "react";

const LoadingMatch = () => {
  return (
    <div className='pt-12 '>
      <TableLoader cols={3} rows={10} wrapperClassName="mx-auto"/>
    </div>
  );
};

export default LoadingMatch;

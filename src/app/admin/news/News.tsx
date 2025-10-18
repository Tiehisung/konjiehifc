"use client";

import { INewsProps } from "@/app/news/page";
import { IQueryResponse } from "@/types";
import React, { FC } from "react";

const AdminNews: FC<{ news: IQueryResponse<INewsProps[]> }> = ({ news }) => {
  return (
    <div className="my-5">
      <ul className="grid md:grid-cols-2 gap-3 xl:grid-cols-3">
        {news?.data?.map((item, index) => {
          return (
            <li key={index} className="h-24 p-2 rounded border _borderColor ">
              <p className="w-full overflow-hidden line-clamp-1">
                {item.headline.text}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminNews;

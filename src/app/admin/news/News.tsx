"use client";

import { INewsProps } from "@/app/news/page";
import { getFormattedDate } from "@/lib/timeAndDate";
import { IQueryResponse } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const AdminNews: FC<{ news: IQueryResponse<INewsProps[]> }> = ({ news }) => {
  return (
    <div className="my-5">
      <ul className="grid md:grid-cols-2 gap-3 xl:grid-cols-3">
        {news?.data?.map((item, index) => {

          return (
            <li key={index} className=" p-2 rounded border _borderColor flex relative">
              <Link href={`/admin/news/${item._id}`}>
                <Image
                  src={item?.headline?.image}
                  width={400}
                  height={400}
                  className="w-full h-60 object-cover aspect-video"
                  alt={item.headline.text}
                />
                <p className=" overflow-hidden text-wrap line-clamp-2">
                  {item.headline.text}
                </p>
                <div className="font-light text-sm">
                  <p>{getFormattedDate(item?.createdAt, "March 2, 2025")}</p>
                  <p>{item?.reporter?.name}</p>
                </div>
              </Link>

              <div >
                {item?.isPublished?'Published':'Un '}

              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminNews;

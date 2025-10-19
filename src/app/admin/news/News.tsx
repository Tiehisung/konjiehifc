"use client";

import { INewsProps } from "@/app/news/page";
import { staticImages } from "@/assets/images";
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
            <li key={index} className=" p-2 rounded border _borderColor flex ">
              <Link href={`/admin/news/${item._id}`}>
                <Image
                  src={
                    item?.headline?.image?.secure_url ?? staticImages.ronaldo
                  }
                  width={400}
                  height={400}
                  className="w-full h-60 object-cover aspect-video"
                  alt={item.headline.text}
                />
                <p className=" overflow-hidden text-wrap max-w-60 line-clamp-2">
                  {item.headline.text}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminNews;

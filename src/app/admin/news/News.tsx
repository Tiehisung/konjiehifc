"use client";

import { INewsProps } from "@/app/news/page";
import { Pagination } from "@/components/Pagination";
import { PrimarySearch } from "@/components/Search";
import { Badge } from "@/components/ui/badge";
import { getFormattedDate } from "@/lib/timeAndDate";
import { IQueryResponse } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import NewsFilter from "./Filters";
import { SecondaryDropdown } from "@/components/Dropdown";

const AdminNews: FC<{ news: IQueryResponse<INewsProps[]> }> = ({ news }) => {
  return (
    <div className="my-24">
      <h1 className="_gradient text-xl font-semibold mb-4 p-3">News📰</h1>
      <header className="flex items-center gap-2.5 my-6">
        <PrimarySearch
          className="w-fit "
          inputStyles="h-9"
          searchKey="news_search"
          type="search"
          placeholder="Search News"
        />

        <SecondaryDropdown>
          <NewsFilter  />
        </SecondaryDropdown>
      </header>
      <ul className="grid md:grid-cols-2 gap-3 xl:grid-cols-3">
        {news?.data?.map((item, index) => {
          return (
            <li
              key={index}
              className=" p-2 rounded border _borderColor flex relative"
            >
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

              <div className="absolute">
                {!item?.isPublished && (
                  <Badge className="rounded-l-none text-sm">Unpublished </Badge>
                )}
              </div>
            </li>
          );
        })}
        {news?.data?.length == 0 && (
          <li className="_label py-6 text-2xl">
            No news items found
          </li>
        )}
      </ul>

      <div>
        <Pagination pagination={news?.pagination} />
      </div>
    </div>
  );
};

export default AdminNews;

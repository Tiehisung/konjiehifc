"use client";

import React, { FC } from "react";
import FileRenderer from "@/components/files/FileRender";
import Image from "next/image";
import { IFileProps } from "@/types";
import { INewsProps } from "@/app/news/page";
import { NewsReactions } from "./Reactions";

const NewsItemClient: FC<{ newsItem: INewsProps }> = ({ newsItem }) => {
  return (
    <div className=" mb-10">
      <header className="flex flex-wrap items-center gap-2.5">
        <Image
          width={1000}
          height={500}
          alt={newsItem?.headline?.text}
          src={newsItem?.headline?.image as string}
          className={`w-full min-w-64 h-auto bg-cover object-cover aspect-5/3 rounded-2xl `}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: newsItem?.headline?.text as string,
          }}
          className="text-lg md:text-lg mb-5 font-bold _title"
        />
      </header>

      <div className="grid lg:flex items-start mt-15 gap-x-6">
        <main className="_p grow my-6">
          <ul>
            {newsItem?.details?.map((detail, index) => {
              return (
                <li key={index} className="space-y-3.5 mb-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detail?.text as string,
                    }}
                  />

                  <div key={index} className="flex flex-wrap gap-4">
                    {detail?.media?.map((file, i) => {
                      if (file.secure_url)
                        return (
                          <FileRenderer file={file as IFileProps} key={i} controls/>
                        );
                    })}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Comments and reactions */}
          <section className=" mt-32 border-t-2">
            <h1 className="_title text-muted-foreground">Reactions</h1>
            <NewsReactions newsItem={newsItem} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default NewsItemClient;

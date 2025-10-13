"use client";

import React, { FC, useState } from "react";
import { INewsProps } from "../page";
import FileRenderer from "@/components/files/FileRender";
import Image from "next/image";
import { IFileProps } from "@/types";

const NewsItemClient: FC<{ newsItem: INewsProps }> = ({ newsItem }) => {
  const [loadingImage, setLoadingImage] = useState(false);
 
  return (
    <div className="container">
      <header className="">
        <div className="_title overflow-hidden">{newsItem?.headline?.text}</div>
        <Image
          width={1000}
          height={500}
          alt={newsItem.headline?.text}
          src={newsItem.headline?.image?.secure_url ?? ""}
          className={`w-auto min-w-64 h-auto max-w-md bg-cover ${
            loadingImage ? "bg-slate-200" : ""
          }`}
          onLoad={() => setLoadingImage(true)}
          onLoadingComplete={() => setLoadingImage(false)}
        />
      </header>

      <div className="grid lg:flex items-start mt-6 gap-x-6">
        <main className="_p space-y-5 grow">
          <section>
            {newsItem?.details?.map((detail, index) => {
              if (detail?.isText)
                return (
                  <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: detail?.text as string }}
                  />
                );
              else
                return (
                  <div key={index} className="flex flex-wrap gap-4">
                    {detail?.media?.map((file, i) => {
                      if (file.secure_url)
                        return (
                          <FileRenderer file={file as IFileProps} key={i} />
                        );
                    })}
                  </div>
                );
            })}
          </section>

          {/* Comments and reactions */}
          <section className="_subtitle">Comments</section>
        </main>

         </div>
    </div>
  );
};

export default NewsItemClient;

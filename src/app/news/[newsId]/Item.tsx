"use client";

import React, { FC, useState } from "react";
import { INewsProps } from "../page";
import FileRenderer from "@/components/files/FileRender";
import Image from "next/image";
import { IFileProps } from "@/types";

const NewsItemClient: FC<{ newsItem: INewsProps }> = ({ newsItem }) => {
  const [loadingImage, setLoadingImage] = useState(false);

  return (
    <div className=" mb-10">
      <header className="">
        <div className="text-3xl md:text-4xl overflow-hidden mb-7">
          {newsItem?.headline?.text}
        </div>
        <Image
          width={1000}
          height={500}
          alt={newsItem.headline?.text}
          src={newsItem.headline?.image?.secure_url ?? ""}
          className={`w-full max-md:max-w-md min-w-64 h-auto bg-cover aspect-4/2 object-cover xl:aspect-5/3 ${
            loadingImage ? "bg-secondary" : ""
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
